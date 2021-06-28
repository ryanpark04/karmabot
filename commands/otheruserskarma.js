const Discord = require('discord.js');

const firebase = require('firebase');
require('firebase/firestore');

module.exports = {
    name: 'otheruserskarma',
    description: "displays another user's karma and awards",
    execute(message, otherUser, ref) {
        const user = otherUser.id;
        const guild = message.guild.id;
        const isBot = otherUser.bot;

        const defaultData = {
            userId: user,
            guildId: guild,
            karma: 0,
            bronze: 0,
            silver: 0,
            gold: 0,
            isBot: isBot,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }

        const sendEmbed = (data) => {
            const embed = new Discord.MessageEmbed()
            .setAuthor(otherUser.username, otherUser.displayAvatarURL({ dynamic: true }))
            .setDescription(`⬆️ **${data.karma}**` + '\xa0\xa0\xa0\xa0' + `🥉 **${data.bronze}**` + '\xa0\xa0\xa0\xa0' + `🥈 **${data.silver}**` + '\xa0\xa0\xa0\xa0' + `🥇 **${data.silver}**`)
            .setTimestamp();
            message.channel.send(embed); 
        }

        ref.doc(guild).get()
        .then((doc) => {
            if (doc.exists) {
                ref.doc(guild).collection('users').doc(user).get() 
                .then((doc) => {
                    if (doc.exists) {
                        sendEmbed(doc.data());
                    } else {
                        ref.doc(guild).collection('users').doc(user).set(defaultData);
                        sendEmbed(defaultData);
                    }
                })
            } else {
                ref.doc(guild).set({
                    guildId: guild,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((doc) => {
                    ref.doc(guild).collection('users').doc(user).set(defaultData);
                    sendEmbed(defaultData);
                });
            }
        })
        .catch(console.error);
    }
}