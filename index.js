const needle = require("needle");
const express = require("express");

const id = "1034710670829400064";
const likedTweetsendpointURL = `https://api.twitter.com/2/users/${id}/liked_tweets`;
const token = process.env.BEARER_TOKEN;

function twitterRoute() {
    const tweets = new express.Router();

    // GET REST endpoint - query params may or may not be populated
    tweets.get("/", function(req, res) {
        console.log(new Date(), "In twitter route GET / req.query=", req.query);

        (async() => {
            try {
                // Make request
                const response = await getLikedTweets();

                //return result
                console.log("Tweet likes data received");
                res.json({ response });
            } catch (e) {
                console.log(e);
            }
        })();
    });

    async function getLikedTweets() {
        // The default parameters - only the Tweet ID and text are returned
        const params = {
            "tweet.fields": "lang,author_id",
            "user.fields": "created_at",
        };

        // this is the HTTP header that adds bearer token authentication
        const res = await needle("get", likedTweetsendpointURL, params, {
            headers: {
                "User-Agent": "LikedTweetsTestCode",
                authorization: `Bearer ${token}`,
            },
        });

        if (res.body) {
            return res.body;
        } else {
            throw new Error("Unsuccessful request");
        }
    }

    return tweets;
}

module.exports = twitterRoute;