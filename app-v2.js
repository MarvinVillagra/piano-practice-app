// Piano Master - Complete Working App with All Features

// ============== STATE ==============
const state = {
    streak: parseInt(localStorage.getItem('streak') || '0'),
    totalXP: parseInt(localStorage.getItem('total_xp') || '0'),
    completedDrills: JSON.parse(localStorage.getItem('completedDrills') || '[]'),
    learnedScales: JSON.parse(localStorage.getItem('learnedScales') || '[]'),
    achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
    practiceLog: JSON.parse(localStorage.getItem('practiceLog') || '[]'),
    darkMode: localStorage.getItem('darkMode') !== 'false'
};

// ============== AUDIO CONTEXT ==============
let audioContext = null;
let analyser = null;
let microphone = null;
let isListening = false;

async function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        return true;
    } catch (e) {
        console.error('Audio init failed:', e);
        return false;
    }
}

async function startListening() {
    if (isListening) return true;
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        isListening = true;
        return true;
    } catch (e) {
        console.error('Microphone access denied:', e);
        showToast('Please allow microphone access', 'error');
        return false;
    }
}

function stopListening() {
    isListening = false;
    if (microphone) {
        microphone.disconnect();
        microphone = null;
    }
}

// Pitch detection using autocorrelation
function detectPitch() {
    if (!analyser || !isListening) return null;
    
    const buffer = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buffer);
    
    // Find fundamental frequency using autocorrelation
    const sampleRate = audioContext.sampleRate;
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let foundGoodCorrelation = false;
    
    for (let offset = 50; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;
        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += Math.abs(buffer[i] - buffer[i + offset]);
        }
        correlation = 1 - (correlation / MAX_SAMPLES);
        
        if (correlation > 0.9 && correlation > bestCorrelation) {
            bestCorrelation = correlation;
            bestOffset = offset;
            foundGoodCorrelation = true;
        }
    }
    
    if (bestOffset === -1) return null;
    
    const frequency = sampleRate / bestOffset;
    const note = frequencyToNote(frequency);
    
    return { frequency, note };
}

function frequencyToNote(freq) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4 = 440;
    const semitones = 12 * Math.log2(freq / A4);
    const noteIndex = Math.round(semitones) + 9; // A is at index 9
    const octave = Math.floor((noteIndex + 12 * 4) / 12);
    const note = notes[(noteIndex % 12 + 12) % 12];
    return { note, octave, full: note + octave, frequency: Math.round(freq) };
}

