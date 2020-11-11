const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'otheruserskarma',
    description: "displays another user's karma and awards",
    execute(message, otheruser) {
        let user = otheruser.id;
        if (db.get(user) == null) {
            db.set(user, {karma: 0, bronze: 0, silver: 0, gold: 0});
        }
        let karmaAmount = db.get(`${user}.karma`);
        let bronzeAmount = db.get(`${user}.bronze`);
        let silverAmount = db.get(`${user}.silver`);
        let goldAmount = db.get(`${user}.gold`);

        const karma = '⬆️';
        const bronze = '🥉';
        const silver = '🥈';
        const gold = '🥇';

        const embed = new Discord.MessageEmbed()
            .setColor('#FF4500')
            .setAuthor(otheruser.username, otheruser.displayAvatarURL({ dynamic: true }))
            .setDescription(`${karma} **${karmaAmount}**` + '\xa0\xa0\xa0\xa0' + `${bronze} **${bronzeAmount}**` + '\xa0\xa0\xa0\xa0' + `${silver} **${silverAmount}**` + '\xa0\xa0\xa0\xa0' + `${gold} **${goldAmount}**`)
            .setTimestamp();
        message.channel.send(embed); 
    }

}