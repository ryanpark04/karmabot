const Discord = require('discord.js');

const firebase = require('firebase');
require('firebase/firestore');

module.exports = {
    name: 'karma',
    description: 'displays your karma and awards',
    execute(message, ref) {
        const author = message.author.id;
        const guild = message.guild.id;
        const isBot = message.author.bot;

        const defaultData = {
            userId: author,
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
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`⬆️ **${data.karma}**` + '\xa0\xa0\xa0\xa0' + `🥉 **${data.bronze}**` + '\xa0\xa0\xa0\xa0' + `🥈 **${data.silver}**` + '\xa0\xa0\xa0\xa0' + `🥇 **${data.silver}**`)
            .setTimestamp();
            message.channel.send(embed); 
        }

        ref.doc(guild).get()
        .then((doc) => {
            if (doc.exists) {
                ref.doc(guild).collection('users').doc(author).get() 
                .then((doc) => {
                    if (doc.exists) {
                        sendEmbed(doc.data());
                    } else {
                        ref.doc(guild).collection('users').doc(author).set(defaultData);
                        sendEmbed(defaultData);
                    }
                })
            } else {
                ref.doc(guild).set({
                    guildId: guild,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((doc) => {
                    ref.doc(guild).collection('users').doc(author).set(defaultData);
                    sendEmbed(defaultData);
                });
            }
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
}