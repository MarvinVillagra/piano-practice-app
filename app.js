// Piano Master App - Main JavaScript

// ============== DATA ==============

const drills = {
    finger: [
        { id: 'f1', name: 'Hanon Exercise 1', duration: '5 min', description: 'Classic finger strengthening pattern. Play ascending and descending with each hand separately, then together.', bpm: 60 },
        { id: 'f2', name: 'Five-Finger Patterns', duration: '3 min', description: 'Play C-D-E-F-G with each finger, keeping others relaxed. Focus on even tone and rhythm.', bpm: 70 },
        { id: 'f3', name: 'Finger Lifting', duration: '2 min', description: 'Place all five fingers on keys. Lift one finger at a time while keeping others down. Repeat for each finger.', bpm: 'N/A' },
        { id: 'f4', name: 'Thumb Under Pass', duration: '4 min', description: 'Practice passing thumb under for smooth scale runs. C major scale, focus on the thumb transition.', bpm: 60 },
        { id: 'f5', name: 'Trill Exercise', duration: '3 min', description: 'Alternate rapidly between two adjacent fingers. Start slow, gradually increase speed.', bpm: 80 }
    ],
    coordination: [
        { id: 'c1', name: 'Mirror Scales', duration: '5 min', description: 'Play scale with both hands moving in the same direction. Focus on perfect synchronization.', bpm: 65 },
        { id: 'c2', name: 'Contrary Motion', duration: '4 min', description: 'Right hand ascends while left hand descends. Start with C major, expand to other keys.', bpm: 60 },
        { id: 'c3', name: 'Different Rhythms', duration: '5 min', description: 'Right hand plays quarter notes, left hand plays eighth notes. Then switch.', bpm: 70 },
        { id: 'c4', name: 'Chord Inversions', duration: '4 min', description: 'Play chord inversions with both hands. Move smoothly between root, first, and second inversions.', bpm: 60 },
        { id: 'c5', name: 'Hand Independence', duration: '6 min', description: 'Left hand plays steady bass notes while right hand plays melody. Start simple.', bpm: 65 }
    ],
    speed: [
        { id: 's1', name: 'Scale Sprints', duration: '4 min', description: 'Play one octave as fast as possible, then rest. Gradually increase to two, three, four octaves.', bpm: 100 },
        { id: 's2', name: 'Arpeggio Runs', duration: '5 min', description: 'Play broken chords up and down. Focus on fluid hand position and minimal tension.', bpm: 85 },
        { id: 's3', name: 'Metronome Ladder', duration: '6 min', description: 'Start at 60 BPM, increase by 5 BPM each repetition until you reach your limit.', bpm: 'Variable' },
        { id: 's4', name: 'Burst Practice', duration: '3 min', description: 'Play short, fast bursts (4-6 notes) followed by rest. Focus on clean execution.', bpm: 'N/A' },
        { id: 's5', name: 'Parallel Sets', duration: '4 min', description: 'Practice groups of notes that can be played in one hand position without thumb crossing.', bpm: 90 }
    ],
    rhythm: [
        { id: 'r1', name: 'Off-Beat Accents', duration: '3 min', description: 'Play scales accenting the weak beats. Helps internalize different rhythmic feels.', bpm: 75 },
        { id: 'r2', name: 'Swing vs Straight', duration: '4 min', description: 'Play the same phrase in swing and straight feel. Notice the difference in note values.', bpm: 80 },
        { id: 'r3', name: 'Polyrhythm 2:3', duration: '5 min', description: 'Right hand plays 2 notes while left hand plays 3 in the same time. Start very slow.', bpm: 50 },
        { id: 'r4', name: 'Syncopation Practice', duration: '4 min', description: 'Play melodies that emphasize off-beats. Helps with pop/jazz playing.', bpm: 85 },
        { id: 'r5', name: 'Triplets Feel', duration: '3 min', description: 'Practice playing smooth triplets. Three notes per beat, even and flowing.', bpm: 70 }
    ]
};

