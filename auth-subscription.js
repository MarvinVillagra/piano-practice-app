// Piano Master - Authentication & Subscription System

class AuthSystem {
    constructor() {
        this.user = null;
        this.isPremium = false;
        this.firebaseConfig = {
            apiKey: "AIzaSyDemoKeyForTestingPurposesOnly",
            authDomain: "piano-master-demo.firebaseapp.com",
            projectId: "piano-master-demo",
            storageBucket: "piano-master-demo.appspot.com",
            messagingSenderId: "123456789",
            appId: "1:123456789:web:abcdef123456"
        };
        
        this.loadUser();
    }

    loadUser() {
        const saved = localStorage.getItem('pm_user');
        if (saved) {
            this.user = JSON.parse(saved);
            this.isPremium = this.user.subscription?.status === 'premium';
        }
    }

    saveUser() {
        if (this.user) {
            localStorage.setItem('pm_user', JSON.stringify(this.user));
        }
    }

    // Demo Mode - Create Anonymous Account
    async createAnonymousAccount() {
        const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        this.user = {
            id: userId,
            email: null,
            displayName: 'Pianist',
            avatar: null,
            createdAt: Date.now(),
            subscription: {
                status: 'free',
                plan: null,
                expiresAt: null
            },
            progress: {
                xp: 0,
                level: 1,
                streak: 0,
                totalPracticeMinutes: 0,
                learnedScales: [],
                completedSongs: [],
                achievements: []
            },
            settings: {
                darkMode: true,
                notifications: true,
                soundEffects: true
            }
        };
        
        this.saveUser();
        return this.user;
    }

    // Email/Password Registration
    async registerWithEmail(email, password, displayName) {
        // In production, this would use Firebase Auth
        // For demo, we'll simulate it
        
        const existingUsers = JSON.parse(localStorage.getItem('pm_users') || '[]');
        
        if (existingUsers.find(u => u.email === email)) {
            throw new Error('Email already registered');
        }
        
        const userId = 'user_' + Date.now();
        
        this.user = {
            id: userId,
            email,
            displayName: displayName || 'Pianist',
            avatar: null,
            createdAt: Date.now(),
            subscription: {
                status: 'free',
                plan: null,
                expiresAt: null
            },
            progress: {
                xp: 0,
                level: 1,
                streak: 0,
                totalPracticeMinutes: 0,
                learnedScales: [],
                completedSongs: [],
                achievements: []
            },
            settings: {
                darkMode: true,
                notifications: true,
                soundEffects: true
            }
        };
        
        existingUsers.push({
            id: userId,
            email,
            password: btoa(password), // Simple encoding (use proper hashing in production)
            displayName: this.user.displayName
        });
        
        localStorage.setItem('pm_users', JSON.stringify(existingUsers));
        this.saveUser();
        
        return this.user;
    }

    // Login
    async login(email, password) {
        const existingUsers = JSON.parse(localStorage.getItem('pm_users') || '[]');
        const user = existingUsers.find(u => u.email === email);
        
        if (!user) {
            throw new Error('Email not found');
        }
        
        if (atob(user.password) !== password) {
            throw new Error('Incorrect password');
        }
        
        // Load full user data
        const savedUser = localStorage.getItem('pm_user_' + user.id);
        if (savedUser) {
            this.user = JSON.parse(savedUser);
        } else {
            this.user = user;
        }
        
        this.isPremium = this.user.subscription?.status === 'premium';
        this.saveUser();
        
        return this.user;
    }

    // Google Sign-In (simulated)
    async signInWithGoogle() {
        // In production, use Firebase Google Auth
        // For demo, create a simulated Google account
        
        const email = 'user' + Date.now() + '@gmail.com';
        const displayName = 'Google User';
        
        return this.registerWithEmail(email, 'google_auth_' + Date.now(), displayName);
    }

    // Logout
    logout() {
        if (this.user) {
            localStorage.setItem('pm_user_' + this.user.id, JSON.stringify(this.user));
        }
        this.user = null;
        this.isPremium = false;
        localStorage.removeItem('pm_user');
    }

    // Update Profile
    updateProfile(updates) {
        if (!this.user) return;
        
        this.user = { ...this.user, ...updates };
        this.saveUser();
        return this.user;
    }

