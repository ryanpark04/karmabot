const firebase = require('firebase');
require('firebase/firestore');

module.exports = {
    name: 'decrement',
    description: 'this decrements karma and awards',
    execute(reaction, user, ref) {
        const author = reaction.message.author.id;
        const guild = reaction.message.guild.id;
        const isBot = reaction.message.author.bot;

        const update = (action) => {
            if (author == user.id) {
                return;
            }

            const key = (action == 'upvote' || action == 'downvote') ? 'karma' : action;
            const value = (action == 'downvote') ? firebase.firestore.FieldValue.increment(1) : firebase.firestore.FieldValue.increment(-1);

            let increment = {}
            increment[key] = value;

            const karma = (action === 'upvote' || action == 'downvote') ? ((action == 'upvote') ? -1 : 1) : 0;
            const bronze = action == 'bronze' ? -1 : 0;
            const silver = action == 'silver' ? -1 : 0;
            const gold = action == 'gold' ? -1 : 0;

            const defaultData = {
                userId: author,
                guildId: guild,
                karma: karma,
                bronze: bronze,
                silver: silver,
                gold: gold,
                isBot: isBot,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }

            ref.doc(guild).get()
            .then((doc) => {
                if (doc.exists) {
                    ref.doc(guild).collection('users').doc(author).get() 
                    .then((doc) => {
                        if (doc.exists) {
                            ref.doc(guild).collection('users').doc(author).update(increment);
                        } else {
                            ref.doc(guild).collection('users').doc(author).set(defaultData);
                        }
                    })
                } else {
                    ref.doc(guild).set({
                        guildId: guild,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then((doc) => {
                        ref.doc(guild).collection('users').doc(author).set(defaultData);
                    });
                }
            })
            .catch(console.error);
        }

        switch(reaction.emoji.name) {
            case '⬆️': 
                update('upvote');
                break;
            case '⬇️':
                update('downvote');
                break;
            case '🥉':
                update('bronze');
                break;
            case '🥈':
                update('silver');
                break;
            case '🥇':
                update('gold');
                break;
        } 
    }
}