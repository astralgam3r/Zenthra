// ===================================
// PARTICLE SYSTEM
// ===================================
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
let particlesEnabled = localStorage.getItem('particlesEnabled') !== 'false';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 58, 237, 0.6)';
        ctx.fill();
    }
}

const nodes = [];
for (let i = 0; i < 80; i++) nodes.push(new Node());

function connectNodes() {
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(124, 58, 237, ${0.3 - distance / 500})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    if (particlesEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            node.update();
            node.draw();
        });
        connectNodes();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
    
    if (type === 'error') notification.classList.add('error');
    else if (type === 'warning') notification.classList.add('warning');
    
    void notification.offsetWidth;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('show', 'hide', 'error', 'warning');
        }, 400);
    }, 3000);
}

// ===================================
// NAVIGATION
// ===================================
function switchSection(sectionId, navItem) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (navItem) navItem.classList.add('active');
}

function scrollToSection(sectionId) {
    switchSection(sectionId);
    const sectionMap = { 'home': 0, 'games': 1, 'apps': 2, 'settings': 3 };
    const navItems = document.querySelectorAll('.nav-item');
    if (sectionMap[sectionId] !== undefined) {
        navItems[sectionMap[sectionId]].classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// SETTINGS MANAGEMENT
// ===================================

// Tab Cloaking
function saveSiteTitle() {
    const title = document.getElementById('siteTitle').value;
    document.getElementById('pageTitle').textContent = title;
    localStorage.setItem('siteTitle', title);
    showNotification('Site title saved!');
}

function saveFavicon() {
    const favicon = document.getElementById('siteFavicon').value;
    document.getElementById('pageFavicon').href = favicon;
    localStorage.setItem('siteFavicon', favicon);
    showNotification('Favicon updated!');
}

// Panic Button
let isSettingPanicKey = false;
const panicKeyInput = document.getElementById('panicKey');

panicKeyInput.addEventListener('focus', () => {
    isSettingPanicKey = true;
    panicKeyInput.value = 'Press a key...';
});

panicKeyInput.addEventListener('blur', () => {
    setTimeout(() => {
        isSettingPanicKey = false;
        const savedKey = localStorage.getItem('panicKey') || 'ESCAPE';
        if (panicKeyInput.value === 'Press a key...') {
            panicKeyInput.value = savedKey;
        }
    }, 100);
});

panicKeyInput.addEventListener('keydown', (e) => {
    if (!isSettingPanicKey) return;
    e.preventDefault();
    e.stopPropagation();
    let key = e.key.toUpperCase();
    if (key === 'ESCAPE') key = 'ESCAPE';
    else if (key === ' ') key = 'SPACE';
    else if (key.startsWith('ARROW')) key = key.replace('ARROW', '');
    panicKeyInput.value = key;
    panicKeyInput.blur();
});

function savePanicSettings() {
    const key = document.getElementById('panicKey').value;
    const url = document.getElementById('panicUrl').value;
    if (key === 'Press a key...' || !key) {
        showNotification('Please set a panic key first!', 'error');
        return;
    }
    localStorage.setItem('panicKey', key);
    localStorage.setItem('panicUrl', url);
    showNotification('Panic button settings saved!');
}

let panicKeyPressed = false;

function triggerPanic() {
    if (panicKeyPressed) return;
    panicKeyPressed = true;
    const url = localStorage.getItem('panicUrl') || 'https://classroom.google.com/';
    
    // Intentar cerrar ventana si es un popup
    try {
        window.close();
    } catch (e) {}
    
    // Si window.close() no funcionó, redirigir
    setTimeout(() => {
        window.location.replace(url);
    }, 100);
}

document.addEventListener('keydown', (e) => {
    const savedKey = localStorage.getItem('panicKey') || 'ESCAPE';
    let pressedKey = e.key.toUpperCase();
    if (pressedKey === 'ESCAPE') pressedKey = 'ESCAPE';
    else if (pressedKey === ' ') pressedKey = 'SPACE';
    else if (pressedKey.startsWith('ARROW')) pressedKey = pressedKey.replace('ARROW', '');
    
    if (pressedKey === savedKey && !isSettingPanicKey) {
        e.preventDefault();
        triggerPanic();
    }
}, true); // Usar 'true' para captura y que funcione en iframes

// Display Settings
function toggleParticles(element) {
    element.classList.toggle('active');
    particlesEnabled = !particlesEnabled;
    localStorage.setItem('particlesEnabled', particlesEnabled);
    
    const canvas = document.getElementById('neuralCanvas');
    if (!particlesEnabled) {
        canvas.classList.add('hidden');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        canvas.classList.remove('hidden');
    }
    showNotification(particlesEnabled ? 'Particles enabled' : 'Particles disabled');
}

function toggleAnimations(element) {
    element.classList.toggle('active');
    document.body.classList.toggle('reduce-animations');
    const reduced = document.body.classList.contains('reduce-animations');
    localStorage.setItem('animationsReduced', reduced);
    showNotification(reduced ? 'Animations reduced' : 'Animations enabled');
}

// Data Management
function downloadSettings() {
    const settings = {
        siteTitle: localStorage.getItem('siteTitle'),
        siteFavicon: localStorage.getItem('siteFavicon'),
        panicKey: localStorage.getItem('panicKey'),
        panicUrl: localStorage.getItem('panicUrl'),
        particlesEnabled: localStorage.getItem('particlesEnabled'),
        animationsReduced: localStorage.getItem('animationsReduced'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenthra-settings-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Settings downloaded!');
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
                Object.keys(settings).forEach(key => {
                    if (key !== 'exportDate') localStorage.setItem(key, settings[key]);
                });
                location.reload();
            } catch (error) {
                showNotification('Invalid settings file!', 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearCache() {
    if (confirm('Clear all cached game data? This will free up storage space.')) {
        indexedDB.deleteDatabase('GameCacheDB');
        showNotification('Cache cleared successfully!');
    }
}

function aboutBlankCloak() {
    if (confirm('Open site in about:blank mode? This will open a new window.')) {
        const url = window.location.href;
        const win = window.open('about:blank', '_blank');
        if (win) {
            win.document.write(`
                <iframe src="${url}" style="position:fixed;top:0;left:0;width:100%;height:100%;border:none;"></iframe>
            `);
            win.document.close();
        }
    }
}

function resetSettings() {
    if (confirm('Reset all settings to defaults? This cannot be undone!')) {
        localStorage.clear();
        showNotification('Settings reset! Refreshing...', 'warning');
        setTimeout(() => location.reload(), 1500);
    }
}

// ===================================
// GAMES SYSTEM
// ===================================
let allGames = [];
let currentFilter = 'all';
let searchQuery = '';

function initGames() {
    // Check if gamesDatabase is loaded
    if (typeof gamesDatabase === 'undefined') {
        console.error('gamesDatabase not loaded!');
        return;
    }
    
    allGames = gamesDatabase.map(game => ({
        ...game,
        categories: game.categories || (game.category ? [game.category] : ['action']) // Support old format
    }));
    
    document.getElementById('gameCount').textContent = allGames.length;
    renderGames();
    setupGameFilters();
}

function setupGameFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderGames();
    });
    
    categoryFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderGames();
    });
    
    // Añadir listener para filtro de favoritos si existe
    const favoritesFilter = document.getElementById('favoritesFilter');
    if (favoritesFilter) {
        favoritesFilter.addEventListener('change', (e) => {
            renderGames();
        });
    }
}

function renderGames() {
    const grid = document.getElementById('gamesGrid');
    const favoritesFilter = document.getElementById('favoritesFilter');
    const showOnlyFavorites = favoritesFilter ? favoritesFilter.checked : false;
    
    const filtered = allGames.filter(game => {
        const matchesSearch = !searchQuery || 
            game.title.toLowerCase().includes(searchQuery) ||
            game.description.toLowerCase().includes(searchQuery);
        
        const matchesCategory = currentFilter === 'all' || 
            game.categories.includes(currentFilter);
        
        const matchesFavorites = !showOnlyFavorites || isFavorite(game.id);
        
        return matchesSearch && matchesCategory && matchesFavorites;
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #9ca3af;">
                <div style="font-size: 3em; margin-bottom: 20px;">🎮</div>
                <h3 style="font-size: 1.5em; margin-bottom: 10px;">No games found</h3>
                <p>Try adjusting your search or filter</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(game => createGameCard(game)).join('');
}

function createGameCard(game) {
    const categoryBadges = game.categories
        .map(cat => `<span class="game-category">${cat.toUpperCase()}</span>`)
        .join('');
    
    const isFav = isFavorite(game.id);
    const favClass = isFav ? 'favorite-active' : '';
    
    return `
        <div class="game-card">
            <button class="favorite-btn ${favClass}" onclick="event.stopPropagation(); toggleFavorite('${game.id}')">
                ${isFav ? '★' : '☆'}
            </button>
            <div class="game-card-content" ${game.hasSubmenu ? `onclick="showPokemonMenu()"` : `onclick="playGame('${game.id}')"`}>
                <div class="game-image-wrapper">
                    <img src="${game.image}" alt="${game.title}" class="game-image" 
                         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect fill=%22%237c3aed%22 width=%22200%22 height=%22200%22/></svg>'">
                    <div class="game-overlay">
                        <div class="play-icon">▶</div>
                    </div>
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-description">${game.description}</p>
                    <div class="game-categories">${categoryBadges}</div>
                </div>
            </div>
        </div>
    `;
}

// Pokemon Menu
function showPokemonMenu() {
    const game = allGames.find(g => g.hasSubmenu);
    if (!game || !game.submenu) return;
    
    const modal = document.createElement('div');
    modal.className = 'pokemon-modal';
    modal.innerHTML = `
        <div class="pokemon-modal-content">
            <div class="pokemon-modal-header">
                <h2>Choose Your Pokémon Adventure</h2>
                <button class="pokemon-close" onclick="closePokemonMenu()">×</button>
            </div>
            <div class="pokemon-grid">
                ${game.submenu.map(version => `
                    <div class="pokemon-version-card" onclick="playPokemon('${version.id}', '${version.gameUrl}')">
                        <h3>${version.title}</h3>
                        <button class="pokemon-play-btn">PLAY NOW</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closePokemonMenu() {
    const modal = document.querySelector('.pokemon-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function playPokemon(versionId, gameUrl) {
    closePokemonMenu();
    const gameWindow = window.open('', '_blank');
    if (gameWindow) {
        gameWindow.document.write(getGamePlayerHTML({
            id: versionId,
            title: versionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            gameUrl: gameUrl
        }));
        gameWindow.document.close();
    } else {
        showNotification('Please allow popups to play games!', 'error');
    }
}

function playGame(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (!game) return;
    
    const gameWindow = window.open('', '_blank');
    if (gameWindow) {
        gameWindow.document.write(getGamePlayerHTML(game));
        gameWindow.document.close();
    } else {
        showNotification('Please allow popups to play games!', 'error');
    }
}

function getGamePlayerHTML(game) {
    return `
<!DOCTYPE html>
<html>
<head>
    <base target="_blank">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${game.title} - Zenthra</title>
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
    <style>
        body, html { margin: 0; padding: 0; overflow: hidden; height: 100%; background: #0a0a1f; font-family: 'Rajdhani', sans-serif; }
        #container { position: relative; width: 100%; height: 100%; }
        #fr { width: 100%; height: 100%; border: none; display: none; }
        .play-button {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            padding: 20px 80px; background: linear-gradient(135deg, #7c3aed, #6d28d9);
            color: white; border: none; border-radius: 15px;
            font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700;
            letter-spacing: 3px; cursor: pointer; z-index: 1001;
            transition: all 0.3s ease; box-shadow: 0 8px 30px rgba(124, 58, 237, 0.6);
        }
        .play-button:hover { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 12px 40px rgba(124, 58, 237, 0.8); }
        .fullscreen-button {
            position: fixed; bottom: 25px; right: 30px; display: flex; align-items: center; gap: 8px;
            padding: 12px 24px; background: rgba(124, 58, 237, 0.8); backdrop-filter: blur(10px);
            border: 1px solid rgba(168, 85, 247, 0.5); border-radius: 10px;
            color: white; font-family: 'Rajdhani', sans-serif; font-size: 14px;
            font-weight: 600; letter-spacing: 1.5px; cursor: pointer; z-index: 1002;
            transition: all 0.3s ease;
        }
        .fullscreen-button:hover {
            background: rgba(124, 58, 237, 1); transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.5);
        }
        #game-title {
            position: absolute; top: 20px; left: 20px; color: #c4b5fd;
            font-size: 18px; font-weight: 700; pointer-events: none; z-index: 1000;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
    </style>
</head>
<body>
    <div id="container">
        <iframe id="fr" allowfullscreen></iframe>
        <button class="play-button" onclick="startGame()">START GAME</button>
        <p id="game-title">${game.title}</p>
        <button class="fullscreen-button" onclick="openFullscreen()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            FULLSCREEN
        </button>
    </div>
    <script>
        const DB_NAME = 'GameCacheDB';
        const STORE_NAME = 'GameFiles';
        const CACHE_DURATION = 90 * 24 * 60 * 60 * 1000;
        const FILE_URL = '${game.gameUrl}';

        function openDB() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(DB_NAME, 1);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        db.createObjectStore(STORE_NAME, { keyPath: 'url' });
                    }
                };
                request.onsuccess = (event) => resolve(event.target.result);
                request.onerror = (event) => reject(event.target.error);
            });
        }

        async function saveToCache(url, content) {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORE_NAME, 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.put({ url: url, content: content, timestamp: Date.now() });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(new Error('Cache error'));
            });
        }

        async function getFileFromCache(url) {
            const db = await openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(STORE_NAME, 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.get(url);
                request.onsuccess = async (event) => {
                    const data = event.target.result;
                    if (data && (Date.now() - data.timestamp) < CACHE_DURATION) {
                        resolve(data.content);
                    } else {
                        try {
                            const response = await fetch(url);
                            const text = await response.text();
                            await saveToCache(url, text);
                            resolve(text);
                        } catch (err) {
                            reject(err);
                        }
                    }
                };
                request.onerror = () => reject(new Error('DB error'));
            });
        }

        function startGame() {
            const iframe = document.getElementById("fr");
            const button = document.querySelector(".play-button");
            
            getFileFromCache(FILE_URL).then((text) => {
                iframe.contentDocument.open();
                iframe.contentDocument.write(text);
                iframe.contentDocument.close();
                iframe.style.display = "block";
                button.style.opacity = '0';
                setTimeout(() => button.style.display = 'none', 300);
            }).catch((err) => {
                console.error('Error:', err);
                alert('Failed to load game. Please try again.');
            });
        }

        function openFullscreen() {
            getFileFromCache(FILE_URL).then((text) => {
                const newWindow = window.open("", "_blank");
                if (newWindow) {
                    newWindow.document.open();
                    newWindow.document.write(text);
                    newWindow.document.close();
                } else {
                    alert('Could not open fullscreen. Please allow popups.');
                }
            }).catch((err) => {
                console.error('Error:', err);
                alert('Failed to load fullscreen.');
            });
        }
        
        // Panic Button en ventanas de juego
        document.addEventListener('keydown', (e) => {
            const savedKey = localStorage.getItem('panicKey') || 'ESCAPE';
            let pressedKey = e.key.toUpperCase();
            
            if (pressedKey === 'ESCAPE') pressedKey = 'ESCAPE';
            else if (pressedKey === ' ') pressedKey = 'SPACE';
            else if (pressedKey.startsWith('ARROW')) pressedKey = pressedKey.replace('ARROW', '');
            
            if (pressedKey === savedKey) {
                e.preventDefault();
                const url = localStorage.getItem('panicUrl') || 'https://classroom.google.com/';
                try { window.close(); } catch(e) {}
                setTimeout(() => window.location.replace(url), 100);
            }
        }, true);
    </script>
</body>
</html>
    `;
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    const savedTitle = localStorage.getItem('siteTitle');
    const savedFavicon = localStorage.getItem('siteFavicon');
    const savedPanicKey = localStorage.getItem('panicKey');
    const savedPanicUrl = localStorage.getItem('panicUrl');
    const savedAnimations = localStorage.getItem('animationsReduced') === 'true';
    
    if (savedTitle) {
        document.getElementById('pageTitle').textContent = savedTitle;
        document.getElementById('siteTitle').value = savedTitle;
    }
    if (savedFavicon) {
        document.getElementById('pageFavicon').href = savedFavicon;
        document.getElementById('siteFavicon').value = savedFavicon;
    }
    if (savedPanicKey) document.getElementById('panicKey').value = savedPanicKey;
    if (savedPanicUrl) document.getElementById('panicUrl').value = savedPanicUrl;
    
    if (!particlesEnabled) {
        document.querySelector('.toggle-switch').classList.remove('active');
        document.getElementById('neuralCanvas').classList.add('hidden');
    }
    
    if (savedAnimations) {
        document.body.classList.add('reduce-animations');
        document.querySelectorAll('.toggle-switch')[1].classList.add('active');
    }
    
    // Inicializar VIP status
    if (typeof updateVIPStatus === 'function') {
        updateVIPStatus();
    }
    
    // Aplicar colores personalizados si es VIP
    if (typeof applyCustomColors === 'function' && typeof getCustomColors === 'function') {
        const colors = getCustomColors();
        applyCustomColors(colors);
        
        // Si hay inputs de color, inicializarlos
        if (document.getElementById('colorPrimary')) {
            document.getElementById('colorPrimary').value = colors.primary;
            document.getElementById('colorSecondary').value = colors.secondary;
            document.getElementById('colorAccent').value = colors.accent;
            document.getElementById('colorLight').value = colors.light;
        }
    }
    
    // Initialize games
    initGames();
});