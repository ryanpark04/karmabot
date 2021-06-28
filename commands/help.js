const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'displays instructions and list of commands',
    execute(message, client, prefix) {
        const exampleEmbed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
	    .setDescription("**React to someone else's message with...** \n ⬆️ or ⬇️ to upvote or downvote it \n 🥉 if you really like it \n 🥈 if you really really like it  \n 🥇 if you think it's amazing")
	    .addFields(
		    { name: `${prefix}karma`, value: client.commands.get('karma').description },
		    { name: `${prefix}karma @user`, value: client.commands.get('otheruserskarma').description},
		    { name: `${prefix}about`, value: client.commands.get('about').description},
    	);
        message.channel.send(exampleEmbed);
    }
}