// Piano Master - Cloud Sync Module
// Firebase Firestore for cross-device progress sync

// Firebase Configuration (replace with your own config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

class CloudSync {
    constructor() {
        this.db = null;
        this.auth = null;
        this.user = null;
        this.isOnline = navigator.onLine;
        this.syncQueue = [];
        this.lastSyncTime = null;
        
        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    async init() {
        try {
            // Check if Firebase is loaded
            if (typeof firebase === 'undefined') {
                console.log('Firebase not loaded - running in local-only mode');
                return false;
            }

            // Initialize Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            this.auth = firebase.auth();
            this.db = firebase.firestore();

            // Enable offline persistence
            await this.db.enablePersistence({ synchronizeTabs: true })
                .catch(err => {
                    if (err.code === 'failed-precondition') {
                        console.warn('Multiple tabs open - persistence limited');
                    } else if (err.code === 'unimplemented') {
                        console.warn('Browser doesn\'t support persistence');
                    }
                });

            // Set up auth state listener
            this.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    this.user = user;
                    console.log('User signed in:', user.uid, user.isAnonymous ? '(anonymous)' : '');
                    await this.syncFromCloud();
                } else {
                    // Auto sign in anonymously
                    await this.signInAnonymously();
                }
            });

            return true;
        } catch (error) {
            console.error('Cloud sync init error:', error);
            return false;
        }
    }

    async signInAnonymously() {
        try {
            const result = await this.auth.signInAnonymously();
            this.user = result.user;
            console.log('Signed in anonymously:', this.user.uid);
            
            // Check if this is a new user
            const userDoc = await this.db.collection('users').doc(this.user.uid).get();
            if (!userDoc.exists) {
                // Create initial user document
                await this.db.collection('users').doc(this.user.uid).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                    devices: [this.getDeviceId()]
                });
            }
            
            return this.user;
        } catch (error) {
            console.error('Anonymous sign-in failed:', error);
            return null;
        }
    }

    getDeviceId() {
        let deviceId = localStorage.getItem('piano_device_id');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('piano_device_id', deviceId);
        }
        return deviceId;
    }

    // ============== SYNC OPERATIONS ==============

    async syncFromCloud() {
        if (!this.user || !this.db) return;

        try {
            // Get user profile
            const userDoc = await this.db.collection('users').doc(this.user.uid).get();
            if (userDoc.exists) {
                const cloudData = userDoc.data();
                
                // Merge with local data (prefer more recent)
                if (window.pianoDB) {
                    const localProfile = await window.pianoDB.getUserProfile();
                    
                    // If cloud is newer, update local
                    if (cloudData.updatedAt && cloudData.updatedAt.toMillis() > (localProfile.updatedAt || 0)) {
                        await window.pianoDB.put('userProfile', {
                            ...localProfile,
                            ...cloudData,
                            id: 'main'
                        });
                    }
                }
            }

            // Get all progress
            const progressSnapshot = await this.db.collection('users')
                .doc(this.user.uid)
                .collection('progress')
                .get();

            for (const doc of progressSnapshot.docs) {
                const data = doc.data();
                if (window.pianoDB) {
                    await window.pianoDB.put('progress', { id: doc.id, ...data });
                }
            }

            // Get completed items
            const completedSnapshot = await this.db.collection('users')
                .doc(this.user.uid)
                .collection('completed')
                .get();

            for (const doc of completedSnapshot.docs) {
                if (window.pianoDB) {
                    await window.pianoDB.put(doc.data().store, { id: doc.id, ...doc.data() });
                }
            }

            this.lastSyncTime = Date.now();
            console.log('Synced from cloud');
            
            // Update UI
            if (typeof loadStatsFromDatabase === 'function') {
                await loadStatsFromDatabase();
            }
            
            return true;
        } catch (error) {
            console.error('Sync from cloud failed:', error);
            return false;
        }
    }

    async syncToCloud(collection, data) {
        if (!this.user || !this.db) {
            // Queue for later sync
            this.syncQueue.push({ collection, data });
            return false;
        }

        if (!this.isOnline) {
            this.syncQueue.push({ collection, data });
            console.log('Offline - queued for sync');
            return false;
        }

        try {
            const dataWithTimestamp = {
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                deviceId: this.getDeviceId()
            };

            await this.db.collection('users')
                .doc(this.user.uid)
                .collection(collection)
                .doc(data.id || undefined)
                .set(dataWithTimestamp, { merge: true });

            console.log('Synced to cloud:', collection);
            return true;
        } catch (error) {
            console.error('Sync to cloud failed:', error);
            this.syncQueue.push({ collection, data });
            return false;
        }
    }

    async handleOnline() {
        this.isOnline = true;
        console.log('Back online - syncing...');
        
        // Process queued items
        while (this.syncQueue.length > 0) {
            const item = this.syncQueue.shift();
            await this.syncToCloud(item.collection, item.data);
        }
        
        // Full sync
        await this.syncFromCloud();
    }

    handleOffline() {
        this.isOnline = false;
        console.log('Offline mode - changes will sync when connected');
    }

    // ============== SPECIFIC SYNC METHODS ==============

    async syncProfile(profile) {
        return this.syncToCloud('profile', {
            id: 'main',
            ...profile
        });
    }

    async syncProgress(type, itemId, data) {
        return this.syncToCloud('progress', {
            id: `${type}_${itemId}`,
            type,
            itemId,
            ...data
        });
    }

    async syncCompletedDrill(drillId, data) {
        return this.syncToCloud('completed', {
            id: drillId,
            store: 'completedDrills',
            type: 'drill',
            ...data
        });
    }

    async syncLearnedScale(scaleKey, data) {
        return this.syncToCloud('completed', {
            id: scaleKey,
            store: 'learnedScales',
            type: 'scale',
            ...data
        });
    }

    async syncAchievement(achievementId, data) {
        return this.syncToCloud('completed', {
            id: achievementId,
            store: 'achievements',
            type: 'achievement',
            ...data
        });
    }

    // ============== ACCOUNT LINKING ==============

    async linkWithEmail(email, password) {
        if (!this.user) return null;
        
        try {
            const credential = firebase.auth.EmailAuthProvider.credential(email, password);
            const result = await this.user.linkWithCredential(credential);
            console.log('Account linked with email');
            return result.user;
        } catch (error) {
            // If email already exists, try to link
            if (error.code === 'auth/email-already-in-use') {
                // Need to sign in with email first, then link
                console.log('Email already in use - please sign in');
            }
            throw error;
        }
    }

    async linkWithGoogle() {
        if (!this.user) return null;
        
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await this.user.linkWithPopup(provider);
            console.log('Account linked with Google');
            return result.user;
        } catch (error) {
            throw error;
        }
    }

    // ============== EXPORT/IMPORT ==============

    async exportToJSON() {
        if (!window.pianoDB) return null;
        
        const data = await window.pianoDB.exportData();
        data.userId = this.user?.uid;
        data.exportedAt = Date.now();
        return JSON.stringify(data, null, 2);
    }

    async importFromJSON(jsonString) {
        if (!window.pianoDB) return false;
        
        try {
            const data = JSON.parse(jsonString);
            await window.pianoDB.importData(data);
            
            // Sync to cloud
            if (this.user && this.db) {
                // Sync each collection
                for (const [store, items] of Object.entries(data.data)) {
                    for (const item of items) {
                        await this.syncToCloud('completed', { ...item, store });
                    }
                }
            }
            
            return true;
        } catch (error) {
            console.error('Import failed:', error);
            return false;
        }
    }

    // ============== SYNC STATUS ==============

    getSyncStatus() {
        return {
            isOnline: this.isOnline,
            isAuthenticated: !!this.user,
            isAnonymous: this.user?.isAnonymous || false,
            userId: this.user?.uid || null,
            lastSync: this.lastSyncTime,
            pendingSyncs: this.syncQueue.length
        };
    }
}

