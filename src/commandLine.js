import { styleText } from "node:util";

export default class CommandLine {
  constructor(dealer, player) {
    this.dealer = dealer;
    this.player = player;
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

  renderGameStatus() {
    console.log(`CREDIT: ${this.player.credit}     BET: ${this.player.bet}`);
    console.log("----------------------------------");
    console.log("           DEALER");
    console.log(this.renderCards(this.dealer.hand, true));
    console.log(`TOTAL: ${this.dealer.totalValue}`);
    console.log("----------------------------------");
    console.log("           PLAYER");
    console.log(this.renderCards(this.player.hand));
    console.log(`TOTAL: ${this.player.totalValue}`);
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