const scales = {
    major: {
        'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
        'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
        'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'],
        'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'],
        'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'],
        'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'],
        'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#'],
        'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#'],
        'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
        'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
        'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
        'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab'],
        'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'],
        'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb']
    },
    minor: {
        'C': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
        'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'],
        'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C', 'D'],
        'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'],
        'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D', 'E'],
        'B': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A', 'B'],
        'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E', 'F#'],
        'C#': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B', 'C#'],
        'F': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F'],
        'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'],
        'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb'],
        'Ab': ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab'],
        'Db': ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db'],
        'Gb': ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb']
    },
    harmonic: {
        'C': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B', 'C'],
        'G': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F#', 'G'],
        'D': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C#', 'D'],
        'A': ['A', 'B', 'C', 'D', 'E', 'F', 'G#', 'A'],
        'E': ['E', 'F#', 'G', 'A', 'B', 'C', 'D#', 'E'],
        'B': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A#', 'B'],
        'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E#', 'F#'],
        'C#': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B#', 'C#'],
        'F': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E', 'F'],
        'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A', 'Bb'],
        'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'D', 'Eb'],
        'Ab': ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'G', 'Ab'],
        'Db': ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'C', 'Db'],
        'Gb': ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'F', 'Gb']
    },
    melodic: {
        'C': { up: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B', 'C'], down: ['C', 'Bb', 'Ab', 'G', 'F', 'Eb', 'D', 'C'] },
        'G': { up: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F#', 'G'], down: ['G', 'F', 'Eb', 'D', 'C', 'Bb', 'A', 'G'] },
        'D': { up: ['D', 'E', 'F', 'G', 'A', 'B', 'C#', 'D'], down: ['D', 'C', 'Bb', 'A', 'G', 'F', 'E', 'D'] },
        'A': { up: ['A', 'B', 'C', 'D', 'E', 'F#', 'G#', 'A'], down: ['A', 'G', 'F', 'E', 'D', 'C', 'B', 'A'] }
    }
};

const scaleExercises = [
    { id: 'se1', name: 'Straight Up & Down', description: 'Play the scale ascending and descending, one octave.' },
    { id: 'se2', name: 'Two Octaves', description: 'Expand to two octaves, focusing on thumb turns.' },
    { id: 'se3', name: 'Thirds', description: 'Play scale in thirds: C-E, D-F, E-G, etc.' },
    { id: 'se4', name: 'Sixths', description: 'Play scale in sixths: C-A, D-B, E-C, etc.' },
    { id: 'se5', name: 'Contrary Motion', description: 'Start from same note, hands move in opposite directions.' },
    { id: 'se6', name: 'Rhythmic Variations', description: 'Play scale with dotted rhythms, triplets, and syncopation.' },
    { id: 'se7', name: 'Dynamic Changes', description: 'Play crescendo ascending, diminuendo descending.' }
];

const songs = [
    {
        id: 'song1',
        title: 'Ode to Joy',
        composer: 'Beethoven',
        level: 'beginner',
        key: 'G major',
        tempo: 'Moderato',
        sections: [
            { name: 'Main Theme', measures: [
                { chords: ['G', 'G', 'A', 'B'], description: 'Right hand melody' },
                { chords: ['B', 'C', 'B', 'A'], description: 'Continue phrase' },
                { chords: ['G', 'A', 'B', 'G'], description: 'Second phrase' },
                { chords: ['G', 'D', 'G', 'G'], description: 'Resolution' }
            ]}
        ],
        tips: ['Start hands separate', 'Focus on even tone', 'Practice slowly before speeding up']
    },
    {
        id: 'song2',
        title: 'Für Elise',
        composer: 'Beethoven',
        level: 'intermediate',
        key: 'A minor',
        tempo: 'Poco moto',
        sections: [
            { name: 'Opening Theme', measures: [
                { chords: ['E5', 'D#5', 'E5', 'D#5'], description: 'Famous opening motif' },
                { chords: ['E5', 'B4', 'D5', 'C5'], description: 'Descending pattern' },
                { chords: ['A4', 'C4', 'E4', 'A4'], description: 'Left hand arpeggio' }
            ]},
            { name: 'Middle Section', measures: [
                { chords: ['C5', 'B4', 'A4', 'G#4'], description: 'Transitional phrase' },
                { chords: ['A4', 'E4', 'A4', 'B4'], description: 'Build tension' }
            ]}
        ],
        tips: ['Watch the accidentals', 'Keep left hand light', 'Practice the D# carefully']
    },
    {
        id: 'song3',
        title: 'Twinkle Twinkle Little Star',
        composer: 'Traditional',
        level: 'beginner',
        key: 'C major',
        tempo: 'Moderate',
        sections: [
            { name: 'Theme', measures: [
                { chords: ['C', 'C', 'G', 'G'], description: 'Opening phrase' },
                { chords: ['A', 'A', 'G', '-'], description: 'Second phrase' },
                { chords: ['F', 'F', 'E', 'E'], description: 'Third phrase' },
                { chords: ['D', 'D', 'C', '-'], description: 'Resolution' }
            ]}
        ],
        tips: ['Perfect for beginners', 'Focus on finger placement', 'Keep steady rhythm']
    },
    {
        id: 'song4',
        title: 'Canon in D',
        composer: 'Pachelbel',
        level: 'intermediate',
        key: 'D major',
        tempo: 'Adagio',
        sections: [
            { name: 'Bass Line', measures: [
                { chords: ['D', 'A', 'Bm', 'F#m'], description: '8-chord progression repeats' },
                { chords: ['G', 'D', 'G', 'A'], description: 'Second half of progression' }
            ]},
            { name: 'Melody Variations', measures: [
                { chords: ['F#', 'E', 'D', 'C#'], description: 'Eighth note pattern' }
            ]}
        ],
        tips: ['Master the bass line first', 'Add melody variations gradually', 'Keep left hand steady']
    },
    {
        id: 'song5',
        title: 'Moonlight Sonata (1st Movement)',
        composer: 'Beethoven',
        level: 'advanced',
        key: 'C# minor',
        tempo: 'Adagio sostenuto',
        sections: [
            { name: 'Opening', measures: [
                { chords: ['C#', 'G#', 'C#', 'E'], description: 'Famous arpeggiated triplet pattern' },
                { chords: ['G#', 'C#', 'E', 'G#'], description: 'Continues triplets' }
            ]},
            { name: 'Melody Entrance', measures: [
                { chords: ['G#4', '-', '-', '-'], description: 'Melody enters quietly over triplets' }
            ]}
        ],
        tips: ['Keep triplets soft and even', 'Bring out melody on top', 'Pedal carefully for clarity']
    },
    {
        id: 'song6',
        title: 'River Flows in You',
        composer: 'Yiruma',
        level: 'intermediate',
        key: 'A major',
        tempo: 'Andante',
        sections: [
            { name: 'Opening Arpeggios', measures: [
                { chords: ['A', 'C#m', 'D', 'A'], description: 'Flowing arpeggio pattern' },
                { chords: ['Bm', 'E', 'F#m', 'E'], description: 'Build phrase' }
            ]},
            { name: 'Main Theme', measures: [
                { chords: ['C#5', 'B4', 'A4', 'G#4'], description: 'Beautiful melody line' }
            ]}
        ],
        tips: ['Practice hands separate first', 'Keep arpeggios flowing', 'Express the melody']
    }
];

// ============== STATE ==============

let state = {
    completedDrills: JSON.parse(localStorage.getItem('completedDrills') || '[]'),
    learnedScales: JSON.parse(localStorage.getItem('learnedScales') || '[]'),
    learnedSongs: JSON.parse(localStorage.getItem('learnedSongs') || '[]'),
    practiceLog: JSON.parse(localStorage.getItem('practiceLog') || '[]'),
    streak: parseInt(localStorage.getItem('streak') || '0'),
    lastPractice: localStorage.getItem('lastPractice') || null
};

// ============== INITIALIZATION ==============

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderDrills();
    renderSongs();
    renderProgress();
    initScaleControls();
    renderPiano();
    initModals();
});

