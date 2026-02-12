// Configuration settings for Zenthra
const CONFIG = {
    // Site branding
    branding: {
        name: 'ZENTHRA',
        defaultTitle: 'Google Classroom',
        defaultFavicon: 'https://ssl.gstatic.com/classroom/ic_product_classroom_32.png'
    },
    
    // Default settings
    defaults: {
        particlesEnabled: true,
        animationsReduced: false,
        panicKey: 'ESCAPE',
        panicUrl: 'https://classroom.google.com/'
    },
    
    // Cache settings
    cache: {
        dbName: 'GameCacheDB',
        storeName: 'GameFiles',
        duration: 90 * 24 * 60 * 60 * 1000 // 90 days
    },
    
    // Game categories
    categories: [
        { value: 'all', label: 'All Categories' },
        { value: 'shooter', label: 'Shooter' },
        { value: 'action', label: 'Action' },
        { value: 'arcade', label: 'Arcade' },
        { value: 'sports', label: 'Sports' },
        { value: 'sandbox', label: 'Sandbox' },
        { value: 'racing', label: 'Racing' },
        { value: 'rpg', label: 'RPG' }
    ]
};