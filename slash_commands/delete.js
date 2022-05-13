const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const Item = require('../models/item');

module.exports = {
    name: 'delete',

    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes an item')
        .addStringOption(option => option.setName('item').setDescription('Item to delete').setRequired(true)),
    
    async run(client, interaction)
    {
        const name = interaction.options.getString('item');

        const item = await Item.findOneAndDelete({name});

        if(item)
        {
            const embed = new MessageEmbed()
                .setAuthor({name: client.user.tag})
                .setColor('BLURPLE')
                .setTitle('Item deleted')
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