// ============== NAVIGATION ==============

function initNav() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const section = btn.dataset.section;
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        });
    });
}

// ============== DRILLS ==============

function renderDrills() {
    renderDrillCategory('finger-drills', drills.finger);
    renderDrillCategory('coordination-drills', drills.coordination);
    renderDrillCategory('speed-drills', drills.speed);
    renderDrillCategory('rhythm-drills', drills.rhythm);
}

function renderDrillCategory(containerId, drillList) {
    const container = document.getElementById(containerId);
    container.innerHTML = drillList.map(drill => `
        <div class="drill-item ${state.completedDrills.includes(drill.id) ? 'completed' : ''}" data-drill-id="${drill.id}">
            <div class="drill-info">
                <h4>${drill.name}</h4>
                <span>${drill.duration} • ${drill.bpm !== 'N/A' ? drill.bpm + ' BPM' : 'No metronome'}</span>
            </div>
            <span class="drill-status">${state.completedDrills.includes(drill.id) ? '✅' : '▶️'}</span>
        </div>
    `).join('');

    container.querySelectorAll('.drill-item').forEach(item => {
        item.addEventListener('click', () => openDrillModal(item.dataset.drillId));
    });
}

function openDrillModal(drillId) {
    const allDrills = [...drills.finger, ...drills.coordination, ...drills.speed, ...drills.rhythm];
    const drill = allDrills.find(d => d.id === drillId);
    if (!drill) return;

    const modal = document.getElementById('drill-modal');
    const content = document.getElementById('drill-content');
    
    content.innerHTML = `
        <div class="drill-practice">
            <h3>${drill.name}</h3>
            <div class="drill-instructions">
                <p><strong>Duration:</strong> ${drill.duration}</p>
                <p><strong>Tempo:</strong> ${drill.bpm !== 'N/A' ? drill.bpm + ' BPM' : 'No metronome needed'}</p>
                <p><strong>Instructions:</strong> ${drill.description}</p>
            </div>
            <div class="drill-timer" id="drill-timer">00:00</div>
            <div class="drill-controls">
                <button class="btn-start" id="start-drill">Start</button>
                <button class="btn-pause" id="pause-drill" style="display:none;">Pause</button>
                <button class="btn-complete" id="complete-drill">Mark Complete</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    
    let seconds = 0;
    let interval = null;
    let isRunning = false;

    const timerDisplay = document.getElementById('drill-timer');
    const startBtn = document.getElementById('start-drill');
    const pauseBtn = document.getElementById('pause-drill');

    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            interval = setInterval(() => {
                seconds++;
                const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${mins}:${secs}`;
            }, 1000);
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        }
    });

    pauseBtn.addEventListener('click', () => {
        isRunning = false;
        clearInterval(interval);
        pauseBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Resume';
    });

    document.getElementById('complete-drill').addEventListener('click', () => {
        if (!state.completedDrills.includes(drillId)) {
            state.completedDrills.push(drillId);
            localStorage.setItem('completedDrills', JSON.stringify(state.completedDrills));
            logPractice(`Completed drill: ${drill.name}`);
            renderDrills();
            renderProgress();
        }
        modal.classList.remove('active');
        clearInterval(interval);
    });
}

