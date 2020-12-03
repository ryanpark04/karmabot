const Discord = require('discord.js');
const mongo = require('../utils/mongo');
const userSchema = require('../schemas/user-schema');

module.exports = {
    name: 'decrement',
    description: "this decrements karma and awards",
    async execute(reaction, user) {
        const sender = reaction.message.author.id;
        if (sender == user.id) {
            return;
        }
        switch(reaction.emoji.name) {
            case '⬇️':
                karmaAmount = 1;
                bronzeAmount = 0;
                silverAmount = 0;
                goldAmount = 0;
                incrementer = {
                    karma: 1
                };
                break;
            case '⬆️':
                karmaAmount = -1;
                bronzeAmount = 0;
                silverAmount = 0;
                goldAmount = 0;
                incrementer = {
                    karma: -1
                };
                break;
            case '🥉':
                karmaAmount = 0;
                bronzeAmount = -1;
                silverAmount = 0;
                goldAmount = 0;
                incrementer = {
                    bronze: -1
                };
                break;
            case '🥈':
                karmaAmount = 0;
                bronzeAmount = 0;
                silverAmount = -1;
                goldAmount = 0;
                incrementer = {
                    silver: -1
                };
                break;
            case '🥇':
                karmaAmount = 0;
                bronzeAmount = 0;
                silverAmount = 0;
                goldAmount = -1;
                incrementer = {
                    gold: -1
                };
                break;
        }
        await mongo().then( async (mongoose) => {
            const result = await userSchema.findById(sender + reaction.message.guild.id);
            if (result == null) {
                try {
                    await new userSchema({
                        _id: sender + reaction.message.guild.id,
                        userId: sender,
                        guildId: reaction.message.guild.id,
                        karma: karmaAmount,
                        bronze: bronzeAmount,
                        silver: silverAmount,
                        gold: goldAmount
                    }).save()
                } finally {
                    mongoose.connection.close();
                }
            } else {
                try {
                    await userSchema.findOneAndUpdate({
                        _id: sender + reaction.message.guild.id
                    }, {
                        $inc: incrementer
                    }).exec()
                } finally {
                    mongoose.connection.close();
                }
            }
        })
    }
}