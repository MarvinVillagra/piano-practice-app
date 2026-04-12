// Piano Master - Flow State & Real-Time Feedback Module

// ============== FLOW STATE TRACKER ==============
class FlowStateTracker {
    constructor() {
        this.sessions = JSON.parse(localStorage.getItem('flow_sessions') || '[]');
        this.currentSession = null;
        this.optimalChallengeLevel = parseFloat(localStorage.getItem('optimal_challenge') || '0.5');
    }

    // Start a flow session
    startSession(skill, difficulty) {
        this.currentSession = {
            startTime: Date.now(),
            skill,
            difficulty,
            focusEvents: [],
            mistakes: 0,
            successes: 0,
            flowScore: 0
        };
    }

    // Track focus - call periodically
    trackFocus(focused) {
        if (!this.currentSession) return;
        
        this.currentSession.focusEvents.push({
            time: Date.now(),
            focused
        });
        
        // Calculate flow score
        this.calculateFlowScore();
    }

    // Track mistake
    trackMistake() {
        if (!this.currentSession) return;
        this.currentSession.mistakes++;
        this.calculateFlowScore();
    }

    // Track success
    trackSuccess() {
        if (!this.currentSession) return;
        this.currentSession.successes++;
        this.calculateFlowScore();
    }

    // Calculate flow score (0-100)
    calculateFlowScore() {
        if (!this.currentSession) return 0;

        const session = this.currentSession;
        const totalAttempts = session.mistakes + session.successes;
        
        // Success rate (0-50 points)
        const successRate = totalAttempts > 0 ? session.successes / totalAttempts : 0;
        const successPoints = successRate * 50;

        // Focus consistency (0-30 points)
        const recentFocus = session.focusEvents.slice(-10);
        const focusRate = recentFocus.length > 0 
            ? recentFocus.filter(e => e.focused).length / recentFocus.length 
            : 1;
        const focusPoints = focusRate * 30;

        // Challenge balance (0-20 points)
        // Optimal is when difficulty matches skill level
        const challengeBalance = 1 - Math.abs(session.difficulty - this.optimalChallengeLevel);
        const challengePoints = challengeBalance * 20;

        session.flowScore = Math.round(successPoints + focusPoints + challengePoints);
        return session.flowScore;
    }

    // End session and get insights
    endSession() {
        if (!this.currentSession) return null;

        const session = {
            ...this.currentSession,
            endTime: Date.now(),
            duration: Date.now() - this.currentSession.startTime
        };

        this.sessions.push(session);
        localStorage.setItem('flow_sessions', JSON.stringify(this.sessions.slice(-30)));

        // Adjust optimal challenge level based on results
        if (session.flowScore > 70) {
            // Too easy, increase challenge
            this.optimalChallengeLevel = Math.min(1, this.optimalChallengeLevel + 0.05);
        } else if (session.flowScore < 30) {
            // Too hard, decrease challenge
            this.optimalChallengeLevel = Math.max(0, this.optimalChallengeLevel - 0.05);
        }
        localStorage.setItem('optimal_challenge', this.optimalChallengeLevel.toString());

        this.currentSession = null;
        return session;
    }

    getFlowStateStatus() {
        if (!this.currentSession) return { status: 'idle', score: 0 };
        
        const score = this.currentSession.flowScore;
        let status, message, emoji;

        if (score >= 80) {
            status = 'flow';
            message = 'In the zone! Keep going!';
            emoji = '🔥';
        } else if (score >= 60) {
            status = 'focused';
            message = 'Good focus, nearly there';
            emoji = '😊';
        } else if (score >= 40) {
            status = 'warming';
            message = 'Warming up, stay with it';
            emoji = '🙂';
        } else {
            status = 'struggling';
            message = 'Consider an easier exercise';
            emoji = '😤';
        }

        return { status, score, message, emoji };
    }
}

