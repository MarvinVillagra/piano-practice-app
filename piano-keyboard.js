// Piano Master - Interactive Piano Keyboard Display

class PianoKeyboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.octaves = 2;
        this.startOctave = 3;
        this.activeKeys = new Set();
        this.onKeyPress = null;
        this.onKeyRelease = null;
        
        this.keyMap = {
            // White keys
            'a': 'C', 's': 'D', 'd': 'E', 'f': 'F', 'g': 'G', 'h': 'A', 'j': 'B',
            'k': 'C', 'l': 'D', ';': 'E', "'": 'F',
            // Black keys
            'w': 'C#', 'e': 'D#', 't': 'F#', 'y': 'G#', 'u': 'A#',
            'o': 'C#', 'p': 'D#'
        };
        
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        this.createKeyboard();
        this.setupKeyListener();
    }

    createKeyboard() {
        const keyboard = document.createElement('div');
        keyboard.className = 'piano-keyboard';
        
        for (let oct = this.startOctave; oct < this.startOctave + this.octaves; oct++) {
            const octaveDiv = document.createElement('div');
            octaveDiv.className = 'octave';
            octaveDiv.dataset.octave = oct;
            
            // White keys
            ['C', 'D', 'E', 'F', 'G', 'A', 'B'].forEach(note => {
                const key = document.createElement('div');
                key.className = 'white-key';
                key.dataset.note = note + oct;
                key.innerHTML = `<span class="key-label">${note}${oct}</span>`;
                
                key.addEventListener('mousedown', () => this.pressKey(note + oct));
                key.addEventListener('mouseup', () => this.releaseKey(note + oct));
                key.addEventListener('mouseleave', () => this.releaseKey(note + oct));
                key.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.pressKey(note + oct);
                });
                key.addEventListener('touchend', () => this.releaseKey(note + oct));
                
                octaveDiv.appendChild(key);
            });
            
            // Black keys
            const blackKeys = [
                { note: 'C#', offset: 0 },
                { note: 'D#', offset: 1 },
                { note: 'F#', offset: 3 },
                { note: 'G#', offset: 4 },
                { note: 'A#', offset: 5 }
            ];
            
            blackKeys.forEach(bk => {
                const key = document.createElement('div');
                key.className = 'black-key';
                key.dataset.note = bk.note + oct;
                key.style.left = `calc(${bk.offset} * var(--white-key-width) + var(--black-key-offset))`;
                
                key.addEventListener('mousedown', () => this.pressKey(bk.note + oct));
                key.addEventListener('mouseup', () => this.releaseKey(bk.note + oct));
                key.addEventListener('mouseleave', () => this.releaseKey(bk.note + oct));
                key.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.pressKey(bk.note + oct);
                });
                key.addEventListener('touchend', () => this.releaseKey(bk.note + oct));
                
                octaveDiv.appendChild(key);
            });
            
            keyboard.appendChild(octaveDiv);
        }
        
        this.container.appendChild(keyboard);
    }

    setupKeyListener() {
        document.addEventListener('keydown', (e) => {
            if (e.repeat) return;
            const note = this.keyMap[e.key.toLowerCase()];
            if (note && !this.activeKeys.has(e.key.toLowerCase())) {
                this.activeKeys.add(e.key.toLowerCase());
                const fullNote = note + (this.startOctave + Math.floor(Object.keys(this.keyMap).indexOf(e.key.toLowerCase()) / 12));
                this.pressKey(fullNote);
            }
        });

        document.addEventListener('keyup', (e) => {
            const note = this.keyMap[e.key.toLowerCase()];
            if (note) {
                this.activeKeys.delete(e.key.toLowerCase());
                const fullNote = note + (this.startOctave + Math.floor(Object.keys(this.keyMap).indexOf(e.key.toLowerCase()) / 12));
                this.releaseKey(fullNote);
            }
        });
    }

    pressKey(note) {
        const keyEl = this.container.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.classList.add('pressed');
            
            if (this.onKeyPress) {
                this.onKeyPress(note);
            }
            
            // Play sound
            this.playNoteSound(note);
        }
    }

    releaseKey(note) {
        const keyEl = this.container.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.classList.remove('pressed');
            
            if (this.onKeyRelease) {
                this.onKeyRelease(note);
            }
        }
    }

    highlightKey(note, color = '#8338EC') {
        const keyEl = this.container.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.style.boxShadow = `0 0 20px ${color}`;
            keyEl.style.background = keyEl.classList.contains('black-key') ? color : `${color}33`;
        }
    }

    clearHighlight(note) {
        const keyEl = this.container.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.style.boxShadow = '';
            keyEl.style.background = '';
        }
    }

    playNoteSound(note) {
        // Simple beep sound
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        const freq = this.noteToFrequency(note);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }

    noteToFrequency(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = note.replace(/\d/g, '');
        const octave = parseInt(note.match(/\d/)?.[0] || '4');
        const noteIndex = notes.indexOf(noteName);
        const semitones = noteIndex + (octave - 4) * 12 + 9;
        return 440 * Math.pow(2, (semitones - 9) / 12);
    }

    showKeyLabels(show = true) {
        this.container.querySelectorAll('.key-label').forEach(el => {
            el.style.display = show ? 'block' : 'none';
        });
    }

    markCorrect(note) {
        const keyEl = this.container.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.classList.add('correct');
            setTimeout(() => keyEl.classList.remove('correct'), 500);
        }
    }

    markWrong(note) {
        const keyEl = this.container.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.classList.add('wrong');
            setTimeout(() => keyEl.classList.remove('wrong'), 500);
        }
    }
}

// ============== VIRTUAL PIANO PRACTICE ==============
class VirtualPianoPractice {
    constructor(keyboardId) {
        this.keyboard = new PianoKeyboard(keyboardId);
        this.sequence = [];
        this.currentIndex = 0;
        this.isPlaying = false;
    }

    loadSequence(notes) {
        this.sequence = notes;
        this.currentIndex = 0;
    }

    start() {
        this.isPlaying = true;
        this.showCurrentNote();
    }

    showCurrentNote() {
        if (this.currentIndex >= this.sequence.length) {
            this.complete();
            return;
        }
        
        const note = this.sequence[this.currentIndex];
        this.keyboard.clearHighlight();
        this.keyboard.highlightKey(note, '#FFE66D');
    }

    checkNote(note) {
        const expected = this.sequence[this.currentIndex];
        
        if (note.replace(/\d/g, '') === expected.replace(/\d/g, '')) {
            this.keyboard.markCorrect(expected);
            this.currentIndex++;
            this.showCurrentNote();
            return true;
        } else {
            this.keyboard.markWrong(note);
            return false;
        }
    }

    complete() {
        this.isPlaying = false;
        if (this.onComplete) {
            this.onComplete();
        }
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PianoKeyboard = PianoKeyboard;
    window.VirtualPianoPractice = VirtualPianoPractice;
}
