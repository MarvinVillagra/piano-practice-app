// Piano Master - Circle of Fifths Module
// Interactive circle of fifths visualization and practice

class CircleOfFifths {
    constructor() {
        this.currentKey = 'C';
        this.currentMode = 'major';
        this.container = null;
        this.scaleData = null;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        if (!window.completeScaleLibrary) {
            console.error('Scale library not loaded');
            return;
        }

        this.scaleData = window.completeScaleLibrary;
        this.renderCircle();
        this.renderControls();
    }

    renderCircle() {
        const circle = circleOfFifths.major.map((key, index) => {
            const sharps = circleOfFifths.sharps[index];
            const flats = circleOfFifths.flats[index];
            const minorKey = circleOfFifths.minor[index];
            
            const isCurrent = key === this.currentKey;
            const scaleData = this.scaleData.major[key];
            
            return `
                <div class="circle-key ${isCurrent ? 'current' : ''}" data-key="${key}" data-minor="${minorKey}">
                    <div class="key-main">
                        <span class="key-name">${key}</span>
                        <span class="key-info">
                            ${sharps > 0 ? '♯' + sharps : flats > 0 ? '♭' + flats : ''}
                        </span>
                    </div>
                    <div class="key-minor">${minorKey}</div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="circle-container">
                <div class="circle-inner">
                    ${circle}
                </div>
                <div class="circle-center">
                    <div class="mode-toggle">
                        <button class="mode-btn ${this.currentMode === 'major' ? 'active' : ''}" data-mode="major">Major</button>
                        <button class="mode-btn ${this.currentMode === 'minor' ? 'active' : ''}" data-mode="minor">Minor</button>
                    </div>
                    <div class="current-scale-info">
                        <h4>${this.currentKey} ${this.currentMode}</h4>
                        <div class="scale-notes" id="circle-scale-notes"></div>
                        <div class="scale-actions">
                            <button class="btn-start" onclick="circlePractice.scalePractice()">🎵 Practice Scale</button>
                            <button class="btn-start" onclick="circlePractice.chordPractice()">🎹 Practice Chords</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.addCircleEventListeners();
        this.updateScaleInfo();
    }

    addCircleEventListeners() {
        document.querySelectorAll('.circle-key').forEach(key => {
            key.addEventListener('click', (e) => {
                const keyName = e.currentTarget.dataset.key;
                const minorKey = e.currentTarget.dataset.minor;
                
                this.currentKey = this.currentMode === 'major' ? keyName : minorKey;
                this.updateScaleInfo();
                
                // Update active state
                document.querySelectorAll('.circle-key').forEach(k => k.classList.remove('current'));
                e.currentTarget.classList.add('current');
            });
        });

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.currentMode = mode;
                
                // Update button states
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                this.updateScaleInfo();
            });
        });
    }

    updateScaleInfo() {
        const scaleNotesEl = document.getElementById('circle-scale-notes');
        if (!scaleNotesEl) return;

        const scaleData = this.scaleData[this.currentMode][this.currentKey];
        if (!scaleData) return;

        scaleNotesEl.innerHTML = scaleData.notes.map(n => 
            `<span class="note-badge">${n}</span>`
        ).join('');
    }

    renderControls() {
        const controls = `
            <div class="circle-controls">
                <h3>Circle of Fifths Practice</h3>
                
                <div class="practice-options">
                    <button class="practice-btn" onclick="circlePractice.scaleAroundCircle()">
                        🎵 All Scales Around Circle
                    </button>
                    
                    <button class="practice-btn" onclick="circlePractice.chordProgression()">
                        🎹 Chord Progression Practice
                    </button>
                    
                    <button class="practice-btn" onclick="circlePractice.extendedChords()">
                        🎼 Extended Chords (7ths, 9ths)
                    </button>
                    
                    <button class="practice-btn" onclick="circlePractice.genrePractice()">
                        🎧 Genre-Specific Practice
                    </button>
                </div>
                
                <div class="practice-stats">
                    <h4>Progress Around Circle</h4>
                    <div class="progress-ring">
                        ${circleOfFifths.major.map((key, index) => {
                            const learned = state.learnedScales.includes(`${key}-major`);
                            return `<div class="progress-segment ${learned ? 'learned' : ''}" title="${key}"></div>`;
                        }).join('')}
                    </div>
                    <p>${state.learnedScales.length} / 12 major scales learned</p>
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML('afterend', controls);
    }

    // Practice methods
    scalePractice() {
        const scaleData = this.scaleData[this.currentMode][this.currentKey];
        if (!scaleData) return;

        showDrillModal(`
            <h3>${this.currentKey} ${this.currentMode.charAt(0).toUpperCase() + this.currentMode.slice(1)} Scale</h3>
            <div class="scale-display">
                ${scaleData.notes.map(n => `<span class="note-badge">${n}</span>`).join(' → ')}
            </div>
            
            <div class="practice-instructions">
                <p><strong>Fingering:</strong></p>
                <p>Right Hand: ${scaleData.fingering.right}</p>
                <p>Left Hand: ${scaleData.fingering.left}</p>
                
                <div class="practice-steps">
                    <p>1. Play slowly, hands separately</p>
                    <p>2. Focus on even tone and timing</p>
                    <p>3. Gradually increase speed</p>
                    <p>4. Try hands together</p>
                </div>
            </div>
        `, 'scale');
    }

    chordPractice() {
        const chords = ['major', 'dominant', 'minor', 'half-diminished', 'diminished'];
        const chordSymbols = chords.map(type => 
            `${this.currentKey}${chordTypes[type]}`
        );

        showDrillModal(`
            <h3>${this.currentKey} Chord Qualities</h3>
            <div class="chord-progression">
                ${chordSymbols.map(chord => 
                    `<span class="chord-badge">${chord}</span>`
                ).join(' → ')}
            </div>
            
            <div class="practice-instructions">
                <p><strong>Practice each chord quality:</strong></p>
                <ul>
                    <li>Major - Happy, stable</li>
                    <li>Dominant - Tension, wants to resolve</li>
                    <li>Minor - Sad, melancholic</li>
                    <li>Half-diminished - Mysterious, jazzy</li>
                    <li>Diminished - Unstable, dramatic</li>
                </ul>
                
                <p><strong>Exercise:</strong> Play each chord 4 times, then move to next quality</p>
            </div>
        `, 'chord');
    }

    scaleAroundCircle() {
        showDrillModal(`
            <h3>Circle of Fifths Scale Practice</h3>
            <p>Practice all 12 major scales in circle order:</p>
            
            <div class="circle-practice-order">
                ${circleOfFifths.major.map((key, index) => {
                    const sharps = circleOfFifths.sharps[index];
                    return `<span class="circle-step">${index + 1}. ${key} (${sharps > 0 ? '♯' + sharps : '♭' + circleOfFifths.flats[index]})</span>`;
                }).join('')}
            </div>
            
            <div class="practice-instructions">
                <p><strong>Instructions:</strong></p>
                <p>• Spend 2-3 minutes on each scale</p>
                <p>• Focus on smooth fingering transitions</p>
                <p>• Use metronome at comfortable tempo</p>
                <p>• Complete full circle (about 30 minutes)</p>
            </div>
        `, 'circle');
    }

    chordProgression() {
        const progression = ['I', 'IV', 'V', 'I'];
        const romanNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

        showDrillModal(`
            <h3>Chord Progression Practice</h3>
            <p>Common progressions in ${this.currentKey}:</p>
            
            <div class="progression-grid">
                <div class="progression-item">
                    <h4>Basic (I-IV-V-I)</h4>
                    <div class="chord-progression">
                        ${progression.map(chord => `<span class="chord-badge">${chord}</span>`).join(' → ')}
                    </div>
                </div>
                
                <div class="progression-item">
                    <h4>Pop (I-V-vi-IV)</h4>
                    <div class="chord-progression">
                        <span class="chord-badge">I</span> → <span class="chord-badge">V</span> → <span class="chord-badge">vi</span> → <span class="chord-badge">IV</span>
                    </div>
                </div>
                
                <div class="progression-item">
                    <h4>Jazz (ii-V-I)</h4>
                    <div class="chord-progression">
                        <span class="chord-badge">ii</span> → <span class="chord-badge">V</span> → <span class="chord-badge">I</span>
                    </div>
                </div>
            </div>
            
            <div class="practice-instructions">
                <p><strong>Practice each progression:</strong></p>
                <p>• Play each chord for 4 beats</p>
                <p>• Use left hand for bass notes</p>
                <p>• Right hand for chord voicings</p>
                <p>• Try different rhythms</p>
            </div>
        `, 'progression');
    }

    extendedChords() {
        const chords = ['major7', 'dominant7', 'minor7', 'major9', 'dominant9'];
        
        showDrillModal(`
            <h3>Extended Chords Practice</h3>
            <p>Add color to your playing with extended chords:</p>
            
            <div class="extended-chords-grid">
                ${chords.map(chord => {
                    const data = extendedChords[chord];
                    return `
                        <div class="chord-item">
                            <h4>${this.currentKey}${data.quality}</h4>
                            <p class="chord-mood">${data.mood}</p>
                            <p class="chord-notes">${data.intervals.map(i => getNoteFromInterval(this.currentKey, i)).join(' ')}</p>
                        </div>
                    `;
                }).join('')}
            </div>
        `, 'extended');
    }

    genrePractice() {
        let genreOptions = '';
        for (const [genre, data] of Object.entries(genreScales)) {
            genreOptions += `
                <div class="genre-option" data-genre="${genre}">
                    <h4>${genre}</h4>
                    <p>${data.description}</p>
                    <small>Scales: ${data.scales.join(', ')}</small>
                </div>
            `;
        }

        showDrillModal(`
            <h3>Genre-Specific Practice</h3>
            <p>Choose a genre to explore:</p>
            
            <div class="genre-grid">
                ${genreOptions}
            </div>
        `, 'genre');
    }
}

// Helper function to get note from interval
function getNoteFromInterval(root, interval) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    if (rootIndex === -1) return root;
    
    const noteIndex = (rootIndex + interval) % 12;
    return notes[noteIndex];
}

// Global instance
let circlePractice = new CircleOfFifths();

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('circle-of-fifths')) {
            circlePractice.init('circle-of-fifths');
        }
    }, 500);
});

// Export
if (typeof window !== 'undefined') {
    window.CircleOfFifths = CircleOfFifths;
    window.circlePractice = circlePractice;
    window.getNoteFromInterval = getNoteFromInterval;
}
