const Discord = require('discord.js');
const db = require("quick.db");
const client = new Discord.Client({ partials: Object.values(Discord.Constants.PartialTypes) });

const prefix = 'r?';

const fs = require('fs');


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('karmabot is online!');
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    client.commands.get('increment').execute(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    client.commands.get('decrement').execute(reaction, user);
});

client.on('message', message => {
    if (message.content.includes(client.user.id) || message.content.includes('<@&774329293702430771>')) {
        client.commands.get('mentioned').execute(message);
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if (db.get(message.author.id) == null) {
        db.set(message.author.id, {karma: 0, bronze: 0, silver: 0, gold: 0});
    }

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();
    
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command == 'karma')  {
        client.commands.get('karma').execute(message, args);
    }
})

client.login(process.env.KARMABOT_UNIVERSAL_TOKEN);