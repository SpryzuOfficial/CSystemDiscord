const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const Item = require('../models/item');

module.exports = {
    name: 'reset',

    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Resets uses of an item')
        .addStringOption(option => option.setName('item').setDescription('Item to reset uses').setRequired(true)),
    
    async run(client, interaction)
    {
        const name = interaction.options.getString('item');

        const item = await Item.findOneAndUpdate({name}, {uses: 0});

        if(item)
        {
            const embed = new MessageEmbed()
                .setAuthor({name: client.user.tag})
                .setColor('BLURPLE')
                .setTitle('Uses reset')
                .setDescription(`Name: **${item.name}**`)
                .setImage(item.image)
                .setTimestamp()
        
            interaction.reply({embeds: [embed]});
        }
        else
        {
            interaction.reply(`Error, no such item with the name: **${name}**`);
        }
    }
}