// ============== CHORD PROGRESSION SHORTCUTS ==============
const chordProgressions = {
    // The "4 Chords" - plays thousands of songs
    'fourChords': {
        name: 'The Magic Four Chords',
        progression: ['I', 'V', 'vi', 'IV'],
        keyOfC: ['C', 'G', 'Am', 'F'],
        songs: [
            'Let It Be - Beatles',
            'Don\'t Stop Believing - Journey',
            'Someone Like You - Adele',
            'Poker Face - Lady Gaga',
            'I\'m Yours - Jason Mraz',
            'With or Without You - U2',
            'No Woman No Cry - Bob Marley'
        ],
        description: 'This single progression plays 1000+ popular songs!',
        learnTime: '15 minutes to master',
        fingering: {
            'C': { left: '5-3-1', right: '1-3-5' },
            'G': { left: '5-3-1', right: '1-3-5' },
            'Am': { left: '5-3-1', right: '1-3-5' },
            'F': { left: '5-3-1', right: '1-3-5' }
        }
    },
    
    'sadProgression': {
        name: 'Emotional Ballad',
        progression: ['I', 'vi', 'IV', 'V'],
        keyOfC: ['C', 'Am', 'F', 'G'],
        songs: [
            'Hello - Adele',
            'Perfect - Ed Sheeran',
            'Unchained Melody - Righteous Brothers'
        ],
        description: 'Perfect for emotional, heartfelt songs'
    },
    
    'jazzStandard': {
        name: 'Jazz ii-V-I',
        progression: ['ii', 'V', 'I'],
        keyOfC: ['Dm7', 'G7', 'Cmaj7'],
        songs: [
            'Autumn Leaves',
            'What a Wonderful World',
            'Fly Me to the Moon'
        ],
        description: 'The foundation of jazz harmony'
    },
    
    'bluesProgression': {
        name: '12-Bar Blues',
        progression: ['I', 'IV', 'V'],
        keyOfC: ['C', 'F', 'G'],
        structure: 'I-I-I-I-IV-IV-I-I-V-IV-I-I',
        songs: [
            'Sweet Home Chicago',
            'Hound Dog - Elvis',
            'Pride and Joy - Stevie Ray Vaughan'
        ],
        description: 'The backbone of blues and rock'
    },
    
    'popRock': {
        name: 'Pop-Rock Power',
        progression: ['I', 'IV', 'vi', 'V'],
        keyOfC: ['C', 'F', 'Am', 'G'],
        songs: [
            'Radioactive - Imagine Dragons',
            'Demons - Imagine Dragons',
            'Counting Stars - OneRepublic'
        ],
        description: 'Modern pop-rock energy'
    }
};

// Quick chord learning system
const quickChordLearning = {
    // Learn chords in order of difficulty
    order: ['C', 'G', 'Am', 'F', 'D', 'Em', 'E', 'A', 'Dm'],
    
    // Chord shapes with finger positions
    chords: {
        'C': { notes: ['C', 'E', 'G'], fingers: [1, 3, 5], difficulty: 1, tips: 'Most common chord. Thumb on C.' },
        'G': { notes: ['G', 'B', 'D'], fingers: [1, 3, 5], difficulty: 1, tips: 'Similar shape to C, just shift fingers.' },
        'Am': { notes: ['A', 'C', 'E'], fingers: [1, 3, 5], difficulty: 1, tips: 'A minor = C major shifted down.' },
        'F': { notes: ['F', 'A', 'C'], fingers: [1, 3, 5], difficulty: 2, tips: 'Can use thumb for F if needed.' },
        'D': { notes: ['D', 'F#', 'A'], fingers: [1, 2, 5], difficulty: 2, tips: 'F# is the black key between F and G.' },
        'Em': { notes: ['E', 'G', 'B'], fingers: [1, 3, 5], difficulty: 1, tips: 'Like C but starting on E.' },
        'E': { notes: ['E', 'G#', 'B'], fingers: [1, 3, 5], difficulty: 2, tips: 'G# is black key after G.' },
        'A': { notes: ['A', 'C#', 'E'], fingers: [1, 2, 5], difficulty: 2, tips: 'C# between C and D.' },
        'Dm': { notes: ['D', 'F', 'A'], fingers: [1, 3, 5], difficulty: 2, tips: 'F is natural, not sharp.' }
    },

    // Get learning sequence
    getSequence() {
        return this.order.map(name => ({
            name,
            ...this.chords[name]
        }));
    },

    // Get next chord to learn based on progress
    getNextChord(learned) {
        for (const chord of this.order) {
            if (!learned.includes(chord)) {
                return { name: chord, ...this.chords[chord] };
            }
        }
        return null;
    }
};

// ============== REAL-TIME FEEDBACK SIMULATION ==============
class RealTimeFeedback {
    constructor() {
        this.targetNotes = [];
        this.playedNotes = [];
        this.tempo = 120;
        this.isListening = false;
    }

    // Set what should be played
    setTarget(notes, tempo = 120) {
        this.targetNotes = notes.map((n, i) => ({
            note: n,
            time: (i * 60 / tempo) * 1000, // ms from start
            played: false,
            correct: false
        }));
        this.tempo = tempo;
    }

    // Simulate feedback (in real app, this would use microphone/MIDI)
    simulateFeedback() {
        return {
            timing: Math.random() > 0.2 ? 'good' : 'late',
            pitch: Math.random() > 0.1 ? 'correct' : 'wrong',
            dynamics: Math.random() > 0.3 ? 'even' : 'uneven',
            suggestions: this.getSuggestions()
        };
    }