// ============== SCALES ==============

function initScaleControls() {
    document.getElementById('generate-scale').addEventListener('click', generateScaleExercise);
}

function generateScaleExercise() {
    const type = document.getElementById('scale-type').value;
    const root = document.getElementById('key-root').value;
    
    let scaleNotes;
    if (type === 'melodic') {
        scaleNotes = scales[type][root];
    } else {
        scaleNotes = scales[type][root];
    }

    if (!scaleNotes) {
        document.getElementById('scale-info').innerHTML = '<h3>Scale not available</h3>';
        return;
    }

    const typeName = {
        major: 'Major',
        minor: 'Natural Minor',
        harmonic: 'Harmonic Minor',
        melodic: 'Melodic Minor'
    }[type];

    // Highlight piano keys
    highlightPianoKeys(scaleNotes);

    // Display scale info
    const notesDisplay = type === 'melodic' 
        ? `<p><strong>Ascending:</strong> ${scaleNotes.up.join(' - ')}</p>
           <p><strong>Descending:</strong> ${scaleNotes.down.join(' - ')}</p>`
        : scaleNotes.join(' - ');

    document.getElementById('scale-info').innerHTML = `
        <h3>${root} ${typeName}</h3>
        <div class="scale-notes">
            ${type === 'melodic' 
                ? `<p><strong>Up:</strong> ${scaleNotes.up.map(n => `<span class="note-badge">${n}</span>`).join('')}</p>
                   <p><strong>Down:</strong> ${scaleNotes.down.map(n => `<span class="note-badge">${n}</span>`).join('')}</p>`
                : scaleNotes.map(n => `<span class="note-badge">${n}</span>`).join('')
            }
        </div>
    `;

    // Display exercises
    document.getElementById('scale-exercise-list').innerHTML = scaleExercises.map(ex => `
        <div class="exercise-item" data-scale="${root}-${type}" data-exercise="${ex.id}">
            <h4>${ex.name}</h4>
            <p>${ex.description}</p>
        </div>
    `).join('');

    document.querySelectorAll('.exercise-item').forEach(item => {
        item.addEventListener('click', () => {
            const scaleKey = item.dataset.scale;
            if (!state.learnedScales.includes(scaleKey)) {
                state.learnedScales.push(scaleKey);
                localStorage.setItem('learnedScales', JSON.stringify(state.learnedScales));
                logPractice(`Practiced scale: ${root} ${typeName}`);
                renderProgress();
            }
            alert(`Practicing: ${ex.name} for ${root} ${typeName}`);
        });
    });
}

