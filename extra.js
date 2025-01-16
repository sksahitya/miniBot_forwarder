let token = "NzU2NjMwNDU0MjMyMjg1MjQ1.G1zwU9.XdPWm3c74mf6VL0stm0oen3A_sektnOnWPajE4"
let token1 = "NDg2NDgxODA5NjQ4MTIzOTE3.GIsyFb.i54ffqaxDg5E-tdpR2qu0G49D493cJYHhJbMPA"
  // "Njg3MTA1MDE0NzAyODAwOTA1.G1iGmC.HVXgV6KNqNgHx6npHTNHHzoaaT33Lom2PQio5c"; // rich

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://discord.com/api/v9/channels/1326883183106457620/messages',
  'headers': {
    'authorization': token1,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
    'Cookie': '__cfruid=046c7a6fbf17c59899d847311a35cf74c581ec5d-1737021443; __dcfduid=e4eb95fcd35011efa047160943928c0f; __sdcfduid=e4eb95fcd35011efa047160943928c0f940f9700e9253532040677b06573841c23325b04c8067edfa93b7f139678fb80; _cfuvid=qsplrImwhN5StVEsLbyFYuv2BtQS5HNN7oFllA4l5oU-1737021158708-0.0.1.1-604800000'
  },
  body: JSON.stringify({
    "content": "Ebz4YXocUKKXrbQC398GtkyApRdVsW2fmG3YQwS1pump gave his barber a 0.01 bnb tip"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});




// HiScanna
// token : NDg2NDgxODA5NjQ4MTIzOTE3.GIsyFb.i54ffqaxDg5E-tdpR2qu0G49D493cJYHhJbMPA

// LoScanna
// token : NzU2NjMwNDU0MjMyMjg1MjQ1.G1zwU9.XdPWm3c74mf6VL0stm0oen3A_sektnOnWPajE4