// ============== DRILLS WITH AUDIO ==============
const drills = {
    finger: [
        { id: 'hanon1', name: 'Hanon Exercise 1', description: 'Strengthen all fingers equally. Play C-D-E-F-G-F-E-D-C with each hand, fingers 1-2-3-4-5-4-3-2-1. Focus on even tone and lifting each finger high.', targetNotes: ['C', 'D', 'E', 'F', 'G', 'F', 'E', 'D', 'C'], bpm: 60 },
        { id: 'hanon2', name: 'Hanon Exercise 2', description: 'Build finger independence. Pattern: 1-2-3-4-5-4-3-2-1 on each starting note. Move chromatically up.', targetNotes: ['C', 'D', 'E', 'F', 'G'], bpm: 60 },
        { id: 'fivefinger', name: 'Five-Finger Patterns', description: 'Play 1-2-3-4-5-4-3-2-1 in each key. Start with C major, then G, D, A, E.', targetNotes: ['C', 'D', 'E', 'F', 'G'], bpm: 70 },
        { id: 'fingerlift', name: 'Finger Lifting', description: 'Hold C-E-G chord. Lift one finger at a time while keeping others down. Repeat for each finger.', targetNotes: ['C', 'E', 'G'], bpm: 50 }
    ],
    coordination: [
        { id: 'handstogether', name: 'Hands Together', description: 'Play C major scale with both hands, one octave apart. Focus on synchronization.', targetNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'], bpm: 60 },
        { id: 'contrary', name: 'Contrary Motion', description: 'Start both thumbs on middle C. RH goes up, LH goes down. C-D-E-F-G meets C-B-A-G-F.', targetNotes: ['C'], bpm: 65 },
        { id: 'parallel', name: 'Parallel Motion', description: 'Play scale in parallel 3rds. RH plays C-E-D-F-E-G...', targetNotes: ['C', 'E', 'D', 'F'], bpm: 60 }
    ],
    speed: [
        { id: 'speedladder', name: 'Speed Ladder', description: 'Start at 60 BPM. Play C major scale. Increase by 10 BPM each successful run. Goal: 120 BPM.', targetNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'], bpm: 60 },
        { id: 'burst', name: 'Burst Training', description: 'Play fast bursts: C-D-E-F-G (pause) G-F-E-D-C. Focus on clean articulation.', targetNotes: ['C', 'D', 'E', 'F', 'G'], bpm: 80 },
        { id: 'trills', name: 'Trill Practice', description: 'Trill C-D for 10 seconds. Focus on even rhythm. Alternate fingers 1-2, then 2-3, 3-4, 4-5.', targetNotes: ['C', 'D'], bpm: 70 }
    ],
    rhythm: [
        { id: 'metronome', name: 'Metronome Mastery', description: 'Play single notes on the beat. Then play between beats (off-beat). Then alternate on/off beat.', targetNotes: ['C'], bpm: 60 },
        { id: 'rhythmpattern', name: 'Rhythm Patterns', description: 'Play these patterns: Quarter notes → Eighth notes → Triplets → Sixteenths', targetNotes: ['C'], bpm: 70 },
        { id: 'syncopation', name: 'Syncopation Practice', description: 'Play on beats 1, AND of 2, 3, AND of 4. Creates a syncopated feel.', targetNotes: ['C'], bpm: 65 }
    ]
};

// Open drill modal with audio detection
async function openDrill(drill) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    // Initialize audio
    await initAudio();
    const listening = await startListening();
    
    body.innerHTML = `
        <div class="drill-practice-modal">
            <h2>${drill.name}</h2>
            <p class="drill-description">${drill.description}</p>
            
            <div class="drill-target">
                <h4>Target Notes:</h4>
                <div class="target-notes">
                    ${drill.targetNotes.map(n => `<span class="note-badge">${n}</span>`).join('')}
                </div>
            </div>
            
            <div class="drill-metronome">
                <div class="bpm-display">${drill.bpm} BPM</div>
                <button class="neon-btn" onclick="toggleDrillMetronome(${drill.bpm})">▶ Start Metronome</button>
            </div>
            
            <div class="detection-status">
                <h4>🎹 Listening...</h4>
                <div class="detected-note" id="detected-note">-</div>
                <div class="detection-feedback" id="detection-feedback"></div>
            </div>
            
            <div class="drill-progress">
                <span id="drill-progress">0 / ${drill.targetNotes.length} correct</span>
            </div>
            
            <button class="neon-btn success" onclick="completeDrillExercise('${drill.id}')">✓ Complete Exercise</button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Start detection loop
    if (listening) {
        runDrillDetection(drill);
    }
}

let drillMetronomeInterval = null;
function toggleDrillMetronome(bpm) {
    if (drillMetronomeInterval) {
        clearInterval(drillMetronomeInterval);
        drillMetronomeInterval = null;
        return;
    }
    
    const interval = 60000 / bpm;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    drillMetronomeInterval = setInterval(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.value = 0.3;
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, interval);
}

let correctNotes = 0;
let currentNoteIndex = 0;

function runDrillDetection(drill) {
    correctNotes = 0;
    currentNoteIndex = 0;
    
    const detect = () => {
        if (!isListening) return;
        
        const result = detectPitch();
        if (result) {
            const detectedEl = document.getElementById('detected-note');
            const feedbackEl = document.getElementById('detection-feedback');
            const progressEl = document.getElementById('drill-progress');
            
            if (detectedEl) {
                detectedEl.textContent = result.note;
                detectedEl.classList.add('active');
            }
            
            // Check if correct note
            const targetNote = drill.targetNotes[currentNoteIndex];
            if (result.note === targetNote || result.note === targetNote + '4' || result.note === targetNote + '5') {
                correctNotes++;
                currentNoteIndex = (currentNoteIndex + 1) % drill.targetNotes.length;
                
                if (feedbackEl) {
                    feedbackEl.textContent = '✓ Correct!';
                    feedbackEl.className = 'detection-feedback correct';
                }
                
                if (progressEl) {
                    progressEl.textContent = `${correctNotes} / ${drill.targetNotes.length} correct`;
                }
            }
        }
        
        if (document.querySelector('.drill-practice-modal')) {
            requestAnimationFrame(detect);
        }
    };
    
    detect();
}

function completeDrillExercise(drillId) {
    if (!state.completedDrills.includes(drillId)) {
        state.completedDrills.push(drillId);
        localStorage.setItem('completedDrills', JSON.stringify(state.completedDrills));
        addXP(15, 'Completed drill: ' + drillId);
    }
    
    stopListening();
    if (drillMetronomeInterval) {
        clearInterval(drillMetronomeInterval);
        drillMetronomeInterval = null;
    }
    
    closeModal();
    showToast('Exercise completed! +15 XP', 'success');
    renderDrills();
}

// ============== SCALES WITH AUDIO ==============
const scales = {
    major: {
        C: { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        G: { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        D: { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        A: { notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        E: { notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        B: { notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        F: { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'], fingering: { right: '1-2-3-4-1-2-3-4', left: '5-4-3-2-1-3-2-1' } },
        Bb: { notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'], fingering: { right: '2-1-2-1-2-3-1-2', left: '3-2-1-4-3-2-1-3' } },
        Eb: { notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'], fingering: { right: '2-1-2-3-4-1-2-3', left: '3-2-1-4-3-2-1-2' } },
        Ab: { notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab'], fingering: { right: '3-2-1-2-3-1-2-3', left: '3-2-1-4-3-2-1-3' } },
        Db: { notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'], fingering: { right: '2-3-1-2-3-4-1-2', left: '3-2-1-4-3-2-1-3' } },
        'F#': { notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#'], fingering: { right: '2-3-1-2-3-4-1-2', left: '4-3-2-1-3-2-1-2' } }
    },
    minor: {
        A: { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        E: { notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D', 'E'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        B: { notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A', 'B'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        D: { notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C', 'D'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        G: { notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        C: { notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab',        'Bb', 'C'], fingering: { right: '1-2-3-1-2-3-4-5', left: '5-4-3-2-1-3-2-1' } },
        F: { notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F'], fingering: { right: '1-2-3-4-1-2-3-4', left: '5-4-3-2-1-3-2-1' } }
    }
};

async function openScale(key, type) {
    const scale = scales[type][key];
    if (!scale) return;
    
    await initAudio();
    const listening = await startListening();
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="scale-practice-modal">
            <h2>${key} ${type}</h2>
            
            <div class="scale-visual">
                <div class="scale-notes">
                    ${scale.notes.map((n, i) => `<span class="scale-note" data-index="${i}">${n}</span>`).join('')}
                </div>
            </div>
            
            <div class="fingering-guide">
                <div class="hand">
                    <h4>Right Hand</h4>
                    <div class="fingers">${scale.fingering.right.split('-').map(f => `<span class="finger">${f}</span>`).join('')}</div>
                </div>
                <div class="hand">
                    <h4>Left Hand</h4>
                    <div class="fingers">${scale.fingering.left.split('-').map(f => `<span class="finger">${f}</span>`).join('')}</div>
                </div>
            </div>
            
            <div class="scale-metronome">
                <label>BPM: <input type="range" id="scale-bpm" min="40" max="120" value="60"></label>
                <span id="scale-bpm-value">60</span>
                <button class="neon-btn" onclick="toggleScaleMetronome()">▶ Play</button>
            </div>
            
            <div class="scale-detection">
                <h4>🎹 Play the scale - I'm listening!</h4>
                <div class="current-note" id="current-scale-note">${scale.notes[0]}</div>
                <div class="detected-note" id="detected-scale-note">-</div>
                <div class="scale-progress">
                    <span id="scale-progress">0 / ${scale.notes.length}</span>
                </div>
            </div>
            
            <button class="neon-btn success" onclick="markScaleLearned('${key}', '${type}')">✓ Mark as Learned</button>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Setup BPM slider
    const bpmSlider = document.getElementById('scale-bpm');
    const bpmValue = document.getElementById('scale-bpm-value');
    if (bpmSlider) {
        bpmSlider.addEventListener('input', () => {
            bpmValue.textContent = bpmSlider.value;
        });
    }
    
    // Start detection
    if (listening) {
        runScaleDetection(scale);
    }
}

let scaleMetronomeInterval = null;
function toggleScaleMetronome() {
    if (scaleMetronomeInterval) {
        clearInterval(scaleMetronomeInterval);
        scaleMetronomeInterval = null;
        return;
    }
    
    const bpm = parseInt(document.getElementById('scale-bpm')?.value || 60);
    const interval = 60000 / bpm;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    scaleMetronomeInterval = setInterval(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.3;
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, interval);
}

let scaleNoteIndex = 0;
let scaleCorrectCount = 0;

function runScaleDetection(scale) {
    scaleNoteIndex = 0;
    scaleCorrectCount = 0;
    
    const detect = () => {
        if (!isListening) return;
        
        const result = detectPitch();
        if (result) {
            const detectedEl = document.getElementById('detected-scale-note');
            const currentEl = document.getElementById('current-scale-note');
            const progressEl = document.getElementById('scale-progress');
            const noteEls = document.querySelectorAll('.scale-note');
            
            if (detectedEl) {
                detectedEl.textContent = result.note;
            }
            
            const targetNote = scale.notes[scaleNoteIndex];
            const noteMatch = result.note === targetNote || result.note.startsWith(targetNote);
            
            if (noteMatch) {
                if (noteEls[scaleNoteIndex]) {
                    noteEls[scaleNoteIndex].classList.add('played');
                }
                
                scaleCorrectCount++;
                scaleNoteIndex++;
                
                if (scaleNoteIndex >= scale.notes.length) {
                    scaleNoteIndex = 0; // Loop back
                }
                
                if (currentEl) {
                    currentEl.textContent = scale.notes[scaleNoteIndex];
                }
                
                if (progressEl) {
                    progressEl.textContent = `${scaleCorrectCount} / ${scale.notes.length}`;
                }
            }
        }
        
        if (document.querySelector('.scale-practice-modal')) {
            requestAnimationFrame(detect);
        }
    };
    
    detect();
}

function markScaleLearned(key, type) {
    const scaleKey = `${key}-${type}`;
    if (!state.learnedScales.includes(scaleKey)) {
        state.learnedScales.push(scaleKey);
        localStorage.setItem('learnedScales', JSON.stringify(state.learnedScales));
        addXP(25, 'Learned scale: ' + scaleKey);
    }
    
    stopListening();
    if (scaleMetronomeInterval) {
        clearInterval(scaleMetronomeInterval);
        scaleMetronomeInterval = null;
    }
    
    closeModal();
    showToast(`${key} ${type} learned! +25 XP`, 'success');
    updateHomeStats();
}

// ============== CIRCLE OF FIFTHS ==============
const circleOfFifths = {
    major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
    minor: ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'eb', 'bb', 'f', 'c', 'g', 'd'],
    sharps: [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1]
};

function openCircleOfFifths() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="circle-modal">
            <h2>🎯 Circle of Fifths</h2>
            <p class="circle-desc">The Circle of Fifths shows the relationship between all 12 major and minor keys. Moving clockwise adds sharps, counter-clockwise adds flats.</p>
            
            <div class="circle-visual">
                ${circleOfFifths.major.map((key, i) => `
                    <div class="circle-segment" style="--rotation: ${i * 25.7}deg" onclick="selectCircleKey('${key}')">
                        <span class="major">${key}</span>
                        <span class="minor">${circleOfFifths.minor[i]}</span>
                        <span class="accidentals">${circleOfFifths.sharps[i] > 0 ? '♯' + circleOfFifths.sharps[i] : ''}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="circle-info">
                <h4>How to Use:</h4>
                <ul>
                    <li>Keys next to each other are closely related</li>
                    <li>Click any key to practice its scale</li>
                    <li>Relative minor is shown below each major</li>
                    <li>♯ = sharps, ♭ = flats</li>
                </ul>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function selectCircleKey(key) {
    openScale(key, 'major');
}

// ============== GENRE PROGRESSIONS ==============
const genreProgressions = {
    'Trap/Hip-Hop': [
        { name: 'Dark Trap', progression: 'Am - F - C - G', notes: ['A', 'C', 'E', 'F', 'A', 'C', 'C', 'E', 'G', 'B', 'D'], mood: 'Aggressive, dark' },
        { name: 'Drill', progression: 'Am - Ab - G - F', notes: ['A', 'C', 'E', 'Ab', 'C', 'Eb'], mood: 'UK Drill style' },
        { name: 'Melodic Trap', progression: 'Dm - Am - Bb - F', notes: ['D', 'F', 'A', 'A', 'C', 'E', 'Bb', 'D', 'F'], mood: 'Emotional, melodic' }
    ],
    'R&B/Soul': [
        { name: 'Neo-Soul', progression: 'Dmaj7 - Em7 - F#m7 - Gmaj7', notes: ['D', 'F#', 'A', 'C#', 'E', 'G', 'B', 'D'], mood: 'Smooth, jazzy' },
        { name: 'Drake Style', progression: 'Am - F - C - G', notes: ['A', 'C', 'E', 'F', 'A', 'C', 'C', 'E', 'G'], mood: 'Melancholic' }
    ],
    'Jazz': [
        { name: 'ii-V-I', progression: 'Dm7 - G7 - Cmaj7', notes: ['D', 'F', 'A', 'C', 'G', 'B', 'D', 'F', 'C', 'E', 'G', 'B'], mood: 'Essential jazz progression' },
        { name: 'Circle VI-II-V-I', progression: 'Am7 - Dm7 - G7 - Cmaj7', notes: ['A', 'C', 'E', 'G', 'D', 'F', 'A', 'C', 'G', 'B', 'D', 'F', 'C', 'E', 'G', 'B'], mood: 'Extended jazz' }
    ],
    'Pop': [
        { name: 'I-V-vi-IV', progression: 'C - G - Am - F', notes: ['C', 'E', 'G', 'G', 'B', 'D', 'A', 'C', 'E', 'F', 'A', 'C'], mood: 'Most popular progression' },
        { name: 'vi-IV-I-V', progression: 'Am - F - C - G', notes: ['A', 'C', 'E', 'F', 'A', 'C', 'C', 'E', 'G', 'G', 'B', 'D'], mood: 'Emotional pop' }
    ]
};

async function openGenreProgressions() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="genre-modal">
            <h2>🎵 Genre Chord Progressions</h2>
            <p>Click a progression to practice it with audio detection</p>
            
            <div class="genre-tabs">
                ${Object.keys(genreProgressions).map(genre => `
                    <button class="genre-tab" onclick="showGenreProgressions('${genre}')">${genre}</button>
                `).join('')}
            </div>
            
            <div class="genre-content" id="genre-content">
                <p>Select a genre to see progressions</p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function showGenreProgressions(genre) {
    const content = document.getElementById('genre-content');
    const progressions = genreProgressions[genre];
    
    content.innerHTML = progressions.map(p => `
        <div class="progression-card" onclick="practiceProgression('${p.name}', '${p.progression}', ${JSON.stringify(p.notes).replace(/"/g, "'")})">
            <h4>${p.name}</h4>
            <div class="chord-progression">${p.progression}</div>
            <p class="mood">${p.mood}</p>
        </div>
    `).join('');
}

async function practiceProgression(name, progression, notes) {
    await initAudio();
    await startListening();
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="progression-practice">
            <h2>${name}</h2>
            <div class="chord-display">${progression}</div>
            
            <div class="progression-notes">
                <h4>Notes to play:</h4>
                <div class="notes-row">
                    ${notes.map(n => `<span class="note-badge">${n}</span>`).join('')}
                </div>
            </div>
            
            <div class="detection-area">
                <h4>🎹 Listening...</h4>
                <div class="detected-note" id="prog-detected">-</div>
            </div>
            
            <button class="neon-btn" onclick="openGenreProgressions()">← Back</button>
        </div>
    `;
    
    // Run detection
    const detect = () => {
        if (!isListening || !document.querySelector('.progression-practice')) return;
        
        const result = detectPitch();
        if (result) {
            const el = document.getElementById('prog-detected');
            if (el) el.textContent = result.note;
        }
        
        requestAnimationFrame(detect);
    };
    detect();
}

// ============== TOOLS METRONOME ==============
let metronomeInterval = null;
let metronomePlaying = false;

function toggleMetronome() {
    const btn = document.getElementById('toggle-metronome');
    const bpmSlider = document.getElementById('bpm-slider');
    const bpm = parseInt(bpmSlider?.value || 60);
    
    if (metronomePlaying) {
        clearInterval(metronomeInterval);
        metronomePlaying = false;
        if (btn) btn.textContent = '▶ Start';
    } else {
        metronomePlaying = true;
        if (btn) btn.textContent = '⏸ Stop';
        
        const interval = 60000 / bpm;
        
        metronomeInterval = setInterval(() => {
            playMetronomeClick();
        }, interval);
    }
}

function playMetronomeClick() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.value = 0.5;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

// ============== DARK MODE ==============
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
    applyTheme();
    // Modal close button
    document.getElementById('modal-close')?.addEventListener('click', closeModal);

}

function applyTheme() {
    document.body.classList.toggle('light-mode', !state.darkMode);
}

// ============== ACCOUNT SYSTEM ==============
function showAccountModal() {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="account-modal">
            <h2>🔐 Account</h2>
            <p>Create an account to sync your progress across devices</p>
            
            <div class="account-tabs">
                <button class="tab active" onclick="showLoginTab()">Login</button>
                <button class="tab" onclick="showSignupTab()">Sign Up</button>
            </div>
            
            <div class="form-group">
                <input type="email" placeholder="Email" id="account-email">
                <input type="password" placeholder="Password" id="account-password">
                <button class="neon-btn" onclick="handleLogin()">Login</button>
            </div>
            
            <div class="divider">or</div>
            
            <button class="neon-btn google" onclick="handleGoogleLogin()">🔗 Sign in with Google</button>
        </div>
    `;
    
    modal.classList.add('active');
}

function handleLogin() {
    showToast('Login feature coming soon!', 'info');
}

function handleGoogleLogin() {
    showToast('Google login coming soon!', 'info');
}

// ============== NAVIGATION ==============
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchSection(this.dataset.section);
        });
    });
    
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchSection(this.dataset.action);
        });
    });
    
    const startBtn = document.getElementById('start-practice');
    if (startBtn) startBtn.addEventListener('click', startPractice);
    
    const endBtn = document.getElementById('end-session-btn');
    if (endBtn) endBtn.addEventListener('click', endPractice);
}

