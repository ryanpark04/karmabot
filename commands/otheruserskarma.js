const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'otheruserskarma',
    description: "displays another user's karma and awards",
    execute(message, otherUser) {
        const user = otherUser.id;
        if (db.get(user) == null) {
            db.set(user, {karma: 0, bronze: 0, silver: 0, gold: 0});
        }
        const karmaAmount = db.get(`${user}.karma`);
        const bronzeAmount = db.get(`${user}.bronze`);
        const silverAmount = db.get(`${user}.silver`);
        const goldAmount = db.get(`${user}.gold`);

        const karma = '⬆️';
        const bronze = '🥉';
        const silver = '🥈';
        const gold = '🥇';

        const embed = new Discord.MessageEmbed()
            .setColor('#FF4500')
            .setAuthor(otherUser.username, otherUser.displayAvatarURL({ dynamic: true }))
            .setDescription(`${karma} **${karmaAmount}**` + '\xa0\xa0\xa0\xa0' + `${bronze} **${bronzeAmount}**` + '\xa0\xa0\xa0\xa0' + `${silver} **${silverAmount}**` + '\xa0\xa0\xa0\xa0' + `${gold} **${goldAmount}**`)
            .setTimestamp();
        message.channel.send(embed); 
    }
}