module.exports = {
    name: 'stop',
    description: 'stops song',
    async execute(message,args,queue) {
        if(!message.member.voice.channel) {
            return message.channel.send(
                "You have to be in a voice channel to stop the music!"
            );
        }

        queue.songs = [];
        queue.connection.dispatcher.end();
    },
};