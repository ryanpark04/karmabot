const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'increment',
    description: "this increments karma and awards",
    async execute(reaction, user) {
        const sender = reaction.message.author.id;
        if (db.get(sender) == null) {
            db.set(sender, {karma: 0, bronze: 0, silver: 0, gold: 0});
        }
        if (sender == user.id) {
            switch(reaction.emoji.name) {
                case '⬇️':
                    reaction.users.remove(user.id);
                    user.send("you can't downvote your own message");
                    break;
                case '⬆️':
                    reaction.users.remove(user.id);
                    user.send("you can't upvote your own message");
                    break;
                case '🥉':
                    reaction.users.remove(user.id);
                    user.send("you can't award your own message");
                    break;
                case '🥈':
                    reaction.users.remove(user.id);
                    user.send("you can't award your own message");
                    break;
                case '🥇':
                    reaction.users.remove(user.id);
                    user.send("you can't award your own message");
                    break;
            }
            return;  
        }
        switch(reaction.emoji.name) {
            case '⬇️':
                db.set(sender, {karma: db.get(`${sender}.karma`) - 1, bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`)});   
                break;
            case '⬆️':
                db.set(sender, {karma: db.get(`${sender}.karma`) + 1, bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`)});
                break;
            case '🥉':
                db.set(sender, {karma: db.get(`${sender}.karma`), bronze: db.get(`${sender}.bronze`) + 1,  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`)});
                break;
            case '🥈':
                db.set(sender, {karma: db.get(`${sender}.karma`), bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`) + 1,  gold: db.get(`${sender}.gold`)});
                break;
            case '🥇':
                db.set(sender, {karma: db.get(`${sender}.karma`), bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`) + 1});
                break;
        }
    }
}