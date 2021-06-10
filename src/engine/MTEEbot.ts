import { MTEEBot } from "../interfaces/MTEEBot.interface";
import * as os from "os";
import { TwitterSB } from "./twitter";

export class MTEEBotUtils {

    public static getSignal(tweetText: string): MTEEBot.Signal {
        let signal: MTEEBot.Signal;
        tweetText = (tweetText ?? '').toLowerCase();
        const buyTerm = 'Now Buying: $'.toLowerCase();
        const shortTerm = 'Now selling short: $'.toLowerCase();
        const rtTerm1 = 'RT @TipperBeats'.toLowerCase();
        const rtTerm2 = 'RT @r_scalp'.toLowerCase();
        const rtTerm3 = 'RT @SwingBot_Small'.toLowerCase();

        /**
         * Make sure that the tweet has the "Now Buying: $" text and that it is not a retweet.
         * Don't want to repeat buy on retweets.
         */
        if ((tweetText.indexOf(buyTerm) >= 0 || tweetText.indexOf(shortTerm) >= 0)
        && tweetText.indexOf(rtTerm1) === -1 && tweetText.indexOf(rtTerm2) === -1
        && tweetText.indexOf(rtTerm3) === -1){
            console.log("Checking Tweet");
            signal = MTEEBotUtils.parseSignal(tweetText);
        }
        return signal;
    }

    public static parseSignal(tweetText: string = ''): MTEEBot.Signal {
        tweetText = tweetText.toLowerCase();
        //list all possible terms:
        const buyTerm = 'Now Buying: $'.toLowerCase();
        const shortTerm = 'Now selling short: $'.toLowerCase();
        const buyPriceTerm = 'at ~$'.toLowerCase();
        const sellTermTS = 'Sell Target: $'.toLowerCase(); 
        const sellTermSB = 'Exit Target: $'.toLowerCase();
        const coverTerm = 'Cover Target: $'.toLowerCase();

        let entryTerm: string;
        let entryPriceTerm: string;
        let exitTerm: string;
        let side: string;
        
        //determine the relevant terms for the tweet
        if (tweetText.indexOf(shortTerm) >= 0){ //tweet is for short
            entryTerm = shortTerm;
            entryPriceTerm = buyPriceTerm;
            exitTerm = coverTerm;
            side = 'sell';
        }else{
            entryTerm = buyTerm;
            entryPriceTerm = buyPriceTerm;
            side = 'buy';
            if (tweetText.indexOf(sellTermSB) >= 0){
                exitTerm = sellTermSB;
            }else if (tweetText.indexOf(sellTermTS) >= 0){
                exitTerm = sellTermTS;

            }
        }
    
        const symbol = MTEEBotUtils.extractValue(tweetText, entryTerm);
        const entryPrice = MTEEBotUtils.extractValue(tweetText, entryPriceTerm);
        const exitPrice = MTEEBotUtils.extractValue(tweetText, exitTerm);   
        console.log('exit price is: ', exitPrice)         
        return {
            symbol: (symbol ?? '').toUpperCase(),
            entryPrice: parseFloat(entryPrice),
            exitPrice: parseFloat(exitPrice),
            stopPrice: parseFloat(entryPrice) - (parseFloat(exitPrice) - parseFloat(entryPrice)),
            side
        }      
    }

    public static extractValue(tweetText: string, term: string) {
        let index = tweetText.indexOf(term) + term.length;
        const restOfText = tweetText.substring(index).trim();
        const endIndex = Math.min(restOfText.indexOf(' '), restOfText.indexOf(os.EOL))
        const value = endIndex >= 0 ? restOfText.substring(0, endIndex) : restOfText.substring(0);
        return (value ?? '').trim();
    }

    public static logSignal(signal, tweet) {
        console.log(`got signal from `, TwitterSB.getTweetUserName(tweet), ` (${TwitterSB.getTweetScreenName(tweet)}): `);
        console.log(JSON.stringify(signal));
        console.log('-------------------------------');
    }

    public static logWelcomeMessage() {
        console.log('');
        console.log(`   ********************************************************************`);
        console.log('   *                                                                  *')
        console.log('   *  Welcome to the MTEEBot Trade Execution Engine (MTEEBot)         *');
        console.log('   *                                                                  *')
        console.log('   *         It will listen to Twitter signals from                   *')
        console.log('   *          the authorizedSignalsFromUsers (in settings.ts)         *');
        console.log('   *                                                                  *')
        console.log('   *                                                                  *')
        console.log('   *         And will execute all signals as paper trades on:         *');
        console.log('   *          > Alpaca Stock Brokerage (www.alpaca.markets)           *');
        console.log('   *                                                                  *')
        console.log('   *                                                                  *')
        console.log('   *      This is not a financial advisor. USE AT YOUR OWN RISK.      *');
        console.log('   *                                                                  *')
        console.log(`   ********************************************************************`);
        console.log('');
    }
}
