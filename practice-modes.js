// Piano Master - Advanced Practice Modes (Loop, Slow, Wait Mode)

class PracticeSession {
    constructor() {
        this.bpm = 60;
        this.exercise = null;
        this.isPlaying = false;
        this.loopStart = 0;
        this.loopEnd = null;
        this.loopEnabled = false;
        this.slowMode = 0.7; // 70% speed
        this.handMode = 'both'; // 'left', 'right', 'both'
        this.metronomeEnabled = true;
        this.startTime = null;
        this.mistakes = 0;
        this.correctNotes = 0;
    }

    loadExercise(exercise) {
        this.exercise = exercise;
        this.reset();
    }

    reset() {
        this.mistakes = 0;
        this.correctNotes = 0;
        this.startTime = null;
    }

    setBPM(bpm) {
        this.bpm = Math.max(40, Math.min(200, bpm));
    }

    setLoop(start, end) {
        this.loopStart = start;
        this.loopEnd = end;
        this.loopEnabled = true;
    }

    disableLoop() {
        this.loopEnabled = false;
    }

    setSlowMode(factor) {
        this.slowMode = Math.max(0.25, Math.min(1.0, factor));
    }

    setHandMode(mode) {
        this.handMode = mode;
    }

    getEffectiveBPM() {
        return this.bpm * this.slowMode;
    }

    getProgress() {
        return {
            mistakes: this.mistakes,
            correctNotes: this.correctNotes,
            accuracy: this.correctNotes / (this.correctNotes + this.mistakes) || 0,
            duration: this.startTime ? Date.now() - this.startTime : 0
        };
    }
}

// ============== SECTION LOOP PRACTICE ==============
class LoopPractice {
    constructor() {
        this.section = { start: 0, end: 0 };
        this.iterations = 0;
        this.maxIterations = 3;
        this.onLoopComplete = null;
    }

    setSection(startIndex, endIndex) {
        this.section = { start: startIndex, end: endIndex };
    }

    setIterations(count) {
        this.maxIterations = count;
    }

    getSectionNotes(fullSequence) {
        return fullSequence.slice(this.section.start, this.section.end + 1);
    }

    shouldRepeat(accuracy) {
        // Repeat if accuracy < 80%
        return accuracy < 0.8 && this.iterations < this.maxIterations;
    }

    nextIteration() {
        this.iterations++;
        return this.iterations <= this.maxIterations;
    }

    reset() {
        this.iterations = 0;
    }
}

// ============== AUTO-SPEED ADJUSTMENT ==============
class AdaptiveSpeed {
    constructor() {
        this.minBPM = 40;
        this.maxBPM = 200;
        this.currentBPM = 60;
        this.performanceHistory = [];
        this.adjustmentThreshold = 0.1; // 10% adjustment
    }

    recordPerformance(accuracy) {
        this.performanceHistory.push({
            accuracy,
            bpm: this.currentBPM,
            timestamp: Date.now()
        });

        // Keep last 10 performances
        if (this.performanceHistory.length > 10) {
            this.performanceHistory.shift();
        }

        this.adjustSpeed();
    }

    adjustSpeed() {
        if (this.performanceHistory.length < 3) return;

        const recent = this.performanceHistory.slice(-3);
        const avgAccuracy = recent.reduce((acc, p) => acc + p.accuracy, 0) / recent.length;

        if (avgAccuracy > 0.95) {
            // Doing great, speed up
            this.currentBPM = Math.min(this.maxBPM, this.currentBPM * 1.05);
        } else if (avgAccuracy < 0.7) {
            // Struggling, slow down
            this.currentBPM = Math.max(this.minBPM, this.currentBPM * 0.95);
        }
        // Between 70-95%, keep current speed
    }

    getBPM() {
        return Math.round(this.currentBPM);
    }

    getSuggestion() {
        const recent = this.performanceHistory.slice(-5);
        if (recent.length < 5) return null;

        const avg = recent.reduce((acc, p) => acc + p.accuracy, 0) / recent.length;
        
        if (avg > 0.9) {
            return { message: 'Ready to increase tempo?', action: 'speedup' };
        } else if (avg < 0.6) {
            return { message: 'Consider slowing down for better accuracy', action: 'slowdown' };
        }
        return { message: 'Good progress! Keep practicing at this tempo', action: 'maintain' };
    }
}

// ============== HAND ISOLATION PRACTICE ==============
class HandIsolation {
    constructor() {
        this.mode = 'both'; // 'left', 'right', 'both'
        this.leftHandNotes = [];
        this.rightHandNotes = [];
        this.currentHand = 'both';
    }

    setHands(leftNotes, rightNotes) {
        this.leftHandNotes = leftNotes;
        this.rightHandNotes = rightNotes;
    }

    setMode(mode) {
        this.mode = mode;
    }

    getNotesForCurrentMode() {
        switch (this.mode) {
            case 'left':
                return this.leftHandNotes;
            case 'right':
                return this.rightHandNotes;
            case 'both':
            default:
                return [...this.leftHandNotes, ...this.rightHandNotes];
        }
    }

    shouldListenToNote(noteOctave) {
        // Check if note is in current hand's range
        if (this.mode === 'left') {
            return this.leftHandNotes.includes(noteOctave);
        } else if (this.mode === 'right') {
            return this.rightHandNotes.includes(noteOctave);
        }
        return true;
    }

