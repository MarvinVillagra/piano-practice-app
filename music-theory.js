// Piano Master - Enhanced with MIDI Concepts & Music Theory Engine

// ============== NOTE DURATIONS (Mathematical powers of 2) ==============
const NoteDurations = {
    WHOLE: 1.0,           // 4 beats in 4/4
    HALF: 0.5,            // 2 beats
    QUARTER: 0.25,        // 1 beat
    EIGHTH: 0.125,        // 0.5 beats
    SIXTEENTH: 0.0625,    // 0.25 beats
    THIRTYSECOND: 0.03125 // 0.125 beats
};

// Dotted notes (add 50% more time)
const DottedDurations = {
    DOTTED_WHOLE: 1.5,
    DOTTED_HALF: 0.75,
    DOTTED_QUARTER: 0.375,
    DOTTED_EIGHTH: 0.1875
};

// Velocity (MIDI 0-127) - from Medium article
const Velocities = {
    PPP: 15, PP: 30, P: 45, MP: 60, MF: 75, F: 90, FF: 110, FFF: 120
};

// ============== EAR TRAINING ==============
class EarTraining {
    constructor() {
        this.audioContext = null;
    }

    async init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    async playInterval(semitones, rootNote = 'C4') {
        if (!this.audioContext) await this.init();
        
        const rootFreq = this.noteToFrequency(rootNote);
        const secondFreq = rootFreq * Math.pow(2, semitones / 12);
        
        await this.playTone(rootFreq, 0, 0.8);
        await this.playTone(secondFreq, 0.5, 0.8);
    }

    async playTone(frequency, startTime, duration) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.frequency.value = frequency;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + startTime + duration);
        
        osc.start(this.audioContext.currentTime + startTime);
        osc.stop(this.audioContext.currentTime + startTime + duration);
    }

    noteToFrequency(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = note.replace(/\d/g, '');
        const octave = parseInt(note.match(/\d/)?.[0] || '4');
        const noteIndex = notes.indexOf(noteName);
        const semitones = noteIndex + (octave - 4) * 12 + 9;
        return 440 * Math.pow(2, (semitones - 9) / 12);
    }

    generateQuiz(count = 10) {
        const intervals = [
            { semitones: 1, name: 'Minor 2nd', song: 'Jaws Theme' },
            { semitones: 2, name: 'Major 2nd', song: 'Happy Birthday' },
            { semitones: 3, name: 'Minor 3rd', song: 'Smoke on the Water' },
            { semitones: 4, name: 'Major 3rd', song: 'When the Saints' },
            { semitones: 5, name: 'Perfect 4th', song: 'Here Comes the Bride' },
            { semitones: 6, name: 'Tritone', song: 'Simpsons Theme' },
            { semitones: 7, name: 'Perfect 5th', song: 'Star Wars' },
            { semitones: 8, name: 'Minor 6th', song: 'Love Story' },
            { semitones: 9, name: 'Major 6th', song: 'My Bonnie' },
            { semitones: 10, name: 'Minor 7th', song: 'Star Trek' },
            { semitones: 11, name: 'Major 7th', song: 'Take On Me' },
            { semitones: 12, name: 'Octave', song: 'Over the Rainbow' }
        ];
        
        const quiz = [];
        for (let i = 0; i < count; i++) {
            const interval = intervals[Math.floor(Math.random() * intervals.length)];
            const options = this.generateOptions(interval, intervals);
            quiz.push({ interval, rootNote: 'C4', options });
        }
        return quiz;
    }

    generateOptions(correct, all) {
        const options = [correct];
        while (options.length < 4) {
            const random = all[Math.floor(Math.random() * all.length)];
            if (!options.find(o => o.semitones === random.semitones)) options.push(random);
        }
        return options.sort(() => Math.random() - 0.5);
    }
}

// ============== CHORD PLAYER ==============
class ChordPlayer {
    constructor() {
        this.audioContext = null;
    }

    async init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    async playChord(notes, duration = 1, velocity = 75) {
        await this.init();
        const freqs = notes.map(n => this.noteToFrequency(n));
        const volume = (velocity / 127) * 0.3;
        
        freqs.forEach(freq => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            osc.frequency.value = freq;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            osc.start();
            osc.stop(this.audioContext.currentTime + duration);
        });
    }

    noteToFrequency(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = note.replace(/\d/g, '');
        const octave = parseInt(note.match(/\d/)?.[0] || '4');
        const noteIndex = notes.indexOf(noteName);
        const semitones = noteIndex + (octave - 4) * 12 + 9;
        return 440 * Math.pow(2, (semitones - 9) / 12);
    }

    async playProgression(progression, bpm = 60) {
        await this.init();
        const beatDuration = 60 / bpm;
        
        for (const chord of progression) {
            await this.playChord(chord.notes, beatDuration * (chord.beats || 1));
            await new Promise(r => setTimeout(r, beatDuration * (chord.beats || 1) * 1000));
        }
    }
}

// ============== CHORD THEORY ==============
const ChordShapes = {
    major: { intervals: [0, 4, 7], mood: 'Happy, stable' },
    minor: { intervals: [0, 3, 7], mood: 'Sad, melancholic' },
    dim: { intervals: [0, 3, 6], mood: 'Tense, unstable' },
    aug: { intervals: [0, 4, 8], mood: 'Dreamy, mysterious' },
    maj7: { intervals: [0, 4, 7, 11], mood: 'Jazzy, warm' },
    min7: { intervals: [0, 3, 7, 10], mood: 'Smooth, soulful' },
    dom7: { intervals: [0, 4, 7, 10], mood: 'Bluesy, tension' },
    sus2: { intervals: [0, 2, 7], mood: 'Open, atmospheric' },
    sus4: { intervals: [0, 5, 7], mood: 'Tense, ethereal' }
};

function buildChord(root, type = 'major') {
    const semitones = ChordShapes[type]?.intervals || [0, 4, 7];
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    return semitones.map(s => notes[(rootIndex + s) % 12] + '4');
}

function getDiatonicChords(key, mode = 'major') {
    const majorPattern = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
    const majorNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    const minorPattern = ['minor', 'dim', 'major', 'minor', 'minor', 'major', 'major'];
    const minorNumerals = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
    
    const pattern = mode === 'major' ? majorPattern : minorPattern;
    const numerals = mode === 'major' ? majorNumerals : minorNumerals;
    const scaleNotes = getScaleNotes(key, mode);
    
    return scaleNotes.slice(0, 7).map((note, i) => ({
        numeral: numerals[i],
        root: note,
        type: pattern[i],
        notes: buildChord(note.replace(/\d/g, ''), pattern[i])
    }));
}

function getScaleNotes(key, mode = 'major') {
    const majorIntervals = [0, 2, 4, 5, 7, 9, 11];
    const minorIntervals = [0, 2, 3, 5, 7, 8, 10];
    const intervals = mode === 'major' ? majorIntervals : minorIntervals;
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(key);
    return intervals.map(s => notes[(rootIndex + s) % 12] + '4');
}

// Export
if (typeof window !== 'undefined') {
    window.EarTraining = EarTraining;
    window.ChordPlayer = ChordPlayer;
    window.ChordShapes = ChordShapes;
    window.buildChord = buildChord;
    window.getDiatonicChords = getDiatonicChords;
    window.NoteDurations = NoteDurations;
    window.Velocities = Velocities;
}
