const { blue, red } = require('colors'),
      { online } = require("../configs/emojis.json"),
      { owner, prefix, botlogs } = require("../configs/config.json"),
      remind = require("../models/reminds");

client.on("ready", async () => {
    console.log(`Connecté en tant que ${blue(`${client.user.tag}`)}`);
    
    /* botlogs verification */
    if (!client.channels.cache.get(botlogs)) {
       console.log(red("[ERROR]") + " L'identifiant du salon de logs est invalide.")
            return client.destroy()
    }
    client.channels.cache.get(botlogs).send({ content: `**${online} ➜ Je suis maintenant connecté !**` });
    
    /* owner’s verification */
    if (!client.users.fetch(owner)) {
        console.log(red("[ERROR]") + " L'identifiant de l'owner est invalide.")
        client.channels.cache.get(botlogs).send({ content: client.no + ` ➜ Impossible de retrouver un utilisateur portant l'identifiant \`${owner}\` !` })
            return client.destroy()
    }

    /* Bot’s Activity */
    const activities = [`${prefix}help | Version ${client.version}`,'By Nolhan#2508'];
    client.user.setActivity("Démarrage en cours...");
    setInterval(async () => {
        await client.user.setActivity(activities[Math.floor(Math.random() * activities.length)]);
    }, 120000);
});
