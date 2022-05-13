const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const Item = require('../models/item');

module.exports = {
    name: 'use',
    
    data: new SlashCommandBuilder()
        .setName('use')
        .setDescription('Adds uses to specific item.')
        .addStringOption(option => option.setName('item').setDescription('Item to add uses').setRequired(true))
        .addNumberOption(option => option.setName('uses').setDescription('Uses to add to the item').setRequired(true)),
    
    async run(client, interaction)
    {
        const name = interaction.options.getString('item');
        const uses = interaction.options.getNumber('uses');

        const item = await Item.findOne({name});

        if(item)
        {
            const newUses = item.uses + uses;

            await Item.findByIdAndUpdate(item._id, {uses: newUses});

            const embed = new MessageEmbed()
                .setAuthor({name: client.user.tag})
                .setColor('BLURPLE')
                .setTitle('Use added')
                .setDescription(`Name: **${item.name}**\nUses: **${newUses}**`)
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