    // Update Progress
    updateProgress(progressUpdates) {
        if (!this.user) return;
        
        this.user.progress = { ...this.user.progress, ...progressUpdates };
        this.saveUser();
        return this.user.progress;
    }

    // Check if feature is available
    canAccessFeature(feature) {
        const premiumFeatures = [
            'unlimited_songs',
            'advanced_theory',
            'custom_exercises',
            'export_progress',
            'priority_support',
            'ad_free'
        ];
        
        if (this.isPremium) return true;
        return !premiumFeatures.includes(feature);
    }

    // Get subscription status
    getSubscriptionStatus() {
        if (!this.user) return null;
        
        return {
            status: this.user.subscription?.status || 'free',
            plan: this.user.subscription?.plan || null,
            isPremium: this.isPremium,
            expiresAt: this.user.subscription?.expiresAt
        };
    }
}

// ============== SUBSCRIPTION & IN-APP PURCHASES ==============
class SubscriptionManager {
    constructor(auth) {
        this.auth = auth;
        this.plans = [
            {
                id: 'monthly',
                name: 'Monthly',
                price: 9.99,
                currency: 'USD',
                period: 'month',
                features: [
                    'Unlimited song library',
                    'Advanced theory lessons',
                    'Custom exercises',
                    'Export your progress',
                    'Priority support',
                    'Ad-free experience'
                ],
                popular: false
            },
            {
                id: 'yearly',
                name: 'Yearly',
                price: 79.99,
                currency: 'USD',
                period: 'year',
                originalPrice: 119.88,
                discount: '33% OFF',
                features: [
                    'Everything in Monthly',
                    '2 months FREE',
                    'Early access to new features',
                    'Exclusive content packs',
                    'Personal progress reports'
                ],
                popular: true
            },
            {
                id: 'lifetime',
                name: 'Lifetime',
                price: 199.99,
                currency: 'USD',
                period: 'lifetime',
                features: [
                    'Everything in Yearly',
                    'One-time payment',
                    'All future updates included',
                    'VIP community access',
                    '1-on-1 support session'
                ],
                popular: false
            }
        ];
        
        this.products = [
            {
                id: 'song_pack_pop',
                name: 'Pop Songs Pack',
                description: '50+ popular songs',
                price: 4.99,
                type: 'one_time',
                icon: '🎤'
            },
            {
                id: 'song_pack_classical',
                name: 'Classical Masters Pack',
                description: '30 classical masterpieces',
                price: 4.99,
                type: 'one_time',
                icon: '🎼'
            },
            {
                id: 'theory_advanced',
                name: 'Advanced Theory',
                description: 'Unlock advanced lessons',
                price: 7.99,
                type: 'one_time',
                icon: '📚'
            },
            {
                id: 'custom_exercises',
                name: 'Custom Exercises',
                description: 'Create your own drills',
                price: 2.99,
                type: 'one_time',
                icon: '✏️'
            }
        ];
    }

    // Show subscription modal
    showSubscriptionModal() {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div class="subscription-modal">
                <div class="modal-handle"></div>
                
                <div class="subscription-header">
                    <h2>🎹 Go Premium</h2>
                    <p>Unlock your full potential</p>
                </div>
                
                <div class="subscription-plans">
                    ${this.plans.map(plan => this.renderPlanCard(plan)).join('')}
                </div>
                
                <div class="subscription-features-list">
                    <h4>Premium includes:</h4>
                    <ul>
                        <li>✓ Unlimited song library</li>
                        <li>✓ Advanced theory lessons</li>
                        <li>✓ Custom exercises</li>
                        <li>✓ Export your progress</li>
                        <li>✓ Priority support</li>
                        <li>✓ Ad-free experience</li>
                    </ul>
                </div>
                
                <div class="subscription-footer">
                    <p class="guarantee">7-day free trial • Cancel anytime</p>
                    <p class="terms">By subscribing, you agree to our Terms of Service</p>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }

