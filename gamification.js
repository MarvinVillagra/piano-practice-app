// Piano Master - Gamification System

class GamificationSystem {
    constructor() {
        this.achievements = this.defineAchievements();
        this.dailyChallenges = this.generateDailyChallenges();
        this.streakBonuses = this.calculateStreakBonuses();
    }

    defineAchievements() {
        return [
            // Practice achievements
            { id: 'first_note', name: 'First Note', icon: '🎵', description: 'Complete your first practice', xp: 10 },
            { id: 'practice_10', name: 'Getting Started', icon: '🎯', description: '10 practice sessions', xp: 50 },
            { id: 'practice_50', name: 'Consistent Player', icon: '🔥', description: '50 practice sessions', xp: 200 },
            { id: 'practice_100', name: 'Dedicated Pianist', icon: '🎹', description: '100 practice sessions', xp: 500 },
            { id: 'practice_365', name: 'Year of Piano', icon: '🏆', description: '365 practice sessions', xp: 1000 },
            
            // Streak achievements
            { id: 'streak_3', name: '3 Day Streak', icon: '⚡', description: 'Practice 3 days in a row', xp: 30 },
            { id: 'streak_7', name: 'Weekly Warrior', icon: '🌟', description: '7 day streak', xp: 100 },
            { id: 'streak_30', name: 'Monthly Master', icon: '👑', description: '30 day streak', xp: 500 },
            { id: 'streak_100', name: 'Unstoppable', icon: '💎', description: '100 day streak', xp: 2000 },
            
            // Scale achievements
            { id: 'scale_c', name: 'C Major Master', icon: '🎼', description: 'Master C major scale', xp: 25 },
            { id: 'scales_6', name: 'Halfway There', icon: '⭐', description: 'Learn 6 major scales', xp: 150 },
            { id: 'scales_12', name: 'Circle Complete', icon: '🎯', description: 'Learn all 12 major scales', xp: 500 },
            { id: 'scales_minor', name: 'Minor Master', icon: '🌙', description: 'Learn all 12 minor scales', xp: 600 },
            
            // Drill achievements
            { id: 'drill_first', name: 'First Drill', icon: '💪', description: 'Complete your first drill', xp: 15 },
            { id: 'drill_10', name: 'Drill Sergeant', icon: '🎖️', description: 'Complete 10 drills', xp: 75 },
            { id: 'drill_all', name: 'Perfect Form', icon: '✨', description: 'Complete all drills', xp: 300 },
            
            // Speed achievements
            { id: 'speed_60', name: 'Steady Pace', icon: '🐢', description: 'Play at 60 BPM', xp: 20 },
            { id: 'speed_100', name: 'Getting Fast', icon: '🐰', description: 'Play at 100 BPM', xp: 50 },
            { id: 'speed_120', name: 'Speed Demon', icon: '🚀', description: 'Play at 120 BPM', xp: 100 },
            
            // Accuracy achievements
            { id: 'accuracy_90', name: 'Sharp Ear', icon: '👂', description: '90% accuracy in detection', xp: 75 },
            { id: 'accuracy_95', name: 'Perfect Pitch', icon: '🎯', description: '95% accuracy', xp: 150 },
            { id: 'accuracy_100', name: 'Human Tuner', icon: '💎', description: '100% accuracy (50 notes)', xp: 300 },
            
            // Genre achievements
            { id: 'genre_trap', name: 'Trap Producer', icon: '🎛️', description: 'Learn trap progressions', xp: 50 },
            { id: 'genre_jazz', name: 'Jazz Cat', icon: '🎷', description: 'Learn jazz chords', xp: 100 },
            { id: 'genre_lofi', name: 'Lo-Fi Dreams', icon: '🌙', description: 'Learn lo-fi chords', xp: 75 },
            
            // Special achievements
            { id: 'midnight', name: 'Night Owl', icon: '🦉', description: 'Practice after midnight', xp: 50 },
            { id: 'early_bird', name: 'Early Bird', icon: '🌅', description: 'Practice before 6 AM', xp: 50 },
            { id: 'weekend_warrior', name: 'Weekend Warrior', icon: '🎸', description: 'Practice both Sat & Sun', xp: 100 },
            { id: 'marathon', name: 'Piano Marathon', icon: '🏃', description: '2 hour practice session', xp: 200 }
        ];
    }

