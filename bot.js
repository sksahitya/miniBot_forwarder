const { Client, GatewayIntentBits } = require("discord.js");
const request = require("request");
require("dotenv").config();

const HISCANNER = process.env.HISCANNER;
const HICHANNEL_ID = process.env.HICHANNEL_ID;
const LOWSCANNER = process.env.LOWSCANNER;
const LOWCHANNEL_ID = process.env.LOWCHANNEL_ID;
const AUTHORIZATION_CODE = process.env.AUTHORIZATION_CODE;


const SOURCE_CHANNEL_ID = HICHANNEL_ID;
const TARGET_CHANNEL_ID = LOWCHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  try {
    if (message.channel.id === SOURCE_CHANNEL_ID) {
      if (message.embeds.length > 0 && message.embeds[0].data?.description) {
        const description = message.embeds[0].data.description;
        const regex = /\n\n`[A-Za-z0-9]+(?:pump)?`\n/g;

        const matches = description.match(regex);
        if (matches && matches.length > 0) {
          const targetChannel = client.channels.cache.get(TARGET_CHANNEL_ID);
          if (targetChannel && matches[0]) {
                sendMessageAs(matches[0]);
          } else {
            console.error("Target channel not found");
          }
        } else {
          console.log(
            'No matching "pump" strings found in the embed description'
          );
        }
      } else {
        console.log("No valid embed description found");
      }
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
});

function sendMessageAs(message) {
  const options = {
    method: "POST",
    url: `https://discord.com/api/v9/channels/${TARGET_CHANNEL_ID}/messages`,
    headers: {
      authorization: AUTHORIZATION_CODE,
      "content-type": "application/json",
      origin: "https://discord.com",
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    },
    body: JSON.stringify({
      content: message,
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

client.login(LOWSCANNER);