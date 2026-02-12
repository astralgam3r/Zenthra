// ===================================
// VIP SYSTEM - VERSION COMPLETAMENTE FUNCIONAL
// ===================================

const VIP_KEYS = [
    'DEMO2024',
    'TESTVIP1',
    'BETAKEY2',
    'GOLDVIP3',
    'D4N1-H8J3',
    'W9T2-Z6V7',
    'B3R8-L5Q1',
    'X7K2-M9P4'
];

// Temas predefinidos VIP
const VIP_THEMES = {
    default: {
        name: '💜 Purple Dream (Default)',
        colors: {
            primary: '#7c3aed',
            secondary: '#6d28d9',
            accent: '#a78bfa',
            light: '#c4b5fd'
        }
    },
    ocean: {
        name: '🌊 Ocean Breeze',
        colors: {
            primary: '#0ea5e9',
            secondary: '#0284c7',
            accent: '#38bdf8',
            light: '#7dd3fc'
        }
    },
    forest: {
        name: '🌲 Forest Green',
        colors: {
            primary: '#10b981',
            secondary: '#059669',
            accent: '#34d399',
            light: '#6ee7b7'
        }
    },
    sunset: {
        name: '🌅 Sunset Orange',
        colors: {
            primary: '#f97316',
            secondary: '#ea580c',
            accent: '#fb923c',
            light: '#fdba74'
        }
    },
    rose: {
        name: '🌹 Rose Pink',
        colors: {
            primary: '#ec4899',
            secondary: '#db2777',
            accent: '#f472b6',
            light: '#f9a8d4'
        }
    },
    cyberpunk: {
        name: '🤖 Cyberpunk',
        colors: {
            primary: '#06b6d4',
            secondary: '#0891b2',
            accent: '#22d3ee',
            light: '#67e8f9'
        }
    },
    dark: {
        name: '🌑 Dark Mode',
        colors: {
            primary: '#374151',
            secondary: '#1f2937',
            accent: '#6b7280',
            light: '#9ca3af'
        }
    },
    gold: {
        name: '✨ Golden Luxury',
        colors: {
            primary: '#f59e0b',
            secondary: '#d97706',
            accent: '#fbbf24',
            light: '#fcd34d'
        }
    }
};

function isVIP() {
    return localStorage.getItem('vipActivated') === 'true';
}

function getUsedKey() {
    return localStorage.getItem('vipKey');
}

function getVIPExpirationDate() {
    const expiration = localStorage.getItem('vipExpiration');
    return expiration ? new Date(expiration) : null;
}

function activateVIP(key) {
    // Normalizar: remover guiones y espacios, convertir a mayúscula
    const normalizedKey = key.toUpperCase().trim().replace(/[-\s]/g, '');
    
    // Verificar si la key es válida (normalizando las keys también)
    const normalizedKeys = VIP_KEYS.map(k => k.toUpperCase().replace(/[-\s]/g, ''));
    
    if (!normalizedKeys.includes(normalizedKey)) {
        if (typeof showNotification === 'function') {
            showNotification('❌ Invalid VIP key!', 'error');
        }
        console.log('Key entered:', normalizedKey);
        console.log('Valid keys:', normalizedKeys);
        return false;
    }
    
    if (getUsedKey() === normalizedKey) {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ This key has already been used!', 'error');
        }
        return false;
    }
    
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    
    localStorage.setItem('vipActivated', 'true');
    localStorage.setItem('vipKey', normalizedKey);
    localStorage.setItem('vipExpiration', expirationDate.toISOString());
    localStorage.setItem('vipActivatedAt', new Date().toISOString());
    
    if (typeof showNotification === 'function') {
        showNotification('🎉 VIP Access Activated!', 'success');
    }
    
    console.log('✅ VIP activated successfully!');
    updateVIPStatus();
    
    return true;
}

