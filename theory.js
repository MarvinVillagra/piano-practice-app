// Piano Master - Music Theory Module
const theoryLessons = [
    {
        id: 'theory-1',
        title: 'Note Names & Staff',
        level: 'beginner',
        sections: [
            {
                title: 'The Musical Alphabet',
                content: 'Music uses the first 7 letters of the alphabet: A, B, C, D, E, F, G. After G, it starts over at A.',
                exercise: 'note-identification',
                questions: [
                    { type: 'show-note', note: 'C', question: 'What note is this?', answer: 'C', options: ['A', 'B', 'C', 'D'] },
                    { type: 'show-note', note: 'E', question: 'What note is this?', answer: 'E', options: ['D', 'E', 'F', 'G'] },
                    { type: 'show-note', note: 'G', question: 'What note is this?', answer: 'G', options: ['E', 'F', 'G', 'A'] },
                    { type: 'show-note', note: 'A', question: 'What note is this?', answer: 'A', options: ['F', 'G', 'A', 'B'] }
                ]
            },
            {
                title: 'Treble Clef Lines & Spaces',
                content: 'The treble clef (G clef) is used for right hand. Lines (bottom to top): E-G-B-D-F. Spaces: F-A-C-E.',
                exercise: 'staff-reading',
                questions: [
                    { staff: 'treble', position: 'line-1', answer: 'E', hint: 'Every Good Boy Does Fine' },
                    { staff: 'treble', position: 'space-1', answer: 'F', hint: 'FACE starts with F' },
                    { staff: 'treble', position: 'line-2', answer: 'G' },
                    { staff: 'treble', position: 'space-2', answer: 'A' }
                ]
            },
            {
                title: 'Bass Clef Lines & Spaces',
                content: 'The bass clef (F clef) is used for left hand. Lines: G-B-D-F-A. Spaces: A-C-E-G.',
                exercise: 'staff-reading',
                questions: [
                    { staff: 'bass', position: 'line-1', answer: 'G', hint: 'Good Boys Do Fine Always' },
                    { staff: 'bass', position: 'space-1', answer: 'A', hint: 'All Cows Eat Grass' },
                    { staff: 'bass', position: 'line-2', answer: 'B' },
                    { staff: 'bass', position: 'space-2', answer: 'C' }
                ]
            }
        ]
    },
    {
        id: 'theory-2',
        title: 'Intervals',
        level: 'beginner',
        sections: [
            {
                title: 'What is an Interval?',
                content: 'An interval is the distance between two notes. The smallest interval is a half step (semitone). Two half steps = whole step.',
                exercise: 'interval-basics',
                questions: [
                    { play: ['C', 'C#'], answer: 'half step', hint: 'C to C# is one semitone' },
                    { play: ['C', 'D'], answer: 'whole step', hint: 'C to D is two semitones' },
                    { play: ['E', 'F'], answer: 'half step', hint: 'E to F has no black key between' },
                    { play: ['F', 'G'], answer: 'whole step', hint: 'F to G has F# between' }
                ]
            },
            {
                title: 'Named Intervals',
                content: 'Common intervals: 2nd (C-D), 3rd (C-E), 4th (C-F), 5th (C-G), 6th (C-A), 7th (C-B), Octave (C-C).',
                exercise: 'interval-naming',
                questions: [
                    { notes: ['C', 'E'], answer: '3rd', options: ['2nd', '3rd', '4th', '5th'] },
                    { notes: ['C', 'G'], answer: '5th', options: ['4th', '5th', '6th', '7th'] },
                    { notes: ['C', 'C'], answer: 'octave', options: ['7th', 'octave', 'unison', '6th'] },
                    { notes: ['C', 'F'], answer: '4th', options: ['3rd', '4th', '5th', '2nd'] }
                ]
            }
        ]
    },
    {
        id: 'theory-3',
        title: 'Major Scales',
        level: 'beginner',
        sections: [
            {
                title: 'Scale Formula',
                content: 'Major scales follow: Whole-Whole-Half-Whole-Whole-Whole-Half (W-W-H-W-W-W-H). Try it starting on C!',
                exercise: 'scale-building',
                questions: [
                    { start: 'C', pattern: 'W-W-H-W-W-W-H', answer: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'] },
                    { question: 'What is the 3rd note of C major?', answer: 'E' },
                    { question: 'What is the 7th note of C major?', answer: 'B' },
                    { question: 'Which notes are a half step apart in C major?', answer: 'E-F and B-C' }
                ]
            },
            {
                title: 'Key Signatures',
                content: 'Sharp keys (G, D, A, E, B, F#, C#) add sharps. Flat keys (F, Bb, Eb, Ab, Db, Gb) add flats.',
                exercise: 'key-signatures',
                questions: [
                    { key: 'G major', answer: '1 sharp (F#)', options: ['No sharps', '1 sharp (F#)', '2 sharps', '3 sharps'] },
                    { key: 'D major', answer: '2 sharps (F#, C#)', options: ['1 sharp', '2 sharps (F#, C#)', '3 sharps', '4 sharps'] },
                    { key: 'F major', answer: '1 flat (Bb)', options: ['No flats', '1 flat (Bb)', '2 flats', '3 flats'] }
                ]
            }
        ]
    },
    {
        id: 'theory-4',
        title: 'Chords & Triads',
        level: 'intermediate',
        sections: [
            {
                title: 'What is a Chord?',
                content: 'A chord is 3+ notes played together. A triad has 3 notes: root, 3rd, 5th. Major triad = Root + Major 3rd + Perfect 5th.',
                exercise: 'chord-building',
                questions: [
                    { root: 'C', type: 'major', answer: ['C', 'E', 'G'], hint: 'C major = C-E-G' },
                    { root: 'G', type: 'major', answer: ['G', 'B', 'D'], hint: 'G major = G-B-D' },
                    { question: 'What notes are in A minor triad?', answer: 'A-C-E', options: ['A-B-E', 'A-C-E', 'A-D-E', 'A-C-D'] },
                    { question: 'What notes are in F major triad?', answer: 'F-A-C', options: ['F-G-C', 'F-A-C', 'F-Bb-C', 'F-G-A'] }
                ]
            },
            {
                title: 'Chord Inversions',
                content: 'Root position: Root-3rd-5th (C-E-G). First inversion: 3rd-5th-Root (E-G-C). Second inversion: 5th-Root-3rd (G-C-E).',
                exercise: 'inversions',
                questions: [
                    { notes: ['E', 'G', 'C'], answer: 'first inversion', chord: 'C major' },
                    { notes: ['G', 'C', 'E'], answer: 'second inversion', chord: 'C major' },
                    { notes: ['C', 'E', 'G'], answer: 'root position', chord: 'C major' }
                ]
            }
        ]
    },
    {
        id: 'theory-5',
        title: 'Rhythm & Time Signatures',
        level: 'beginner',
        sections: [
            {
                title: 'Note Values',
                content: 'Whole note = 4 beats, Half note = 2 beats, Quarter note = 1 beat, Eighth note = 0.5 beats.',
                exercise: 'note-values',
                questions: [
                    { question: 'How many quarter notes equal one whole note?', answer: '4' },
                    { question: 'How many eighth notes equal one quarter note?', answer: '2' },
                    { question: 'A half note plus a quarter note = how many beats?', answer: '3' },
                    { question: 'How many half notes equal a whole note?', answer: '2' }
                ]
            },
            {
                title: 'Time Signatures',
                content: 'Top number = beats per measure. Bottom number = note value of one beat. 4/4 = 4 quarter notes per measure.',
                exercise: 'time-signatures',
                questions: [
                    { signature: '3/4', question: 'How many beats per measure?', answer: '3' },
                    { signature: '6/8', question: 'What note gets one beat?', answer: 'eighth note' },
                    { signature: '2/4', question: 'How many quarter notes per measure?', answer: '2' },
                    { question: 'Waltz time is typically what time signature?', answer: '3/4' }
                ]
            }
        ]
    }
];

// Ear Training Module
const earTrainingExercises = {
    intervals: {
        beginner: [
            { name: 'Minor 2nd', example: 'Jaws theme', notes: ['C', 'C#'], description: 'The smallest interval, sounds tense' },
            { name: 'Major 2nd', example: 'Happy Birthday (first 2 notes)', notes: ['C', 'D'], description: 'Sounds like stepping up' },
            { name: 'Minor 3rd', example: 'Greensleeves', notes: ['C', 'Eb'], description: 'Melancholy, minor feel' },
            { name: 'Major 3rd', example: 'When the Saints Go Marching In', notes: ['C', 'E'], description: 'Happy, bright sound' }
        ],
        intermediate: [
            { name: 'Perfect 4th', example: 'Here Comes the Bride', notes: ['C', 'F'], description: 'Strong, resolved' },
            { name: 'Tritone', example: 'Maria (West Side Story)', notes: ['C', 'F#'], description: 'Dissonant, dramatic' },
            { name: 'Perfect 5th', example: 'Star Wars theme', notes: ['C', 'G'], description: 'Strong, powerful' },
            { name: 'Minor 6th', example: 'Black Orpheus', notes: ['C', 'Ab'], description: 'Exotic, mysterious' }
        ],
        advanced: [
            { name: 'Major 6th', example: 'My Bonnie Lies Over the Ocean', notes: ['C', 'A'], description: 'Bright, uplifting' },
            { name: 'Minor 7th', example: 'Star Trek theme', notes: ['C', 'Bb'], description: 'Complex, jazz' },
            { name: 'Major 7th', example: 'Take On Me', notes: ['C', 'B'], description: 'Dreamy, floating' },
            { name: 'Octave', example: 'Somewhere Over the Rainbow', notes: ['C', 'C\''], description: 'Same note, higher' }
        ]
    },
    chords: {
        beginner: [
            { name: 'Major', notes: ['C', 'E', 'G'], description: 'Happy, stable sound', symbol: 'C' },
            { name: 'Minor', notes: ['C', 'Eb', 'G'], description: 'Sad, emotional sound', symbol: 'Cm' }
        ],
        intermediate: [
            { name: 'Diminished', notes: ['C', 'Eb', 'Gb'], description: 'Tense, unstable', symbol: 'Cdim' },
            { name: 'Augmented', notes: ['C', 'E', 'G#'], description: 'Dreamy, unresolved', symbol: 'Caug' },
            { name: 'Sus2', notes: ['C', 'D', 'G'], description: 'Open, floating', symbol: 'Csus2' },
            { name: 'Sus4', notes: ['C', 'F', 'G'], description: 'Tense, wanting resolution', symbol: 'Csus4' }
        ],
        advanced: [
            { name: 'Major 7', notes: ['C', 'E', 'G', 'B'], description: 'Jazzy, sophisticated', symbol: 'Cmaj7' },
            { name: 'Dominant 7', notes: ['C', 'E', 'G', 'Bb'], description: 'Bluesy, wanting to resolve', symbol: 'C7' },
            { name: 'Minor 7', notes: ['C', 'Eb', 'G', 'Bb'], description: 'Smooth, R&B', symbol: 'Cm7' }
        ]
    },
    rhythm: [
        { pattern: 'quarter-quarter-quarter-quarter', beats: 4, description: 'Basic 4/4' },
        { pattern: 'quarter-quarter-half', beats: 4, description: 'Half notes' },
        { pattern: 'eighth-eighth-quarter-half', beats: 4, description: 'Eighth notes' },
        { pattern: 'dotted-quarter-eighth-half', beats: 4, description: 'Dotted rhythm' },
        { pattern: 'triplet-triplet-triplet-triplet', beats: 4, description: 'Triplets' },
        { pattern: 'syncopation', beats: 4, description: 'Off-beat accents' }
    ]
};

// Sight Reading Module
const sightReadingExercises = {
    treble: {
        beginner: [
            { notes: ['C4', 'D4', 'E4', 'F4'], rhythm: ['q', 'q', 'q', 'q'], timeSignature: '4/4' },
            { notes: ['E4', 'F4', 'G4', 'A4'], rhythm: ['q', 'q', 'q', 'q'], timeSignature: '4/4' },
            { notes: ['C4', 'E4', 'G4', 'E4'], rhythm: ['h', 'h'], timeSignature: '4/4' },
            { notes: ['G4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'], rhythm: ['q', 'q', 'q', 'q', 'q', 'q', 'h'], timeSignature: '4/4' }
        ],
        intermediate: [
            { notes: ['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4'], rhythm: ['q', 'q', 'q', 'h', 'q', 'q', 'h'], timeSignature: '4/4' },
            { notes: ['D4', 'F4', 'A4', 'G4', 'F4', 'E4', 'D4'], rhythm: ['e', 'e', 'q', 'q', 'e', 'e', 'h'], timeSignature: '4/4' }
        ]
    },
    bass: {
        beginner: [
            { notes: ['C3', 'B2', 'A2', 'G2'], rhythm: ['q', 'q', 'q', 'q'], timeSignature: '4/4' },
            { notes: ['C3', 'E3', 'G3', 'E3'], rhythm: ['h', 'h'], timeSignature: '4/4' }
        ]
    },
    grand: {
        intermediate: [
            { 
                rightHand: { notes: ['C5', 'D5', 'E5', 'F5'], rhythm: ['q', 'q', 'q', 'q'] },
                leftHand: { notes: ['C3', 'G3', 'C3', 'G3'], rhythm: ['h', 'h'] },
                timeSignature: '4/4'
            }
        ]
    }
};

// Metronome Module
class Metronome {
    constructor() {
        this.bpm = 60;
        this.beatsPerMeasure = 4;
        this.currentBeat = 0;
        this.isPlaying = false;
        this.interval = null;
        this.audioContext = null;
    }

    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    click() {
        if (!this.audioContext) this.init();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // First beat is accented
        const frequency = this.currentBeat === 0 ? 1000 : 800;
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.currentBeat = 0;
        this.click();
        this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
        
        this.interval = setInterval(() => {
            this.click();
            this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
        }, 60000 / this.bpm);
    }

    stop() {
        this.isPlaying = false;
        if (this.interval) clearInterval(this.interval);
    }

    setBPM(newBPM) {
        this.bpm = Math.max(20, Math.min(300, newBPM));
        if (this.isPlaying) {
            this.stop();
            this.start();
        }
    }

    setBeatsPerMeasure(beats) {
        this.beatsPerMeasure = Math.max(1, Math.min(12, beats));
    }
}

// Practice Planner Module
const practicePlanner = {
    goals: [
        { id: 'scales', name: 'Scales & Arpeggios', recommended: 10, category: 'technique' },
        { id: 'sight-reading', name: 'Sight Reading', recommended: 5, category: 'reading' },
        { id: 'ear-training', name: 'Ear Training', recommended: 5, category: 'musicianship' },
        { id: 'theory', name: 'Music Theory', recommended: 5, category: 'knowledge' },
        { id: 'repertoire', name: 'Repertoire (Songs)', recommended: 15, category: 'performance' },
        { id: 'improvisation', name: 'Improvisation', recommended: 5, category: 'creativity' }
    ],
    
    createSession(duration = 30, focus = 'balanced') {
        const plans = {
            balanced: { technique: 0.25, reading: 0.15, musicianship: 0.15, knowledge: 0.1, performance: 0.25, creativity: 0.1 },
            technique: { technique: 0.4, reading: 0.1, musicianship: 0.1, knowledge: 0.05, performance: 0.3, creativity: 0.05 },
            repertoire: { technique: 0.15, reading: 0.1, musicianship: 0.1, knowledge: 0.05, performance: 0.5, creativity: 0.1 },
            beginners: { technique: 0.3, reading: 0.2, musicianship: 0.15, knowledge: 0.15, performance: 0.15, creativity: 0.05 }
        };
        
        const plan = plans[focus] || plans.balanced;
        const session = [];
        
        this.goals.forEach(goal => {
            const minutes = Math.round(duration * plan[goal.category]);
            if (minutes > 0) {
                session.push({
                    ...goal,
                    minutes,
                    exercises: this.getExercisesForGoal(goal.id, minutes)
                });
            }
        });
        
        return session;
    },
    
    getExercisesForGoal(goalId, minutes) {
        const exercises = {
            scales: ['Major scales (2 octaves)', 'Minor scales', 'Arpeggios', 'Chromatic scale'],
            'sight-reading': ['New piece at sight', 'Rhythm reading', 'Note identification'],
            'ear-training': ['Interval recognition', 'Chord identification', 'Melodic dictation'],
            theory: ['Key signatures', 'Chord progressions', 'Music analysis'],
            repertoire: ['Review learned pieces', 'New piece section', 'Memorization'],
            improvisation: ['Scale improvisation', 'Chord voicing exploration', 'Style imitation']
        };
        return exercises[goalId] || [];
    }
};

// Achievement System
const achievements = [
    { id: 'first-practice', name: 'First Steps', description: 'Complete your first practice session', icon: '🌱', unlocked: false },
    { id: 'week-streak', name: 'Week Warrior', description: 'Practice 7 days in a row', icon: '🔥', unlocked: false },
    { id: 'month-streak', name: 'Month Master', description: 'Practice 30 days in a row', icon: '🏆', unlocked: false },
    { id: 'scale-master', name: 'Scale Master', description: 'Learn all 12 major scales', icon: '🎼', unlocked: false },
    { id: 'chord-champ', name: 'Chord Champion', description: 'Learn 20 different chords', icon: '🎹', unlocked: false },
    { id: 'sight-reader', name: 'Sight Reader', description: 'Complete 50 sight reading exercises', icon: '📖', unlocked: false },
    { id: 'ear-trained', name: 'Golden Ears', description: 'Correctly identify 100 intervals', icon: '👂', unlocked: false },
    { id: 'song-scholar', name: 'Song Scholar', description: 'Learn 10 songs', icon: '🎵', unlocked: false },
    { id: 'theory-guru', name: 'Theory Guru', description: 'Complete all theory lessons', icon: '📚', unlocked: false },
    { id: 'hours-10', name: 'Dedicated', description: 'Practice for 10 total hours', icon: '⏰', unlocked: false },
    { id: 'hours-50', name: 'Committed', description: 'Practice for 50 total hours', icon: '💪', unlocked: false },
    { id: 'hours-100', name: 'Devoted', description: 'Practice for 100 total hours', icon: '🌟', unlocked: false }
];

function checkAchievements(state) {
    const newAchievements = [];
    const unlockedIds = JSON.parse(localStorage.getItem('achievements') || '[]');
    
    // First practice
    if (state.practiceLog.length >= 1 && !unlockedIds.includes('first-practice')) {
        newAchievements.push('first-practice');
    }
    
    // Streaks
    if (state.streak >= 7 && !unlockedIds.includes('week-streak')) {
        newAchievements.push('week-streak');
    }
    if (state.streak >= 30 && !unlockedIds.includes('month-streak')) {
        newAchievements.push('month-streak');
    }
    
    // Scales
    if (state.learnedScales.length >= 12 && !unlockedIds.includes('scale-master')) {
        newAchievements.push('scale-master');
    }
    
    // Songs
    if (state.learnedSongs.length >= 10 && !unlockedIds.includes('song-scholar')) {
        newAchievements.push('song-scholar');
    }
    
    // Practice time
    const totalMinutes = state.practiceLog.reduce((acc, e) => acc + (e.duration || 5), 0);
    if (totalMinutes >= 600 && !unlockedIds.includes('hours-10')) {
        newAchievements.push('hours-10');
    }
    if (totalMinutes >= 3000 && !unlockedIds.includes('hours-50')) {
        newAchievements.push('hours-50');
    }
    if (totalMinutes >= 6000 && !unlockedIds.includes('hours-100')) {
        newAchievements.push('hours-100');
    }
    
    // Save new achievements
    newAchievements.forEach(id => unlockedIds.push(id));
    localStorage.setItem('achievements', JSON.stringify(unlockedIds));
    
    return newAchievements;
}

// Export for use in main app
if (typeof window !== 'undefined') {
    window.theoryLessons = theoryLessons;
    window.earTrainingExercises = earTrainingExercises;
    window.sightReadingExercises = sightReadingExercises;
    window.Metronome = Metronome;
    window.practicePlanner = practicePlanner;
    window.achievements = achievements;
    window.checkAchievements = checkAchievements;
} =