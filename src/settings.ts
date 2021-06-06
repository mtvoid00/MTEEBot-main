import { MTEEBot } from "./interfaces/MTEEBot.interface";

export const MTEEBotSettings: MTEEBot.Settings = {
    twitter: {
        api: {
            // consumer_key: '--- TWITTER CONSUMER API KEY HERE ---',
            // consumer_secret: '--- TWITTER CONSUMER API SECRET HERE ---',
            // access_token_key: '--- TWITTER AUTHENTICATION ACCESS TOKEN KEY HERE ---',
            // access_token_secret: '--- TWITTER AUTHENTICATION ACCESS TOKEN SECRET HERE --- ',

            consumer_key: '6IPFIzXpX61lF9npeCnRlCSil',
            consumer_secret: 'RLPmhldPoO9xFS99FB6elzekI0vwpLR6u1t4RHIyMLtW4ncCDe',
            access_token_key: '1384463846149079041-NyDW3dMAG2oKMwSZEkjk2eEXr3QqW1',
            access_token_secret: 'ybSewSkQM5AyKsKoXVrXKdPWsK3rlI6HyXYcisE8u5olx',

        },
        followUsers: [
            { name: "@r_scalp", id: "1379234944652697600" },
            { name: "@SwingBot_Small", id: "1388217130709962753" },
            { name: "@TipperBeats", id: "1385168716258742272" },	

        ],
        authorizedSignalsFromUsers: ['@r_scalp', '@SwingBot_Small', '@TipperBeats']
    },
    alpaca: {
        accountName: 'Paper Account',
        api: {
            // keyId: '--- ALPACA API KEY HERE ---',
            // secretKey: '--- ALPACA SECRET KEY HERE ---',
            keyId: 'PK5DW4Z9OZ1XKV2CAFQE',
            secretKey: 'nBcVA9lewLPJ9xoKbo8bTlZN0R6jV6zXAyLn4A3f',
        },
        trades: {
            amountPerTradeInDollars: 2500
        }
    },
    MTEEBot: {
        logging: 'normal', // 'normal | verbose', set it to 'verbose' to see raw tweets
    }
}