function deactivateVIP() {
    const key = getUsedKey();
    
    if (!confirm(`Are you sure you want to deactivate VIP?\n\nYour key "${key}" will be available for use again.`)) {
        return;
    }
    
    localStorage.removeItem('vipActivated');
    localStorage.removeItem('vipKey');
    localStorage.removeItem('vipExpiration');
    localStorage.removeItem('vipActivatedAt');
    localStorage.removeItem('customColors');
    localStorage.removeItem('selectedTheme');
    
    if (typeof showNotification === 'function') {
        showNotification('VIP deactivated. Key is now available for reuse.', 'success');
    }
    
    setTimeout(() => {
        location.reload();
    }, 1500);
}

function checkVIPExpiration() {
    if (!isVIP()) return;
    
    const expiration = getVIPExpirationDate();
    if (expiration && new Date() > expiration) {
        localStorage.removeItem('vipActivated');
        localStorage.removeItem('vipExpiration');
        if (typeof showNotification === 'function') {
            showNotification('Your VIP access has expired', 'warning');
        }
        updateVIPStatus();
    }
}

function updateVIPStatus() {
    const logoText = document.querySelector('.logo-text');
    if (logoText && isVIP()) {
        logoText.textContent = 'ZENTHRA';
        
        if (!document.querySelector('.vip-badge')) {
            const badge = document.createElement('span');
            badge.className = 'vip-badge';
            badge.textContent = 'VIP';
            badge.style.cssText = `
                display: inline-block;
                margin-left: 12px;
                padding: 4px 12px;
                background: linear-gradient(135deg, #ffd700, #ffed4e);
                color: #1a1a2e;
                font-size: 0.5em;
                font-weight: 900;
                border-radius: 6px;
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
                animation: vipPulse 2s infinite;
            `;
            logoText.parentElement.appendChild(badge);
        }
    } else {
        const badge = document.querySelector('.vip-badge');
        if (badge) badge.remove();
    }
    
    const vipColorSection = document.querySelector('.vip-colors-section');
    if (vipColorSection) {
        vipColorSection.style.display = isVIP() ? 'block' : 'none';
    }
}

