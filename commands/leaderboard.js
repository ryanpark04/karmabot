const Discord = require('discord.js');

const firebase = require('firebase');
require('firebase/firestore');

module.exports = {
    name: 'leaderboard',
    description: 'display the five users in your server with the most karma',
    execute(message, ref, db) {
        const guild = message.guild.id;

        const sendEmbed = (data) => {
            const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setTimestamp();
            let rankings = '';
            let karmaValues = '';
            let count = 0;

            Promise.all(data.map((value, index) => {
                return (
                    message.guild.members.fetch(value.userId)
                    .then((member) => {
                        rankings += `\`${count + 1}\` ` + member.user.username + '\n';
                        karmaValues += `⬆️ \*\*${value.karma}\*\*\n`;
                        count++;
                    })
                    .catch(console.error)
                );
            }))
            .then(() => {
                embed.addFields(
                    {name: 'Leaderboard', value: rankings, inline: true},
                    {name: '\u200B', value: karmaValues, inline: true}
                );
                message.channel.send(embed)
            })
            .catch(console.error);
        }

        const addUsers = (users) => {
            const getDefaultData = (user) => {
                return ({
                    userId: user,
                    guildId: guild,
                    karma: 0,
                    bronze: 0,
                    silver: 0,
                    gold: 0,
                    isBot: false,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            
            ref.doc(guild).get()
            .then((doc) => {
                if (doc.exists) {
                    ref.doc(guild).collection('users').where('isBot', '==', false).orderBy('karma', 'desc').limit(5).get()
                    .then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            const batch = db.batch();
                            let data = [];
                            for (let i = 0; i < Math.min(5, users.length); i++) {
                                batch.set(ref.doc(guild).collection('users').doc(users[i]), getDefaultData(users[i]));
                                data.push(getDefaultData(users[i]));
                            }
                            batch.commit(); 
                            sendEmbed(data);
                        } else if (querySnapshot.size < 5) {
                            if (querySnapshot.size == users.length) {
                                let data = [];
                                querySnapshot.forEach((doc) => data.push(doc.data()));
                                sendEmbed(data);
                            } else {
                                const batch = db.batch();
                                let count = 5 - querySnapshot.size;
                                let data = [];
                                let ids = [];
                                querySnapshot.forEach((doc) => {
                                    ids.push(doc.id);
                                    data.push(doc.data());
                                });
                                for (let i = 0; i < users.length; i++) {
                                    if (count == 0) {
                                        break;
                                    } else if (!ids.includes(users[i])) {
                                        batch.set(ref.doc(guild).collection('users').doc(users[i]), getDefaultData(users[i]));
                                        data.push(getDefaultData(users[i]));
                                        count--;
                                    }
                                }
                                batch.commit();
                                sendEmbed(data);
                            }
                            
                        } else {
                            let data = [];
                            querySnapshot.forEach((doc) => data.push(doc.data()));
                            sendEmbed(data);
                        }
                    })
                } else {
                    ref.doc(guild).set({
                        guildId: guild,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then((doc) => {
                        const batch = db.batch();
                        let data = [];
                        for (let i = 0; i < Math.min(5, users.length); i++) {
                            batch.set(ref.doc(guild).collection('users').doc(users[i]), getDefaultData(users[i]));
                            data.push(getDefaultData(users[i]));
                        }
                        batch.commit();
                        sendEmbed(data);
                    });
                }
            })
            .catch(console.error);
        } 

        message.guild.members.fetch()
        .then((members) => {
            const users = members.filter(member => !member.user.bot).map(member => member.user.id);
            addUsers(users);
        })
        .catch(console.error);
    }
}