function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    
    window.scrollTo(0, 0);
}

// ============== PRACTICE SESSION ==============
let sessionStartTime = null;
let sessionInterval = null;

function startPractice() {
    sessionStartTime = Date.now();
    document.getElementById('session-indicator').style.display = 'flex';
    sessionInterval = setInterval(updateTimer, 1000);
    switchSection('drills');
    showToast('Practice session started! 🎹', 'success');
}

function updateTimer() {
    if (!sessionStartTime) return;
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    document.getElementById('session-time').textContent = mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
}

function endPractice() {
    if (!sessionStartTime) return;
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000 / 60) || 1;
    logPractice(elapsed);
    clearInterval(sessionInterval);
    sessionInterval = null;
    sessionStartTime = null;
    document.getElementById('session-indicator').style.display = 'none';
    switchSection('home');
    showToast('Practice complete! ' + elapsed + ' minutes logged', 'success');
}

function logPractice(minutes) {
    state.practiceLog.push({ duration: minutes, timestamp: Date.now() });
    localStorage.setItem('practiceLog', JSON.stringify(state.practiceLog));
    updateStreak();
    addXP(minutes * 10, 'Practice session');
    updateHomeStats();
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastPractice = localStorage.getItem('lastPractice');
    if (lastPractice !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (lastPractice === yesterday) state.streak++;
        else state.streak = 1;
        localStorage.setItem('streak', state.streak);
        localStorage.setItem('lastPractice', today);
    }
}