function showVIPModal() {
    const modal = document.createElement('div');
    modal.className = 'vip-modal';
    
    const expirationDate = getVIPExpirationDate();
    const daysLeft = expirationDate ? Math.ceil((expirationDate - new Date()) / (1000 * 60 * 60 * 24)) : 0;
    
    modal.innerHTML = `
        <div class="vip-modal-content">
            <div class="vip-modal-header">
                <h2>🌟 VIP Access</h2>
                <button class="vip-close" onclick="closeVIPModal()">×</button>
            </div>
            <div class="vip-modal-body">
                ${isVIP() ? `
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="font-size: 4em; margin-bottom: 10px;">👑</div>
                        <h3 style="color: #ffd700; margin-bottom: 10px;">VIP Status: Active</h3>
                        <p style="color: #9ca3af;">
                            ${daysLeft > 0 ? `${daysLeft} days remaining` : 'Expired - Please renew'}
                        </p>
                        <p style="color: #6b7280; font-size: 0.9em; margin-top: 10px;">
                            Key: ${getUsedKey()}
                        </p>
                    </div>
                    <div style="background: rgba(124, 58, 237, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                        <h4 style="color: #c4b5fd; margin-bottom: 15px;">Your VIP Benefits:</h4>
                        <ul style="text-align: left; color: #9ca3af; line-height: 2;">
                            <li>🎨 8 Premium color themes</li>
                            <li>🖌️ Custom color picker</li>
                            <li>👑 VIP badge on homepage</li>
                            <li>🎮 Exclusive games (coming soon)</li>
                        </ul>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="action-btn" onclick="closeVIPModal()" style="flex: 1;">Close</button>
                        <button class="action-btn reset-btn" onclick="deactivateVIP()" style="flex: 1;">
                            Cancel VIP
                        </button>
                    </div>
                ` : `
                    <p style="margin-bottom: 20px;">Enter your VIP activation key to unlock premium features:</p>
                    <ul style="text-align: left; margin: 20px 0; color: #9ca3af; line-height: 2;">
                        <li>🎨 8 Premium color themes</li>
                        <li>🖌️ Custom color picker</li>
                        <li>👑 VIP badge on homepage</li>
                        <li>🎮 Exclusive games</li>
                    </ul>
                    <input type="text" id="vipKeyInput" class="input-field" placeholder="XXXX-XXXX" style="width: 100%; margin: 20px 0; text-transform: uppercase;">
                    <button class="save-btn" onclick="submitVIPKey()" style="width: 100%;">Activate VIP</button>
                    <p style="color: #6b7280; font-size: 0.85em; margin-top: 15px; text-align: center;">
                        
                    </p>
                `}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    if (!isVIP()) {
        const input = document.getElementById('vipKeyInput');
        if (input) {
            input.focus();
            input.addEventListener('input', (e) => {
                let value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
                // Auto-formatear: agregar guión después de 4 caracteres
                if (value.length > 4 && !value.includes('-')) {
                    value = value.slice(0, 4) + '-' + value.slice(4);
                }
                // Limitar a 9 caracteres (XXXX-XXXX)
                e.target.value = value.slice(0, 9);
            });
        }
    }
}

function closeVIPModal() {
    const modal = document.querySelector('.vip-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function submitVIPKey() {
    const input = document.getElementById('vipKeyInput');
    const key = input.value;
    
    if (activateVIP(key)) {
        setTimeout(() => {
            closeVIPModal();
            location.reload();
        }, 1500);
    }
}

// ===================================
// THEME SYSTEM (VIP)
// ===================================

function getSelectedTheme() {
    return localStorage.getItem('selectedTheme') || 'default';
}

function applyTheme(themeName) {
    if (!isVIP() && themeName !== 'default') {
        if (typeof showNotification === 'function') {
            showNotification('VIP feature only!', 'error');
        }
        return;
    }
    
    const theme = VIP_THEMES[themeName];
    if (!theme) {
        console.error('Theme not found:', themeName);
        return;
    }
    
    console.log('Applying theme:', themeName, theme.colors);
    applyCustomColors(theme.colors);
    localStorage.setItem('selectedTheme', themeName);
    
    if (typeof showNotification === 'function') {
        showNotification(`✨ Theme "${theme.name}" applied!`, 'success');
    }
}

function renderThemeSelector() {
    const container = document.getElementById('themeSelector');
    if (!container) {
        console.warn('Theme selector container not found');
        return;
    }
    
    container.innerHTML = '';
    
    Object.keys(VIP_THEMES).forEach(key => {
        const theme = VIP_THEMES[key];
        const isSelected = getSelectedTheme() === key;
        
        const card = document.createElement('div');
        card.className = `theme-card ${isSelected ? 'selected' : ''}`;
        card.onclick = () => {
            applyTheme(key);
            renderThemeSelector();
        };
        
        card.innerHTML = `
            <div class="theme-preview">
                <div class="theme-color" style="background: ${theme.colors.primary}"></div>
                <div class="theme-color" style="background: ${theme.colors.secondary}"></div>
                <div class="theme-color" style="background: ${theme.colors.accent}"></div>
                <div class="theme-color" style="background: ${theme.colors.light}"></div>
            </div>
            <div class="theme-name">${theme.name}</div>
            ${isSelected ? '<div class="theme-checkmark">✓</div>' : ''}
        `;
        
        container.appendChild(card);
    });
    
    console.log('✅ Theme selector rendered with', Object.keys(VIP_THEMES).length, 'themes');
}

// ===================================
// FAVORITES SYSTEM
// ===================================
function getFavorites() {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function toggleFavorite(gameId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(gameId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        if (typeof showNotification === 'function') {
            showNotification('Removed from favorites', 'success');
        }
    } else {
        favorites.push(gameId);
        if (typeof showNotification === 'function') {
            showNotification('Added to favorites', 'success');
        }
    }
    
    saveFavorites(favorites);
    if (typeof renderGames === 'function') renderGames();
}

function isFavorite(gameId) {
    return getFavorites().includes(gameId);
}

// ===================================
// CUSTOM COLORS (VIP)
// ===================================
const DEFAULT_COLORS = {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#a78bfa',
    light: '#c4b5fd'
};

function getCustomColors() {
    if (!isVIP()) return DEFAULT_COLORS;
    
    const saved = localStorage.getItem('customColors');
    return saved ? JSON.parse(saved) : DEFAULT_COLORS;
}

function saveCustomColors(colors) {
    if (!isVIP()) return;
    localStorage.setItem('customColors', JSON.stringify(colors));
    localStorage.removeItem('selectedTheme');
}

function applyCustomColors(colors) {
    console.log('Applying colors:', colors);
    
    // Método 1: CSS Variables (principal)
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-light', colors.light);
    
    // Método 2: Actualizar elementos directamente (respaldo)
    const style = document.getElementById('dynamic-theme-style') || document.createElement('style');
    style.id = 'dynamic-theme-style';
    style.textContent = `
        :root {
            --color-primary: ${colors.primary} !important;
            --color-secondary: ${colors.secondary} !important;
            --color-accent: ${colors.accent} !important;
            --color-light: ${colors.light} !important;
        }
        
        /* Aplicar a elementos específicos */
        .logo, .get-started-btn, .save-btn, .game-card:hover,
        .nav-item.active::before, .toggle-switch.active .toggle-slider {
            background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}) !important;
        }
        
        .section-title, .logo-text, .theme-name, .stat-label {
            color: ${colors.light} !important;
        }
        
        .game-card, .info-box, .app-card, .setting-item {
            border-color: ${colors.primary}40 !important;
        }
        
        .game-card:hover {
            box-shadow: 0 8px 30px ${colors.primary}60 !important;
        }
    `;
    
    if (!document.getElementById('dynamic-theme-style')) {
        document.head.appendChild(style);
    }
    
    console.log('✅ Colors applied successfully');
    
    // Actualizar inputs si existen
    if (document.getElementById('colorPrimary')) {
        document.getElementById('colorPrimary').value = colors.primary;
        document.getElementById('colorSecondary').value = colors.secondary;
        document.getElementById('colorAccent').value = colors.accent;
        document.getElementById('colorLight').value = colors.light;
    }
}

function resetColors() {
    if (!isVIP()) {
        if (typeof showNotification === 'function') {
            showNotification('VIP feature only!', 'error');
        }
        return;
    }
    
    if (confirm('Reset to default purple theme?')) {
        localStorage.removeItem('customColors');
        localStorage.setItem('selectedTheme', 'default');
        applyCustomColors(DEFAULT_COLORS);
        
        renderThemeSelector();
        if (typeof showNotification === 'function') {
            showNotification('✅ Colors reset to default!', 'success');
        }
    }
}

function saveColors() {
    if (!isVIP()) {
        if (typeof showNotification === 'function') {
            showNotification('VIP feature only!', 'error');
        }
        return;
    }
    
    const colors = {
        primary: document.getElementById('colorPrimary').value,
        secondary: document.getElementById('colorSecondary').value,
        accent: document.getElementById('colorAccent').value,
        light: document.getElementById('colorLight').value
    };
    
    console.log('Saving custom colors:', colors);
    saveCustomColors(colors);
    applyCustomColors(colors);
    renderThemeSelector();
    
    if (typeof showNotification === 'function') {
        showNotification('✅ Custom colors saved!', 'success');
    }
}

// ===================================
// SETTINGS EXPORT/IMPORT
// ===================================
function downloadSettings() {
    const settings = {
        siteTitle: localStorage.getItem('siteTitle'),
        siteFavicon: localStorage.getItem('siteFavicon'),
        panicKey: localStorage.getItem('panicKey'),
        panicUrl: localStorage.getItem('panicUrl'),
        particlesEnabled: localStorage.getItem('particlesEnabled'),
        animationsReduced: localStorage.getItem('animationsReduced'),
        favorites: localStorage.getItem('favorites'),
        vipActivated: localStorage.getItem('vipActivated'),
        vipKey: localStorage.getItem('vipKey'),
        vipExpiration: localStorage.getItem('vipExpiration'),
        vipActivatedAt: localStorage.getItem('vipActivatedAt'),
        customColors: localStorage.getItem('customColors'),
        selectedTheme: localStorage.getItem('selectedTheme'),
        exportDate: new Date().toISOString(),
        version: '3.2.0'
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenthra-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (typeof showNotification === 'function') {
        showNotification('Settings downloaded!', 'success');
    }
}

function uploadSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const settings = JSON.parse(event.target.result);
                
                if (!settings.exportDate) {
                    throw new Error('Invalid backup file');
                }
                
                Object.keys(settings).forEach(key => {
                    if (key !== 'exportDate' && key !== 'version' && settings[key] !== null) {
                        localStorage.setItem(key, settings[key]);
                    }
                });
                
                if (typeof showNotification === 'function') {
                    showNotification('Settings restored! Reloading...', 'success');
                }
                setTimeout(() => location.reload(), 1500);
            } catch (error) {
                if (typeof showNotification === 'function') {
                    showNotification('Invalid settings file!', 'error');
                }
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ===================================
// INITIALIZATION
// ===================================
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeVIPFeatures);
    } else {
        initializeVIPFeatures();
    }
}

function initializeVIPFeatures() {
    console.log('🚀 Initializing VIP features...');
    
    checkVIPExpiration();
    updateVIPStatus();
    
    if (isVIP()) {
        console.log('✅ User is VIP, loading theme...');
        const selectedTheme = getSelectedTheme();
        
        if (selectedTheme && VIP_THEMES[selectedTheme]) {
            console.log('Applying saved theme:', selectedTheme);
            applyCustomColors(VIP_THEMES[selectedTheme].colors);
        } else {
            const colors = getCustomColors();
            console.log('Applying custom colors:', colors);
            applyCustomColors(colors);
        }
        
        setTimeout(() => {
            renderThemeSelector();
        }, 300);
    } else {
        console.log('ℹ️ User is not VIP');
    }
    
    // Add CSS for VIP features
    if (!document.getElementById('vip-styles')) {
        const style = document.createElement('style');
        style.id = 'vip-styles';
        style.textContent = `
            @keyframes vipPulse {
                0%, 100% { box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4); }
                50% { box-shadow: 0 4px 25px rgba(255, 215, 0, 0.7); }
            }
            
            .theme-card {
                background: rgba(124, 58, 237, 0.1);
                border: 2px solid rgba(124, 58, 237, 0.3);
                border-radius: 12px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .theme-card:hover {
                border-color: rgba(124, 58, 237, 0.6);
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
            }
            
            .theme-card.selected {
                border-color: #7c3aed;
                background: rgba(124, 58, 237, 0.2);
                box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
            }
            
            .theme-preview {
                display: flex;
                gap: 5px;
                margin-bottom: 10px;
                height: 50px;
            }
            
            .theme-color {
                flex: 1;
                border-radius: 6px;
                transition: transform 0.2s ease;
            }
            
            .theme-card:hover .theme-color {
                transform: scale(1.05);
            }
            
            .theme-name {
                color: #c4b5fd;
                font-weight: 600;
                font-size: 0.9em;
                text-align: center;
            }
            
            .theme-checkmark {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, #7c3aed, #a78bfa);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 2px 10px rgba(124, 58, 237, 0.5);
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ VIP features initialized successfully');
}