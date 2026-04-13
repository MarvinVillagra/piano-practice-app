// Piano Master - Advanced Theory Module
// Features from Eli Brown's Piano Outline 101

// ============== CIRCLE OF FIFTHS ==============
const circleOfFifths = {
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor:  ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'eb', 'bb', 'f', 'c',  'g',  'd'],
    sharps: [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
    flats:  [0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 4, 3, 2, 1]
};

// Chord types for each key
const chordTypes = {
    major: '',
    dominant: '7',
    minor: 'm',
    'half-diminished': 'm7b5',
    diminished: 'dim'
};

// Genre-Scale relationships
const genreScales = {
    'Travis Scott': {
        scales: ['Harmonic Minor', 'Phrygian Dominant'],
        description: 'Dark, moody, cinematic vibes',
        chords: ['Minor', 'Diminished', 'Suspended'],
        exampleSongs: ['The Knowing', 'Nightcrawler']
    },
    'Pierre Bourne': {
        scales: ['Major', 'Minor'],
        description: 'Neo-soul style - chords a half step above',
        technique: 'Play chord, then chord a semitone higher',
        exampleSongs: ['Magnolia', 'Yo Pierre']
    },
    'Zaytoven': {
        scales: ['Blues', 'Minor Pentatonic'],
        description: 'Trap piano, bluesy feel',
        technique: 'Blue notes, trills',
        exampleSongs: ['Versace', 'I Get the Bag']
    },
    'Metro Boomin': {
        scales: ['Minor', 'Phrygian'],
        description: 'Dark, spacey, ambient',
        technique: 'Sparse voicings, reverb',
        exampleSongs: ['No Heart', 'Mask Off']
    },
    'Pop/R&B': {
        scales: ['Major', 'Minor', 'Mixolydian'],
        description: 'Catchy, melodic progressions',
        chords: ['I-V-vi-IV', 'ii-V-I'],
        exampleSongs: ['Let It Be', 'Someone Like You']
    },
    'Jazz': {
        scales: ['Major', 'Minor', 'Diminished', 'Whole Tone'],
        description: 'Complex harmonies, ii-V-I progressions',
        technique: 'Extended chords (9ths, 11ths, 13ths)',
        exampleSongs: ['Autumn Leaves', 'Blue Bossa']
    }
};

// Extended chord structures
const extendedChords = {
    major7: { intervals: [0, 4, 7, 11], quality: 'maj7', mood: 'dreamy, resolved' },
    dominant7: { intervals: [0, 4, 7, 10], quality: '7', mood: 'tension, transition' },
    minor7: { intervals: [0, 3, 7, 10], quality: 'm7', mood: 'melancholic, soulful' },
    minor9: { intervals: [0, 3, 7, 10, 14], quality: 'm9', mood: 'sophisticated, jazzy' },
    major9: { intervals: [0, 4, 7, 11, 14], quality: 'maj9', mood: 'lush, colorful' },
    dominant9: { intervals: [0, 4, 7, 10, 14], quality: '9', mood: 'funky, bluesy' },
    minor11: { intervals: [0, 3, 7, 10, 14, 17], quality: 'm11', mood: 'complex, modern' },
    'half-diminished': { intervals: [0, 3, 6, 10], quality: 'm7b5', mood: 'mysterious, tense' },
    diminished7: { intervals: [0, 3, 6, 9], quality: 'dim7', mood: 'unstable, dramatic' }
};

