export const discordConfig = {
  token: process.env.DISCORD_TOKEN || "",
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMessageReactions", "DirectMessages"],
};
