const { Client, Collection } = require("discord.js"),
  { readdirSync } = require("fs"),
  { version } = require("./package.json"),
  { yes, no } = require("./configs/emojis.json"),
  { token, color } = require("./configs/config.json")

client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"],
});
module.exports = client;

["commands", "aliases", "events", "cooldowns", "slashCommands"].forEach(x => client[x] = new Collection());
client.categories = readdirSync("./commands/");
client.color = color;
client.version = version;
client.yes = yes;
client.no = no;


["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

client.login(token);
