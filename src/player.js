import { select } from "@inquirer/prompts";

export default class Player {
  constructor() {
    this.hand = [];
    this.money = 500;
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
    this.money -= this.bet;
  }
}