function renderPiano() {
    const piano = document.getElementById('piano-visual');
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = {'C': 'C#', 'D': 'D#', 'F': 'F#', 'G': 'G#', 'A': 'A#'};
    
    let html = '<div class="piano-keys">';
    
    // Two octaves
    for (let octave = 0; octave < 2; octave++) {
        whiteKeys.forEach(key => {
            const fullKey = key;
            html += `<div class="piano-key white" data-note="${fullKey}">${fullKey}</div>`;
            
            if (blackKeys[key]) {
                html += `<div class="piano-key black" data-note="${blackKeys[key]}">${blackKeys[key]}</div>`;
            }
        });
    }
    
    html += '</div>';
    piano.innerHTML = html;
}

function highlightPianoKeys(notes) {
    // Clear previous highlights
    document.querySelectorAll('.piano-key').forEach(key => {
        key.classList.remove('highlighted');
    });

    // Handle melodic minor (array of arrays)
    const notesArray = Array.isArray(notes[0]) ? notes.flat() : notes;
    
    notesArray.forEach(note => {
        const key = document.querySelector(`[data-note="${note}"]`);
        if (key) key.classList.add('highlighted');
    });
}

// ============== SONGS ==============

function renderSongs() {
    renderSongList('all');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSongList(btn.dataset.level);
        });
    });
}

function renderSongList(level) {
    const filteredSongs = level === 'all' 
        ? songs 
        : songs.filter(s => s.level === level);

    const container = document.getElementById('song-list');
    container.innerHTML = filteredSongs.map(song => `
        <div class="song-card" data-song-id="${song.id}">
            <h3>${song.title}</h3>
            <div class="song-meta">
                <span>${song.composer}</span>
                <span>${song.key}</span>
                <span>${song.tempo}</span>
            </div>
            <span class="level-badge ${song.level}">${song.level}</span>
        </div>
    `).join('');

    container.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('click', () => openSongModal(card.dataset.songId));
    });
}

