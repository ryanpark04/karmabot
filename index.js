const Discord = require('discord.js');
const db = require("quick.db");
const fs = require('fs');

const client = new Discord.Client({ partials: Object.values(Discord.Constants.PartialTypes) });

const prefix = 'k!';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setActivity(`${prefix}help`, {type: 'PLAYING' });
    console.log('karmabot is online!');
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    client.commands.get('increment').execute(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    client.commands.get('decrement').execute(reaction, user);
});

client.on('message', message => {
    if (message.guild === null) {
        return;
    }

    if(!message.content.startsWith(prefix) || message.author.bot){
        if (message.content == '<@!775463174874464266>') {
            client.commands.get(client.commands.get('mentioned').execute(message, prefix));
        }
        return;
    } 

    if (db.get(message.author.id) == null) {
        db.set(message.author.id, {karma: 0, bronze: 0, silver: 0, gold: 0});
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();
    
    if (command === 'help') {
        client.commands.get('help').execute(message, client, prefix);

    } else if (command == 'karma')  {
        const otherUser = getUserFromMention(args[0]);
        if (otherUser != undefined) {
            client.commands.get('otheruserskarma').execute(message, otherUser);
        } else {
            client.commands.get('karma').execute(message);
        }

    } else if (command == 'ping') {
        client.commands.get('ping').execute(message);

    } else if (command == 'about') {
        client.commands.get('about').execute(message);
    }
})

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