// ============== GLOBAL INSTANCE ==============
let cloudSync = null;

async function initCloudSync() {
    cloudSync = new CloudSync();
    const success = await cloudSync.init();
    
    if (success) {
        window.cloudSync = cloudSync;
        console.log('Cloud sync initialized');
    }
    
    return cloudSync;
}

// ============== INTEGRATION WITH DATABASE ==============
const originalDatabaseAdd = PianoDatabase.prototype.add;

// Override database methods to auto-sync
PianoDatabase.prototype.add = async function(storeName, data) {
    const result = await originalDatabaseAdd.call(this, storeName, data);
    
    // Sync to cloud
    if (window.cloudSync) {
        window.cloudSync.syncToCloud('progress', { id: result, store: storeName, ...data });
    }
    
    return result;
};

// ============== EXPORT ==============
if (typeof window !== 'undefined') {
    window.CloudSync = CloudSync;
    window.initCloudSync = initCloudSync;
}

// ============== AUTO-INIT ==============
// Add Firebase SDK dynamically
(function loadFirebase() {
    if (typeof firebase === 'undefined') {
        const script1 = document.createElement('script');
        script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';
            script2.onload = () => {
                const script3 = document.createElement('script');
                script3.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
                script3.onload = () => {
                    console.log('Firebase SDK loaded');
                    initCloudSync();
                };
                document.head.appendChild(script3);
            };
            document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
    } else {
        initCloudSync();
    }
})();
