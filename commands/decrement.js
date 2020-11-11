const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'decrement',
    description: "this decrements karma and awards",
    execute(reaction, user) {
        let sender = reaction.message.author.id
        if (db.get(sender) == null) {
            db.set(sender, {karma: 0, bronze: 0, silver: 0, gold: 0});
        }
        if (sender == user.id) {
            return;
        }
        switch(reaction.emoji.name) {
            case '⬇️':
                db.set(sender, {karma: db.get(`${sender}.karma`) + 1, bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`)});
                break;
            case '⬆️':
                db.set(sender, {karma: db.get(`${sender}.karma`) - 1, bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`)});
                break;
            case '🥉':
                db.set(sender, {karma: db.get(`${sender}.karma`), bronze: db.get(`${sender}.bronze`) - 1,  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`)});
                break;
            case '🥈':
                db.set(sender, {karma: db.get(`${sender}.karma`), bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`) - 1,  gold: db.get(`${sender}.gold`)});
                break;
            case '🥇':
                db.set(sender, {karma: db.get(`${sender}.karma`), bronze: db.get(`${sender}.bronze`),  silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`) - 1});
                break;
        }
    }
}