    static getNoteRange(hand) {
        // Left hand typically plays lower octaves
        if (hand === 'left') {
            return { minOctave: 2, maxOctave: 4 };
        } else {
            return { minOctave: 4, maxOctave: 6 };
        }
    }
}

// ============== SESSION JOURNAL ==============
class PracticeJournal {
    constructor() {
        this.entries = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = localStorage.getItem('practiceJournal');
        if (saved) {
            this.entries = JSON.parse(saved);
        }
    }

    saveToStorage() {
        localStorage.setItem('practiceJournal', JSON.stringify(this.entries));
    }

    addEntry(data) {
        const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            exercise: data.exercise,
            duration: data.duration, // minutes
            accuracy: data.accuracy,
            bpm: data.bpm,
            notesPlayed: data.notesPlayed,
            mistakes: data.mistakes,
            streak: data.streak
        };

        this.entries.push(entry);
        this.saveToStorage();
        return entry;
    }

    getRecent(days = 7) {
        const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
        return this.entries.filter(e => new Date(e.date).getTime() > cutoff);
    }

    getStats() {
        const recent = this.getRecent(30);
        
        if (recent.length === 0) {
            return { totalMinutes: 0, averageAccuracy: 0, totalSessions: 0 };
        }

        return {
            totalMinutes: recent.reduce((acc, e) => acc + e.duration, 0),
            averageAccuracy: recent.reduce((acc, e) => acc + e.accuracy, 0) / recent.length,
            totalSessions: recent.length,
            bestAccuracy: Math.max(...recent.map(e => e.accuracy)),
            mostPracticedExercise: this.getMostPracticed(recent),
            averageBPM: recent.reduce((acc, e) => acc + (e.bpm || 60), 0) / recent.length
        };
    }

    getMostPracticed(entries) {
        const counts = {};
        entries.forEach(e => {
            counts[e.exercise] = (counts[e.exercise] || 0) + 1;
        });
        
        let max = { exercise: 'N/A', count: 0 };
        for (const [exercise, count] of Object.entries(counts)) {
            if (count > max.count) {
                max = { exercise, count };
            }
        }
        return max.exercise;
    }

    getWeeklyProgress() {
        const weeks = [];
        const now = new Date();
        
        for (let w = 0; w < 8; w++) {
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - (w + 1) * 7);
            const weekEnd = new Date(now);
            weekEnd.setDate(now.getDate() - w * 7);
            
            const weekEntries = this.entries.filter(e => {
                const date = new Date(e.date);
                return date >= weekStart && date < weekEnd;
            });
            
            weeks.push({
                week: w + 1,
                sessions: weekEntries.length,
                minutes: weekEntries.reduce((acc, e) => acc + e.duration, 0),
                avgAccuracy: weekEntries.length > 0 
                    ? weekEntries.reduce((acc, e) => acc + e.accuracy, 0) / weekEntries.length 
                    : 0
            });
        }
        
        return weeks.reverse();
    }
}

// ============== CHALLENGE MODE ==============
class ChallengeMode {
    constructor() {
        this.challenges = [];
        this.activeChallenge = null;
        this.dailyChallenge = null;
    }

    generateDailyChallenge() {
        const types = [
            { type: 'speed', name: 'Speed Challenge', description: 'Play scale at 120 BPM', target: 120 },
            { type: 'accuracy', name: 'Accuracy Challenge', description: 'Get 95% accuracy on 3 scales', target: 0.95 },
            { type: 'streak', name: 'Streak Challenge', description: 'Play 20 notes without mistakes', target: 20 },
            { type: 'endurance', name: 'Endurance Challenge', description: 'Practice for 30 minutes', target: 30 }
        ];

        const challenge = types[Math.floor(Math.random() * types.length)];
        this.dailyChallenge = {
            ...challenge,
            id: Date.now(),
            progress: 0,
            completed: false,
            createdAt: new Date().toISOString()
        };

        return this.dailyChallenge;
    }

    updateProgress(value) {
        if (!this.dailyChallenge) return;

        switch (this.dailyChallenge.type) {
            case 'speed':
                this.dailyChallenge.progress = Math.max(this.dailyChallenge.progress, value);
                break;
            case 'accuracy':
                this.dailyChallenge.progress = value;
                break;
            case 'streak':
                this.dailyChallenge.progress = Math.max(this.dailyChallenge.progress, value);
                break;
            case 'endurance':
                this.dailyChallenge.progress = value;
                break;
        }

        if (this.dailyChallenge.progress >= this.dailyChallenge.target) {
            this.dailyChallenge.completed = true;
        }
    }

    isCompleted() {
        return this.dailyChallenge?.completed || false;
    }

    getReward() {
        if (!this.dailyChallenge?.completed) return 0;
        
        const rewards = {
            speed: 50,
            accuracy: 40,
            streak: 35,
            endurance: 45
        };

        return rewards[this.dailyChallenge.type] || 30;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PracticeSession = PracticeSession;
    window.LoopPractice = LoopPractice;
    window.AdaptiveSpeed = AdaptiveSpeed;
    window.HandIsolation = HandIsolation;
    window.PracticeJournal = PracticeJournal;
    window.ChallengeMode = ChallengeMode;
}
