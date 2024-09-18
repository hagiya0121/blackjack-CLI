import { select } from "@inquirer/prompts";

export default class Player {
  constructor() {
    this.hand = [];
    this.credit = 1000;
    this.bet = 0;
  }

  async betting() {
    this.bet = await select({
      message: "掛け金を選択してください",
      choices: [
        {
          name: "$10",
          value: 10,
        },
        {
          name: "$50",
          value: 50,
        },
        {
          name: "$100",
          value: 100,
        },
      ],
    });
    this.credit -= this.bet;
  }

  calcTotalValue() {
    const values = this.hand.map((card) => card.getValue());
    let totalValue = values.reduce((acc, curr) => acc + curr);
    let aceCount = values.filter((value) => value === 11).length;
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
    return totalValue;
  }
}
