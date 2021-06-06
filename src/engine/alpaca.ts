import { MTEEBot } from "../interfaces/MTEEBot.interface";

const Alpaca = require('@alpacahq/alpaca-trade-api');

export class AlpacaSB {
    private alpaca;
    private settings = { paper: true, usePolygon: false };
    private amountPerTradeInDollars: number;

    constructor(private MTEEBotSettings: MTEEBot.Settings) {
        this.alpaca = new Alpaca(Object.assign({}, MTEEBotSettings.alpaca.api, this.settings));
        this.amountPerTradeInDollars = parseFloat(`${this.MTEEBotSettings.alpaca.trades.amountPerTradeInDollars ?? 0}`);
        this.displayAccountInfo();
    }

    public checkAccount() {
        this.alpaca.getAccount()
            .then((account) => {
                console.log('...connected to alpaca = OK')
            })
            .catch(e => {
                console.log('...failed to connected to alpaca = NOT OK')
                console.log(e)
            })
    }

    public buyStock(signal: MTEEBot.Signal): any {
       // const amountPerTradeInDollars = 2500;
       // const quantity = parseInt(`${amountPerTradeInDollars / signal.entryPrice}`);
        const quantity = parseInt(`${this.amountPerTradeInDollars / signal.entryPrice}`);
        const order = {
            symbol: signal.symbol.toUpperCase(),
            qty: quantity,
            side: signal.side,
            type: 'market',
            time_in_force: 'day',
            order_class: 'bracket',
            stop_loss: {
                stop_price: signal.stopPrice,
            },
            take_profit: {
                limit_price: signal.exitPrice
            }
        };
        console.log('');
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log("Buying: ", JSON.stringify(order));
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log('');
        return this.alpaca.createOrder(order);
    }

    public static logPurchaseSuccess(signal: MTEEBot.Signal) {
        console.log(`Bought ${signal.symbol} on Alpaca = OK`)
    }

    public static logPurchaseError(signal: MTEEBot.Signal, e: any) {
        console.log('***********************************')
        console.log(' ALPACA ERROR')
        console.log(` ERROR BUYING '${signal.symbol}'`)
        console.log(' MESSAGE: ', e.error?.message)
        console.log('***********************************')
    }

    private displayAccountInfo() {
        if (this.amountPerTradeInDollars <= 0) {
            console.log('   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('   !                                                !');
            console.log(`   !    ALPACA: (${this.MTEEBotSettings.alpaca.accountName})`);
            console.log('   !    ERROR:                                      !');
            console.log('   !    amountPerTradeInDollars in the settings     !');
            console.log('   !    file must be greater than zero ($0)         !');
            console.log('   !                                                !');
            console.log('   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('');
            process.exit(1);
        } else {
            console.log('   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log('   $                                                     $');
            console.log(`   $    ALPACA: (${this.MTEEBotSettings.alpaca.accountName})                          $`);
            console.log(`   $    Trade amount is set to $${this.amountPerTradeInDollars} per trade           $`);
            console.log('   $                                                     $');
            console.log('   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            console.log('');
        }
    }
}
