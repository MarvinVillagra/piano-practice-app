// Piano Master - Sheet Music Display & Visualization

class SheetMusicDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 300;
        this.staffSpacing = 80;
        this.noteWidth = 40;
        this.startTimeX = 80;
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.className = 'sheet-music-canvas';
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    clear() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawStaff(y, clef = 'treble') {
        if (!this.ctx) return;
        
        const ctx = this.ctx;
        
        // Staff lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(20, y + i * 12);
            ctx.lineTo(this.width - 20, y + i * 12);
            ctx.stroke();
        }
        
        // Clef
        ctx.font = '48px serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        
        if (clef === 'treble') {
            ctx.fillText('𝄞', 25, y + 38);
        } else {
            ctx.fillText('𝄢', 25, y + 38);
        }
        
        // Time signature
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText('4', 60, y + 20);
        ctx.fillText('4', 60, y + 40);
    }

    noteToStaffPosition(noteName, clef = 'treble') {
        // Map note to vertical position on staff
        // In treble clef, middle C (C4) is on ledger line below staff
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const name = noteName.replace(/\d/g, '');
        const octave = parseInt(noteName.match(/\d/)?.[0] || '4');
        
        // Staff positions (each line/space = 6 pixels)
        // E4 = bottom line, F4 = first space, G4 = second line, etc.
        const baseY = clef === 'treble' ? 80 : 180;
        const noteIndex = notes.indexOf(name);
        
        // Calculate position relative to middle C
        let position;
        if (clef === 'treble') {
            // Treble clef: E4 is bottom line
            position = (octave - 4) * 7 + noteIndex - 2; // E4 at position 0
        } else {
            // Bass clef: G2 is bottom line
            position = (octave - 2) * 7 + noteIndex + 3;
        }
        
        return baseY - position * 6;
    }

    drawNote(x, y, isFilled = true, color = '#fff') {
        if (!this.ctx) return;
        
        const ctx = this.ctx;
        
        // Note head (ellipse)
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.ellipse(x, y, 8, 5, -0.2, 0, Math.PI * 2);
        if (isFilled) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
        
        // Stem
        ctx.beginPath();
        ctx.moveTo(x + 7, y);
        ctx.lineTo(x + 7, y - 35);
        ctx.stroke();
    }

    drawLedgerLines(x, y, count, direction = 'down') {
        if (!this.ctx) return;
        
        const ctx = this.ctx;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < count; i++) {
            const lineY = direction === 'down' ? y + i * 12 : y - i * 12;
            ctx.beginPath();
            ctx.moveTo(x - 12, lineY);
            ctx.lineTo(x + 12, lineY);
            ctx.stroke();
        }
    }

    renderNotes(notes, clef = 'treble') {
        this.clear();
        
        const trebleY = 50;
        const bassY = 150;
        
        // Draw both staffs
        this.drawStaff(trebleY, 'treble');
        this.drawStaff(bassY, 'bass');
        
        // Draw notes
        let x = this.startTimeX;
        const staffY = clef === 'treble' ? trebleY : bassY;
        
        notes.forEach((note, index) => {
            const noteName = typeof note === 'object' ? note.pitch : note;
            const clefToUse = typeof note === 'object' ? (note.clef || 'treble') : clef;
            const y = this.noteToStaffPosition(noteName, clefToUse);
            
            // Determine if ledger lines needed
            const staffTop = clefToUse === 'treble' ? trebleY : bassY;
            const ledgerCount = this.getLedgerCount(y, staffTop);
            
            if (ledgerCount > 0) {
                this.drawLedgerLines(x, y, ledgerCount, y < staffTop ? 'up' : 'down');
            }
            
            // Draw note
            const color = note.played ? '#06FFA5' : (note.current ? '#FFE66D' : '#fff');
            this.drawNote(x, y, true, color);
            
            x += this.noteWidth;
        });
    }

    getLedgerCount(y, staffTop) {
        // Count ledger lines needed
        const topLine = staffTop;
        const bottomLine = staffTop + 48;
        
        if (y < topLine) {
            return Math.ceil((topLine - y) / 12);
        } else if (y > bottomLine) {
            return Math.ceil((y - bottomLine) / 12);
        }
        return 0;
    }

    highlightCurrentNote(index) {
        // Redraw with highlighted note
    }

    markNotePlayed(index) {
        // Mark note as played (green)
    }
}

