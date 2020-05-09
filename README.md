Project made by Simon He
Versions:

Node: v10.0.0
- Npm: 6.12.1
- Discord.js: 12.2.0

To run application, you have to set up your own bot and have packages installed.
To do this:
1. To use discord.js, you'll need to install Node.js. You can do so by going to [the node.js website](https://nodejs.org/en/ "Node js website")
2. Npm comes packaged with node so you'll need to install discord.js and dotenv by simply typing npm i discord.js dotenv
3. Make sure you don't have people stealing your API keys
    1. Create a .env file to store your precious keys
    2. Create a .gitignore if you haven't done so and add .gitignore and .env to that so when you commit it to your repo, it won't show.
4. Finally, to set up the bot for your server
    1. login to the [discord website](https://discord.com/ "Discord website") and login
    2. Hover over the "Developers" drop-down menu and click the [Developer Portal](https://discord.com/developers/applications/ "Developer Portal")
    3. Click on the "New Application" button and fill in the information
    4. Select the "Bot" link and click "Add Bot"
    5. Select the "General Information" link and copy your Client ID
    6. Paste your Client ID right after where it says client_id=, right before the & (https://discordapp.com/oauth2/authorize?client_id=&scope=bot)
    7. Select the server you want to add your bot to and press "Authorize" (If you look on Discord you should see the bot on the server)
    8. Select the "Bot" link on the Discord website and copy your token by pressing the "Copy" button
    9. Now in your .env file, create a variable called TOKEN and set it equal to your token
5. To run the program open up a terminal or command line and go to the root folder of your application and type node index.js