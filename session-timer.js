// Piano Master - Practice Timer & Session Tracker

class PracticeTimer {
    constructor() {
        this.startTime = null;
        this.elapsed = 0;
        this.isRunning = false;
        this.interval = null;
        this.targetDuration = 15; // minutes
        this.onTick = null;
        this.onComplete = null;
        this.sessionNotes = [];
    }

    start(targetMinutes = 15) {
        this.startTime = Date.now();
        this.targetDuration = targetMinutes;
        this.isRunning = true;
        this.elapsed = 0;
        this.sessionNotes = [];

        this.interval = setInterval(() => {
            this.elapsed = Date.now() - this.startTime;
            if (this.onTick) {
                this.onTick(this.elapsed, this.targetDuration * 60 * 1000);
            }
            
            // Check if target reached
            if (this.elapsed >= this.targetDuration * 60 * 1000) {
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }, 1000);

        return this.startTime;
    }

    pause() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    resume() {
        if (!this.isRunning && this.startTime) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsed;
            
            this.interval = setInterval(() => {
                this.elapsed = Date.now() - this.startTime;
                if (this.onTick) {
                    this.onTick(this.elapsed, this.targetDuration * 60 * 1000);
                }
            }, 1000);
        }
    }

    stop() {
        this.pause();
        const session = this.getSessionData();
        this.saveSession(session);
        return session;
    }

    getSessionData() {
        return {
            startTime: this.startTime,
            duration: Math.floor(this.elapsed / 60000), // minutes
            targetDuration: this.targetDuration,
            completed: this.elapsed >= this.targetDuration * 60 * 1000,
            notes: this.sessionNotes
        };
    }