function addXP(amount, reason) {
    state.totalXP += amount;
    localStorage.setItem('total_xp', state.totalXP);
    const level = Math.floor(state.totalXP / 500) + 1;
    document.getElementById('user-level').textContent = level;
}

function updateHomeStats() {
    document.getElementById('home-streak').textContent = state.streak;
    document.getElementById('home-xp').textContent = state.totalXP;
    document.getElementById('user-level').textContent = Math.floor(state.totalXP / 500) + 1;
    const today = new Date().toDateString();
    const todayMinutes = state.practiceLog.filter(e => new Date(e.timestamp).toDateString() === today).reduce((acc, e) => acc + (e.duration || 0), 0);
    document.getElementById('home-time').textContent = todayMinutes + 'm';
    document.getElementById('drills-completed').textContent = state.completedDrills.length;
    document.getElementById('scales-learned').textContent = state.learnedScales.length;
    const xpInLevel = state.totalXP % 500;
    document.getElementById('xp-fill').style.width = ((xpInLevel / 500) * 100) + '%';
}

// RENDER DRILLS
function renderDrills() {
    renderDrillList('finger-drills', drills.finger);
    renderDrillList('coordination-drills', drills.coordination);
    renderDrillList('speed-drills', drills.speed);
    renderDrillList('rhythm-drills', drills.rhythm);
}

