module.exports = {
    name: 'skip',
    description: 'skips song',
    async execute(message,args,queue) {
        if(!message.member.voice.channel) {
            return message.channel.send(
                "You have to be in a voice channel to skip the music!"
            );
        }

        if(!queue) {
            return message.channel.send(
                "No song is currently playing."
            );
        }
        queue.connection.dispatcher.end();
    },
};