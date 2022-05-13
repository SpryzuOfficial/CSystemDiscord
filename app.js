const fs = require('fs');

require('dotenv').config();

const {Client, Intents, Collection} = require('discord.js');

const dbConnection = require('./config_database');
const createSlash = require('./slashcommands');
const keepAlive = require('./server');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.slashcommands = new Collection();
const slashCommandFiles = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js'));

for(const file of slashCommandFiles)
{
    const slash = require(`./slash_commands/${file}`);
    client.slashcommands.set(slash.data.name, slash);
}


client.on('ready', async() =>
{
    console.log(client.user.tag);
    await dbConnection();
    await createSlash();
});

client.on('interactionCreate', async(interaction) =>
{
    try
    {
        if(interaction.isCommand())
        {
            const slashcmds = client.slashcommands.get(interaction.commandName);

            if(!slashcmds) return;

            await slashcmds.run(client, interaction);
        }
    }
    catch(error)
    {
        console.log(error);
    }
});

if(process.env.PRODUCTION == 1)
{
    keepAlive();
}

client.login(process.env.TOKEN);