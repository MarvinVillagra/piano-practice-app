// Piano Master - Database Module
// IndexedDB for persistent, cross-session progress storage

class PianoDatabase {
    constructor() {
        this.dbName = 'PianoMasterDB';
        this.dbVersion = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // User profile
                if (!db.objectStoreNames.contains('userProfile')) {
                    const profileStore = db.createObjectStore('userProfile', { keyPath: 'id' });
                    profileStore.createIndex('lastActive', 'lastActive', { unique: false });
                }

                // Progress tracking
                if (!db.objectStoreNames.contains('progress')) {
                    const progressStore = db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
                    progressStore.createIndex('type', 'type', { unique: false });
                    progressStore.createIndex('date', 'date', { unique: false });
                    progressStore.createIndex('itemId', 'itemId', { unique: false });
                }

                // Completed drills
                if (!db.objectStoreNames.contains('completedDrills')) {
                    const drillsStore = db.createObjectStore('completedDrills', { keyPath: 'id' });
                    drillsStore.createIndex('drillId', 'drillId', { unique: false });
                    drillsStore.createIndex('completedAt', 'completedAt', { unique: false });
                }

                // Learned scales
                if (!db.objectStoreNames.contains('learnedScales')) {
                    const scalesStore = db.createObjectStore('learnedScales', { keyPath: 'id' });
                    scalesStore.createIndex('scaleKey', 'scaleKey', { unique: true });
                    scalesStore.createIndex('learnedAt', 'learnedAt', { unique: false });
                }

                // Learned songs
                if (!db.objectStoreNames.contains('learnedSongs')) {
                    const songsStore = db.createObjectStore('learnedSongs', { keyPath: 'id' });
                    songsStore.createIndex('songId', 'songId', { unique: false });
                    songsStore.createIndex('status', 'status', { unique: false });
                }

                // Practice sessions
                if (!db.objectStoreNames.contains('practiceSessions')) {
                    const sessionsStore = db.createObjectStore('practiceSessions', { keyPath: 'id', autoIncrement: true });
                    sessionsStore.createIndex('date', 'date', { unique: false });
                    sessionsStore.createIndex('duration', 'duration', { unique: false });
                }

                // Achievements
                if (!db.objectStoreNames.contains('achievements')) {
                    const achievementsStore = db.createObjectStore('achievements', { keyPath: 'id' });
                    achievementsStore.createIndex('unlockedAt', 'unlockedAt', { unique: false });
                }

                // XP log
                if (!db.objectStoreNames.contains('xpLog')) {
                    const xpStore = db.createObjectStore('xpLog', { keyPath: 'id', autoIncrement: true });
                    xpStore.createIndex('timestamp', 'timestamp', { unique: false });
                    xpStore.createIndex('reason', 'reason', { unique: false });
                }

                // Spaced repetition items
                if (!db.objectStoreNames.contains('spacedRepetition')) {
                    const srStore = db.createObjectStore('spacedRepetition', { keyPath: 'id' });
                    srStore.createIndex('nextReview', 'nextReview', { unique: false });
                    srStore.createIndex('type', 'type', { unique: false });
                }

                // Notes detection history
                if (!db.objectStoreNames.contains('detectionHistory')) {
                    const detectionStore = db.createObjectStore('detectionHistory', { keyPath: 'id', autoIncrement: true });
                    detectionStore.createIndex('timestamp', 'timestamp', { unique: false });
                    detectionStore.createIndex('note', 'note', { unique: false });
                    detectionStore.createIndex('correct', 'correct', { unique: false });
                }

                // Settings
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }

