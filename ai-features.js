// Piano Master - Advanced AI-Inspired Features

// ============== ADAPTIVE LEARNING ENGINE ==============
class AdaptiveLearningEngine {
    constructor() {
        this.userProfile = {
            skillLevel: 1,
            strengths: [],
            weaknesses: [],
            learningStyle: 'visual',
            averageSessionTime: 0,
            preferredGenres: [],
            practiceHistory: []
        };
        
        this.difficultyAdjustments = {
            tooEasy: 1.2,
            justRight: 1.0,
            tooHard: 0.8
        };
    }

    // Analyze user performance and adjust difficulty
    analyzePerformance(results) {
        const accuracy = results.correct / results.total;
        const timePerQuestion = results.timeMs / results.total;
        
        let assessment = 'justRight';
        
        if (accuracy > 0.95 && timePerQuestion < 3000) {
            assessment = 'tooEasy';
        } else if (accuracy < 0.6) {
            assessment = 'tooHard';
        }
        
        return {
            assessment,
            recommendedDifficulty: this.difficultyAdjustments[assessment],
            suggestions: this.generateSuggestions(accuracy, timePerQuestion)
        };
    }

    generateSuggestions(accuracy, timePerQuestion) {
        const suggestions = [];
        
        if (accuracy < 0.7) {
            suggestions.push('Try slowing down the tempo');
            suggestions.push('Practice hands separately');
        }
        
        if (timePerQuestion > 5000) {
            suggestions.push('Focus on pattern recognition');
            suggestions.push('Practice sight-reading exercises');
        }
        
        if (accuracy > 0.9 && timePerQuestion < 3000) {
            suggestions.push('Increase tempo by 10 BPM');
            suggestions.push('Try more complex variations');
        }
        
        return suggestions;
    }

    // Generate personalized practice session
    generatePracticeSession() {
        const session = {
            warmup: this.selectWarmup(),
            mainExercises: this.selectMainExercises(),
            cooldown: this.selectCooldown(),
            estimatedDuration: 15
        };
        
        return session;
    }

    selectWarmup() {
        const warmups = [
            { name: 'Five-Finger Patterns', difficulty: 1, focus: 'Finger independence' },
            { name: 'Scale Fragments', difficulty: 2, focus: 'Key familiarity' },
            { name: 'Arpeggio Patterns', difficulty: 3, focus: 'Hand shape' }
        ];
        
        return warmups[Math.min(this.userProfile.skillLevel - 1, warmups.length - 1)];
    }

    selectMainExercises() {
        // Select based on weaknesses
        const exercises = [];
        
        if (this.userProfile.weaknesses.includes('rhythm')) {
            exercises.push({ type: 'rhythm', name: 'Rhythm Clapping', duration: 5 });
        }
        
        if (this.userProfile.weaknesses.includes('chords')) {
            exercises.push({ type: 'chords', name: 'Chord Recognition', duration: 5 });
        }
        
        // Always include some scale work
        exercises.push({ type: 'scales', name: 'Scale Practice', duration: 5 });
        
        return exercises;
    }

    selectCooldown() {
        return { name: 'Free Play', suggestion: 'Play something you enjoy!' };
    }

    // Track learning progress
    trackProgress(result) {
        this.userProfile.practiceHistory.push({
            timestamp: Date.now(),
            ...result
        });
        
        // Update skill level based on progress
        this.updateSkillLevel();
        
        // Identify patterns
        this.identifyPatterns();
    }

    updateSkillLevel() {
        const recentHistory = this.userProfile.practiceHistory.slice(-10);
        if (recentHistory.length < 5) return;
        
        const avgAccuracy = recentHistory.reduce((acc, h) => acc + (h.accuracy || 0), 0) / recentHistory.length;
        
        if (avgAccuracy > 0.85 && this.userProfile.skillLevel < 10) {
            this.userProfile.skillLevel++;
        } else if (avgAccuracy < 0.6 && this.userProfile.skillLevel > 1) {
            this.userProfile.skillLevel--;
        }
    }

    identifyPatterns() {
        // Identify strengths and weaknesses
        const typePerformance = {};
        
        this.userProfile.practiceHistory.forEach(h => {
            if (!typePerformance[h.type]) {
                typePerformance[h.type] = [];
            }
            typePerformance[h.type].push(h.accuracy);
        });
        
        for (const [type, accuracies] of Object.entries(typePerformance)) {
            const avg = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
            
            if (avg > 0.85 && !this.userProfile.strengths.includes(type)) {
                this.userProfile.strengths.push(type);
                this.userProfile.weaknesses = this.userProfile.weaknesses.filter(w => w !== type);
            } else if (avg < 0.6 && !this.userProfile.weaknesses.includes(type)) {
                this.userProfile.weaknesses.push(type);
                this.userProfile.strengths = this.userProfile.strengths.filter(s => s !== type);
            }
        }
    }
}