// ============== FALLING NOTES DISPLAY (Synthesia style) ==============
class FallingNotesDisplay {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.notes = [];
        this.scrollSpeed = 2;
        this.hitLineY = 0.8;
        this.isRunning = false;
        
        this.keyPositions = {};
        this.setupKeyPositions();
    }

    setupKeyPositions() {
        // Map each key to an X position
        const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#'];
        
        let x = 0;
        for (let octave = 2; octave <= 6; octave++) {
            for (let i = 0; i < whiteKeys.length; i++) {
                this.keyPositions[whiteKeys[i] + octave] = x;
                x += 25;
            }
        }
    }

    loadSequence(notes, bpm = 60) {
        this.notes = [];
        const msPerBeat = 60000 / bpm;
        
        let time = 0;
        notes.forEach(note => {
            const noteName = typeof note === 'string' ? note : note.pitch;
            const duration = typeof note === 'object' ? (note.duration || 0.25) : 0.25;
            
            this.notes.push({
                name: noteName,
                startTime: time,
                duration: duration * msPerBeat,
                y: -100,
                played: false,
                missed: false
            });
            
            time += duration * msPerBeat;
        });
    }

    start() {
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    animate() {
        if (!this.isRunning || !this.ctx) return;
        
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw keyboard at bottom
        this.drawKeyboard();
        
        // Draw hit line
        const hitY = this.canvas.height * this.hitLineY;
        ctx.strokeStyle = 'rgba(6, 255, 165, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, hitY);
        ctx.lineTo(this.canvas.width, hitY);
        ctx.stroke();
        
        // Update and draw notes
        this.notes.forEach(note => {
            if (!note.played && !note.missed) {
                note.y += this.scrollSpeed;
            }
            
            const x = this.noteToX(note.name);
            const height = note.duration / 100; // Scale duration to pixels
            const width = 20;
            
            // Color based on state
            if (note.played) {
                ctx.fillStyle = 'rgba(6, 255, 165, 0.7)';
            } else if (note.missed) {
                ctx.fillStyle = 'rgba(255, 107, 107, 0.7)';
            } else {
                ctx.fillStyle = 'rgba(131, 56, 236, 0.7)';
            }
            
            ctx.fillRect(x, note.y, width, height);
            
            // Note name
            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(note.name.replace(/\d/g, ''), x + width/2, note.y + height/2);
            
            // Check if missed
            if (note.y > hitY + 20 && !note.played) {
                note.missed = true;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }

    noteToX(noteName) {
        // Get X position for note
        const baseX = this.keyPositions[noteName] || 0;
        return baseX + 50; // Offset for left padding
    }

    drawKeyboard() {
        const ctx = this.ctx;
        const keyWidth = 25;
        const keyHeight = 60;
        const startY = this.canvas.height - keyHeight;
        
        const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const blackKeys = [null, 'C#', 'D#', null, 'F#', 'G#', 'A#'];
        
        // Draw white keys
        ctx.fillStyle = '#f0f0f0';
        for (let i = 0; i < 52; i++) {
            ctx.fillRect(50 + i * keyWidth, startY, keyWidth - 1, keyHeight);
        }
        
        // Draw black keys
        ctx.fillStyle = '#333';
        for (let octave = 0; octave < 7; octave++) {
            for (let i = 0; i < 7; i++) {
                if (blackKeys[i]) {
                    const x = 50 + (octave * 7 + i) * keyWidth + keyWidth * 0.65;
                    ctx.fillRect(x, startY, keyWidth * 0.6, keyHeight * 0.6);
                }
            }
        }
    }

    markPlayed(noteName) {
        const note = this.notes.find(n => !n.played && !n.missed && n.name === noteName);
        if (note) {
            note.played = true;
        }
    }

    getStats() {
        return {
            played: this.notes.filter(n => n.played).length,
            missed: this.notes.filter(n => n.missed).length,
            total: this.notes.length
        };
    }
}

// Export
if (typeof window !== 'undefined') {
    window.SheetMusicDisplay = SheetMusicDisplay;
    window.FallingNotesDisplay = FallingNotesDisplay;
}
