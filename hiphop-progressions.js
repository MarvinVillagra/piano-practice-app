// Piano Master - Hip-Hop & Trap Chord Progressions

const hipHopProgressions = {
    // Dark Trap Progressions
    darkTrap: [
        {
            name: 'Dark Minor',
            progression: ['i', 'VI', 'v', 'i'],
            key: 'C minor',
            mood: 'Aggressive, dark',
            examples: ['Modern trap beats', 'Drill'],
            difficulty: 2,
            bpm: 140
        },
        {
            name: 'Phrygian Dark',
            progression: ['i', 'bII', 'v', 'i'],
            key: 'E minor (F chord)',
            mood: 'Exotic, mysterious',
            examples: ['Travis Scott type beats'],
            difficulty: 3,
            bpm: 130
        },
        {
            name: '1-4 Trap',
            progression: ['i', 'iv'],
            key: 'Any minor',
            mood: 'Classic trap vibe',
            examples: ['Future, 21 Savage'],
            difficulty: 1,
            bpm: 140
        }
    ],
    
    // Soulful Hip-Hop
    soulful: [
        {
            name: 'Neo-Soul II-V-I',
            progression: ['ii7', 'V9', 'Imaj9'],
            key: 'C major',
            mood: 'Smooth, jazzy',
            examples: ['J Dilla, Nujabes style'],
            difficulty: 4,
            bpm: 90
        },
        {
            name: 'Pierre Bourne Progression',
            progression: ['I', '#I', 'I', '#I'],
            key: 'Any major',
            mood: 'Neo-soul feel',
            examples: ['Playboi Carti - Magnolia'],
            difficulty: 2,
            bpm: 140,
            technique: 'Play chord, then chord a semitone higher'
        },
        {
            name: 'Drake Progression',
            progression: ['vi', 'IV', 'I', 'V'],
            key: 'C major',
            mood: 'Melancholic, reflective',
            examples: ['God\'s Plan, In My Feelings'],
            difficulty: 2,
            bpm: 90
        }
    ],
    
    // Modern Hip-Hop
    modern: [
        {
            name: 'I-V-vi-IV',
            progression: ['I', 'V', 'vi', 'IV'],
            key: 'Any major',
            mood: 'Pop-rap, catchy',
            examples: ['Used in 1000+ songs'],
            difficulty: 1,
            bpm: 120
        },
        {
            name: 'Kendrick Progression',
            progression: ['i'],
            key: 'Eb minor',
            mood: 'Minimal, powerful',
            examples: ['HUMBLE. - single chord'],
            difficulty: 1,
            bpm: 150,
            technique: 'Focus on rhythm and bass'
        },
        {
            name: 'Kanye Progression',
            progression: ['iii', 'IV', 'IV', 'vi'],
            key: 'C major',
            mood: 'Rich, soulful',
            examples: ['Devil In A New Dress'],
            difficulty: 3,
            bpm: 85
        }
    ],
    
    // R&B Progressions
    rnb: [
        {
            name: 'Classic R&B',
            progression: ['i', 'v', 'VII', 'V'],
            key: 'A minor',
            mood: 'Nostalgic, laid-back',
            examples: ['Classic soul samples'],
            difficulty: 2,
            bpm: 80
        },
        {
            name: 'Modern R&B',
            progression: ['Imaj9', 'vi7', 'ii7', 'V7'],
            key: 'C major',
            mood: 'Smooth, romantic',
            examples: ['SZA, H.E.R. style'],
            difficulty: 4,
            bpm: 85
        }
    ],
    
    // Trap Melodies
    trap: [
        {
            name: 'Aggressive Trap',
            progression: ['1', 'sus2', '4', 'sus2'],
            key: 'E minor',
            mood: 'Dark, aggressive',
            examples: ['Hard trap beats'],
            difficulty: 2,
            bpm: 140
        },
        {
            name: 'Melodic Trap',
            progression: ['i', 'VI', 'iv', 'VI'],
            key: 'D minor',
            mood: 'Emotional, melodic',
            examples: ['Lil Uzi, XXXTentacion'],
            difficulty: 2,
            bpm: 140
        },
        {
            name: 'Zaytoven Style',
            progression: ['i7', 'iv7', 'i7', 'V7'],
            key: 'C minor',
            mood: 'Bluesy, trappy',
            examples: ['Future, Gucci Mane'],
            difficulty: 3,
            bpm: 140
        }
    ]
};

// Genre-based production tips
const productionTips = {
    trap: {
        tempo: '130-150 BPM',
        kicks: '808 kicks with long decay',
        hihats: 'Fast rolls (1/32 notes)',
        chords: 'Minimal, dark progressions',
        melody: 'Simple, repetitive, catchy'
    },
    lofi: {
        tempo: '70-90 BPM',
        kicks: 'Soft, dusty samples',
        hihats: 'Swing feel, relaxed',
        chords: '7th and 9th chords',
        melody: 'Imperfect, nostalgic'
    },
    drill: {
        tempo: '140 BPM',
        kicks: 'Heavy 808 slides',
        hihats: 'Triplets',
        chords: 'Dark minor progressions',
        melody: 'Slide 808s, haunting leads'
    },
    boombap: {
        tempo: '90-95 BPM',
        kicks: 'Punchy, vinyl samples',
        hihats: 'Simple, groovy',
        chords: 'Jazz samples, 7ths',
        melody: 'Sample-based loops'
    }
};

// Famous sample progressions
const famousSamples = [
    {
        song: 'Juicy - Notorious B.I.G.',
        sample: 'Juicy Fruit - Mtume',
        progression: ['Gmaj7', 'F#m7', 'Em7', 'A7'],
        key: 'G major',
        notes: 'Classic smooth R&B progression'
    },
    {
        song: 'Jesus Walks - Kanye West',
        sample: 'Walk With Me - ARC Choir',
        progression: ['Am', 'F', 'C', 'G'],
        key: 'A minor',
        notes: 'Gospel-inspired progression'
    },
    {
        song: 'Stan - Eminem',
        sample: 'Thank You - Dido',
        progression: ['Am', 'F', 'C', 'G'],
        key: 'A minor',
        notes: 'Emotional, haunting'
    }
];

// Export
if (typeof window !== 'undefined') {
    window.hipHopProgressions = hipHopProgressions;
    window.productionTips = productionTips;
    window.famousSamples = famousSamples;
}
