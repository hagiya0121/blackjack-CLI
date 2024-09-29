import { styleText } from "node:util";
import { select } from "@inquirer/prompts";

export default class CommandLine {
  #dealer = null;
  #player = null;

  constructor(dealer, player) {
    this.#dealer = dealer;
    this.#player = player;
  }

  renderMessage(type) {
    const messages = {
      start: { message: "GAME START!!", color: "green" },
      end: { message: "GAME ENDED!!", color: "green" },
      win: { message: "YOU WIN!!", color: "blue" },
      lose: { message: "YOU LOSE!!", color: "red" },
      draw: { message: "DRAW!!", color: "yellow" },
    };

    const { message, color } = messages[type];

    console.log(
      styleText(
        ["bold", "italic", color],
        `
        ************************
          * ${message}
          * YOUR CREDIT: $${this.#player.credit}
        ************************
        `,
      ),
    );
  }

  async renderOptions(message, choices) {
    return select({
      message: message,
      choices: choices,
    });
  }

  renderBetOptions(options) {
    const message = "掛け金を選択してください";
    const choices = options.map((value) => ({
      name: `$${value}`,
      value: value,
    }));
    return this.renderOptions(message, choices);
  }

  renderActionOptions() {
    const message = "行動を選択してください";
    const choices = [
      { name: "HIT", value: "hit" },
      { name: "STAND", value: "stand" },
    ];

    if (this.#player.canDouble()) {
      choices.push({ name: "DOUBLE", value: "double" });
    }
    return this.renderOptions(message, choices);
  }

  renderContinueOptions() {
    const message = "ゲームを続けますか？";
    const choices = [
      { name: "YES", value: true },
      { name: "NO", value: false },
    ];
    return this.renderOptions(message, choices);
  }

  renderGameStatus() {
    console.clear();
    console.log(`CREDIT: ${this.#player.credit}     BET: ${this.#player.bet}`);
    console.log("----------------------------------");
    console.log(`           DEALER        TOTAL: ${this.#dealer.totalValue}`);
    console.log(this.renderCards(this.#dealer.hand));
    console.log("----------------------------------");
    console.log(`           PLAYER        TOTAL: ${this.#player.totalValue}`);
    console.log(this.renderCards(this.#player.hand));
    console.log("----------------------------------");
  }

  renderCards(cards) {
    const top = cards.map(() => "┌───────┐").join(" ");
    const rankTop = cards
      .map((card) => `│ ${card.rank.padEnd(2)}    │`)
      .join(" ");
    const middle = cards.map(() => "│       │").join(" ");
    const suit = cards.map((card) => `│   ${card.suit}   │`).join(" ");
    const rankBottom = cards
      .map((card) => `│    ${card.rank.padStart(2)} │`)
      .join(" ");
    const bottom = cards.map(() => "└───────┘").join(" ");

    return [top, rankTop, middle, suit, middle, rankBottom, bottom].join("\n");
  }
}