    getSuggestions() {
        const suggestions = [
            'Keep your wrist relaxed',
            'Watch your thumb position',
            'Try playing slower for accuracy',
            'Focus on the melody line',
            'Keep steady tempo',
            'Lift fingers cleanly between notes'
        ];
        return suggestions[Math.floor(Math.random() * suggestions.length)];
    }

    // Get visual feedback for display
    getVisualFeedback() {
        return {
            correctNotes: this.targetNotes.filter(n => n.correct).length,
            totalNotes: this.targetNotes.length,
            accuracy: this.targetNotes.filter(n => n.correct).length / this.targetNotes.length,
            flowState: 'focused' // Would be calculated from performance
        };
    }
}

// ============== POPULAR SONGS QUICK-LEARN ==============
const quickLearnSongs = [
    {
        title: 'Let It Be',
        artist: 'The Beatles',
        chords: ['C', 'G', 'Am', 'F'],
        pattern: '4-chord loop',
        learnTime: '10 minutes',
        difficulty: 1,
        tips: [
            'Left hand plays chord roots on beats 1 and 3',
            'Right hand plays melody or simple rhythm',
            'This progression repeats throughout'
        ],
        chordTiming: [
            { chord: 'C', beats: 4 },
            { chord: 'G', beats: 4 },
            { chord: 'Am', beats: 4 },
            { chord: 'F', beats: 4 }
        ]
    },
    {
        title: 'Someone Like You',
        artist: 'Adele',
        chords: ['C', 'G', 'Am', 'F'],
        pattern: '4-chord loop',
        learnTime: '15 minutes',
        difficulty: 2,
        tips: [
            'Left hand plays arpeggios',
            'Right hand plays melody',
            'Same progression as Let It Be!'
        ]
    },
    {
        title: 'Clocks',
        artist: 'Coldplay',
        chords: ['Eb', 'Bb', 'Gm', 'F'],
        pattern: 'Arpeggiated',
        learnTime: '20 minutes',
        difficulty: 3,
        tips: [
            'Famous right hand arpeggio pattern',
            'Left hand plays bass notes',
            'Practice the rhythm slowly first'
        ]
    }
];

// ============== PRACTICE VARIATIONS ==============
const practiceVariations = {
    // Different ways to practice the same material
    rhythmVariations: [
        { name: 'Straight', pattern: 'quarter-quarter-quarter-quarter' },
        { name: 'Swing', pattern: 'long-short-long-short' },
        { name: 'Syncopated', pattern: 'rest-quarter-quarter-rest' },
        { name: 'Triplets', pattern: 'three-per-beat' },
        { name: 'Dotted', pattern: 'dotted-quarter-eighth' }
    ],
    
    dynamicVariations: [
        { name: 'Crescendo', desc: 'Start soft, get louder' },
        { name: 'Diminuendo', desc: 'Start loud, get softer' },
        { name: 'Echo', desc: 'Loud then soft repetition' },
        { name: 'Terraced', desc: 'Step up in volume' }
    ],
    
    articulationVariations: [
        { name: 'Legato', desc: 'Smooth and connected' },
        { name: 'Staccato', desc: 'Short and detached' },
        { name: 'Non-legato', desc: 'Slightly separated' },
        { name: 'Portato', desc: 'Halfway between legato and staccato' }
    ],
    
    // Generate practice variations
    generateVariations(baseExercise) {
        return {
            rhythms: this.rhythmVariations.map(v => ({
                ...v,
                exercise: baseExercise
            })),
            dynamics: this.dynamicVariations.map(v => ({
                ...v,
                exercise: baseExercise
            })),
            articulations: this.articulationVariations.map(v => ({
                ...v,
                exercise: baseExercise
            }))
        };
    }
};

// ============== FOCUS REMINDERS ==============
const focusReminders = [
    '🎵 Breathe deeply and relax your shoulders',
    '🎹 Keep your wrists level, not too high',
    '👀 Look at the music, not your hands',
    '🧠 Hear the music in your mind before playing',
    '⏱️ Slow down if you make mistakes',
    '💪 Use arm weight, not just fingers',
    '🎯 Focus on one thing at a time',
    '🔄 Practice the hard parts more, not the easy parts',
    '👂 Listen critically to every note',
    '✨ Quality over quantity - make it beautiful'
];

function getRandomFocusReminder() {
    return focusReminders[Math.floor(Math.random() * focusReminders.length)];
}

// ============== EXPORT ==============
if (typeof window !== 'undefined') {
    window.FlowStateTracker = FlowStateTracker;
    window.chordProgressions = chordProgressions;
    window.quickChordLearning = quickChordLearning;
    window.RealTimeFeedback = RealTimeFeedback;
    window.quickLearnSongs = quickLearnSongs;
    window.practiceVariations = practiceVariations;
    window.focusReminders = focusReminders;
    window.getRandomFocusReminder = getRandomFocusReminder;
}