import { TwitterSB } from "./engine/twitter";
import { MTEEBotSettings } from "./settings";
import { AlpacaSB } from "./engine/alpaca";
import { MTEEBotUtils } from "./engine/MTEEBot";
import { testTweet } from "./engine/testing";

// create new instance of Twitter Client for the MTEE Bot
const twitterSB = new TwitterSB(MTEEBotSettings);

// create new instance of Alpaca Client for the MTEE Bot
const alpacaSB = new AlpacaSB(MTEEBotSettings);



function onTweetReceived(tweet) {
    TwitterSB.logTweet(tweet);
    // only signals from the users in this array are accepted
    const authorizedSignalsFromUsers = MTEEBotSettings.twitter.authorizedSignalsFromUsers;
    // screen name of the author of the tweet
    const tweetScreenName = TwitterSB.getTweetScreenName(tweet);
    // if tweet's author is found in the 'authorizedSignalsFromUsers' array try to parse the signal
    if (authorizedSignalsFromUsers.includes(tweetScreenName)) {
        const signal = MTEEBotUtils.getSignal(TwitterSB.getTweetText(tweet));
        // if there's a signal, buy it on alpaca
        if (signal) {
            MTEEBotUtils.logSignal(signal, tweet);
            alpacaSB.buyStock(signal)
                .then(r => AlpacaSB.logPurchaseSuccess(signal))
                .catch(e => AlpacaSB.logPurchaseError(signal, e));
        }
    }
}

MTEEBotUtils.logWelcomeMessage();
twitterSB.startListening((tweet) => onTweetReceived(tweet))


/**
 * Testing - uncomment each test to run it
 **/

/* TEST 1) parse test tweet to turn it into a signal */
//console.log('Test Signal:', MTEEBotUtils.getSignal(testTweet));


/* TEST 2) parse test tweet, turn into a signal, put an order on alpaca */
// const signal = MTEEBotUtils.getSignal(testTweet);
// alpacaSB.buyStock(signal)
//     .then(r => AlpacaSB.logPurchaseSuccess(signal))
//     .catch(e => AlpacaSB.logPurchaseError(signal, e));
