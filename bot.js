"use strict";

const { ChatClient, AlternateMessageModifier } = require("dank-twitch-irc");
const config = require("./config");
const client = new ChatClient(config.opts);

client.use(new AlternateMessageModifier(client));
client.on("ready", () => console.log("Successfully connected to chat"));
client.on("close", (error) => {
  if (error != null) {
    console.error("Client closed due to error", error);
  }
});

client.on("PRIVMSG", (msg) => {
  console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
});

client.on("message", (msg) => {
    if ((msg.userID === '82008718') && (msg.messageText === 'pajaS 🚨 ALERT')) {
        client.me(msg.channelName, 'PAJAS 🚨 CUNTS');
    }
});

client.on("connect", () => {
    client.say(config.startupChannel, 'Walking!')
});

client.connect();
client.join("pajlada");