                // Theory progress
                if (!db.objectStoreNames.contains('theoryProgress')) {
                    const theoryStore = db.createObjectStore('theoryProgress', { keyPath: 'lessonId' });
                    theoryStore.createIndex('completed', 'completed', { unique: false });
                }
            };
        });
    }

    // Generic CRUD operations
    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add({ ...data, timestamp: Date.now() });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async put(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put({ ...data, updatedAt: Date.now() });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getByIndex(storeName, indexName, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async clear(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ============== SPECIFIC METHODS ==============

    // User Profile
    async getUserProfile() {
        let profile = await this.get('userProfile', 'main');
        if (!profile) {
            profile = {
                id: 'main',
                name: 'Pianist',
                level: 1,
                xp: 0,
                totalPracticeMinutes: 0,
                streak: 0,
                lastPracticeDate: null,
                createdAt: Date.now(),
                settings: {
                    dailyGoalMinutes: 30,
                    notificationsEnabled: true,
                    preferredSessionLength: 15
                }
            };
            await this.put('userProfile', profile);
        }
        return profile;
    }

    async updateUserProfile(updates) {
        const profile = await this.getUserProfile();
        return this.put('userProfile', { ...profile, ...updates, updatedAt: Date.now() });
    }

    // Progress
    async recordProgress(type, itemId, data = {}) {
        return this.add('progress', {
            type,
            itemId,
            ...data,
            date: new Date().toISOString().split('T')[0]
        });
    }

    async getProgressByType(type) {
        return this.getByIndex('progress', 'type', type);
    }

    async getProgressByDate(date) {
        return this.getByIndex('progress', 'date', date);
    }

    // Drills
    async completeDrill(drillId, data = {}) {
        const existing = await this.get('completedDrills', drillId);
        if (existing) {
            return this.put('completedDrills', { 
                ...existing, 
                timesCompleted: (existing.timesCompleted || 1) + 1,
                lastCompletedAt: Date.now(),
                ...data 
            });
        }
        return this.put('completedDrills', {
            id: drillId,
            drillId,
            completedAt: Date.now(),
            timesCompleted: 1,
            ...data
        });
    }

    async getCompletedDrills() {
        return this.getAll('completedDrills');
    }

    async isDrillCompleted(drillId) {
        const drill = await this.get('completedDrills', drillId);
        return !!drill;
    }

    // Scales
    async learnScale(scaleKey, data = {}) {
        return this.put('learnedScales', {
            id: scaleKey,
            scaleKey,
            learnedAt: Date.now(),
            practiceCount: 1,
            ...data
        });
    }

    async getLearnedScales() {
        return this.getAll('learnedScales');
    }

    async isScaleLearned(scaleKey) {
        const scale = await this.get('learnedScales', scaleKey);
        return !!scale;
    }

    async incrementScalePractice(scaleKey) {
        const scale = await this.get('learnedScales', scaleKey);
        if (scale) {
            scale.practiceCount = (scale.practiceCount || 1) + 1;
            scale.lastPracticedAt = Date.now();
            return this.put('learnedScales', scale);
        }
    }

    // Songs
    async updateSongProgress(songId, status, data = {}) {
        return this.put('learnedSongs', {
            id: songId,
            songId,
            status, // 'learning', 'practicing', 'mastered'
            ...data,
            updatedAt: Date.now()
        });
    }

    async getSongProgress(songId) {
        return this.get('learnedSongs', songId);
    }

    async getAllSongProgress() {
        return this.getAll('learnedSongs');
    }

    // Practice Sessions
    async startSession() {
        return this.add('practiceSessions', {
            startTime: Date.now(),
            date: new Date().toISOString().split('T')[0],
            items: []
        });
    }

    async updateSession(sessionId, data) {
        const session = await this.get('practiceSessions', sessionId);
        return this.put('practiceSessions', { ...session, ...data });
    }

    async endSession(sessionId, duration, items = []) {
        const session = await this.get('practiceSessions', sessionId);
        return this.put('practiceSessions', {
            ...session,
            endTime: Date.now(),
            duration,
            items
        });
    }

    async getSessionsByDate(date) {
        return this.getByIndex('practiceSessions', 'date', date);
    }

    async getTotalPracticeTime() {
        const sessions = await this.getAll('practiceSessions');
        return sessions.reduce((total, s) => total + (s.duration || 0), 0);
    }

    async getPracticeDays() {
        const sessions = await this.getAll('practiceSessions');
        const days = new Set(sessions.map(s => s.date));
        return Array.from(days).sort().reverse();
    }

    // Achievements
    async unlockAchievement(achievementId, data = {}) {
        return this.put('achievements', {
            id: achievementId,
            unlockedAt: Date.now(),
            ...data
        });
    }

    async getAchievements() {
        return this.getAll('achievements');
    }

    async isAchievementUnlocked(achievementId) {
        const achievement = await this.get('achievements', achievementId);
        return !!achievement;
    }

    // XP
    async addXP(amount, reason) {
        const profile = await this.getUserProfile();
        profile.xp = (profile.xp || 0) + amount;
        
        // Check level up (every 500 XP)
        const oldLevel = profile.level;
        profile.level = Math.floor(profile.xp / 500) + 1;
        
        await this.put('userProfile', profile);
        await this.add('xpLog', { amount, reason, timestamp: Date.now() });

        return {
            newXP: profile.xp,
            newLevel: profile.level,
            leveledUp: profile.level > oldLevel
        };
    }

    async getXPLog(limit = 100) {
        const log = await this.getAll('xpLog');
        return log.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
    }

    // Streak
    async updateStreak() {
        const profile = await this.getUserProfile();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (profile.lastPracticeDate === today) {
            // Already practiced today
            return profile.streak;
        }

        if (profile.lastPracticeDate === yesterday) {
            // Continuing streak
            profile.streak = (profile.streak || 0) + 1;
        } else if (!profile.lastPracticeDate) {
            // First practice
            profile.streak = 1;
        } else {
            // Streak broken
            profile.streak = 1;
        }

        profile.lastPracticeDate = today;
        await this.put('userProfile', profile);
        return profile.streak;
    }

    async getStreak() {
        const profile = await this.getUserProfile();
        return profile.streak || 0;
    }

    // Spaced Repetition
    async addSRItem(id, type, data) {
        return this.put('spacedRepetition', {
            id,
            type,
            ...data,
            interval: 1,
            easeFactor: 2.5,
            repetitions: 0,
            nextReview: Date.now(),
            created: Date.now()
        });
    }

    async getSRDueItems() {
        const all = await this.getAll('spacedRepetition');
        const now = Date.now();
        return all.filter(item => item.nextReview <= now);
    }

    async updateSRItem(id, quality) {
        const item = await this.get('spacedRepetition', id);
        if (!item) return null;

        // SM-2 algorithm
        if (quality < 3) {
            item.repetitions = 0;
            item.interval = 1;
        } else {
            if (item.repetitions === 0) {
                item.interval = 1;
            } else if (item.repetitions === 1) {
                item.interval = 6;
            } else {
                item.interval = Math.round(item.interval * item.easeFactor);
            }

            item.easeFactor = Math.max(1.3, 
                item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
            );
            item.repetitions++;
        }

        item.nextReview = Date.now() + (item.interval * 24 * 60 * 60 * 1000);
        item.lastReview = Date.now();

        await this.put('spacedRepetition', item);
        return item;
    }

    // Detection History
    async recordDetection(note, correct, target) {
        return this.add('detectionHistory', {
            note,
            correct,
            target,
            timestamp: Date.now()
        });
    }

    async getDetectionStats() {
        const history = await this.getAll('detectionHistory');
        const correct = history.filter(h => h.correct).length;
        return {
            total: history.length,
            correct,
            accuracy: history.length > 0 ? correct / history.length : 0,
            recentAccuracy: this.getRecentAccuracy(history, 50)
        };
    }

    getRecentAccuracy(history, count) {
        const recent = history.slice(-count);
        const correct = recent.filter(h => h.correct).length;
        return recent.length > 0 ? correct / recent.length : 0;
    }

    // Theory Progress
    async completeTheoryLesson(lessonId, score) {
        return this.put('theoryProgress', {
            lessonId,
            completed: true,
            score,
            completedAt: Date.now()
        });
    }

    async getTheoryProgress() {
        return this.getAll('theoryProgress');
    }

    async isTheoryLessonCompleted(lessonId) {
        const lesson = await this.get('theoryProgress', lessonId);
        return !!lesson?.completed;
    }

    // Settings
    async setSetting(key, value) {
        return this.put('settings', { key, value });
    }

    async getSetting(key, defaultValue = null) {
        const setting = await this.get('settings', key);
        return setting ? setting.value : defaultValue;
    }

    // Export/Import
    async exportData() {
        const data = {};
        const stores = ['userProfile', 'progress', 'completedDrills', 'learnedScales', 
                       'learnedSongs', 'practiceSessions', 'achievements', 'xpLog',
                       'spacedRepetition', 'theoryProgress', 'settings'];
        
        for (const store of stores) {
            data[store] = await this.getAll(store);
        }
        
        return {
            version: this.dbVersion,
            exportedAt: Date.now(),
            data
        };
    }

    async importData(exportedData) {
        if (exportedData.version !== this.dbVersion) {
            throw new Error('Incompatible data version');
        }

        for (const [storeName, items] of Object.entries(exportedData.data)) {
            for (const item of items) {
                await this.put(storeName, item);
            }
        }
    }

    // Stats
    async getStats() {
        const profile = await this.getUserProfile();
        const sessions = await this.getAll('practiceSessions');
        const completedDrills = await this.getCompletedDrills();
        const learnedScales = await this.getLearnedScales();
        const songProgress = await this.getAllSongProgress();

        const masteredSongs = songProgress.filter(s => s.status === 'mastered').length;
        const totalPracticeMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

        return {
            level: profile.level,
            xp: profile.xp,
            streak: profile.streak,
            totalPracticeMinutes,
            totalSessions: sessions.length,
            completedDrills: completedDrills.length,
            learnedScales: learnedScales.length,
            learnedSongs: masteredSongs,
            achievements: achievements.length,
            detectionAccuracy: detectionStats.accuracy,
            theoryLessonsCompleted: theoryProgress.filter(t => t.completed).length
        };
    }
}

// ============== GLOBAL DATABASE INSTANCE ==============
let pianoDB = null;

async function initDatabase() {
    pianoDB = new PianoDatabase();
    await pianoDB.init();
    console.log('Piano Master Database initialized');
    window.pianoDB = pianoDB;
    return pianoDB;
}

// ============== MIGRATE FROM LOCALSTORAGE ==============
async function migrateFromLocalStorage() {
    const profile = await pianoDB.getUserProfile();
    
    // Only migrate if profile is new
    if (profile.totalPracticeMinutes === 0) {
        const completedDrills = JSON.parse(localStorage.getItem('completedDrills') || '[]');
        for (const drillId of completedDrills) {
            await pianoDB.completeDrill(drillId);
        }

        const learnedScales = JSON.parse(localStorage.getItem('learnedScales') || '[]');
        for (const scaleKey of learnedScales) {
            await pianoDB.learnScale(scaleKey);
        }

        const learnedSongs = JSON.parse(localStorage.getItem('learnedSongs') || '[]');
        for (const songId of learnedSongs) {
            await pianoDB.updateSongProgress(songId, 'mastered');
        }

        const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
        for (const achievementId of achievements) {
            await pianoDB.unlockAchievement(achievementId);
        }

        const totalXP = parseInt(localStorage.getItem('total_xp') || '0');
        if (totalXP > 0) {
            const userProfile = await pianoDB.getUserProfile();
            userProfile.xp = totalXP;
            userProfile.level = Math.floor(totalXP / 500) + 1;
            await pianoDB.put('userProfile', userProfile);
        }

        const streak = parseInt(localStorage.getItem('streak') || '0');
        const lastPractice = localStorage.getItem('lastPractice');
        if (streak > 0) {
            const userProfile = await pianoDB.getUserProfile();
            userProfile.streak = streak;
            userProfile.lastPracticeDate = lastPractice;
            await pianoDB.put('userProfile', userProfile);
        }

        console.log('Migrated data from localStorage');
    }
}

// ============== EXPORT ==============
if (typeof window !== 'undefined') {
    window.PianoDatabase = PianoDatabase;
    window.initDatabase = initDatabase;
    window.migrateFromLocalStorage = migrateFromLocalStorage;
}