function renderDrillList(containerId, drillList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = drillList.map(drill => '<div class="drill-item ' + (state.completedDrills.includes(drill.id) ? 'completed' : '') + '" onclick="openDrill(drills.' + containerId.replace("-drills","") + '.find(d=>d.id===\'' + drill.id + '\'))"><span class="drill-name">' + drill.name + '</span><span class="drill-duration">' + drill.bpm + ' BPM</span></div>').join('');
}

// MODAL & TOAST
function closeModal() { document.getElementById('modal').classList.remove('active'); stopListening(); }
function showToast(msg, type) { const t = document.createElement('div'); t.className = 'toast-glass ' + type; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 3000); }

// INIT
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderDrills();
    updateHomeStats();
    applyTheme();
    // Modal close button
    document.getElementById('modal-close')?.addEventListener('click', closeModal);

    
    // Scale buttons
    document.getElementById('generate-scale')?.addEventListener('click', () => {
        const type = document.getElementById('scale-type').value;
        const key = document.getElementById('key-root').value;
        openScale(key, type);
    });
    
    // Tool buttons
    document.getElementById('toggle-metronome')?.addEventListener('click', toggleMetronome);
    document.getElementById('open-circle')?.addEventListener('click', openCircleOfFifths);
    document.getElementById('open-progressions')?.addEventListener('click', openGenreProgressions);
    document.getElementById('start-detection')?.addEventListener('click', async () => {
        await initAudio();
        await startListening();
        showToast('Listening... Play a note!', 'success');
    });
    
    // Settings
    document.getElementById('dark-mode')?.addEventListener('change', toggleDarkMode);
    document.getElementById('clear-data')?.addEventListener('click', () => {
        if (confirm('Clear all data?')) { localStorage.clear(); location.reload(); }
    });
});

// ============== EAR TRAINING ==============
let earTraining = null;

async function startIntervalTraining() {
    if (!earTraining) earTraining = new EarTraining();
    await earTraining.init();
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    const quiz = earTraining.generateQuiz(1)[0];
    
    body.innerHTML = `
        <div class="ear-training-modal">
            <h2>🎹 Interval Training</h2>
            <p>Listen and identify the interval</p>
            
            <button class="neon-btn large" onclick="playQuizInterval(${quiz.interval.semitones})">
                🔊 Play Interval
            </button>
            
            <div class="quiz-options">
                ${quiz.options.map(o => `
                    <button class="neon-btn option" onclick="checkIntervalAnswer('${o.name}', '${quiz.interval.name}')">
                        ${o.name}
                    </button>
                `).join('')}
            </div>
            
            <div class="interval-hint">
                <p>💡 Song reference: ${quiz.interval.song}</p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

async function playQuizInterval(semitones) {
    if (!earTraining) earTraining = new EarTraining();
    await earTraining.init();
    await earTraining.playInterval(semitones, 'C4');
}

function checkIntervalAnswer(selected, correct) {
    if (selected === correct) {
        showToast('Correct! 🎉', 'success');
        addXP(10, 'Correct interval');
    } else {
        showToast('Try again! It was ' + correct, 'error');
    }
    setTimeout(() => startIntervalTraining(), 1500);
}

async function startChordQuiz() {
    const chordPlayer = new ChordPlayer();
    await chordPlayer.init();
    
    const chordTypes = Object.keys(ChordShapes);
    const correctType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
    const chord = buildChord('C', correctType);
    
    // Generate options
    const options = [correctType];
    while (options.length < 4) {
        const random = chordTypes[Math.floor(Math.random() * chordTypes.length)];
        if (!options.includes(random)) options.push(random);
    }
    options.sort(() => Math.random() - 0.5);
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="ear-training-modal">
            <h2>🎵 Chord Recognition</h2>
            <p>Listen and identify the chord type</p>
            
            <button class="neon-btn large" onclick="playChordQuiz()">🔊 Play Chord</button>
            
            <div class="quiz-options">
                ${options.map(o => `
                    <button class="neon-btn option" onclick="checkChordAnswer('${o}', '${correctType}')">
                        ${o.replace('major', 'Major').replace('minor', 'Minor')}
                    </button>
                `).join('')}
            </div>
            
            <div class="chord-notes">
                <p>Notes: ${chord.join(' - ')}</p>
                <p>Mood: ${ChordShapes[correctType].mood}</p>
            </div>
        </div>
    `;
    
    window.currentChordQuiz = { notes: chord };
    modal.classList.add('active');
}

