const { Client, GatewayIntentBits } = require("discord.js");
const request = require("request");
require("dotenv").config();

const BOT = process.env.LOWSCANNABOT;
const SOURCE_CHANNEL_ID = process.env.HICHANNEL_ID;

const lowAuth = process.env.LOSCANNAAUTH;
const hiAuth = process.env.HISCANNAAUTH;

const lowChannel = process.env.LOWCHANNEL_ID;
const hiChannel = process.env.HICHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to classify MC value
function getMCLevel(description) {
  try {
    const mcRegex = /MC\s*\$([\d.]+)([kKmM]?)/;
    const mcMatch = description.match(mcRegex);

    if (!mcMatch) {
      return "No MC value found";
    }

    let mcValue = parseFloat(mcMatch[1]); // Extract numeric part
    const unit = mcMatch[2].toLowerCase(); // Extract unit (k/m)

    // Validate the extracted numeric value
    if (isNaN(mcValue)) {
      return "Invalid MC value";
    }

    // Convert unit to actual value
    if (unit === "k") mcValue *= 1000;
    else if (unit === "m") mcValue *= 1_000_000;

    // Return High or Low based on value
    if (mcValue >= 2000 && mcValue <= 99_000) {
      return "Low";
    } else if (mcValue >= 100_000) {
      return "High";
    } else {
      return "MC value does not match any range";
    }
  } catch (error) {
    console.error("Error processing MC value:", error);
    return "An error occurred while processing the MC value";
  }
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  try {
    if (message.channel.id === SOURCE_CHANNEL_ID) {
      if (message.embeds.length > 0 && message.embeds[0].data?.description) {
        const description = message.embeds[0].data.description;
        console.log(description);
        const regex = /`[A-Za-z0-9]+(?:pump)?`/g;
        const matches = description.match(regex);
        if (matches && matches.length > 0) {
          console.log(matches[0]);
          const mcLevel = getMCLevel(description); // Get the MC level
          console.log(`MC Level: ${mcLevel}`);
          if (mcLevel === "Low") {
            sendMessageAs(matches[0], lowAuth, lowChannel);
          } else if (mcLevel === "High") {
            sendMessageAs(matches[0], hiAuth, hiChannel);
          } else {
            console.log(`MC Level not classified as High or Low: ${mcLevel}`);
          }
        } else {
          console.log('No matching "pump" strings found in the embed description');
        }
      } else {
        console.log("No valid embed description found");
      }
    }
  } catch (error) {
    console.error("Error processing message:", error);
  }
});

function sendMessageAs(message, auth, channel) {
  const options = {
    method: "POST",
    url: `https://discord.com/api/v9/channels/${channel}/messages`,
    headers: {
      authorization: auth,
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

client.login(BOT);
