// Games database with multi-category support
const gamesDatabase = [
    {
        id: 'cs16',
        title: 'CS 1.6',
        categories: ['shooter'],
        description: 'Classic Counter-Strike 1.6 - The legendary tactical shooter that defined an era',
        image: 'assets/CS.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/familiapablo/lopx@main/cs.xml'
    },
    {
        id: 'ultrakill',
        title: 'ULTRAKILL',
        categories: ['shooter', 'action'],
        description: 'Fast-paced ultra-violent retro FPS combining the skill-based style of classic shooters',
        image: 'assets/Ultrakill.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/kelsimsk/ugil@main/2.xml'
    },
    {
        id: 'callofbattle',
        title: 'Call of Battle',
        categories: ['shooter'],
        description: 'Intense multiplayer first-person shooter with modern combat mechanics',
        image: 'assets/Callofbattle.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/docs-g-classroommyflies/rte@main/googlex.xml'
    },
    {
        id: 'ks2',
        title: 'Knife Smash 2',
        categories: ['arcade'],
        description: 'Test your timing and precision by throwing knives at spinning targets',
        image: 'assets/Ks2.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/z799gs/c2@main/11.xml'
    },
    {
        id: 'basketballstars',
        title: 'Basketball Stars',
        categories: ['sports'],
        description: 'Play basketball against opponents in this exciting multiplayer sports game',
        image: 'assets/BasketballStars.png',
        gameUrl: 'https://36043189-480959866522093217.preview.editmysite.com/uploads/b/139890129-743801889220072865/files/bs.xml'
    },
    {
        id: 'minecraft',
        title: 'Minecraft',
        categories: ['sandbox'],
        description: 'Build, explore, and survive in this iconic block-based sandbox adventure',
        image: 'assets/minecraft.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/okyesgoogl/mc@main/13.xml'
    },
    {
        id: 'snowrider',
        title: 'Snow Rider 3D',
        categories: ['racing'],
        description: 'Ride your sleigh down snowy slopes while avoiding obstacles',
        image: 'assets/snowrider.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/nihathatpsin/a-b-ce@main/77.xml'
    },
    {
        id: 'polytrack',
        title: 'Polytrack',
        categories: ['racing'],
        description: 'Race through low-poly tracks with fast-paced arcade racing action',
        image: 'assets/polytrack.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/ftbaldana/f88f88@main/pol.xml'
    },
    {
        id: 'wavex',
        title: 'Wave X',
        categories: ['action'],
        description: 'Survive waves of enemies in this intense action-packed shooter',
        image: 'assets/wavex.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/netclassroom/felek@main/wwavw.xml'
    },
    {
        id: 'archers',
        title: 'Archers',
        categories: ['arcade'],
        description: 'Master the bow and arrow in this competitive archery battle game',
        image: 'assets/archers.png',
        gameUrl: 'https://cdn.jsdelivr.net/gh/ertemr33/qaza@main/1.xml'
    },
    {
        id: 'pokemon',
        title: 'Pokémon Collection',
        categories: ['rpg'],
        description: 'Choose your favorite Pokémon adventure and start your journey',
        image: 'assets/pokemon.png',
        hasSubmenu: true,
        submenu: [
            {
                id: 'pokemon-ruby',
                title: 'Pokémon Ruby',
                gameUrl: 'https://cdn.jsdelivr.net/gh/ftbaldana/f88f88@main/pok20.xml'
            },
            {
                id: 'pokemon-emerald',
                title: 'Pokémon Emerald',
                gameUrl: 'https://cdn.jsdelivr.net/gh/ftbaldana/f88f88@main/pok11.xml'
            },
            {
                id: 'pokemon-firered',
                title: 'Pokémon Fire Red',
                gameUrl: 'https://cdn.jsdelivr.net/gh/ftbaldana/f88f88@main/pok14.xml'
            },
            {
                id: 'pokemon-arceus',
                title: 'Pokémon Legends Arceus',
                gameUrl: 'https://cdn.jsdelivr.net/gh/ftbaldana/f88f88@main/pok2.xml'
            },
            {
                id: 'pokemon-blue',
                title: 'Pokémon Blue',
                gameUrl: 'https://cdn.jsdelivr.net/gh/ftbaldana/f88f88@main/pok6.xml'
            }
        ]
    }
];