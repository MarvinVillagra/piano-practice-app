// Piano Master - MIDI Input Support for USB/Bluetooth Keyboards

class MIDIController {
    constructor() {
        this.access = null;
        this.inputs = [];
        this.onNoteOn = null;
        this.onNoteOff = null;
        this.isConnected = false;
        this.lastNote = null;
        this.noteHistory = [];
    }

    async init() {
        if (!navigator.requestMIDIAccess) {
            console.log('Web MIDI API not supported');
            return false;
        }

        try {
            this.access = await navigator.requestMIDIAccess({ sysex: false });
            this.access.onstatechange = (e) => this.handleStateChange(e);
            
            // Connect to all available inputs
            this.access.inputs.forEach(input => {
                this.connectInput(input);
            });

            return true;
        } catch (err) {
            console.error('MIDI access denied:', err);
            return false;
        }
    }

    handleStateChange(event) {
        const port = event.port;
        
        if (port.type === 'input') {
            if (port.state === 'connected') {
                this.connectInput(port);
                showToast(`🎹 ${port.name} connected!`, 'success');
            } else if (port.state === 'disconnected') {
                this.disconnectInput(port);
                showToast(`🎹 ${port.name} disconnected`, 'info');
            }
        }
    }

    connectInput(input) {
        if (this.inputs.find(i => i.id === input.id)) return;
        
        input.onmidimessage = (message) => this.handleMIDIMessage(message);
        this.inputs.push(input);
        this.isConnected = true;
        console.log('MIDI input connected:', input.name);
    }

    disconnectInput(input) {
        this.inputs = this.inputs.filter(i => i.id !== input.id);
        if (this.inputs.length === 0) {
            this.isConnected = false;
        }
    }

    handleMIDIMessage(message) {
        const [status, note, velocity] = message.data;
        const command = status >> 4;
        const channel = status & 0x0f;

        switch (command) {
            case 0x9: // Note On
                if (velocity > 0) {
                    this.handleNoteOn(note, velocity);
                } else {
                    this.handleNoteOff(note);
                }
                break;
            case 0x8: // Note Off
                this.handleNoteOff(note);
                break;
        }
    }

    handleNoteOn(noteNumber, velocity) {
        const note = this.midiToNote(noteNumber);
        
        this.lastNote = {
            note: note.name,
            octave: note.octave,
            full: note.fullName,
            midiNumber: noteNumber,
            velocity: velocity,
            timestamp: Date.now()
        };

        this.noteHistory.push(this.lastNote);
        if (this.noteHistory.length > 100) {
            this.noteHistory.shift();
        }

        if (this.onNoteOn) {
            this.onNoteOn(this.lastNote);
        }
    }

    handleNoteOff(noteNumber) {
        const note = this.midiToNote(noteNumber);
        
        if (this.onNoteOff) {
            this.onNoteOff({
                note: note.name,
                octave: note.octave,
                full: note.fullName,
                midiNumber: noteNumber
            });
        }
    }

    midiToNote(midiNumber) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octave = Math.floor(midiNumber / 12) - 1;
        const noteIndex = midiNumber % 12;
        const name = notes[noteIndex];
        
        return {
            name,
            octave,
            fullName: name + octave,
            midiNumber
        };
    }

    noteToMidi(noteName) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const name = noteName.replace(/\d/g, '');
        const octave = parseInt(noteName.match(/\d/)?.[0] || '4');
        const noteIndex = notes.indexOf(name);
        
        return (octave + 1) * 12 + noteIndex;
    }

    getConnectedDevices() {
        return this.inputs.map(input => ({
            id: input.id,
            name: input.name,
            manufacturer: input.manufacturer
        }));
    }
}

// ============== WAIT MODE (Like Flowkey/Midiano) ==============
class WaitModePlayer {
    constructor(midiController) {
        this.midi = midiController;
        this.sequence = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.waitingForNote = false;
        this.onComplete = null;
        this.onProgress = null;
    }

    loadSequence(notes) {
        this.sequence = notes;
        this.currentIndex = 0;
        this.isPlaying = false;
        this.waitingForNote = false;
    }

    start() {
        if (this.sequence.length === 0) return;
        
        this.isPlaying = true;
        this.waitingForNote = true;
        this.highlightCurrentNote();
        
        this.midi.onNoteOn = (note) => {
            this.checkNote(note);
        };
    }

    stop() {
        this.isPlaying = false;
        this.waitingForNote = false;
        this.currentIndex = 0;
    }

    checkNote(playedNote) {
        if (!this.waitingForNote) return;
        
        const expectedNote = this.sequence[this.currentIndex];
        const expectedMidi = this.midi.noteToMidi(expectedNote);
        
        if (playedNote.midiNumber === expectedMidi) {
            // Correct note
            this.waitingForNote = false;
            this.markNoteCorrect(this.currentIndex);
            this.currentIndex++;
            
            if (this.onProgress) {
                this.onProgress({
                    played: this.currentIndex,
                    total: this.sequence.length,
                    accuracy: this.currentIndex / this.sequence.length
                });
            }
            
            if (this.currentIndex >= this.sequence.length) {
                // Completed
                if (this.onComplete) {
                    this.onComplete({ success: true, notes: this.sequence });
                }
                this.stop();
            } else {
                // Next note
                setTimeout(() => {
                    this.waitingForNote = true;
                    this.highlightCurrentNote();
                }, 100);
            }
        } else {
            // Wrong note
            this.markNoteWrong(this.currentIndex, playedNote);
        }
    }

    highlightCurrentNote() {
        const noteElements = document.querySelectorAll('.sequence-note');
        noteElements.forEach((el, i) => {
            el.classList.toggle('current', i === this.currentIndex);
            el.classList.toggle('played', i < this.currentIndex);
        });
    }

