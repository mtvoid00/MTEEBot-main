import { MTEEBot } from "./interfaces/MTEEBot.interface";

export const MTEEBotSettings: MTEEBot.Settings = {
    twitter: {
        api: {
            consumer_key: '--- TWITTER CONSUMER API KEY HERE ---',
            consumer_secret: '--- TWITTER CONSUMER API SECRET HERE ---',
            access_token_key: '--- TWITTER AUTHENTICATION ACCESS TOKEN KEY HERE ---',
            access_token_secret: '--- TWITTER AUTHENTICATION ACCESS TOKEN SECRET HERE --- ',

        },
        followUsers: [
            { name: "@r_scalp", id: "1379234944652697600" },
            { name: "@SwingBot_Small", id: "1388217130709962753" },
            { name: "@TipperBeats", id: "1385168716258742272" },	

        ],
        authorizedSignalsFromUsers: ['@r_scalp', '@SwingBot_Small', '@TipperBeats']
    },
    alpaca: {
        api: {
            keyId: '--- ALPACA API KEY HERE ---',
            secretKey: '--- ALPACA SECRET KEY HERE ---',
        }
    },
    MTEEBot: {
        logging: 'normal', // 'normal | verbose', set it to 'verbose' to see raw tweets
    }
}
