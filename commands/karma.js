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

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`⬆️ **${karmaAmount}**` + '\xa0\xa0\xa0\xa0' + `🥉 **${bronzeAmount}**` + '\xa0\xa0\xa0\xa0' + `🥈 **${silverAmount}**` + '\xa0\xa0\xa0\xa0' + `🥇 **${goldAmount}**`)
            .setTimestamp();
        message.channel.send(embed); 
    }
}