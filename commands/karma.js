const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'karma',
    description: "displays karma and awards",
    execute(message, args) {
        let karmaAmount = db.get(`${message.author.id}.karma`);
        let silverAmount = db.get(`${message.author.id}.silver`);
        let goldAmount = db.get(`${message.author.id}.gold`);
        let platinumAmount = db.get(`${message.author.id}.platinum`);

        const karma = '<:upvote:721639490074050572>';
        const silver = '<:silver:721638883766304798>';
        const gold = '<:gold:721637626729201734>';
        const platinum = '<:platinum:721638435571367936>';

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF4500')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${karma} **${karmaAmount}**` + '\xa0\xa0\xa0\xa0' + `${silver} **${silverAmount}**` + '\xa0\xa0\xa0\xa0' + `${gold} **${goldAmount}**` + '\xa0\xa0\xa0\xa0' + `${platinum} **${platinumAmount}**`)
            .setTimestamp();
        message.channel.send(exampleEmbed); 
    }

}