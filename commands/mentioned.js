const Discord = require('discord.js');
module.exports = {
    name: 'mentioned',
    description: "random responses when bot is mentioned",
    execute(message) {
        switch(Math.floor(Math.random() * 5)) {
            case 0:
                message.channel.send('shut up')
                break;
            case 1:
                message.channel.send('piss off')
                break;
            case 2:
                message.channel.send('didnt ask')
                break;
            case 3:
                message.channel.send('dont care')
                break;
            case 4:
                message.channel.send('go away')
        }
        
    }

}