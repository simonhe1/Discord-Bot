module.exports = {
	name: 'user-info',
	description: 'user-info',
	execute(message, args) {
        message.channel.send(`Your List of activies: ${message.author.presence.activities.forEach(activity => {
            const { start, end, type } = activity;
            return (`start time: ${start}\n
                    end time: ${end}\n
                    type: ${type}\n`);
        })}
        \nYour ID: ${message.author.id}`);
	},
};