// ============== CHORD RECOGNITION ==============
class ChordRecognition {
    constructor() {
        this.chordTypes = {
            major: { intervals: [0, 4, 7], symbol: '', mood: 'Happy, stable' },
            minor: { intervals: [0, 3, 7], symbol: 'm', mood: 'Sad, melancholic' },
            dim: { intervals: [0, 3, 6], symbol: 'dim', mood: 'Tense, unstable' },
            aug: { intervals: [0, 4, 8], symbol: 'aug', mood: 'Dreamy, mysterious' },
            maj7: { intervals: [0, 4, 7, 11], symbol: 'maj7', mood: 'Jazzy, dreamy' },
            min7: { intervals: [0, 3, 7, 10], symbol: 'm7', mood: 'Smooth, soulful' },
            dom7: { intervals: [0, 4, 7, 10], symbol: '7', mood: 'Bluesy, tension' },
            dim7: { intervals: [0, 3, 6, 9], symbol: 'dim7', mood: 'Dark, dramatic' },
            sus2: { intervals: [0, 2, 7], symbol: 'sus2', mood: 'Open, atmospheric' },
            sus4: { intervals: [0, 5, 7], symbol: 'sus4', mood: 'Tense, ethereal' },
            add9: { intervals: [0, 4, 7, 14], symbol: 'add9', mood: 'Dreamy, colorful' },
            m7b5: { intervals: [0, 3, 6, 10], symbol: 'm7b5', mood: 'Jazzy, complex' }
        };
        
        this.chordProgressions = {
            pop: ['I-V-vi-IV', 'I-IV-I-V', 'vi-IV-I-V'],
            jazz: ['ii-V-I', 'iii-vi-ii-V', 'I-vi-ii-V'],
            blues: ['I-IV-I-V-IV-I', 'I7-IV7-I7-V7'],
            sad: ['i-VI-III-VII', 'i-iv-i-V'],
            epic: ['i-VI-i-VII', 'i-bVI-bIII-bVII']
        };
    }

    // Identify chord from notes
    identifyChord(notes) {
        if (!notes || notes.length < 3) return null;
        
        const root = notes[0];
        const rootIndex = this.getNoteIndex(root);
        
        // Calculate intervals from root
        const intervals = notes.map(n => {
            const noteIndex = this.getNoteIndex(n);
            return (noteIndex - rootIndex + 12) % 12;
        }).sort((a, b) => a - b);
        
        // Match to chord type
        for (const [type, data] of Object.entries(this.chordTypes)) {
            if (this.arraysEqual(intervals, data.intervals)) {
                return {
                    name: root + data.symbol,
                    type,
                    mood: data.mood,
                    notes
                };
            }
        }
        
        // Unknown chord
        return { name: 'Unknown', notes };
    }

