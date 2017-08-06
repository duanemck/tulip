export class CryptoBalance {
  baseValue: number;
  baseCurrency: string;
  source: string;

  currentValueRand: number;

  openingPriceBase: number;
  openingValueRand: number;

  changeTodayRand: number;
  changeTodayPercent: number;
  changeSinceStartRand: number;
  changeSinceStartPercent: number;

}

export class WalletSummary {
  totalBTC;
  totalRand;
  todayChange;
  todayChangePercent;

  gainLoss;
  gainLossPercent;
  investment;
  fees;
}
