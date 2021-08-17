const Discord = require('discord.js');
const fs = require('fs');

let intents = new Discord.Intents(Discord.Intents.NON_PRIVILEGED);
intents.add('GUILD_MEMBERS')

const client = new Discord.Client({ ws: {intents: intents}, partials: Object.values(Discord.Constants.PartialTypes) });

client.commands = new Discord.Collection();

const firebase = require('firebase');
require('firebase/firestore');

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.KARMABOT_API_KEY,
        authDomain: process.env.KARMABOT_AUTH_DOMAIN,
        projectId: process.env.KARMABOT_PROJECT_ID,
        storageBucket: process.env.KARMABOT_STORAGE_BUCKET,
        messagingSenderId: process.env.KARMABOT_MESSAGING_SENDER_ID,
        appId: process.env.KARMABOT_APP_ID,
        measurementId: process.env.KARMABOT_MEASUREMENT_ID
    });
}

const db = firebase.firestore();
const batch = db.batch();
const ref = db.collection('guilds');

const prefix = 'k!';

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    client.user.setActivity(`${prefix}help`, {type: 'PLAYING' });
    console.log('karmabot is online!');

});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    client.commands.get('increment').execute(reaction, user, ref);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    client.commands.get('decrement').execute(reaction, user, ref);
});

client.on('message', async (message) => {
    if (message.guild === null) {
        return;
    }

    const content = message.content.toLowerCase();

    if(!content.startsWith(prefix) || message.author.bot){
        if (content == '<@!775463174874464266>') {
            client.commands.get(client.commands.get('mentioned').execute(message, prefix));
        }
        return;
    }

    const args = content.slice(prefix.length).split(/ +/)
    const command = args.shift()
    
    if (command === 'help') {
        client.commands.get('help').execute(message, client, prefix);

    } else if (command == 'karma')  {
        const otherUser = getUserFromMention(args[0]);
        if (otherUser != undefined) {
            client.commands.get('otheruserskarma').execute(message, otherUser, ref);
        } else {
            client.commands.get('karma').execute(message, ref);
        }

    } else if (command == 'leaderboard') {
        client.commands.get('leaderboard').execute(message, ref, db);

    } else if (command == 'ping') {
        client.commands.get('ping').execute(message);

    } else if (command == 'about') {
        client.commands.get('about').execute(message);

    } 
});

function getUserFromMention(mention) {
    if (!mention){
        return;
    } 

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.login(process.env.KARMABOT_TOKEN);
