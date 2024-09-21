import { select } from "@inquirer/prompts";

export default class Player {
  constructor() {
    this.hand = [];
    this.credit = 1000;
    this.bet = 0;
    this.totalValue = 0;
  }

  setBetAmount(amount) {
    this.bet = amount;
    this.credit -= amount;
  }

  #calcTotalValue() {
    const values = this.hand.map((card) => card.getValue());
    let totalValue = values.reduce((acc, curr) => acc + curr);
    let aceCount = values.filter((value) => value === 11).length;
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
    this.totalValue = totalValue;
  }

  hit(card) {
    this.hand.push(card);
    this.#calcTotalValue();
  }

  double(card) {
    this.hand.push(card);
    this.#calcTotalValue();
    this.credit -= this.bet;
    this.bet *= 2;
  }
}
