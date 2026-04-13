// Piano Master - Statistics & Progress Dashboard

class StatisticsDashboard {
    constructor() {
        this.data = this.loadData();
    }

    loadData() {
        return {
            totalPracticeTime: parseInt(localStorage.getItem('totalPracticeTime') || '0'),
            sessionsCompleted: parseInt(localStorage.getItem('sessionsCompleted') || '0'),
            notesPlayed: parseInt(localStorage.getItem('notesPlayed') || '0'),
            correctNotes: parseInt(localStorage.getItem('correctNotes') || '0'),
            scalesLearned: JSON.parse(localStorage.getItem('learnedScales') || '[]').length,
            songsCompleted: JSON.parse(localStorage.getItem('songsCompleted') || '[]'),
            streakDays: parseInt(localStorage.getItem('streak') || '0'),
            longestStreak: parseInt(localStorage.getItem('longestStreak') || '0'),
            totalXP: parseInt(localStorage.getItem('total_xp') || '0'),
            weeklyData: JSON.parse(localStorage.getItem('weeklyData') || '[]'),
            dailyGoals: JSON.parse(localStorage.getItem('dailyGoals') || '{}'),
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]')
        };
    }

    save() {
        localStorage.setItem('totalPracticeTime', this.data.totalPracticeTime);
        localStorage.setItem('sessionsCompleted', this.data.sessionsCompleted);
        localStorage.setItem('notesPlayed', this.data.notesPlayed);
        localStorage.setItem('correctNotes', this.data.correctNotes);
        localStorage.setItem('songsCompleted', JSON.stringify(this.data.songsCompleted));
        localStorage.setItem('longestStreak', this.data.longestStreak);
        localStorage.setItem('weeklyData', JSON.stringify(this.data.weeklyData));
        localStorage.setItem('dailyGoals', JSON.stringify(this.data.dailyGoals));
    }

    recordSession(duration, notesPlayed, correctNotes) {
        this.data.totalPracticeTime += duration;
        this.data.sessionsCompleted++;
        this.data.notesPlayed += notesPlayed;
        this.data.correctNotes += correctNotes;

        this.updateWeeklyData(duration);
        this.checkAchievements();
        this.save();
    }

    updateWeeklyData(duration) {
        const today = new Date().toISOString().split('T')[0];
        const existing = this.data.weeklyData.find(d => d.date === today);

        if (existing) {
            existing.duration += duration;
        } else {
            this.data.weeklyData.push({ date: today, duration });
        }

        // Keep only last 30 days
        if (this.data.weeklyData.length > 30) {
            this.data.weeklyData.shift();
        }
    }

    getAccuracy() {
        if (this.data.notesPlayed === 0) return 0;
        return (this.data.correctNotes / this.data.notesPlayed) * 100;
    }

    getAverageSessionTime() {
        if (this.data.sessionsCompleted === 0) return 0;
        return this.data.totalPracticeTime / this.data.sessionsCompleted;
    }

    getWeeklyAverage() {
        const last7 = this.data.weeklyData.slice(-7);
        if (last7.length === 0) return 0;
        return last7.reduce((acc, d) => acc + d.duration, 0) / last7.length;
    }

    getProgressTrend() {
        if (this.data.weeklyData.length < 2) return 'insufficient_data';
        
        const recent = this.data.weeklyData.slice(-7);
        const previous = this.data.weeklyData.slice(-14, -7);
        
        if (previous.length === 0) return 'new';
        
        const recentAvg = recent.reduce((acc, d) => acc + d.duration, 0) / recent.length;
        const previousAvg = previous.reduce((acc, d) => acc + d.duration, 0) / previous.length;
        
        if (recentAvg > previousAvg * 1.1) return 'improving';
        if (recentAvg < previousAvg * 0.9) return 'declining';
        return 'stable';
    }

    checkAchievements() {
        const newAchievements = [];

        // Practice achievements
        if (this.data.sessionsCompleted >= 10 && !this.data.achievements.includes('ten_sessions')) {
            newAchievements.push('ten_sessions');
            this.data.achievements.push('ten_sessions');
        }

        if (this.data.totalPracticeTime >= 60 && !this.data.achievements.includes('hour_practice')) {
            newAchievements.push('hour_practice');
            this.data.achievements.push('hour_practice');
        }

        // Accuracy achievements
        if (this.getAccuracy() >= 95 && this.data.notesPlayed >= 100 && !this.data.achievements.includes('accuracy_master')) {
            newAchievements.push('accuracy_master');
            this.data.achievements.push('accuracy_master');
        }

        // Streak achievements
        if (this.data.streakDays >= 7 && !this.data.achievements.includes('week_streak')) {
            newAchievements.push('week_streak');
            this.data.achievements.push('week_streak');
        }

        if (this.data.streakDays >= 30 && !this.data.achievements.includes('month_streak')) {
            newAchievements.push('month_streak');
            this.data.achievements.push('month_streak');
        }

        // Scale achievements
        if (this.data.scalesLearned >= 12 && !this.data.achievements.includes('twelve_scales')) {
            newAchievements.push('twelve_scales');
            this.data.achievements.push('twelve_scales');
        }

        this.save();
        return newAchievements;
    }

    setDailyGoal(minutes) {
        const today = new Date().toISOString().split('T')[0];
        this.data.dailyGoals[today] = {
            target: minutes,
            current: 0,
            completed: false
        };
        this.save();
    }

    updateDailyGoalProgress(minutes) {
        const today = new Date().toISOString().split('T')[0];
        const goal = this.data.dailyGoals[today];
        
        if (goal) {
            goal.current += minutes;
            if (goal.current >= goal.target && !goal.completed) {
                goal.completed = true;
                showToast(`🎯 Daily goal completed! +20 XP`, 'success');
                return true;
            }
            this.save();
        }
        return false;
    }

    getDashboardHTML() {
        const level = Math.floor(this.data.totalXP / 500) + 1;
        const xpInLevel = this.data.totalXP % 500;
        const progressPercent = (xpInLevel / 500) * 100;

        return `
            <div class="stats-dashboard">
                <div class="stats-header">
                    <div class="level-badge">
                        <span class="level-number">${level}</span>
                        <span class="level-label">Level</span>
                    </div>
                    <div class="xp-progress">
                        <div class="xp-bar">
                            <div class="xp-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span class="xp-text">${xpInLevel}/500 XP</span>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-icon">🔥</span>
                        <span class="stat-value">${this.data.streakDays}</span>
                        <span class="stat-label">Day Streak</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">⏱️</span>
                        <span class="stat-value">${Math.floor(this.data.totalPracticeTime)}m</span>
                        <span class="stat-label">Total Practice</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">🎯</span>
                        <span class="stat-value">${this.getAccuracy().toFixed(1)}%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-icon">🎹</span>
                        <span class="stat-value">${this.data.scalesLearned}</span>
                        <span class="stat-label">Scales Learned</span>
                    </div>
                </div>

                <div class="stats-details">
                    <div class="detail-row">
                        <span>Sessions Completed</span>
                        <span>${this.data.sessionsCompleted}</span>
                    </div>
                    <div class="detail-row">
                        <span>Notes Played</span>
                        <span>${this.data.notesPlayed.toLocaleString()}</span>
                    </div>
                    <div class="detail-row">
                        <span>Songs Completed</span>
                        <span>${this.data.songsCompleted.length}</span>
                    </div>
                    <div class="detail-row">
                        <span>Average Session</span>
                        <span>${Math.round(this.getAverageSessionTime())} min</span>
                    </div>
                    <div class="detail-row">
                        <span>Weekly Average</span>
                        <span>${Math.round(this.getWeeklyAverage())} min/day</span>
                    </div>
                    <div class="detail-row">
                        <span>Trend</span>
                        <span class="trend-${this.getProgressTrend()}">${this.getProgressTrend()}</span>
                    </div>
                </div>

                <div class="achievements-section">
                    <h3>🏆 Achievements</h3>
                    <div class="achievements-grid">
                        ${this.getAchievementBadges()}
                    </div>
                </div>
            </div>
        `;
    }

    getAchievementBadges() {
        const allAchievements = [
            { id: 'ten_sessions', name: 'Dedicated', icon: '🎯', desc: 'Complete 10 sessions' },
            { id: 'hour_practice', name: 'Hour Power', icon: '⏰', desc: 'Practice for 1 hour' },
            { id: 'accuracy_master', name: 'Precision', icon: '🎯', desc: '95% accuracy with 100+ notes' },
            { id: 'week_streak', name: 'Consistent', icon: '🔥', desc: '7 day streak' },
            { id: 'month_streak', name: 'Unstoppable', icon: '💪', desc: '30 day streak' },
            { id: 'twelve_scales', name: 'Scale Master', icon: '🎹', desc: 'Learn 12 scales' }
        ];

        return allAchievements.map(a => `
            <div class="achievement ${this.data.achievements.includes(a.id) ? 'earned' : 'locked'}">
                <span class="achievement-icon">${a.icon}</span>
                <span class="achievement-name">${a.name}</span>
            </div>
        `).join('');
    }
}