    saveSession(session) {
        const sessions = JSON.parse(localStorage.getItem('practiceSessions') || '[]');
        sessions.push({
            ...session,
            endTime: Date.now()
        });
        
        // Keep only last 30 sessions
        if (sessions.length > 30) {
            sessions.shift();
        }
        
        localStorage.setItem('practiceSessions', JSON.stringify(sessions));
        
        // Update total practice time
        const totalTime = parseInt(localStorage.getItem('totalPracticeTime') || '0');
        localStorage.setItem('totalPracticeTime', totalTime + session.duration);
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    getProgress() {
        if (!this.targetDuration) return 0;
        const targetMs = this.targetDuration * 60 * 1000;
        return Math.min(100, (this.elapsed / targetMs) * 100);
    }

    addNote(note) {
        this.sessionNotes.push({
            time: this.formatTime(this.elapsed),
            note
        });
    }
}

// ============== SESSION DISPLAY ==============
class SessionDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.timer = new PracticeTimer();
        this.setupTimerCallbacks();
    }

    setupTimerCallbacks() {
        this.timer.onTick = (elapsed, target) => {
            this.updateDisplay(elapsed, target);
        };

        this.timer.onComplete = () => {
            this.showCompletion();
        };
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="session-timer">
                <div class="timer-display">
                    <span class="timer-time" id="timer-time">00:00</span>
                    <span class="timer-target">/ ${this.timer.targetDuration} min goal</span>
                </div>
                
                <div class="timer-progress">
                    <div class="timer-progress-bar">
                        <div class="timer-progress-fill" id="timer-progress-fill"></div>
                    </div>
                </div>
                
                <div class="timer-controls">
                    <button class="neon-btn" id="timer-start" onclick="sessionDisplay.start()">▶ Start</button>
                    <button class="neon-btn" id="timer-pause" onclick="sessionDisplay.pause()" style="display: none;">⏸ Pause</button>
                    <button class="neon-btn" id="timer-resume" onclick="sessionDisplay.resume()" style="display: none;">▶ Resume</button>
                    <button class="neon-btn danger" id="timer-stop" onclick="sessionDisplay.stop()" style="display: none;">⏹ Stop</button>
                </div>
                
                <div class="session-settings">
                    <label>Goal: 
                        <select id="session-goal" onchange="sessionDisplay.setGoal(this.value)">
                            <option value="10">10 minutes</option>
                            <option value="15" selected>15 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                        </select>
                    </label>
                </div>
                
                <div class="session-notes" id="session-notes" style="display: none;">
                    <h4>Session Notes</h4>
                    <div class="notes-list" id="notes-list"></div>
                    <input type="text" placeholder="Add a note..." id="note-input" onkeypress="if(event.key===\'Enter\')sessionDisplay.addNote(this.value)">
                </div>
            </div>
        `;
    }

    start() {
        const goal = document.getElementById('session-goal')?.value || 15;
        this.timer.start(parseInt(goal));
        
        document.getElementById('timer-start').style.display = 'none';
        document.getElementById('timer-pause').style.display = 'inline-block';
        document.getElementById('timer-stop').style.display = 'inline-block';
        document.getElementById('session-notes').style.display = 'block';
        
        showToast('🎹 Practice session started!', 'success');
    }

    pause() {
        this.timer.pause();
        
        document.getElementById('timer-pause').style.display = 'none';
        document.getElementById('timer-resume').style.display = 'inline-block';
    }

    resume() {
        this.timer.resume();
        
        document.getElementById('timer-resume').style.display = 'none';
        document.getElementById('timer-pause').style.display = 'inline-block';
    }

    stop() {
        const session = this.timer.stop();
        
        document.getElementById('timer-start').style.display = 'inline-block';
        document.getElementById('timer-pause').style.display = 'none';
        document.getElementById('timer-resume').style.display = 'none';
        document.getElementById('timer-stop').style.display = 'none';
        
        showToast(`Session complete! ${session.duration} minutes logged`, 'success');
        
        // Show session summary
        this.showSummary(session);
    }

    updateDisplay(elapsed, target) {
        const timeEl = document.getElementById('timer-time');
        const progressEl = document.getElementById('timer-progress-fill');
        
        if (timeEl) {
            timeEl.textContent = this.timer.formatTime(elapsed);
        }
        
        if (progressEl) {
            const percent = Math.min(100, (elapsed / target) * 100);
            progressEl.style.width = percent + '%';
            
            // Color based on progress
            if (percent >= 100) {
                progressEl.style.background = 'var(--gradient-success)';
            } else if (percent >= 50) {
                progressEl.style.background = 'linear-gradient(90deg, #FFE66D, #06FFA5)';
            }
        }
    }

    setGoal(minutes) {
        this.timer.targetDuration = parseInt(minutes);
        const targetEl = document.querySelector('.timer-target');
        if (targetEl) {
            targetEl.textContent = `/ ${minutes} min goal`;
        }
    }

    addNote(note) {
        if (!note.trim()) return;
        
        this.timer.addNote(note);
        
        const input = document.getElementById('note-input');
        if (input) input.value = '';
        
        const notesList = document.getElementById('notes-list');
        if (notesList) {
            const noteEl = document.createElement('div');
            noteEl.className = 'note-item';
            noteEl.innerHTML = `<span class="note-time">${this.timer.formatTime(this.timer.elapsed)}</span> ${note}`;
            notesList.appendChild(noteEl);
        }
    }

    showCompletion() {
        showToast('🎉 Goal reached! Keep going or stop when ready.', 'success');
    }

    showSummary(session) {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        const xpEarned = session.duration * 2;
        
        body.innerHTML = `
            <div class="session-summary">
                <h2>🎹 Great Practice!</h2>
                
                <div class="summary-stats">
                    <div class="summary-stat">
                        <span class="big">${session.duration}</span>
                        <span class="label">Minutes</span>
                    </div>
                    <div class="summary-stat">
                        <span class="big">${session.completed ? '✓' : '○'}</span>
                        <span class="label">Goal ${session.completed ? 'Met' : 'Partial'}</span>
                    </div>
                    <div class="summary-stat">
                        <span class="big">+${xpEarned}</span>
                        <span class="label">XP Earned</span>
                    </div>
                </div>
                
                ${session.notes.length > 0 ? `
                    <div class="session-notes-summary">
                        <h4>Notes from this session:</h4>
                        ${session.notes.map(n => `<p>${n.time}: ${n.note}</p>`).join('')}
                    </div>
                ` : ''}
                
                <div class="motivational-message">
                    ${this.getMotivationalMessage(session)}
                </div>
                
                <button class="neon-btn" onclick="closeModal()">Done</button>
            </div>
        `;
        
        modal.classList.add('active');
        
        // Add XP
        if (typeof addXP === 'function') {
            addXP(xpEarned, 'Practice session');
        }
    }

    getMotivationalMessage(session) {
        const messages = {
            completed: [
                'Amazing work! Consistency is key to mastery! 🌟',
                'Goal crushed! Your dedication is paying off! 💪',
                'Fantastic session! Every minute counts! 🎹',
                'You\'re building great habits! Keep it up! 🔥'
            ],
            partial: [
                'Every practice session counts! Well done! 👏',
                'Progress over perfection. Good work today! 🎵',
                'You showed up and practiced. That\'s what matters! ✨',
                'Building the habit. Tomorrow you\'ll do even better! 💪'
            ]
        };
        
        const pool = messages[session.completed ? 'completed' : 'partial'];
        return pool[Math.floor(Math.random() * pool.length)];
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PracticeTimer = PracticeTimer;
    window.SessionDisplay = SessionDisplay;
}
EOF