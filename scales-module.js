// Piano Master - Complete Scale Learning Module
// All 12 major scales and 12 minor scales with proper fingering

const completeScaleLibrary = {
    major: {
        'C': {
            notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            sharps: [],
            flats: [],
            difficulty: 1,
            tips: 'No sharps or flats. The easiest scale - start here!',
            patterns: ['straight', 'legato', 'staccato', 'forte-piano'],
            chords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']
        },
        'G': {
            notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            sharps: ['F#'],
            flats: [],
            difficulty: 1,
            tips: 'One sharp: F#. Remember the black key between F and G.',
            patterns: ['straight', 'legato', 'staccato'],
            chords: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim']
        },
        'D': {
            notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            sharps: ['F#', 'C#'],
            flats: [],
            difficulty: 2,
            tips: 'Two sharps: F# and C#. Thumb goes on D and G.',
            patterns: ['straight', 'legato', 'staccato'],
            chords: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim']
        },
        'A': {
            notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            sharps: ['F#', 'C#', 'G#'],
            flats: [],
            difficulty: 2,
            tips: 'Three sharps. Finger 3 on C# and G#.',
            patterns: ['straight', 'legato', 'staccato'],
            chords: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim']
        },
        'E': {
            notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            sharps: ['F#', 'C#', 'G#', 'D#'],
            flats: [],
            difficulty: 3,
            tips: 'Four sharps. Start with finger 2 on E for right hand.',
            patterns: ['straight', 'legato'],
            chords: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim']
        },
        'B': {
            notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            sharps: ['F#', 'C#', 'G#', 'D#', 'A#'],
            flats: [],
            difficulty: 3,
            tips: 'Five sharps. Many black keys - keep fingers close.',
            patterns: ['straight', 'legato'],
            chords: ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim']
        },
        'F#': {
            notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#'],
            fingering: { right: '2-3-1-2-3-4-1-2', left: '4-3-2-1-3-2-1-2' },
            sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
            flats: [],
            difficulty: 4,
            tips: 'Six sharps. E# is F natural! Tricky fingering.',
            patterns: ['straight'],
            chords: ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim']
        },
        'C#': {
            notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#'],
            fingering: { right: '2-3-1-2-3-4-1-2', left: '3-2-1-4-3-2-1-3' },
            sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'],
            flats: [],
            difficulty: 4,
            tips: 'Seven sharps. B# is C natural! Consider learning Db instead.',
            patterns: ['straight'],
            chords: ['C#', 'D#m', 'E#m', 'F#', 'G#', 'A#m', 'B#dim']
        },
        'F': {
            notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
            fingering: { right: '1-2-3-4-1-2-3-4', left: '5-4-3-2-1-3-2-1' },
            sharps: [],
            flats: ['Bb'],
            difficulty: 2,
            tips: 'One flat: Bb. Right hand has unique fingering (4 on Bb)!',
            patterns: ['straight', 'legato', 'staccato'],
            chords: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim']
        },
        'Bb': {
            notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
            fingering: { right: '2-1-2-1-2-3-1-2', left: '3-2-1-4-3-2-1-3' },
            sharps: [],
            flats: ['Bb', 'Eb'],
            difficulty: 3,
            tips: 'Two flats. Right hand starts with finger 2 on Bb.',
            patterns: ['straight', 'legato'],
            chords: ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim']
        },
        'Eb': {
            notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
            fingering: { right: '2-1-2-3-4-1-2-3', left: '3-2-1-4-3-2-1-2' },
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab'],
            difficulty: 3,
            tips: 'Three flats. Thumb passes on F and C.',
            patterns: ['straight', 'legato'],
            chords: ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim']
        },
        'Ab': {
            notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab'],
            fingering: { right: '3-2-1-2-3-1-2-3', left: '3-2-1-4-3-2-1-3' },
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab', 'Db'],
            difficulty: 4,
            tips: 'Four flats. Right hand starts with finger 3 on Ab.',
            patterns: ['straight', 'legato'],
            chords: ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim']
        },
        'Db': {
            notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'],
            fingering: { right: '2-3-1-2-3-4-1-2', left: '3-2-1-4-3-2-1-3' },
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
            difficulty: 4,
            tips: 'Five flats. Easier than C#! Same notes, different notation.',
            patterns: ['straight'],
            chords: ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim']
        },
        'Gb': {
            notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb'],
            fingering: { right: '2-3-4-1-2-3-1-2', left: '4-3-2-1-3-2-1-2' },
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'],
            difficulty: 5,
            tips: 'Six flats. Cb is B natural! Consider learning F# instead.',
            patterns: ['straight'],
            chords: ['Gb', 'Abm', 'Bbm', 'Cb', 'Db', 'Ebm', 'Fdim']
        }
    },
    
    minor: {
        'A': {
            notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'C major',
            sharps: [],
            flats: [],
            difficulty: 1,
            tips: 'A minor = C major with same key signature. No sharps or flats.',
            chords: ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G']
        },
        'E': {
            notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D', 'E'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'G major',
            sharps: ['F#'],
            flats: [],
            difficulty: 1,
            tips: 'E minor = G major. One sharp: F#.',
            chords: ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D']
        },
        'B': {
            notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A', 'B'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'D major',
            sharps: ['F#', 'C#'],
            flats: [],
            difficulty: 2,
            tips: 'B minor = D major. Two sharps.',
            chords: ['Bm', 'C#dim', 'D', 'Em', 'F#m', 'G', 'A']
        },
        'F#': {
            notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E', 'F#'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'A major',
            sharps: ['F#', 'C#', 'G#'],
            flats: [],
            difficulty: 2,
            tips: 'F# minor = A major. Three sharps.',
            chords: ['F#m', 'G#dim', 'A', 'Bm', 'C#m', 'D', 'E']
        },
        'C#': {
            notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B', 'C#'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'E major',
            sharps: ['F#', 'C#', 'G#', 'D#'],
            flats: [],
            difficulty: 3,
            tips: 'C# minor = E major. Four sharps.',
            chords: ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B']
        },
        'G#': {
            notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'B major',
            sharps: ['F#', 'C#', 'G#', 'D#', 'A#'],
            flats: [],
            difficulty: 4,
            tips: 'G# minor = B major. Five sharps. Consider Ab minor instead.',
            chords: ['G#m', 'A#dim', 'B', 'C#m', 'D#m', 'E', 'F#']
        },
        'D#': {
            notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#', 'D#'],
            fingering: { right: '2-1-2-3-1-2-3-4', left: '3-2-1-4-3-2-1-2' },
            relative: 'F# major',
            sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
            flats: [],
            difficulty: 5,
            tips: 'D# minor = F# major. Six sharps. Consider Eb minor.',
            chords: ['D#m', 'E#dim', 'F#', 'G#m', 'A#m', 'B', 'C#']
        },
        'D': {
            notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C', 'D'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'F major',
            sharps: [],
            flats: ['Bb'],
            difficulty: 2,
            tips: 'D minor = F major. One flat: Bb.',
            chords: ['Dm', 'Edim', 'F', 'Gm', 'Am', 'Bb', 'C']
        },
        'G': {
            notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'Bb major',
            sharps: [],
            flats: ['Bb', 'Eb'],
            difficulty: 2,
            tips: 'G minor = Bb major. Two flats.',
            chords: ['Gm', 'Adim', 'Bb', 'Cm', 'Dm', 'Eb', 'F']
        },
        'C': {
            notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
            fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' },
            relative: 'Eb major',
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab'],
            difficulty: 3,
            tips: 'C minor = Eb major. Three flats.',
            chords: ['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb']
        },
        'F': {
            notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F'],
            fingering: { right: '1-2-3-4-1-2-3-4', left: '5-4-3-2-1-3-2-1' },
            relative: 'Ab major',
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab', 'Db'],
            difficulty: 3,
            tips: 'F minor = Ab major. Four flats.',
            chords: ['Fm', 'Gdim', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb']
        },
        'Bb': {
            notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'],
            fingering: { right: '2-1-2-3-1-2-3-1', left: '3-2-1-4-3-2-1-2' },
            relative: 'Db major',
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
            difficulty: 4,
            tips: 'Bb minor = Db major. Five flats.',
            chords: ['Bbm', 'Cdim', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab']
        },
        'Eb': {
            notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb'],
            fingering: { right: '2-1-2-3-4-1-2-3', left: '3-2-1-4-3-2-1-3' },
            relative: 'Gb major',
            sharps: [],
            flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'],
            difficulty: 5,
            tips: 'Eb minor = Gb major. Six flats. Consider D# minor.',
            chords: ['Ebm', 'Fdim', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db']
        }
    }
};

// Scale learning progression
const scaleLearningPath = {
    // Recommended order to learn scales
    beginner: ['C major', 'G major', 'A minor', 'E minor', 'F major', 'D minor'],
    intermediate: ['D major', 'B minor', 'Eb major', 'C minor', 'Ab major', 'F minor', 'A major', 'F# minor'],
    advanced: ['E major', 'C# minor', 'Bb major', 'G minor', 'B major', 'G# minor', 'E major', 'C# minor'],
    expert: ['F# major', 'D# minor', 'C# major', 'A# minor', 'Db major', 'Bb minor', 'Gb major', 'Eb minor']
};

// Scale practice exercises
const scaleExercises = [
    {
        id: 'straight',
        name: 'Straight Up & Down',
        description: 'Play the scale ascending and descending, one octave',
        tempo: 60,
        focus: 'Finger placement and timing'
    },
    {
        id: 'legato',
        name: 'Legato (Smooth)',
        description: 'Connect all notes smoothly, no gaps',
        tempo: 60,
        focus: 'Smooth transitions between fingers'
    },
    {
        id: 'staccato',
        name: 'Staccato (Short)',
        description: 'Play each note short and detached',
        tempo: 60,
        focus: 'Finger bounce and precision'
    },
    {
        id: 'two-octaves',
        name: 'Two Octaves',
        description: 'Expand to two octaves, practice thumb turns',
        tempo: 70,
        focus: 'Thumb under technique'
    },
    {
        id: 'thirds',
        name: 'Thirds',
        description: 'Play in thirds: C-E, D-F, E-G, etc.',
        tempo: 65,
        focus: 'Interval spacing'
    },
    {
        id: 'sixths',
        name: 'Sixths',
        description: 'Play in sixths: C-A, D-B, E-C, etc.',
        tempo: 65,
        focus: 'Wider hand position'
    },
    {
        id: 'contrary',
        name: 'Contrary Motion',
        description: 'Hands move in opposite directions from same starting note',
        tempo: 55,
        focus: 'Hand independence'
    },
    {
        id: 'dynamic',
        name: 'Dynamic Changes',
        description: 'Crescendo ascending, diminuendo descending',
        tempo: 60,
        focus: 'Volume control'
    },
    {
        id: 'rhythm-variations',
        name: 'Rhythm Variations',
        description: 'Dotted rhythm: long-short, short-long',
        tempo: 70,
        focus: 'Rhythmic precision'
    },
    {
        id: 'accent-variations',
        name: 'Accent Variations',
        description: 'Accent every 2nd, 3rd, or 4th note',
        tempo: 65,
        focus: 'Control and evenness'
    }
];

// Scale mastery tracking
class ScaleMastery {
    constructor() {
        this.scales = completeScaleLibrary;
        this.exercises = scaleExercises;
        this.learningPath = scaleLearningPath;
    }

    getScale(key, type = 'major') {
        return this.scales[type]?.[key];
    }

    getAllScales(type = 'major') {
        return Object.entries(this.scales[type] || {}).map(([key, data]) => ({
            key,
            type,
            ...data
        }));
    }

    getRecommendedScales(level) {
        return this.learningPath[level] || [];
    }

    getNextScale(learned) {
        for (const level of ['beginner', 'intermediate', 'advanced', 'expert']) {
            for (const scale of this.learningPath[level]) {
                const [key, type] = scale.split(' ');
                const scaleKey = `${key}-${type}`;
                if (!learned.includes(scaleKey)) {
                    return { key, type: type || 'major', level };
                }
            }
        }
        return null;
    }

    getExercise(exerciseId) {
        return this.exercises.find(e => e.id === exerciseId);
    }

    // Calculate mastery percentage for a scale
    calculateMastery(scaleProgress) {
        const requiredExercises = ['straight', 'legato', 'two-octaves'];
        const completed = requiredExercises.filter(e => scaleProgress[e]?.completed);
        return (completed.length / requiredExercises.length) * 100;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.completeScaleLibrary = completeScaleLibrary;
    window.scaleLearningPath = scaleLearningPath;
    window.scaleExercises = scaleExercises;
    window.ScaleMastery = ScaleMastery;
}
