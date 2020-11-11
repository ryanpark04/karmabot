const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: "displays instructions and list of commands",
    execute(message, client) {
        const exampleEmbed = new Discord.MessageEmbed()
	    .setColor('#FF4500')
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
	    .setDescription("**react to someone else's message with...** \n ⬆️ or ⬇️ to upvote or downvote it \n 🥉 if you really like it \n 🥈 if you really really like it  \n 🥇 if you think it's amazing")
	    .addFields(
		    { name: 'k!karma', value: client.commands.get('karma').description },
		    { name: 'k!karma @user', value: client.commands.get('otheruserskarma').description},
		    { name: 'k!about', value: client.commands.get('about').description},
    	)

        message.channel.send(exampleEmbed);
    }

}