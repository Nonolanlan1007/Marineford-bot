const { Client, Message, MessageEmbed } = require('discord.js'),
      { muterole, modrole, modlogs } = require("../../configs/config.json");

module.exports = {
    name: 'mute',
    aliases: ["m"],
    categories : 'mod', 
    permissions : modrole, 
    description: 'Rendre muet un membre.',
    cooldown : 120,
    usage: 'mute <mention> <raison>',
    /** 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply(`**${client.no} ➜ Veuillez me donner une mention valide ou d'un membre présent sur ce serveur.**`)
        if (!args[1]) return message.reply(`**${client.no} ➜ Veuillez me donner une raison de réduction au silence.**`)
        if (member.roles.cache.has(muterole)) return message.reply(`**${client.no} ➜ Ce membre est déjà muet !**`)

        const e1 = new MessageEmbed()
        .setTitle(`Réduction au silence !`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date())
        .addField(":id: ➜ Membre :", `\`\`\`${member.user.tag} ➜ ${member.user.id}\`\`\``)
        .addField(":man_police_officer: ➜ Modérateur :", `\`\`\`${message.author.tag} ➜ ${message.author.id}\`\`\``)
        .addField(":newspaper2: Raison(s)", `\`\`\`${args.slice(1).join(" ")}\`\`\``)
        const e2 = new MessageEmbed()
        .setTitle(`Réduction au silence !`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date())
        .setDescription(`➜ Bonjour à toi ${member.user.username} ! Tu as été rendu muet sur le serveur ${message.guild.name}`)
        .addField(":newspaper2: Raison(s)", `\`\`\`${args.slice(1).join(" ")}\`\`\``)

        member.roles.add(muterole).then(async () => {
            client.users.cache.get(member.user.id).send({ embeds: [e2] }).catch(async () => {
                e1.addField(":warning: Avertissement :", "L'utilisateur n'a pas été prévenu de sa sanction !")
            })
            client.channels.cache.get(modlogs).send({ embeds: [e1] })
        })
    }
}