    markNoteCorrect(index) {
        const noteElements = document.querySelectorAll('.sequence-note');
        if (noteElements[index]) {
            noteElements[index].classList.add('correct');
            noteElements[index].classList.remove('current');
        }
    }

    markNoteWrong(index, playedNote) {
        const noteElements = document.querySelectorAll('.sequence-note');
        if (noteElements[index]) {
            noteElements[index].classList.add('wrong');
            setTimeout(() => {
                noteElements[index].classList.remove('wrong');
            }, 300);
        }
        showToast(`Expected: ${this.sequence[index]}, Played: ${playedNote.full}`, 'error');
    }
}

// ============== VELOCITY VISUALIZER ==============
class VelocityVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.bars = [];
    }

    addNote(velocity) {
        // Velocity is 0-127, normalize to 0-1
        const normalizedVelocity = velocity / 127;
        
        this.bars.push({
            velocity: normalizedVelocity,
            height: normalizedVelocity * 100,
            timestamp: Date.now(),
            decay: 1.0
        });

        // Keep only last 20 bars
        if (this.bars.length > 20) {
            this.bars.shift();
        }

        this.render();
    }

    render() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const barWidth = this.canvas.width / 20;
        
        this.bars.forEach((bar, i) => {
            const x = i * barWidth;
            const height = bar.height * bar.decay;
            
            // Color based on velocity
            let color;
            if (bar.velocity > 0.8) {
                color = '#FF6B6B'; // Red for loud
            } else if (bar.velocity > 0.5) {
                color = '#FFE66D'; // Yellow for medium
            } else {
                color = '#4ECDC4'; // Cyan for soft
            }

            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, this.canvas.height - height, barWidth - 2, height);
        });

        // Animate decay
        this.animateDecay();
    }

    animateDecay() {
        this.bars.forEach(bar => {
            bar.decay *= 0.98;
        });

        if (this.bars.some(bar => bar.decay > 0.1)) {
            requestAnimationFrame(() => this.render());
        }
    }

    getAverageVelocity() {
        if (this.bars.length === 0) return 0;
        const sum = this.bars.reduce((acc, bar) => acc + bar.velocity, 0);
        return sum / this.bars.length;
    }

    getDynamicSuggestion() {
        const avg = this.getAverageVelocity();
        
        if (avg > 0.8) return 'Very loud - try playing softer (mf)';
        if (avg > 0.6) return 'Loud - good energy';
        if (avg > 0.4) return 'Medium - nice dynamic range';
        if (avg > 0.2) return 'Soft - try playing with more confidence';
        return 'Very soft - press the keys more firmly';
    }
}

// ============== FALLING NOTES VISUALIZER (Like Guitar Hero) ==============
class FallingNotesVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.notes = [];
        this.isPlaying = false;
        this.speed = 2; // Pixels per frame
        this.pixelsPerBeat = 60;
        this.hitLine = 0.8; // 80% down the canvas
    }

    loadSequence(notes, bpm = 60) {
        this.notes = [];
        const msPerBeat = 60000 / bpm;
        
        let currentTime = 0;
        notes.forEach((note, index) => {
            this.notes.push({
                note: note.pitch || note,
                duration: note.duration || 0.25,
                startTime: currentTime,
                y: -100, // Start above canvas
                played: false,
                missed: false
            });
            currentTime += (note.duration || 0.25) * msPerBeat;
        });
    }

    start() {
        this.isPlaying = true;
        this.animate();
    }

    stop() {
        this.isPlaying = false;
    }

    animate() {
        if (!this.isPlaying || !this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw hit line
        const hitY = this.canvas.height * this.hitLine;
        this.ctx.strokeStyle = 'rgba(6, 255, 165, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, hitY);
        this.ctx.lineTo(this.canvas.width, hitY);
        this.ctx.stroke();

        // Draw notes
        this.notes.forEach(note => {
            if (!note.played && !note.missed) {
                note.y += this.speed;
            }
            
            const x = this.noteToX(note.note);
            const width = 50;
            const height = note.duration * this.pixelsPerBeat;
            
            // Color based on state
            if (note.played) {
                this.ctx.fillStyle = 'rgba(6, 255, 165, 0.8)';
            } else if (note.missed) {
                this.ctx.fillStyle = 'rgba(255, 107, 107, 0.8)';
            } else {
                this.ctx.fillStyle = 'rgba(131, 56, 236, 0.8)';
            }
            
            this.ctx.fillRect(x - width/2, note.y, width, height);
            
            // Note name
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(note.note, x, note.y + height/2);
            
            // Check if missed
            if (note.y > hitY + 50 && !note.played) {
                note.missed = true;
            }
        });

        requestAnimationFrame(() => this.animate());
    }

    noteToX(noteName) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const name = noteName.replace(/\d/g, '');
        const index = notes.indexOf(name);
        const totalNotes = 12;
        return (index / totalNotes) * this.canvas.width + this.canvas.width / 24;
    }

    markNotePlayed(noteName) {
        const name = noteName.replace(/\d/g, '');
        const note = this.notes.find(n => !n.played && !n.missed && n.note.replace(/\d/g, '') === name);
        if (note) {
            note.played = true;
        }
    }

    getStats() {
        const played = this.notes.filter(n => n.played).length;
        const missed = this.notes.filter(n => n.missed).length;
        const total = this.notes.length;
        
        return {
            played,
            missed,
            total,
            accuracy: played / total
        };
    }
}

// Export
if (typeof window !== 'undefined') {
    window.MIDIController = MIDIController;
    window.WaitModePlayer = WaitModePlayer;
    window.VelocityVisualizer = VelocityVisualizer;
    window.FallingNotesVisualizer = FallingNotesVisualizer;
}
