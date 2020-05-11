module.exports = {
    name: 'play',
    description: 'plays song',
    async execute(message,args,queue) {
        const ytdl = require('ytdl-core');

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.channel.send(
                "You need to be in a voice channel to play music!"
              );
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }
        const songInfo = await ytdl.getInfo(args[0]).catch(err => console.log(err));
        const song = {
            title: songInfo.title,
            url: songInfo.video_url,
        };

        // Check if music is already playing. If playing we can add it to the queue and if not playing we can play the song
        if (!queue.get(message.guild.id)) {
            const { guild } = message;
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 10,
                playing: true,
            };

            // Create an instance of the queue
            queue.set(guild.id,queueConstruct);
            // Add song to queue
            queueConstruct.songs.push(song);

            try {
                let connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                await play(guild,queueConstruct.songs[0],queue,ytdl);
            } catch(err) {
                console.log(err);
                queue.delete(guild.id);
                return message.channel.send(err);
            }
        }else {
            queue.get(message.guild.id).songs.push(song);
            console.log(queue.get(message.guild.id).songs);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
    },
};

const play = async (guild,song, queue, ytdl) => {
    const serverQueue = await queue.get(guild.id);
    if(!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    // const ffmpeg = require('ffmpeg');
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild,serverQueue.songs[0],queue,ytdl);
        })
        .on("error", err => console.log(err));
    
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    queue.textChannel.send(`Start playing: **${song.title}**`);
}