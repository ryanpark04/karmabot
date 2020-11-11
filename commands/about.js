const Discord = require('discord.js');

module.exports = {
    name: 'about',
    description: "get information about this bot",
    execute(message) {
        const exampleEmbed = new Discord.MessageEmbed()
	    .setColor('#FF4500')
        .setAuthor('Developed by RA Studios')
        .setFooter('Made with discord.js', 'https://i.imgur.com/wSTFkRM.png');
        message.channel.send(exampleEmbed);
    }

}