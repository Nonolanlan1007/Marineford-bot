const { MessageEmbed } = require("discord.js"),
  { prefix, owners, owner, botlogs } = require("../configs/config.json"),
  client = require("../index"),
  { escapeRegex, onCoolDown } = require("../fonctions/cooldown.js")

client.on("messageCreate", async (message) => {

  /* Guild System */

  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [matchedPrefix] = message.content.match(prefixRegex),
    args = message.content.slice(matchedPrefix.length).trim().split(/ +/),
    cmd = args.shift().toLowerCase();
  
  /* Getting Mention for Prefix */
  if (cmd.length === 0) {
    if (matchedPrefix.includes(client.user.id) && message.author.id !== "692374264476860507") return message.reply({ content: `<@${message.author.id}> Pour voir toutes les commandes, tapez \`${prefix}help\`` });
    if (matchedPrefix.includes(client.user.id) && message.author.id == "692374264476860507") return message.reply({ content: `Bonjour maître. Mon préfixe est \`${prefix}\`` });
  }

  /* Command Detection */
  const command = client.commands.get(cmd.toLowerCase()) || client.aliases.get(cmd.toLowerCase());

  /* Commands Log */
  client.channels.cache.get(botlogs).send({
    content: null,
    embeds: [
      new MessageEmbed()
      .setTitle("Utilisation d'un commande")
      .setThumbnail(message.author.displayAvatarURL())
      .setColor(client.color)
      .setTimestamp(Date())
      .addField("➜ Utilisateur :", `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``)
      .addField("➜ Commande :", "```" + message.content + "```")
      .addField("➜ Lien", `[Cliquez-ici](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}) _Il se peut que cette personne aie supprimé ou édité son message._`)
    ] 
  })

  /* Perms */
  if(command.permissions === "owner") {
    if(!owners.includes(message.author.id) && owner != message.author.id) return message.reply({ content: `**${client.no} ➜ Vous n'avez pas la permission d'exécuter cette commande !**` });
  }else if(command.permissions !== 'everyone') {
    if(!message.member.permissions.has(command.permissions) || !message.member.roles.cache.has(command.permissions)) return message.reply({ content: `**${client.no} ➜ Vous n'avez pas la permission d'utiliser cette commande !**` });
  }

  /* Cooldown */
  if (onCoolDown(message, command) && !owners.includes(message.author.id) && owner !== message.author.id) return message.reply({ content: `**${client.no} ➜ Veuillez patienter encore ${onCoolDown(message, command)} avant de pouvoir réutiliser la commande \`${command.name}\` !**` });
  await command.run(client, message, args);

  if (message.content.includes(client.user.username)) return message.react("👀");
});