    renderPlanCard(plan) {
        return `
            <div class="pricing-card ${plan.popular ? 'popular' : ''}" onclick="subscription.selectPlan('${plan.id}')">
                ${plan.popular ? '<span class="popular-badge">MOST POPULAR</span>' : ''}
                
                <h4>${plan.name}</h4>
                
                <div class="price">
                    ${plan.originalPrice ? `<span class="original">$${plan.originalPrice}</span>` : ''}
                    <span class="currency">$</span>${plan.price}
                    <span class="period">/${plan.period === 'lifetime' ? '' : plan.period}</span>
                </div>
                
                ${plan.discount ? `<span class="discount">${plan.discount}</span>` : ''}
                
                <button class="btn-premium btn-premium-primary">
                    ${plan.popular ? 'Start Free Trial' : 'Choose Plan'}
                </button>
            </div>
        `;
    }

    selectPlan(planId) {
        const plan = this.plans.find(p => p.id === planId);
        if (!plan) return;
        
        // In production, this would integrate with Stripe/Apple/Google IAP
        // For demo, we'll simulate the purchase
        
        showToast(`Processing ${plan.name} subscription...`, 'info');
        
        setTimeout(() => {
            this.auth.user.subscription = {
                status: 'premium',
                plan: planId,
                startedAt: Date.now(),
                expiresAt: plan.period === 'lifetime' ? null : Date.now() + (plan.period === 'year' ? 365 : 30) * 24 * 60 * 60 * 1000
            };
            
            this.auth.isPremium = true;
            this.auth.saveUser();
            
            closeModal();
            showToast('🎉 Welcome to Premium!', 'success');
            
            // Refresh UI
            if (typeof updateUIForPremium === 'function') {
                updateUIForPremium();
            }
        }, 1500);
    }