async function playChordQuiz() {
    const player = new ChordPlayer();
    await player.init();
    if (window.currentChordQuiz) {
        await player.playChord(window.currentChordQuiz.notes, 1.5);
    }
}

function checkChordAnswer(selected, correct) {
    if (selected === correct) {
        showToast('Correct! 🎵', 'success');
        addXP(15, 'Correct chord');
    } else {
        showToast('Not quite! It was ' + correct, 'error');
    }
    setTimeout(() => startChordQuiz(), 1500);
}

async function startPitchMatch() {
    await initAudio();
    await startListening();
    
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const targetNote = notes[Math.floor(Math.random() * notes.length)] + '4';
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="ear-training-modal">
            <h2>🎯 Pitch Matching</h2>
            <p>Play this note on your piano</p>
            
            <div class="target-note-large">${targetNote}</div>
            
            <div class="detection-area">
                <h4>🎹 I'm listening...</h4>
                <div class="detected-note" id="pitch-detected">-</div>
            </div>
            
            <div class="pitch-feedback" id="pitch-feedback"></div>
        </div>
    `;
    
    modal.classList.add('active');
    
    window.targetPitch = targetNote;
    runPitchDetection();
}

function runPitchDetection() {
    const detect = () => {
        if (!isListening) return;
        
        const result = detectPitch();
        if (result) {
            const detectedEl = document.getElementById('pitch-detected');
            const feedbackEl = document.getElementById('pitch-feedback');
            
            if (detectedEl) detectedEl.textContent = result.full;
            
            const target = window.targetPitch?.replace(/\d/g, '');
            const played = result.note;
            
            if (target === played) {
                if (feedbackEl) {
                    feedbackEl.textContent = '✓ Perfect match!';
                    feedbackEl.className = 'pitch-feedback correct';
                }
                addXP(5, 'Pitch matched');
                showToast('+5 XP!', 'success');
            }
        }
        
        if (document.querySelector('.ear-training-modal')) {
            requestAnimationFrame(detect);
        }
    };
    detect();
}

// ============== SONGS SECTION ==============
function renderSongs(filter = 'all') {
    const container = document.getElementById('song-list');
    if (!container) return;
    
    let songs = [];
    for (const [category, categorySongs] of Object.entries(songLibrary)) {
        categorySongs.forEach(song => {
            songs.push({ ...song, category });
        });
    }
    
    if (filter !== 'all') {
        songs = songs.filter(s => s.category === filter);
    }
    
    container.innerHTML = songs.map(song => `
        <div class="song-card" onclick="openSongPractice('${song.id}', '${song.category}')">
            <div class="song-cover">
                ${song.category === 'classical' ? '🎼' : song.category === 'pop' ? '🎤' : song.category === 'jazz' ? '🎷' : song.category === 'hiphop' ? '🎧' : '🎵'}
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.composer}</div>
                <div class="song-meta">
                    <span>${song.tempo} BPM</span>
                    <span>${song.timeSignature}</span>
                    <span>${Math.floor(song.duration / 60)}m</span>
                </div>
                <div class="song-difficulty">
                    ${[1,2,3,4,5].map(i => `<span class="diff-dot ${i <= song.difficulty ? 'filled' : ''}"></span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function filterSongs(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'All'));
    });
    renderSongs(category);
}

async function openSongPractice(songId, category) {
    const song = songLibrary[category]?.find(s => s.id === songId);
    if (!song) return;
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="song-practice-modal">
            <h2>${song.title}</h2>
            <p class="song-composer">${song.composer}</p>
            
            <div class="practice-controls">
                <div class="control-group">
                    <label>Hand:</label>
                    <select id="hand-mode" onchange="changeHandMode(this.value)">
                        <option value="both">Both Hands</option>
                        <option value="right">Right Hand Only</option>
                        <option value="left">Left Hand Only</option>
                    </select>
                </div>
                <div class="control-group">
                    <label>Speed:</label>
                    <input type="range" id="song-speed" min="50" max="150" value="${song.tempo}" oninput="document.getElementById('speed-val').textContent = this.value">
                    <span id="speed-val">${song.tempo}</span> BPM
                </div>
            </div>
            
            <div class="song-notes-display">
                <h4>Notes to Play:</h4>
                <div class="notes-sequence" id="notes-sequence">
                    ${song.rightHand.slice(0, 10).map((n, i) => `<span class="sequence-note" data-index="${i}">${n}</span>`).join('')}
                    ${song.rightHand.length > 10 ? '<span class="more-notes">...</span>' : ''}
                </div>
            </div>
            
            <div class="practice-buttons">
                <button class="neon-btn" onclick="playSongDemo('${songId}', '${category}')">🔊 Preview</button>
                <button class="neon-btn success" onclick="startSongPractice('${songId}', '${category}')">▶ Start Practice</button>
            </div>
            
            <div class="song-info-extra">
                <p>🎹 ${song.rightHand.length} notes (RH) • ${song.leftHand.length} notes (LH)</p>
                <p>⏱️ Duration: ${Math.floor(song.duration / 60)}m ${song.duration % 60}s</p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function changeHandMode(mode) {
    window.currentHandMode = mode;
}

async function playSongDemo(songId, category) {
    const song = songLibrary[category]?.find(s => s.id === songId);
    if (!song) return;
    
    const player = new SongPlayer();
    await player.init();
    player.loadSong(songId, category);
    
    const notes = window.currentHandMode === 'left' ? song.leftHand : 
                  window.currentHandMode === 'right' ? song.rightHand : 
                  [...song.rightHand];
    
    for (const note of notes.slice(0, 10)) {
        await player.playNote(note, 0.3);
        await new Promise(r => setTimeout(r, 400));
    }
}

async function startSongPractice(songId, category) {
    const song = songLibrary[category]?.find(s => s.id === songId);
    if (!song) return;
    
    await initAudio();
    await startListening();
    
    const bpm = parseInt(document.getElementById('song-speed')?.value || song.tempo);
    const handMode = window.currentHandMode || 'both';
    
    const notes = handMode === 'left' ? song.leftHand : 
                  handMode === 'right' ? song.rightHand : 
                  song.rightHand;
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="practice-active">
            <h2>${song.title}</h2>
            
            <div class="practice-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="song-progress" style="width: 0%"></div>
                </div>
                <span id="note-counter">0 / ${notes.length}</span>
            </div>
            
            <div class="current-note-display">
                <span class="note-label">Play:</span>
                <span class="current-note" id="current-target-note">${notes[0]}</span>
            </div>
            
            <div class="detection-area">
                <h4>🎹 Listening...</h4>
                <div class="detected-note" id="song-detected">-</div>
            </div>
            
            <div class="stats-live">
                <span>✓ <span id="correct-count">0</span></span>
                <span>✗ <span id="wrong-count">0</span></span>
            </div>
        </div>
    `;
    
    window.songState = {
        notes,
        currentIndex: 0,
        correct: 0,
        wrong: 0,
        startTime: Date.now()
    };
    
    runSongDetection();
}

function runSongDetection() {
    const detect = () => {
        if (!isListening || !window.songState) return;
        
        const result = detectPitch();
        if (result) {
            const detectedEl = document.getElementById('song-detected');
            if (detectedEl) detectedEl.textContent = result.full;
            
            const state = window.songState;
            const targetNote = state.notes[state.currentIndex];
            
            // Check if correct
            const targetClean = targetNote.replace(/\d/g, '');
            const playedClean = result.note;
            
            if (targetClean === playedClean) {
                state.correct++;
                state.currentIndex++;
                
                document.getElementById('correct-count').textContent = state.correct;
                document.getElementById('note-counter').textContent = `${state.currentIndex} / ${state.notes.length}`;
                
                const progressPercent = (state.currentIndex / state.notes.length) * 100;
                document.getElementById('song-progress').style.width = progressPercent + '%';
                
                if (state.currentIndex < state.notes.length) {
                    document.getElementById('current-target-note').textContent = state.notes[state.currentIndex];
                } else {
                    // Completed!
                    const duration = Math.round((Date.now() - state.startTime) / 60000);
                    completeSongPractice(state.correct, state.notes.length, duration);
                    return;
                }
            }
        }
        
        requestAnimationFrame(detect);
    };
    detect();
}

function completeSongPractice(correct, total, duration) {
    stopListening();
    
    const accuracy = Math.round((correct / total) * 100);
    const xpEarned = Math.round(accuracy / 2);
    addXP(xpEarned, 'Song completed');
    
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="song-complete">
            <h2>🎉 Song Complete!</h2>
            
            <div class="completion-stats">
                <div class="stat">
                    <span class="big">${accuracy}%</span>
                    <span class="label">Accuracy</span>
                </div>
                <div class="stat">
                    <span class="big">${correct}/${total}</span>
                    <span class="label">Notes</span>
                </div>
                <div class="stat">
                    <span class="big">${duration}m</span>
                    <span class="label">Duration</span>
                </div>
            </div>
            
            <div class="xp-earned">
                +${xpEarned} XP
            </div>
            
            <button class="neon-btn success" onclick="closeModal(); renderSongs();">Continue</button>
        </div>
    `;
    
    // Record in stats
    const songsCompleted = JSON.parse(localStorage.getItem('songsCompleted') || '[]');
    songsCompleted.push({ accuracy, total, duration, timestamp: Date.now() });
    localStorage.setItem('songsCompleted', JSON.stringify(songsCompleted));
}

// Initialize songs on page load
document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
});

// ============== SESSION DISPLAY INIT ==============
let sessionDisplay = null;

function initSessionDisplay() {
    sessionDisplay = new SessionDisplay('session-display');
    sessionDisplay.render();
}

document.addEventListener('DOMContentLoaded', () => {
    initSessionDisplay();
});

// ============== THEORY LESSON FUNCTION ==============
function showTheoryLesson(topic) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    const lessons = {
        scales: {
            title: '🎵 Scales & Modes',
            content: `
                <div class="theory-lesson">
                    <h3>What is a Scale?</h3>
                    <p>A scale is a sequence of notes in ascending or descending order, based on a specific pattern of intervals.</p>
                    
                    <h4>Major Scale Pattern</h4>
                    <p>W-W-H-W-W-W-H (W=Whole step, H=Half step)</p>
                    <p><strong>Example:</strong> C Major = C-D-E-F-G-A-B-C</p>
                    
                    <h4>Natural Minor Scale Pattern</h4>
                    <p>W-H-W-W-H-W-W</p>
                    <p><strong>Example:</strong> A Minor = A-B-C-D-E-F-G-A</p>
                    
                    <h4>The 7 Modes</h4>
                    <ul>
                        <li><strong>Ionian</strong> - Major scale (happy, bright)</li>
                        <li><strong>Dorian</strong> - Minor with raised 6th (jazz, soulful)</li>
                        <li><strong>Phrygian</strong> - Minor with flattened 2nd (Spanish, exotic)</li>
                        <li><strong>Lydian</strong> - Major with raised 4th (dreamy, ethereal)</li>
                        <li><strong>Mixolydian</strong> - Major with flattened 7th (blues, rock)</li>
                        <li><strong>Aeolian</strong> - Natural minor (sad, melancholic)</li>
                        <li><strong>Locrian</strong> - Diminished (tense, unstable)</li>
                    </ul>
                </div>
            `
        },
        chords: {
            title: '🎹 Chord Theory',
            content: `
                <div class="theory-lesson">
                    <h3>What is a Chord?</h3>
                    <p>A chord is three or more notes played simultaneously. The most common are triads (3-note chords).</p>
                    
                    <h4>Major Chord</h4>
                    <p>Root + Major 3rd + Perfect 5th</p>
                    <p><strong>Formula:</strong> 4 + 3 semitones</p>
                    <p><strong>Example:</strong> C Major = C-E-G</p>
                    
                    <h4>Minor Chord</h4>
                    <p>Root + Minor 3rd + Perfect 5th</p>
                    <p><strong>Formula:</strong> 3 + 4 semitones</p>
                    <p><strong>Example:</strong> C Minor = C-Eb-G</p>
                    
                    <h4>Diminished Chord</h4>
                    <p>Root + Minor 3rd + Diminished 5th</p>
                    <p><strong>Formula:</strong> 3 + 3 semitones</p>
                    <p><strong>Example:</strong> C Dim = C-Eb-Gb</p>
                    
                    <h4>Augmented Chord</h4>
                    <p>Root + Major 3rd + Augmented 5th</p>
                    <p><strong>Formula:</strong> 4 + 4 semitones</p>
                    <p><strong>Example:</strong> C Aug = C-E-G#</p>
                    
                    <h4>7th Chords</h4>
                    <ul>
                        <li><strong>Major 7:</strong> Major triad + Major 7th</li>
                        <li><strong>Dominant 7:</strong> Major triad + Minor 7th</li>
                        <li><strong>Minor 7:</strong> Minor triad + Minor 7th</li>
                        <li><strong>Half-Dim 7:</strong> Dim triad + Minor 7th</li>
                        <li><strong>Dim 7:</strong> Dim triad + Diminished 7th</li>
                    </ul>
                </div>
            `
        },
        circle: {
            title: '🎼 Circle of Fifths',
            content: `
                <div class="theory-lesson">
                    <h3>Understanding the Circle of Fifths</h3>
                    <p>The Circle of Fifths shows the relationship between all 12 major and minor keys.</p>
                    
                    <h4>How It Works</h4>
                    <p>Moving clockwise: Add one sharp (or remove one flat)</p>
                    <p>Moving counterclockwise: Add one flat (or remove one sharp)</p>
                    
                    <h4>Major Keys (Clockwise from C)</h4>
                    <p>C → G → D → A → E → B → F# → C#</p>
                    <p>C → F → Bb → Eb → Ab → Db → Gb → Cb</p>
                    
                    <h4>Key Signatures</h4>
                    <ul>
                        <li><strong>C Major / A Minor:</strong> No sharps or flats</li>
                        <li><strong>G Major / E Minor:</strong> 1 sharp (F#)</li>
                        <li><strong>D Major / B Minor:</strong> 2 sharps (F#, C#)</li>
                        <li><strong>F Major / D Minor:</strong> 1 flat (Bb)</li>
                        <li><strong>Bb Major / G Minor:</strong> 2 flats (Bb, Eb)</li>
                    </ul>
                    
                    <h4>Why It Matters</h4>
                    <p>• Finding the relative minor/major of any key</p>
                    <p>• Understanding chord progressions (I-IV-V-I)</p>
                    <p>• Transposing songs to different keys</p>
                    <p>• Memorizing key signatures</p>
                </div>
            `
        },
        modes: {
            title: '🎭 Modes & Moods',
            content: `
                <div class="theory-lesson">
                    <h3>Musical Modes and Their Emotional Qualities</h3>
                    
                    <h4>Ionian (Major)</h4>
                    <p><strong>Sound:</strong> Happy, bright, triumphant</p>
                    <p><strong>Use:</strong> Pop, anthems, celebrations</p>
                    
                    <h4>Dorian</h4>
                    <p><strong>Sound:</strong> Sophisticated, soulful, jazzy</p>
                    <p><strong>Use:</strong> Jazz, funk, R&B</p>
                    
                    <h4>Phrygian</h4>
                    <p><strong>Sound:</strong> Exotic, Spanish, mysterious</p>
                    <p><strong>Use:</strong> Flamenco, metal, film scores</p>
                    
                    <h4>Lydian</h4>
                    <p><strong>Sound:</strong> Dreamy, ethereal, floating</p>
                    <p><strong>Use:</strong> Film scores, ambient music</p>
                    
                    <h4>Mixolydian</h4>
                    <p><strong>Sound:</strong> Bluesy, rock, confident</p>
                    <p><strong>Use:</strong> Rock, blues, jazz</p>
                    
                    <h4>Aeolian (Natural Minor)</h4>
                    <p><strong>Sound:</strong> Sad, melancholic, introspective</p>
                    <p><strong>Use:</strong> Ballads, emo, classical</p>
                    
                    <h4>Locrian</h4>
                    <p><strong>Sound:</strong> Tense, unstable, dark</p>
                    <p><strong>Use:</strong> Avant-garde, metal, horror</p>
                </div>
            `
        }
    };
    
    const lesson = lessons[topic] || lessons.scales;
    
    body.innerHTML = `
        <div class="theory-modal">
            <h2>${lesson.title}</h2>
            ${lesson.content}
            <button class="neon-btn" onclick="closeModal()" style="width: 100%; margin-top: 20px;">Got It!</button>
        </div>
    `;
    
    modal.classList.add('active');
}
