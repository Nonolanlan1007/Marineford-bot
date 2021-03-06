const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["pp", "logo"],
  categories: "info",
  permissions: "everyone",
  description: "Obtenir l'avatar d'un autre membre.",
  usage: "avatar [utilisateur]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {

    let user = message.author || message.mentions.users.first();
    let avs = new MessageEmbed()
      .setTitle(`Avatar de : ${user.tag}`)
      .setColor(client.color)
      .addField(
        "➜ PNG",
        `[\`Lien\`](${user.displayAvatarURL({ format: "png" })})`,
        true
      )
      .addField(
        "➜ JPEG",
        `[\`Lien\`](${user.displayAvatarURL({ format: "jpg" })})`,
        true
      )
      .addField(
        "➜ WEBP",
        `[\`Lien\`](${user.displayAvatarURL({ format: "webp" })})`,
        true
      )
      .setURL(
        user.displayAvatarURL({
          dynamic: true,
        })
      )
      .setImage(
        user.displayAvatarURL({
          dynamic: true,
          size: 512,
        })
      );

      message.channel.send({embeds : [avs]})
  },
};