    generateDailyChallenges() {
        const today = new Date().toDateString();
        const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        
        const challenges = [
            { type: 'scale', name: 'Scale of the Day', description: 'Practice today\'s scale', xp: 25 },
            { type: 'drill', name: 'Drill Master', description: 'Complete 3 drills', xp: 30 },
            { type: 'speed', name: 'Speed Challenge', description: 'Play at 80+ BPM', xp: 20 },
            { type: 'accuracy', name: 'Accuracy Test', description: 'Get 90%+ accuracy', xp: 35 },
            { type: 'time', name: 'Time Attack', description: 'Practice for 30 minutes', xp: 40 },
            { type: 'genre', name: 'Genre Explorer', description: 'Try a new genre', xp: 25 }
        ];
        
        // Select 3 random challenges for today
        const selected = [];
        for (let i = 0; i < 3; i++) {
            const index = (seed + i) % challenges.length;
            selected.push({
                ...challenges[index],
                id: `daily_${i}`,
                progress: 0,
                target: i === 0 ? 1 : (i === 1 ? 3 : 1)
            });
        }
        
        return selected;
    }

    calculateStreakBonuses() {
        return {
            3: { multiplier: 1.1, badge: '⚡' },
            7: { multiplier: 1.25, badge: '🔥' },
            14: { multiplier: 1.5, badge: '⭐' },
            30: { multiplier: 2.0, badge: '👑' },
            60: { multiplier: 2.5, badge: '💎' },
            100: { multiplier: 3.0, badge: '🏆' }
        };
    }

    checkAchievement(achievementId, userState) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement) return null;
        
        // Check if already unlocked
        if (userState.achievements?.includes(achievementId)) return null;
        
        // Check conditions
        const conditions = {
            first_note: userState.totalPractices >= 1,
            practice_10: userState.totalPractices >= 10,
            practice_50: userState.totalPractices >= 50,
            practice_100: userState.totalPractices >= 100,
            practice_365: userState.totalPractices >= 365,
            streak_3: userState.streak >= 3,
            streak_7: userState.streak >= 7,
            streak_30: userState.streak >= 30,
            streak_100: userState.streak >= 100,
            scale_c: userState.learnedScales?.includes('C-major'),
            scales_6: (userState.learnedScales?.length || 0) >= 6,
            scales_12: (userState.learnedScales?.length || 0) >= 12,
            scales_minor: userState.learnedMinorScales?.length >= 12,
            drill_first: userState.completedDrills?.length >= 1,
            drill_10: userState.completedDrills?.length >= 10,
            drill_all: userState.completedDrills?.length >= 20,
            speed_60: userState.maxSpeed >= 60,
            speed_100: userState.maxSpeed >= 100,
            speed_120: userState.maxSpeed >= 120,
            accuracy_90: userState.avgAccuracy >= 90,
            accuracy_95: userState.avgAccuracy >= 95,
            accuracy_100: userState.perfectStreak >= 50
        };
        
        if (conditions[achievementId]) {
            return achievement;
        }
        
        return null;
    }

    getXPForLevel(level) {
        return level * 500;
    }

    getLevelForXP(xp) {
        return Math.floor(xp / 500) + 1;
    }

    getStreakMultiplier(streak) {
        let multiplier = 1.0;
        for (const [days, bonus] of Object.entries(this.streakBonuses)) {
            if (streak >= parseInt(days)) {
                multiplier = bonus.multiplier;
            }
        }
        return multiplier;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    getNextMilestone(current) {
        const milestones = [10, 25, 50, 100, 200, 365, 500, 1000];
        for (const milestone of milestones) {
            if (milestone > current) return milestone;
        }
        return null;
    }
}

// Leaderboard system (local)
class Leaderboard {
    constructor() {
        this.entries = [];
    }

    addEntry(userId, name, score, category) {
        this.entries.push({
            userId,
            name,
            score,
            category,
            timestamp: Date.now()
        });
        
        // Keep top 100
        this.entries.sort((a, b) => b.score - a.score);
        this.entries = this.entries.slice(0, 100);
    }

    getTop(category, limit = 10) {
        return this.entries
            .filter(e => !category || e.category === category)
            .slice(0, limit);
    }

    getRank(userId, category) {
        const filtered = this.entries.filter(e => !category || e.category === category);
        return filtered.findIndex(e => e.userId === userId) + 1;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.GamificationSystem = GamificationSystem;
    window.Leaderboard = Leaderboard;
    window.gameSystem = new GamificationSystem();
}
