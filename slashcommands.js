require('dotenv').config();

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const slashCommandFiles = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js'));

for(const file of slashCommandFiles)
{
    const slash = require(`./slash_commands/${file}`);
    commands.push(slash.data.toJSON());
}

const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

createSlash = async() =>
{
    try 
    {
        await rest.put(Routes.applicationCommands(process.env.CLIENTID, process.env.GUILDID),
        {
            body: commands
        });
        
        console.log('Slash commands setup');
    } catch (error) 
    {
        console.log(error);    
    }
}

module.exports = createSlash;