// Weekly scale challenge
const weeklyScaleChallenges = [
    { week: 1, key: 'C', type: 'major', focus: 'White keys only, learn the pattern WWHWWWH', goal: 'Play hands together, ascending and descending' },
    { week: 2, key: 'G', type: 'major', focus: 'One sharp (F#), same fingering as C', goal: 'Play with metronome at 80 BPM' },
    { week: 3, key: 'D', type: 'major', focus: 'Two sharps (F#, C#)', goal: 'Play 2 octaves hands together' },
    { week: 4, key: 'A', type: 'major', focus: 'Three sharps, relative minor: F# minor', goal: 'Improvise a simple melody' },
    { week: 5, key: 'E', type: 'major', focus: 'Four sharps, shifted fingering', goal: 'Play along with a backing track' },
    { week: 6, key: 'B', type: 'major', focus: 'Five sharps, mostly black keys', goal: 'Learn the dominant 7th chord' },
    { week: 7, key: 'F#', type: 'major', focus: 'Six sharps, tricky fingering', goal: 'Write a chord progression' },
    { week: 8, key: 'F', type: 'major', focus: 'One flat (Bb), unique RH fingering', goal: 'Play with eyes closed' },
    { week: 9, key: 'Bb', type: 'major', focus: 'Two flats, starts with finger 2 on RH', goal: 'Play contrary motion (hands opposite directions)' },
    { week: 10, key: 'Eb', type: 'major', focus: 'Three flats', goal: 'Play all five chord qualities (maj, dom, min, m7b5, dim)' },
    { week: 11, key: 'Ab', type: 'major', focus: 'Four flats', goal: 'Learn the relative minor (F minor)' },
    { week: 12, key: 'Db', type: 'major', focus: 'Five flats, enharmonic with C#', goal: 'Master the circle of fifths position' }
];

// Daily practice routine structure
const dailyPracticeRoutines = {
    beginner: {
        warmup: { duration: 2, exercise: 'Five-finger patterns, hand independence' },
        scales: { duration: 5, exercise: 'Current week scale - straight up and down' },
        chords: { duration: 3, exercise: 'I-IV-V-I progression in current key' },
        play: { duration: 5, exercise: 'Play along with favorite song OR improvise' },
        total: 15
    },
    intermediate: {
        warmup: { duration: 5, exercise: 'Hanon exercises, finger independence' },
        scales: { duration: 10, exercise: 'Two octaves, different articulations' },
        chords: { duration: 5, exercise: 'All 5 qualities around circle of fifths' },
        progressions: { duration: 5, exercise: 'Circle of fifths progression' },
        play: { duration: 10, exercise: 'Learn song by ear OR create melody' },
        total: 35
    },
    advanced: {
        warmup: { duration: 10, exercise: 'Complex finger patterns, trills' },
        scales: { duration: 10, exercise: 'All 12 major + minor, 4 octaves' },
        extended_chords: { duration: 10, exercise: '7ths, 9ths, 11ths, 13ths' },
        circle: { duration: 10, exercise: 'Circle of fifths, all qualities' },
        genre: { duration: 10, exercise: 'Practice genre-specific patterns' },
        play: { duration: 15, exercise: 'Full composition work' },
        total: 65
    }
};

// Finger technique reminders
const techniqueTips = {
    posture: 'Sit with straight back, shoulders relaxed, elbows slightly away from body',
    hand_shape: 'Hold hands like holding a tennis ball - curved, springy fingers',
    finger_tips: 'Play on finger tips, not finger pads',
    wrist: 'Keep wrist level, not too high or too low',
    shoulder: 'Keep shoulders relaxed, avoid tension',
    thumb: 'Thumb is relatively straight compared to curved fingers',
    independence: 'Practice lifting each finger independently while others stay down'
};

// Relative minor finder
const relativeMinors = {
    'C': 'A', 'G': 'E', 'D': 'B', 'A': 'F#', 'E': 'C#', 'B': 'G#', 'F#': 'D#',
    'Gb': 'Eb', 'Db': 'Bb', 'Ab': 'F', 'Eb': 'C', 'Bb': 'G', 'F': 'D'
};

const relativeMajors = Object.fromEntries(
    Object.entries(relativeMinors).map(([k, v]) => [v.toLowerCase(), k])
);

function getRelativeMinor(majorKey) {
    return relativeMinors[majorKey];
}

function getRelativeMajor(minorKey) {
    return relativeMajors[minorKey.toLowerCase()];
}

// Export
if (typeof window !== 'undefined') {
    window.circleOfFifths = circleOfFifths;
    window.genreScales = genreScales;
    window.extendedChords = extendedChords;
    window.weeklyScaleChallenges = weeklyScaleChallenges;
    window.dailyPracticeRoutines = dailyPracticeRoutines;
    window.techniqueTips = techniqueTips;
    window.getRelativeMinor = getRelativeMinor;
    window.getRelativeMajor = getRelativeMajor;
    window.chordTypes = chordTypes;
}