function openSongModal(songId) {
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const modal = document.getElementById('song-modal');
    const content = document.getElementById('song-content');
    
    content.innerHTML = `
        <div class="song-lesson">
            <h3>${song.title}</h3>
            <p class="song-lesson-meta">${song.composer} • ${song.key} • ${song.tempo}</p>
            
            ${song.sections.map(section => `
                <div class="lesson-section">
                    <h4>${section.name}</h4>
                    ${section.measures.map(m => `
                        <div class="measure">
                            <span style="color: var(--text-secondary)">${m.description}:</span>
                            ${m.chords.map(c => `<span class="chord">${c}</span>`).join('')}
                        </div>
                    `).join('')}
                </div>
            `).join('')}
            
            <div class="practice-tips">
                <h4>Practice Tips</h4>
                <ul>
                    ${song.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <button class="mark-learned" id="mark-learned">Mark as Learned</button>
        </div>
    `;

    modal.classList.add('active');

    document.getElementById('mark-learned').addEventListener('click', () => {
        if (!state.learnedSongs.includes(songId)) {
            state.learnedSongs.push(songId);
            localStorage.setItem('learnedSongs', JSON.stringify(state.learnedSongs));
            logPractice(`Learned song: ${song.title}`);
            renderProgress();
        }
        modal.classList.remove('active');
    });
}

// ============== PROGRESS ==============

function renderProgress() {
    // Calculate total practice time
    const totalMinutes = state.practiceLog.reduce((acc, entry) => acc + (entry.duration || 5), 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    document.getElementById('total-practice-time').textContent = `${hours}h ${mins}m`;

    // Other stats
    document.getElementById('drills-completed').textContent = state.completedDrills.length;
    document.getElementById('scales-learned').textContent = state.learnedScales.length;
    document.getElementById('songs-learned').textContent = state.learnedSongs.length;

    // Streak
    updateStreak();
    document.getElementById('streak-count').textContent = state.streak;

    // Calendar
    renderStreakCalendar();

    // Recent practice
    renderPracticeLog();
}

function updateStreak() {
    const today = new Date().toDateString();
    if (state.lastPractice !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (state.lastPractice === yesterday || state.lastPractice === null) {
            // Continue streak
        } else if (state.lastPractice && state.lastPractice !== yesterday) {
            state.streak = 0; // Broke streak
        }
    }
}

function renderStreakCalendar() {
    const calendar = document.getElementById('streak-calendar');
    const days = [];
    
    for (let i = 27; i >= 0; i--) {
        const date = new Date(Date.now() - i * 86400000);
        const dateStr = date.toDateString();
        const practiced = state.practiceLog.some(entry => 
            new Date(entry.timestamp).toDateString() === dateStr
        );
        const isToday = i === 0;
        
        days.push(`<div class="calendar-day ${practiced ? 'practiced' : ''} ${isToday ? 'today' : ''}" title="${date.toDateString()}"></div>`);
    }
    
    calendar.innerHTML = days.join('');
}

function renderPracticeLog() {
    const log = document.getElementById('practice-log');
    const recent = state.practiceLog.slice(-10).reverse();
    
    log.innerHTML = recent.map(entry => `
        <li>
            <span>${entry.activity}</span>
            <span>${new Date(entry.timestamp).toLocaleDateString()}</span>
        </li>
    `).join('') || '<li>No practice logged yet</li>';
}

function logPractice(activity) {
    const today = new Date().toDateString();
    
    // Update streak
    if (state.lastPractice !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (state.lastPractice === yesterday || state.lastPractice === null) {
            state.streak++;
        } else {
            state.streak = 1;
        }
        state.lastPractice = today;
        localStorage.setItem('streak', state.streak);
        localStorage.setItem('lastPractice', state.lastPractice);
    }

    // Log the activity
    state.practiceLog.push({
        activity,
        timestamp: new Date().toISOString(),
        duration: 5
    });
    localStorage.setItem('practiceLog', JSON.stringify(state.practiceLog));
}

// ============== MODALS ==============

function initModals() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}