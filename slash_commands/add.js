const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

const Item = require('../models/item');

module.exports = {
    name: 'add',
    
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds a new item.')
        .addStringOption(option => option.setName('name').setDescription('Item name').setRequired(true))
        .addStringOption(option => option.setName('image').setDescription('Item image url').setRequired(true))
        .addNumberOption(option => option.setName('uses').setDescription('Item uses').setRequired(true)),
    
    async run(client, interaction)
    {
        const name = interaction.options.getString('name');
        const image = interaction.options.getString('image');
        let uses = interaction.options.getNumber('uses');

        if(uses == null)
        {
            uses = 0;
        }

        if(await Item.findOne({name}))
        {
            interaction.reply(`Item with the name **${name}** already exists`);
            return;
        }

        const item = new Item({name, image, uses});

        try
        {
            await item.save();

            const embed = new MessageEmbed()
                    .setAuthor({name: client.user.tag})
                    .setColor('BLURPLE')
                    .setTitle('Item added')
                    .setDescription(`Name: **${name}**`)
                    .setImage(image)
                    .setTimestamp()

            interaction.reply({embeds: [embed]});
        }
        catch(error)
        {
            console.log(error);
        }
    }
}