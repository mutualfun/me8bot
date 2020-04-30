const tmi = require("tmi.js");
const channelName = "bdougieYO"

const config = {
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
  options: {
    debug: true,
  },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  identity: {
    username: "yoBot",
    password: process.env.TWITCH_CHAT_OAUTH,
  },
};

const client = new tmi.Client(config);

client.connect();

client.on("message", (channel, tags, message, self) => {
  // "Alca: Hello, World!"
  console.log(`${tags["display-name"]}: ${message}`);
});

client.on("connected", (address, port) => {
  client.action(channelName, "" + address + ":" + port);
});

client.on("chat", (channel, user, message, self) => {
  if (self) return;
  if (message == "yo") {
    client.say(channel, "wat up.");
  }
});
