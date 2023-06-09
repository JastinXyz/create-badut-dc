const { EmbedBuilder, inlineCode } = require("discord.js");
const ms = require('ms');

module.exports = {
    name: "help",
    description: "Bot command list or help menu.",
    aliases: ['menu'],
    cooldown: 1,
    category: "general",
    args: ["<cmd?>"],
    async execute(message, args) {
        let client = message.client;
        let noteEmbed = new EmbedBuilder()
              .setDescription(`If there is an argument like ${inlineCode('<argument?>')} at usage, This mean the argument are optional. Otherwise required argument will be marked like ${inlineCode('<argument>')}.`)
              .setColor(client.config.embedColor);

        if(args.length) {
          let info = client.prefixes.get(args[0]);
          if(!info) return message.replyWithoutMention({ content: client.config.messageContent.commandNotFound.replace(/{username}/gm, message.author.username).replace(/{command}/gm, inlineCode(args[0])) });
          let infoEmbed = new EmbedBuilder()
            .setAuthor({ name: info.name })
            .setDescription(info.description || 'none')
            .addFields(
              { name: 'Aliases', value: inlineCode(info.aliases? info.aliases.join('`, `') : 'none')  },
              { name: 'Cooldown', value: inlineCode(ms(Number(info.cooldown || 0) * 1000)) },
              { name: 'Category', value: inlineCode(info.category || 'none') },
              { name: 'Usage', value: inlineCode((message.used.prefix + info.name + ' ' + (info.args? info.args.join(' ') : '')).trim()) }
            )
            .setColor(client.config.embedColor);

          let embeds = info.args ? [infoEmbed, noteEmbed] : [infoEmbed];
          return message.replyWithoutMention({ embeds })
        }

        const fields = [];
        const data = Array.from(client.prefixes.values());
      
        data.map(({ name, category }) => {
          let capitalized = category.charAt(0).toUpperCase() + category.slice(1);
          if(!client.config.showOwnerCommandsAtHelpMenu && category === "owner") return; 
          if (!fields.some((x) => x.name === capitalized)) {
            fields.push({ name: capitalized, value: inlineCode(name) });
          } else {
            let index = fields.findIndex((x) => x.name === capitalized);
            fields[index].value = fields[index].value.concat(
              `, ${inlineCode(name)}`
            );
          }
        });


        const embed = new EmbedBuilder({ fields })
          .setColor(client.config.embedColor)
          .setAuthor({
            name:
              "Command list " +
              client.user.username +
              "#" +
              client.user.discriminator,
            iconURL: `https://cdn.discordapp.com/avatars/${client.config.clientID}/${client.user.avatar}.png`,
          });

        return message.replyWithoutMention({ embeds: [embed, noteEmbed] });
    }
}