const { Client, Message, MessageEmbed } = require('discord.js'),
      { muterole, modrole, modlogs } = require("../../configs/config.json");

module.exports = {
    name: 'unmute',
    aliases: ["um"],
    categories : 'mod', 
    permissions : modrole, 
    description: 'Rendre la voix à un membre.',
    cooldown : 120,
    usage: 'unmute <mention>',
    /** 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply(`**${client.no} ➜ Veuillez me donner une mention valide ou d'un membre présent sur ce serveur.**`)
        if (!member.roles.cache.has(muterole)) return message.reply(`**${client.no} ➜ Ce membre n'est pas  muet !**`)

        const e1 = new MessageEmbed()
        .setTitle(`Récupérationde voix !`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date())
        .addField(":id: ➜ Membre :", `\`\`\`${member.user.tag} ➜ ${member.user.id}\`\`\``)
        .addField(":man_police_officer: ➜ Modérateur :", `\`\`\`${message.author.tag} ➜ ${message.author.id}\`\`\``)
        const e2 = new MessageEmbed()
        .setTitle(`Récupération de voix !`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(new Date())
        .setDescription(`➜ Bonjour à toi ${member.user.username} ! Tu as maintenant récupéré le droit de parler sur le serveur ${message.guild.name}`)
        .addField(":newspaper2: Raison(s)", `\`\`\`${args.slice(1).join(" ")}\`\`\``)

        member.roles.remove(muterole).then(async () => {
            client.users.cache.get(member.user.id).send({ embeds: [e2] }).catch(async () => {
                e1.addField(":warning: Avertissement :", "L'utilisateur n'a pas été prévenu de la suppression de sanction !")
            })
            client.channels.cache.get(modlogs).send({ embeds: [e1] })
        })
    }
}