    getNoteIndex(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        return notes.indexOf(note.replace(/\d/g, ''));
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    // Get chords in a key
    getChordsInKey(key, type = 'major') {
        const majorScale = [0, 2, 4, 5, 7, 9, 11];
        const minorScale = [0, 2, 3, 5, 7, 8, 10];
        
        const scale = type === 'major' ? majorScale : minorScale;
        const chordTypes = type === 'major' 
            ? ['', 'm', 'm', '', '', 'm', 'dim']
            : ['m', 'dim', '', 'm', 'm', '', ''];
        
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const rootIndex = this.getNoteIndex(key);
        
        return scale.map((interval, i) => {
            const noteIndex = (rootIndex + interval) % 12;
            return notes[noteIndex] + chordTypes[i];
        });
    }

    // Practice chord recognition
    generateQuiz(count = 10) {
        const chords = Object.entries(this.chordTypes);
        const quiz = [];
        
        for (let i = 0; i < count; i++) {
            const [type, data] = chords[Math.floor(Math.random() * chords.length)];
            const root = ['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)];
            
            quiz.push({
                chord: root + data.symbol,
                type,
                options: this.generateOptions(type),
                hint: data.mood
            });
        }
        
        return quiz;
    }

    generateOptions(correctType) {
        const types = Object.keys(this.chordTypes);
        const options = [correctType];
        
        while (options.length < 4) {
            const random = types[Math.floor(Math.random() * types.length)];
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    }
}

// ============== INTERVAL TRAINING ==============
class IntervalTraining {
    constructor() {
        this.intervals = {
            0: { name: 'Unison', song: 'Somewhere Over the Rainbow (first 2 notes)', difficulty: 1 },
            1: { name: 'Minor 2nd', song: 'Jaws Theme', difficulty: 1 },
            2: { name: 'Major 2nd', song: 'Happy Birthday', difficulty: 1 },
            3: { name: 'Minor 3rd', song: 'Smoke on the Water', difficulty: 2 },
            4: { name: 'Major 3rd', song: 'When the Saints Go Marching In', difficulty: 2 },
            5: { name: 'Perfect 4th', song: 'Here Comes the Bride', difficulty: 2 },
            6: { name: 'Tritone', song: 'The Simpsons Theme', difficulty: 3 },
            7: { name: 'Perfect 5th', song: 'Star Wars Main Theme', difficulty: 2 },
            8: { name: 'Minor 6th', song: 'Love Story (Taylor Swift)', difficulty: 3 },
            9: { name: 'Major 6th', song: 'My Bonnie Lies Over the Ocean', difficulty: 3 },
            10: { name: 'Minor 7th', song: 'Star Trek Theme', difficulty: 4 },
            11: { name: 'Major 7th', song: 'Take On Me (a-ha)', difficulty: 4 },
            12: { name: 'Octave', song: 'Somewhere Over the Rainbow', difficulty: 2 }
        };
    }

    // Generate interval quiz
    generateQuiz(direction = 'ascending', count = 10) {
        const quiz = [];
        const intervalKeys = Object.keys(this.intervals).map(Number);
        
        for (let i = 0; i < count; i++) {
            const semitones = intervalKeys[Math.floor(Math.random() * intervalKeys.length)];
            const startNote = ['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)];
            
            quiz.push({
                startNote,
                semitones,
                direction,
                name: this.intervals[semitones].name,
                songReference: this.intervals[semitones].song,
                difficulty: this.intervals[semitones].difficulty,
                options: this.generateIntervalOptions(semitones)
            });
        }
        
        return quiz;
    }

    generateIntervalOptions(correctSemitones) {
        const options = [correctSemitones];
        const allIntervals = Object.keys(this.intervals).map(Number);
        
        while (options.length < 4) {
            const random = allIntervals[Math.floor(Math.random() * allIntervals.length)];
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        
        return options.sort(() => Math.random() - 0.5);
    }

    // Get interval between two notes
    getInterval(note1, note2) {
        const semitones = this.getSemitones(note1, note2);
        return {
            semitones,
            name: this.intervals[Math.abs(semitones)]?.name || 'Unknown',
            songReference: this.intervals[Math.abs(semitones)]?.song
        };
    }

    getSemitones(note1, note2) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const i1 = notes.indexOf(note1.replace(/\d/g, ''));
        const i2 = notes.indexOf(note2.replace(/\d/g, ''));
        return (i2 - i1 + 12) % 12;
    }
}

// ============== SIGHT READING ==============
class SightReadingEngine {
    constructor() {
        this.levels = {
            1: { clef: 'treble', range: ['C4', 'G4'], notes: ['C', 'D', 'E', 'F', 'G'], rhythms: ['quarter'] },
            2: { clef: 'treble', range: ['C4', 'C5'], notes: ['C', 'D', 'E', 'F', 'G', 'A'], rhythms: ['quarter', 'half'] },
            3: { clef: 'treble', range: ['D4', 'D5'], notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], rhythms: ['quarter', 'half', 'whole'] },
            4: { clef: 'treble', range: ['C4', 'E5'], notes: 'all', rhythms: ['quarter', 'half', 'whole', 'eighth'] },
            5: { clef: 'both', range: ['G3', 'G5'], notes: 'all', rhythms: 'all' }
        };
    }

    generateExercise(level = 1, measures = 4) {
        const config = this.levels[level] || this.levels[1];
        const exercise = {
            level,
            clef: config.clef,
            timeSignature: '4/4',
            notes: []
        };
        
        const availableNotes = config.notes === 'all' 
            ? ['C', 'D', 'E', 'F', 'G', 'A', 'B']
            : config.notes;
        
        for (let m = 0; m < measures; m++) {
            const measureNotes = [];
            let beatsRemaining = 4;
            
            while (beatsRemaining > 0) {
                const rhythm = this.selectRhythm(config.rhythms, beatsRemaining);
                const note = availableNotes[Math.floor(Math.random() * availableNotes.length)];
                const octave = Math.floor(Math.random() * 2) + 4;
                
                measureNotes.push({
                    pitch: note + octave,
                    rhythm,
                    duration: this.getRhythmDuration(rhythm)
                });
                
                beatsRemaining -= this.getRhythmBeats(rhythm);
            }
            
            exercise.notes.push(...measureNotes);
        }
        
        return exercise;
    }

    selectRhythm(rhythms, beatsRemaining) {
        const available = rhythms === 'all' 
            ? ['quarter', 'half', 'whole', 'eighth']
            : rhythms;
        
        const valid = available.filter(r => this.getRhythmBeats(r) <= beatsRemaining);
        return valid[Math.floor(Math.random() * valid.length)];
    }

    getRhythmBeats(rhythm) {
        const beats = { whole: 4, half: 2, quarter: 1, eighth: 0.5 };
        return beats[rhythm] || 1;
    }

    getRhythmDuration(rhythm) {
        const durations = { whole: '1', half: '1/2', quarter: '1/4', eighth: '1/8' };
        return durations[rhythm] || '1/4';
    }
}

// ============== EXPORT ==============
if (typeof window !== 'undefined') {
    window.AdaptiveLearningEngine = AdaptiveLearningEngine;
    window.ChordRecognition = ChordRecognition;
    window.IntervalTraining = IntervalTraining;
    window.SightReadingEngine = SightReadingEngine;
    
    // Initialize instances
    window.adaptiveEngine = new AdaptiveLearningEngine();
    window.chordRecognition = new ChordRecognition();
    window.intervalTraining = new IntervalTraining();
