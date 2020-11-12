const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'karma',
    description: "displays your karma and awards",
    execute(message) {
        const karmaAmount = db.get(`${message.author.id}.karma`);
        const bronzeAmount = db.get(`${message.author.id}.bronze`);
        const silverAmount = db.get(`${message.author.id}.silver`);
        const goldAmount = db.get(`${message.author.id}.gold`);

        const karma = '⬆️';
        const bronze = '🥉';
        const silver = '🥈';
        const gold = '🥇';

        const embed = new Discord.MessageEmbed()
            .setColor('#FF4500')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${karma} **${karmaAmount}**` + '\xa0\xa0\xa0\xa0' + `${bronze} **${bronzeAmount}**` + '\xa0\xa0\xa0\xa0' + `${silver} **${silverAmount}**` + '\xa0\xa0\xa0\xa0' + `${gold} **${goldAmount}**`)
            .setTimestamp();
        message.channel.send(embed); 
    }
}