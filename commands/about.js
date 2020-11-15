const Discord = require('discord.js');

module.exports = {
    name: 'about',
    description: "get information about this bot",
    execute(message) {
        const exampleEmbed = new Discord.MessageEmbed()
        .setDescription("Developed by [RA Studios](https://www.youtube.com/watch?v=dQw4w9WgXcQ)")
        .setFooter('Made with discord.js', 'https://i.imgur.com/wSTFkRM.png');
        message.channel.send(exampleEmbed);
    }
}