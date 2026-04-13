// Piano Master - Music Theory Reference & Hand Position Guide

const MusicTheoryReference = {
    // Key signatures
    keySignatures: {
        'C major / A minor': { sharps: [], flats: [], fifths: 0 },
        'G major / E minor': { sharps: ['F#'], flats: [], fifths: 1 },
        'D major / B minor': { sharps: ['F#', 'C#'], flats: [], fifths: 2 },
        'A major / F# minor': { sharps: ['F#', 'C#', 'G#'], flats: [], fifths: 3 },
        'E major / C# minor': { sharps: ['F#', 'C#', 'G#', 'D#'], flats: [], fifths: 4 },
        'B major / G# minor': { sharps: ['F#', 'C#', 'G#', 'D#', 'A#'], flats: [], fifths: 5 },
        'F# major / D# minor': { sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'], flats: [], fifths: 6 },
        'C# major / A# minor': { sharps: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'], flats: [], fifths: 7 },
        'F major / D minor': { sharps: [], flats: ['Bb'], fifths: -1 },
        'Bb major / G minor': { sharps: [], flats: ['Bb', 'Eb'], fifths: -2 },
        'Eb major / C minor': { sharps: [], flats: ['Bb', 'Eb', 'Ab'], fifths: -3 },
        'Ab major / F minor': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db'], fifths: -4 },
        'Db major / Bb minor': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'], fifths: -5 },
        'Gb major / Eb minor': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'], fifths: -6 },
        'Cb major / Ab minor': { sharps: [], flats: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'], fifths: -7 }
    },

    // Scale formulas (semitones from root)
    scaleFormulas: {
        major: { intervals: [0, 2, 4, 5, 7, 9, 11], pattern: 'W-W-H-W-W-W-H', mood: 'Happy, bright' },
        naturalMinor: { intervals: [0, 2, 3, 5, 7, 8, 10], pattern: 'W-H-W-W-H-W-W', mood: 'Sad, melancholic' },
        harmonicMinor: { intervals: [0, 2, 3, 5, 7, 8, 11], pattern: 'W-H-W-W-H-3H-H', mood: 'Dramatic, exotic' },
        melodicMinor: { intervals: [0, 2, 3, 5, 7, 9, 11], pattern: 'W-H-W-W-W-W-H', mood: 'Jazz, sophisticated' },
        dorian: { intervals: [0, 2, 3, 5, 7, 9, 10], pattern: 'W-H-W-W-W-H-W', mood: 'Minor with brightness' },
        phrygian: { intervals: [0, 1, 3, 5, 7, 8, 10], pattern: 'H-W-W-W-H-W-W', mood: 'Spanish, dark' },
        lydian: { intervals: [0, 2, 4, 6, 7, 9, 11], pattern: 'W-W-W-H-W-W-H', mood: 'Dreamy, floating' },
        mixolydian: { intervals: [0, 2, 4, 5, 7, 9, 10], pattern: 'W-W-H-W-W-H-W', mood: 'Bluesy, dominant' },
        locrian: { intervals: [0, 1, 3, 5, 6, 8, 10], pattern: 'H-W-W-H-W-W-W', mood: 'Unstable, dissonant' },
        pentatonicMajor: { intervals: [0, 2, 4, 7, 9], pattern: 'W-W-3H-W', mood: 'Folk, country' },
        pentatonicMinor: { intervals: [0, 3, 5, 7, 10], pattern: '3H-W-W-3H', mood: 'Blues, rock' },
        blues: { intervals: [0, 3, 5, 6, 7, 10], pattern: '3H-W-H-H-3H', mood: 'Blues, soul' }
    },

    // Chord formulas
    chordFormulas: {
        major: { intervals: [0, 4, 7], symbol: '', mood: 'Happy, stable', example: 'C = C-E-G' },
        minor: { intervals: [0, 3, 7], symbol: 'm', mood: 'Sad, melancholic', example: 'Cm = C-Eb-G' },
        dim: { intervals: [0, 3, 6], symbol: 'dim', mood: 'Tense, unstable', example: 'Cdim = C-Eb-Gb' },
        aug: { intervals: [0, 4, 8], symbol: 'aug', mood: 'Dreamy, mysterious', example: 'Caug = C-E-G#' },
        maj7: { intervals: [0, 4, 7, 11], symbol: 'maj7', mood: 'Jazzy, dreamy', example: 'Cmaj7 = C-E-G-B' },
        min7: { intervals: [0, 3, 7, 10], symbol: 'm7', mood: 'Smooth, soulful', example: 'Cm7 = C-Eb-G-Bb' },
        dom7: { intervals: [0, 4, 7, 10], symbol: '7', mood: 'Bluesy, tension', example: 'C7 = C-E-G-Bb' },
        dim7: { intervals: [0, 3, 6, 9], symbol: 'dim7', mood: 'Dark, dramatic', example: 'Cdim7 = C-Eb-Gb-A' },
        sus2: { intervals: [0, 2, 7], symbol: 'sus2', mood: 'Open, atmospheric', example: 'Csus2 = C-D-G' },
        sus4: { intervals: [0, 5, 7], symbol: 'sus4', mood: 'Tense, ethereal', example: 'Csus4 = C-F-G' },
        add9: { intervals: [0, 4, 7, 14], symbol: 'add9', mood: 'Dreamy, colorful', example: 'Cadd9 = C-E-G-D' },
        m7b5: { intervals: [0, 3, 6, 10], symbol: 'm7b5', mood: 'Jazzy, complex', example: 'Cm7b5 = C-Eb-Gb-Bb' }
    },

    // Common chord progressions
    chordProgressions: {
        pop: [
            { name: 'Pop Ballad', progression: 'I-V-vi-IV', example: 'C-G-Am-F', songs: ['Let It Be', 'No Woman No Cry', 'Don\'t Stop Believin\''] },
            { name: 'Sensitive Female', progression: 'vi-IV-I-V', example: 'Am-F-C-G', songs: ['Someone Like You', 'Stay With Me', 'Royals'] },
            { name: 'Pop Rock', progression: 'I-V-IV-I', example: 'C-G-F-C', songs: ['Twist and Shout', 'La Bamba'] }
        ],
        jazz: [
            { name: 'ii-V-I', progression: 'ii-V-I', example: 'Dm7-G7-Cmaj7', songs: ['Autumn Leaves', 'All The Things You Are'] },
            { name: 'Jazz Turnaround', progression: 'I-vi-ii-V', example: 'Cmaj7-Am7-Dm7-G7', songs: ['Rhythm Changes'] },
            { name: 'Bebop Blues', progression: 'I7-IV7-I7-V7-I7', example: 'C7-F7-C7-G7-C7', songs: ['Blues for Alice'] }
        ],
        classical: [
            { name: 'Authentic Cadence', progression: 'V-I', example: 'G-C', songs: ['End of most classical pieces'] },
            { name: 'Plagal Cadence', progression: 'IV-I', example: 'F-C', songs: ['Amen cadence'] },
            { name: 'Circle Progression', progression: 'vi-ii-V-I', example: 'Am-Dm-G-C', songs: ['Pachelbel Canon'] }
        ],
        hiphop: [
            { name: 'Dark Trap', progression: 'i-VI-III-VII', example: 'Am-F-C-G', songs: ['Many trap songs'] },
            { name: 'Melodic Trap', progression: 'i-bVII-bVI-V', example: 'Am-G-F-E', songs: ['Emotional trap beats'] },
            { name: 'Drill', progression: 'i-♭VII-♭VI-V', example: 'Am-Gb-F-E', songs: ['UK Drill'] }
        ]
    },

    // Hand position rules
    handPosition: {
        basicRules: [
            { rule: 'Curved Fingers', description: 'Keep fingers curved like holding a ball. Never flat!', tip: 'Imagine an orange under your palm' },
            { rule: 'Wrist Position', description: 'Wrist should be level with knuckles, not too high or low', tip: 'Natural relaxed position' },
            { rule: 'Thumb Placement', description: 'Thumb plays on the side, not flat on the key', tip: 'Thumb tip touches the key' },
            { rule: 'Arm Weight', description: 'Let gravity help - don\'t press from fingers alone', tip: 'Feel weight transfer from shoulder' },
            { rule: 'Relaxed Shoulders', description: 'Keep shoulders down and relaxed', tip: 'Shake out tension before playing' },
            { rule: 'Finger Independence', description: 'Each finger moves independently without tension', tip: 'Practice lifting one finger while others stay down' }
        ],

        fingeringRules: {
            rightHand: {
                'Scale ascending': '1-2-3-1-2-3-4-5 (thumb crosses under)',
                'Scale descending': '5-4-3-2-1-3-2-1 (thumb crosses over)',
                'Arpeggios': '1-2-3-1-2-3 or 1-2-4-1-2-4 for larger spans',
                'Triads': '1-3-5 for root position, 1-2-4 for first inversion'
            },
            leftHand: {
                'Scale ascending': '5-4-3-2-1-3-2-1 (thumb crosses over)',
                'Scale descending': '1-2-3-1-2-3-4-5 (thumb crosses under)',
                'Arpeggios': '5-4-2-1-4-2-1 or 5-3-2-1',
                'Triads': '5-3-1 for root position, 5-4-2 for first inversion'
            }
        },

        commonMistakes: [
            { mistake: 'Collapsing knuckles', fix: 'Keep the bridge of your hand raised' },
            { mistake: 'Raised shoulders', fix: 'Take a deep breath and let shoulders drop' },
            { mistake: 'Stiff wrist', fix: 'Practice circular motions, keep wrist flexible' },
            { mistake: 'Flying fingers', fix: 'Keep fingers close to keys when not playing' },
            { mistake: 'Thumb tension', fix: 'Thumb should be relaxed, not locked' }
        ]
    },

    // Practice tips
    practiceTips: [
        { title: 'Slow Practice', description: 'Practice slowly enough that you make zero mistakes. Speed comes from accuracy.' },
        { title: 'Hands Separate', description: 'Master each hand separately before playing together.' },
        { title: 'Section Practice', description: 'Break pieces into small sections. Master each before moving on.' },
        { title: 'Loop Difficult Parts', description: 'Identify trouble spots and repeat them 5-10 times correctly.' },
        { title: 'Metronome Use', description: 'Start slow with metronome, gradually increase tempo.' },
        { title: 'Daily Consistency', description: '15 minutes daily beats 2 hours once a week.' },
        { title: 'Listen Actively', description: 'Record yourself and listen back critically.' },
        { title: 'Posture Check', description: 'Start each session by checking your posture and hand position.' }
    ]
};

// ============== THEORY REFERENCE UI ==============
function showTheoryReference() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="theory-reference">
            <h2>📚 Music Theory Reference</h2>
            
            <div class="theory-tabs">
                <button class="theory-tab active" onclick="showTheorySection('scales')">Scales</button>
                <button class="theory-tab" onclick="showTheorySection('chords')">Chords</button>
                <button class="theory-tab" onclick="showTheorySection('progressions')">Progressions</button>
                <button class="theory-tab" onclick="showTheorySection('position')">Hand Position</button>
            </div>
            
            <div id="theory-content">
                ${getScalesTheoryHTML()}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showTheorySection(section) {
    document.querySelectorAll('.theory-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase().includes(section));
    });
    
    const content = document.getElementById('theory-content');
    
    switch(section) {
        case 'scales':
            content.innerHTML = getScalesTheoryHTML();
            break;
        case 'chords':
            content.innerHTML = getChordsTheoryHTML();
            break;
        case 'progressions':
            content.innerHTML = getProgressionsTheoryHTML();
            break;
        case 'position':
            content.innerHTML = getHandPositionHTML();
            break;
    }
}

function getScalesTheoryHTML() {
    return `
        <h3>Scale Formulas</h3>
        <p>Each scale has a unique pattern of whole steps (W) and half steps (H)</p>
        
        <div class="theory-grid">
            ${Object.entries(MusicTheoryReference.scaleFormulas).slice(0, 6).map(([name, data]) => `
                <div class="theory-card">
                    <h4>${name.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p class="pattern">${data.pattern}</p>
                    <p class="mood">${data.mood}</p>
                    <button class="neon-btn small" onclick="playScale('${name}')">🔊 Hear it</button>
                </div>
            `).join('')}
        </div>
        
        <h4>Key Signatures</h4>
        <p>Sharps and flats are added in this order:</p>
        <p>Sharps: F-C-G-D-A-E-B (Father Charles Goes Down And Ends Battle)</p>
        <p>Flats: B-E-A-D-G-C-F (Battle Ends And Down Goes Charles\' Father)</p>
    `;
}

function getChordsTheoryHTML() {
    return `
        <h3>Chord Types</h3>
        
        <div class="theory-grid">
            ${Object.entries(MusicTheoryReference.chordFormulas).map(([name, data]) => `
                <div class="theory-card">
                    <h4>${name.replace(/([A-Z])/g, ' $1').trim()} ${data.symbol}</h4>
                    <p class="mood">${data.mood}</p>
                    <p class="example">${data.example}</p>
                    <button class="neon-btn small" onclick="playChord('${name}')">🔊 Hear it</button>
                </div>
            `).join('')}
        </div>
    `;
}

function getProgressionsTheoryHTML() {
    return `
        <h3>Common Chord Progressions</h3>
        
        ${Object.entries(MusicTheoryReference.chordProgressions).map(([genre, progressions]) => `
            <div class="progression-section">
                <h4>${genre.charAt(0).toUpperCase() + genre.slice(1)}</h4>
                ${progressions.map(p => `
                    <div class="progression-item">
                        <strong>${p.name}</strong>: ${p.example}
                        <br><small>Songs: ${p.songs.join(', ')}</small>
                    </div>
                `).join('')}
            </div>
        `).join('')}
    `;
}

function getHandPositionHTML() {
    return `
        <h3>Proper Hand Position</h3>
        
        <div class="position-rules">
            ${MusicTheoryReference.handPosition.basicRules.map(r => `
                <div class="rule-card">
                    <h4>✋ ${r.rule}</h4>
                    <p>${r.description}</p>
                    <p class="tip">💡 ${r.tip}</p>
                </div>
            `).join('')}
        </div>
        
        <h4>Fingering Rules</h4>
        <div class="fingering-section">
            <h5>Right Hand</h5>
            ${Object.entries(MusicTheoryReference.handPosition.fingeringRules.rightHand).map(([type, rule]) => `
                <p><strong>${type}:</strong> ${rule}</p>
            `).join('')}
            
            <h5>Left Hand</h5>
            ${Object.entries(MusicTheoryReference.handPosition.fingeringRules.leftHand).map(([type, rule]) => `
                <p><strong>${type}:</strong> ${rule}</p>
            `).join('')}
        </div>
        
        <h4>Common Mistakes to Avoid</h4>
        <div class="mistakes-section">
            ${MusicTheoryReference.handPosition.commonMistakes.map(m => `
                <div class="mistake-item">
                    <span class="wrong">❌ ${m.mistake}</span>
                    <span class="fix">→ ${m.fix}</span>
                </div>
            `).join('')}
        </div>
        
        <h4>Practice Tips</h4>
        <div class="tips-section">
            ${MusicTheoryReference.practiceTips.map(t => `
                <div class="tip-item">
                    <strong>📌 ${t.title}</strong>
                    <p>${t.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

async function playScale(scaleName) {
    const data = MusicTheoryReference.scaleFormulas[scaleName];
    if (!data) return;
    
    const player = new ChordPlayer();
    await player.init();
    
    const root = 'C4';
    const notes = data.intervals.map(i => {
        const semitones = parseInt(i);
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const rootIndex = 0;
        return notes[(rootIndex + semitones) % 12] + '4';
    });
    
    for (const note of notes) {
        await player.playChord([note], 0.3);
        await new Promise(r => setTimeout(r, 350));
    }
}

async function playChord(chordType) {
    const data = MusicTheoryReference.chordFormulas[chordType];
    if (!data) return;
    
    const player = new ChordPlayer();
    await player.init();
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const chordNotes = data.intervals.map(i => notes[i] + '4');
    
    await player.playChord(chordNotes, 1.5);
}

// Export
if (typeof window !== 'undefined') {
    window.MusicTheoryReference = MusicTheoryReference;
    window.showTheoryReference = showTheoryReference;
    window.showTheorySection = showTheorySection;
}