// ============== GOAL SETTING ==============
class GoalManager {
    constructor() {
        this.goals = JSON.parse(localStorage.getItem('practiceGoals') || '[]');
    }

    addGoal(goal) {
        const newGoal = {
            id: Date.now(),
            type: goal.type, // 'daily', 'weekly', 'custom'
            target: goal.target,
            current: 0,
            deadline: goal.deadline,
            reward: goal.reward || 50,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.goals.push(newGoal);
        this.save();
        return newGoal;
    }

    updateProgress(goalId, value) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal || goal.completed) return;

        goal.current = Math.min(goal.current + value, goal.target);

        if (goal.current >= goal.target) {
            goal.completed = true;
            showToast(`🎯 Goal completed! +${goal.reward} XP`, 'success');
        }

        this.save();
        return goal;
    }

    getActiveGoals() {
        return this.goals.filter(g => !g.completed);
    }

    getCompletedGoals() {
        return this.goals.filter(g => g.completed);
    }

    save() {
        localStorage.setItem('practiceGoals', JSON.stringify(this.goals));
    }

    suggestGoals(level) {
        const suggestions = [
            { type: 'daily', target: 15, description: 'Practice 15 minutes today', reward: 10 },
            { type: 'daily', target: 30, description: 'Practice 30 minutes today', reward: 20 },
            { type: 'weekly', target: 5, description: 'Practice 5 days this week', reward: 50 },
            { type: 'custom', target: 3, description: 'Learn 3 new scales', reward: 30 },
            { type: 'custom', target: 1, description: 'Complete 1 song', reward: 40 }
        ];

        // Return suggestions based on level
        return suggestions.slice(0, Math.min(level + 1, suggestions.length));
    }
}

// Export
if (typeof window !== 'undefined') {
    window.StatisticsDashboard = StatisticsDashboard;
    window.GoalManager = GoalManager;
}
