module.exports = {
    name: 'mentioned',
    description: 'this occurs when the bot is mentioned',
    execute(message, prefix) {
        message.channel.send('my prefix is ' + '`' + prefix + '`');     
    }
}