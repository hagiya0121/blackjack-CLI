import { styleText } from "node:util";
import { select } from "@inquirer/prompts";

export default class CommandLine {
  #dealer = null;
  #player = null;

  constructor(dealer, player) {
    this.#dealer = dealer;
    this.#player = player;
  }

  renderMessage(message) {
    console.log(
      styleText(
        ["bold", "green", "italic"],
        `
  ******************************

  * ${message} *

  ******************************
        `
      )
    );
  }

  async renderSelect(message, names, values) {
    const choices = names.map((name, index) => ({
      name: name,
      value: values[index],
    }));

    return select({
      message: message,
      choices: choices,
    });
  }

  renderBetOptions() {
    const betNames = ["$10", "$50", "$100"];
    const betValues = [10, 50, 100];
    return this.renderSelect("掛け金を選択してください", betNames, betValues);
  }

  renderActionOptions() {
    const actionNames = ["HIT", "STAND"];
    const actionValues = ["hit", "stand"];

    if (
      this.#player.hand.length === 2 &&
      this.#player.credit >= this.#player.bet
    ) {
      actionNames.push("DOUBLE");
      actionValues.push("double");
    }
    return this.renderSelect(
      "行動を選択してください",
      actionNames,
      actionValues
    );
  }

  renderGameStatus() {
    console.log(`CREDIT: ${this.#player.credit}     BET: ${this.#player.bet}`);
    console.log("----------------------------------");
    console.log("           DEALER");
    console.log(this.renderCards(this.#dealer.hand, true));
    console.log(`TOTAL: ${this.#dealer.totalValue}`);
    console.log("----------------------------------");
    console.log("           PLAYER");
    console.log(this.renderCards(this.#player.hand));
    console.log(`TOTAL: ${this.#player.totalValue}`);
    console.log("----------------------------------");
  }

  renderCards(cards, isHidden = false) {
    const top = cards.map(() => "┌───────┐").join(" ");
    const rankTop = cards
      .map((card, i) =>
        isHidden && i === 0 ? `│ ??    │` : `│ ${card.rank.padEnd(2)}    │`
      )
      .join(" ");
    const middle = cards.map(() => "│       │").join(" ");
    const suit = cards
      .map((card, i) =>
        isHidden && i === 0 ? `│   ?   │` : `│   ${card.suit}   │`
      )
      .join(" ");
    const rankBottom = cards
      .map((card, i) =>
        isHidden && i == 0 ? `│    ?? │` : `│    ${card.rank.padStart(2)} │`
      )
      .join(" ");
    const bottom = cards.map(() => "└───────┘").join(" ");

    return [top, rankTop, middle, suit, middle, rankBottom, bottom].join("\n");
  }
}
