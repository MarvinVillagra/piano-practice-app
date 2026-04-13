// Piano Master - Simple Working App

// ============== STATE ==============
const state = {
    streak: parseInt(localStorage.getItem('streak') || '0'),
    totalXP: parseInt(localStorage.getItem('total_xp') || '0'),
    completedDrills: JSON.parse(localStorage.getItem('completedDrills') || '[]'),
    learnedScales: JSON.parse(localStorage.getItem('learnedScales') || '[]'),
    achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
    practiceLog: JSON.parse(localStorage.getItem('practiceLog') || '[]')
};

// ============== SIMPLE NAVIGATION ==============
function initNavigation() {
    console.log('Initializing navigation...');
    
    // Bottom nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            console.log('Nav clicked:', section);
            switchSection(section);
        });
    });
    
    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            console.log('Action clicked:', action);
            switchSection(action);
        });
    });
    
    // Start practice button
    const startBtn = document.getElementById('start-practice');
    if (startBtn) {
        startBtn.addEventListener('click', startPractice);
    }
    
    // End session button
    const endBtn = document.getElementById('end-session-btn');
    if (endBtn) {
        endBtn.addEventListener('click', endPractice);
    }
    
    console.log('Navigation initialized');
}

function switchSection(sectionId) {
    console.log('Switching to section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    
    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    } else {
        console.error('Section not found:', sectionId);
    }
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ============== PRACTICE SESSION ==============
let sessionStartTime = null;
let sessionInterval = null;

function startPractice() {
    console.log('Starting practice session');
    
    sessionStartTime = Date.now();
    
    // Show session indicator
    const indicator = document.getElementById('session-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
    }
    
    // Start timer
    sessionInterval = setInterval(updateTimer, 1000);
    
    // Go to drills
    switchSection('drills');
    
    // Show toast
    showToast('Practice session started! 🎹', 'success');
}

function updateTimer() {
    if (!sessionStartTime) return;
    
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    
    const timerEl = document.getElementById('session-time');
    if (timerEl) {
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

function endPractice() {
    console.log('Ending practice session');
    
    if (!sessionStartTime) return;
    
    const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000 / 60) || 1;
    
    // Log practice
    logPractice(elapsed);
    
    // Stop timer
    clearInterval(sessionInterval);
    sessionInterval = null;
    sessionStartTime = null;
    
    // Hide indicator
    const indicator = document.getElementById('session-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
    
    // Go to home
    switchSection('home');
    
    // Show toast
    showToast(`Practice complete! ${elapsed} minutes logged 🎉`, 'success');
}

function logPractice(minutes) {
    state.practiceLog.push({
        duration: minutes,
        timestamp: Date.now()
    });
    localStorage.setItem('practiceLog', JSON.stringify(state.practiceLog));
    
    // Update streak
    updateStreak();
    
    // Add XP
    addXP(minutes * 10, 'Practice session');
    
    // Update stats
    updateHomeStats();
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastPractice = localStorage.getItem('lastPractice');
    
    if (lastPractice !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastPractice === yesterday) {
            state.streak++;
        } else if (!lastPractice) {
            state.streak = 1;
        } else {
            state.streak = 1;
        }
        
        localStorage.setItem('streak', state.streak);
        localStorage.setItem('lastPractice', today);
    }
}

function addXP(amount, reason) {
    state.totalXP += amount;
    localStorage.setItem('total_xp', state.totalXP);
    
    const level = Math.floor(state.totalXP / 500) + 1;
    const levelEl = document.getElementById('user-level');
    if (levelEl) {
        levelEl.textContent = level;
    }
}

// ============== HOME STATS ==============
function updateHomeStats() {
    const streakEl = document.getElementById('home-streak');
    const xpEl = document.getElementById('home-xp');
    const levelEl = document.getElementById('user-level');
    
    if (streakEl) streakEl.textContent = state.streak;
    if (xpEl) xpEl.textContent = state.totalXP;
    if (levelEl) levelEl.textContent = Math.floor(state.totalXP / 500) + 1;
    
    // Today's practice
    const today = new Date().toDateString();
    const todayMinutes = state.practiceLog
        .filter(e => new Date(e.timestamp).toDateString() === today)
        .reduce((acc, e) => acc + (e.duration || 0), 0);
    
    const timeEl = document.getElementById('home-time');
    if (timeEl) timeEl.textContent = todayMinutes + 'm';
    
    const drillsEl = document.getElementById('drills-completed');
    if (drillsEl) drillsEl.textContent = state.completedDrills.length;
    
    const scalesEl = document.getElementById('scales-learned');
    if (scalesEl) scalesEl.textContent = state.learnedScales.length;
    
    // XP progress
    const level = Math.floor(state.totalXP / 500) + 1;
    const xpInLevel = state.totalXP % 500;
    const xpFill = document.getElementById('xp-fill');
    if (xpFill) {
        xpFill.style.width = `${(xpInLevel / 500) * 100}%`;
    }
}

// ============== DRILLS ==============
const drills = {
    finger: [
        { id: 'f1', name: 'Hanon Exercise 1', duration: '5 min' },
        { id: 'f2', name: 'Five-Finger Patterns', duration: '3 min' },
        { id: 'f3', name: 'Finger Lifting', duration: '2 min' }
    ],
    coordination: [
        { id: 'c1', name: 'Hands Together', duration: '5 min' },
        { id: 'c2', name: 'Opposite Motion', duration: '3 min' }
    ],
    speed: [
        { id: 's1', name: 'Speed Ladder', duration: '4 min' },
        { id: 's2', name: 'Burst Training', duration: '3 min' }
    ],
    rhythm: [
        { id: 'r1', name: 'Metronome Mastery', duration: '5 min' },
        { id: 'r2', name: 'Rhythm Patterns', duration: '4 min' }
    ]
};

function renderDrills() {
    renderDrillList('finger-drills', drills.finger);
    renderDrillList('coordination-drills', drills.coordination);
    renderDrillList('speed-drills', drills.speed);
    renderDrillList('rhythm-drills', drills.rhythm);
}

function renderDrillList(containerId, drillList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = drillList.map(drill => `
        <div class="drill-item ${state.completedDrills.includes(drill.id) ? 'completed' : ''}" 
             data-drill-id="${drill.id}">
            <span class="drill-name">${drill.name}</span>
            <span class="drill-duration">${drill.duration}</span>
        </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.drill-item').forEach(item => {
        item.addEventListener('click', () => completeDrill(item.dataset.drillId));
    });
}

function completeDrill(drillId) {
    if (!state.completedDrills.includes(drillId)) {
        state.completedDrills.push(drillId);
        localStorage.setItem('completedDrills', JSON.stringify(state.completedDrills));
        addXP(15, 'Completed drill: ' + drillId);
        
        // Update UI
        const item = document.querySelector(`[data-drill-id="${drillId}"]`);
        if (item) item.classList.add('completed');
        
        showToast('Drill completed! +15 XP', 'success');
    }
}

// ============== SCALES ==============
function initScaleControls() {
    const generateBtn = document.getElementById('generate-scale');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateScale);
    }
}

function generateScale() {
    const type = document.getElementById('scale-type').value;
    const key = document.getElementById('key-root').value;
    
    const scaleInfo = document.getElementById('scale-info');
    if (scaleInfo) {
        scaleInfo.innerHTML = `
            <h3>${key} ${type}</h3>
            <p>Scale notes will appear here</p>
            <button class="neon-btn" onclick="learnScale('${key}', '${type}')">
                Mark as Learned
            </button>
        `;
    }
    
    showToast(`Generated ${key} ${type} scale`, 'success');
}

function learnScale(key, type) {
    const scaleKey = `${key}-${type}`;
    if (!state.learnedScales.includes(scaleKey)) {
        state.learnedScales.push(scaleKey);
        localStorage.setItem('learnedScales', JSON.stringify(state.learnedScales));
        addXP(25, 'Learned scale: ' + scaleKey);
        
        updateHomeStats();
        showToast(`Learned ${key} ${type}! +25 XP`, 'success');
    }
}

// ============== TOAST ==============
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-glass ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// ============== MODAL ==============
function showModal(content) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    if (modal && body) {
        body.innerHTML = content;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on click
document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
});

// ============== METRONOME ==============
let metronomeInterval = null;
let metronomePlaying = false;

function initMetronome() {
    const toggleBtn = document.getElementById('toggle-metronome');
    const slider = document.getElementById('bpm-slider');
    const value = document.getElementById('bpm-value');
    
    if (slider && value) {
        slider.addEventListener('input', () => {
            value.textContent = slider.value;
        });
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMetronome);
    }
}

function toggleMetronome() {
    const btn = document.getElementById('toggle-metronome');
    
    if (metronomePlaying) {
        clearInterval(metronomeInterval);
        metronomePlaying = false;
        if (btn) btn.textContent = '▶ Start';
    } else {
        const bpm = parseInt(document.getElementById('bpm-slider')?.value || 60);
        const interval = 60000 / bpm;
        
        metronomePlaying = true;
        if (btn) btn.textContent = '⏸ Stop';
        
        // Simple beep using Web Audio
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        metronomeInterval = setInterval(() => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.value = 880;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }, interval);
    }
}

// ============== INIT ==============
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Initialize everything
    initNavigation();
    renderDrills();
    initScaleControls();
    initMetronome();
    updateHomeStats();
    
    console.log('App initialized');
});
