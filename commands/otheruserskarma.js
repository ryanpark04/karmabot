const Discord = require('discord.js');

const firebase = require('firebase');
require('firebase/firestore');

module.exports = {
    name: 'otheruserskarma',
    description: "displays another user's karma and awards",
    execute(message, otherUser, ref) {
        const user = otherUser.id;
        const guild = message.guild.id;

        const defaultData = {
            userId: user,
            guildId: guild,
            karma: 0,
            bronze: 0,
            silver: 0,
            gold: 0,
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
        .then((docRef) => {
            if (docRef.exists) {
                ref.doc(guild).collection('users').doc(user).get() 
                .then((docRef) => {
                    if (docRef.exists) {
                        sendEmbed(docRef.data());
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
                .then((docRef) => {
                    ref.doc(guild).collection('users').doc(user).set(defaultData);
                    sendEmbed(defaultData);
                });
            }
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}