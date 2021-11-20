var Twit = require("twit");

require("dotenv").config();
const nossoBot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

function acaoDoNossoBot() {
    // Cuidado ao postar tweets repetidos
    var postTweet = "Esta será a frase de nosso post";

    nossoBot.post(
        'statuses/update', { status: postTweet },
        function(err, data, response) {
            if (err) {
                console.log("ERRO:" + err);
                return false;
            }
            console.log("Tweet postado com sucesso!\n");
        }
    )
}
acaoDoNossoBot();
setInterval(acaoDoNossoBot, 43200000 / 3);