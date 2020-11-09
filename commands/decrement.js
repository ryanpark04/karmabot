const Discord = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: 'decrement',
    description: "this decrements karma and awards",
    execute(reaction, user) {
        let sender = reaction.message.author.id
        if (db.get(sender) == null) {
            db.set(sender, {karma: 0, silver: 0, gold: 0, platinum: 0});
        }
        switch(reaction.emoji.id) {
            case '721639532306366504':
                db.set(sender, {karma: db.get(`${sender}.karma`) + 1, silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`),  platinum: db.get(`${sender}.platinum`)});
                break;
            case '721639490074050572':
                db.set(sender, {karma: db.get(`${sender}.karma`) - 1, silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`),  platinum: db.get(`${sender}.platinum`)});
                break;
            case '721638883766304798':
                db.set(sender, {karma: db.get(`${sender}.karma`), silver: db.get(`${sender}.silver`) - 1,  gold: db.get(`${sender}.gold`),  platinum: db.get(`${sender}.platinum`)});
                break;
            case '721637626729201734':
                db.set(sender, {karma: db.get(`${sender}.karma`), silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`) - 1,  platinum: db.get(`${sender}.platinum`)});
                break;
            case '721638435571367936':
                db.set(sender, {karma: db.get(`${sender}.karma`), silver: db.get(`${sender}.silver`),  gold: db.get(`${sender}.gold`),  platinum: db.get(`${sender}.platinum`) - 1});
                break;
        }
    }
}