    // Show in-app purchase modal
    showIAPModal() {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div class="iap-modal">
                <div class="modal-handle"></div>
                
                <h2>🛒 Additional Content</h2>
                <p>Expand your learning experience</p>
                
                <div class="iap-products">
                    ${this.products.map(product => `
                        <div class="iap-product" onclick="subscription.purchaseProduct('${product.id}')">
                            <div class="product-icon">${product.icon}</div>
                            <div class="product-info">
                                <h4>${product.name}</h4>
                                <p>${product.description}</p>
                            </div>
                            <div class="product-price">$${product.price}</div>
                        </div>
                    `).join('')}
                </div>
                
                <button class="btn-premium btn-premium-secondary" onclick="closeModal()">Maybe Later</button>
            </div>
        `;
        
        modal.classList.add('active');
    }

    purchaseProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        showToast(`Purchasing ${product.name}...`, 'info');
        
        setTimeout(() => {
            // Add to purchased products
            const purchased = JSON.parse(localStorage.getItem('pm_purchased') || '[]');
            if (!purchased.includes(productId)) {
                purchased.push(productId);
                localStorage.setItem('pm_purchased', JSON.stringify(purchased));
            }
            
            closeModal();
            showToast(`✓ ${product.name} unlocked!`, 'success');
        }, 1000);
    }

    isProductPurchased(productId) {
        const purchased = JSON.parse(localStorage.getItem('pm_purchased') || '[]');
        return purchased.includes(productId);
    }
}

// ============== AUTH UI ==============
function showAuthModal(mode = 'login') {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div class="auth-modal">
            <div class="modal-handle"></div>
            
            <div class="auth-header">
                <h2>🎹 ${mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                <p>${mode === 'login' ? 'Sign in to sync your progress' : 'Start your piano journey'}</p>
            </div>
            
            <div class="auth-tabs">
                <button class="auth-tab ${mode === 'login' ? 'active' : ''}" onclick="showAuthModal('login')">Login</button>
                <button class="auth-tab ${mode === 'register' ? 'active' : ''}" onclick="showAuthModal('register')">Sign Up</button>
            </div>
            
            <form class="auth-form" onsubmit="handleAuthSubmit(event, '${mode}')">
                ${mode === 'register' ? `
                    <div class="form-group">
                        <input type="text" id="auth-name" placeholder="Your name" required>
                    </div>
                ` : ''}
                
                <div class="form-group">
                    <input type="email" id="auth-email" placeholder="Email" required>
                </div>
                
                <div class="form-group">
                    <input type="password" id="auth-password" placeholder="Password" required minlength="6">
                </div>
                
                <button type="submit" class="btn-premium btn-premium-primary" style="width: 100%">
                    ${mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
            </form>
            
            <div class="auth-divider">
                <span>or continue with</span>
            </div>
            
            <div class="auth-social">
                <button class="btn-social google" onclick="handleGoogleAuth()">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.23v2.84C4.09 20.85 7.77 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.23C1.43 8.55 1 10.22 1 12s.43 3.45 1.23 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.09 3.2 2.23 6.93l3.61 2.84c.87-2.6 3.3-4.39 6.16-4.39z"/>
                    </svg>
                    Continue with Google
                </button>
            </div>
            
            <button class="btn-premium btn-premium-secondary" style="width: 100%; margin-top: 16px" onclick="continueAsGuest()">
                Continue as Guest
            </button>
            
            ${mode === 'login' ? `
                <p class="auth-footer">
                    Don't have an account? <a onclick="showAuthModal('register')">Sign up</a>
                </p>
            ` : `
                <p class="auth-footer">
                    Already have an account? <a onclick="showAuthModal('login')">Login</a>
                </p>
            `}
        </div>
    `;
    
    modal.classList.add('active');
}

async function handleAuthSubmit(event, mode) {
    event.preventDefault();
    
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = mode === 'register' ? document.getElementById('auth-name')?.value : null;
    
    try {
        if (mode === 'register') {
            await auth.registerWithEmail(email, password, name);
        } else {
            await auth.login(email, password);
        }
        
        closeModal();
        showToast('🎉 Welcome, ' + (auth.user?.displayName || 'Pianist') + '!', 'success');
        updateUIForAuth();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function handleGoogleAuth() {
    try {
        await auth.signInWithGoogle();
        closeModal();
        showToast('🎉 Welcome!', 'success');
        updateUIForAuth();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function continueAsGuest() {
    auth.createAnonymousAccount();
    closeModal();
    showToast('🎭 Guest account created. Sign up anytime to save progress!', 'success');
    updateUIForAuth();
}

function updateUIForAuth() {
    // Update header with user info
    const avatarEl = document.querySelector('.user-avatar');
    if (avatarEl && auth.user) {
        avatarEl.textContent = auth.user.displayName?.charAt(0) || 'P';
    }
    
    // Show premium badge if premium
    if (auth.isPremium) {
        document.querySelectorAll('.locked-content').forEach(el => {
            el.classList.remove('locked-content');
        });
    }
    
    // Update subscription status
    const statusEl = document.getElementById('subscription-status');
    if (statusEl) {
        statusEl.textContent = auth.isPremium ? 'Premium' : 'Free';
        statusEl.className = auth.isPremium ? 'premium-badge' : '';
    }
}

function updateUIForPremium() {
    // Remove all locked overlays
    document.querySelectorAll('.locked-overlay').forEach(el => el.remove());
    document.querySelectorAll('.locked-content').forEach(el => {
        el.classList.remove('locked-content');
        el.style.position = '';
    });
    
    // Show premium badge
    const badges = document.querySelectorAll('.premium-required');
    badges.forEach(el => el.style.display = 'none');
    
    showToast('👑 Premium features unlocked!', 'success');
}

// Initialize
const auth = new AuthSystem();
const subscription = new SubscriptionManager(auth);

// Check if user exists - DISABLED FOR TESTING
document.addEventListener('DOMContentLoaded', () => {
    // Auto-auth disabled for testing - uncomment to re-enable
    // if (!auth.user) {
    //     setTimeout(() => {
    //         showAuthModal('register');
    //     }, 1000);
    // } else {
    //     updateUIForAuth();
    // }
    
    // Create anonymous guest account for testing
    if (!auth.user) {
        auth.createAnonymousAccount();
    }
});

// Export for global access
if (typeof window !== 'undefined') {
    window.auth = auth;
    window.subscription = subscription;
    window.showAuthModal = showAuthModal;
    window.handleAuthSubmit = handleAuthSubmit;
    window.handleGoogleAuth = handleGoogleAuth;
    window.continueAsGuest = continueAsGuest;
    window.updateUIForAuth = updateUIForAuth;
    window.updateUIForPremium = updateUIForPremium;
}
