const Discord = require('discord.js');
const mongo = require('../utils/mongo');
const userSchema = require('../schemas/user-schema');

module.exports = {
    name: 'karma',
    description: "displays your karma and awards",
    async execute(message) {
        const user = message.author.id;
        await mongo().then( async (mongoose) => {
            const result = await userSchema.findById(user + message.guild.id);
            if (result == null) {
                try {
                    await new userSchema({
                        _id: user + message.guild.id,
                        userId: user,
                        guildId: message.guild.id,
                        karma: 0,
                        bronze: 0,
                        silver: 0,
                        gold: 0
                    }).save()
                    karmaAmount = 0;
                    bronzeAmount = 0;
                    silverAmount = 0;
                    goldAmount = 0;
                } finally {
                    mongoose.connection.close();
                }
            } else {
                karmaAmount = result.karma;
                bronzeAmount = result.bronze;
                silverAmount = result.silver;
                goldAmount = result.gold;
                mongoose.connection.close();
            }
        })

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`⬆️ **${karmaAmount}**` + '\xa0\xa0\xa0\xa0' + `🥉 **${bronzeAmount}**` + '\xa0\xa0\xa0\xa0' + `🥈 **${silverAmount}**` + '\xa0\xa0\xa0\xa0' + `🥇 **${goldAmount}**`)
            .setTimestamp();
        message.channel.send(embed); 
    }
}