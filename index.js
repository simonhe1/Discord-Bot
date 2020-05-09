const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        try {
            client.commands.get(commandName).execute(message,args);
        } catch(err) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
);

let target1StillOn = false;

let targetChannel = '';
const sendingChannel = '708471731798540350';

const target1ID = '248233443345956865';
// Simon id: 248233443345956865
const target2ID = '';
// Whoever's id: 

let startTime = 0;

client.on('voiceStateUpdate', async (oldState, newState) => {
    // Snowflakes so they're type string
    const newMemberID = oldState.member.id;

    // Just need to check if the new state contains the people's id you care about.
    if(newMemberID === target1ID) {
        try{
            // Snowflakes so they're type string
            const channelIdOld = oldState.channelID;
            const channelIdNew = newState.channelID;

            // If list contains target, means they're on so set target to true(on)
            target1StillOn = true;

            // If the id of newState is null, means the person logged off
            if(channelIdNew === null) {
                console.log('Simon Logged off');
                target1StillOn = false;
                startTime = 0;
                return;
            }

            // If channels are the same, that means they're probably streaming or something.
            // So we don't needa do anything
            if(channelIdOld === channelIdNew){return;}

            // If all test cases pass then we can safely assume target 1 just joined a channel
            targetChannel = channelIdNew;
            startTime = new Date();
            console.log(startTime);

        } catch(err) {
            console.log(err);
            target1StillOn = false;
            startTime = 0;
            return;
        }
    }

    if(newMemberID === target2ID) {
        // If target isn't on, then we don't rly care
        if(target1StillOn) {
            try{
                // Snowflakes so they're type string
                const channelIdOld = oldState.channelID;
                const channelIdNew = newState.channelID;
    
                // If channels are the same, that means they're probably streaming or something.
                // So we don't needa do anything
                if(channelIdOld === channelIdNew){return;}
    
                if(channelIdNew === targetChannel) {
                    let endTime = new Date();
                    let timeDiff = endTime - startTime; //in ms

                    // Strip the ms
                    timeDiff /= 1000;

                    // get the seconds
                    let seconds = Math.round(timeDiff);
                    let channel = client.channels.cache.get(sendingChannel);
                    await channel.send(`${Math.round(seconds/60)} minutes ${Math.round(seconds%60)} seconds has elapsed.`);
                }
            } catch(err) {
                console.log(err);
                return;
            }
        }
    }
});

client.login(process.env.TOKEN);