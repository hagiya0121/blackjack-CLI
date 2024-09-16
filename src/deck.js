import Card from "./card.js";

const SUITS = ["heart", "diamond", "club", "spade"];
const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export default class Deck {
  constructor() {
    this.cards = this.#createCards();
  }

  drawCard(drawCount) {
    const result = [];
    for (let i = 0; i < drawCount; i++) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      result.push(this.cards.splice(randomIndex, 1)[0]);
    }
    return result;
  }

  #createCards() {
    return SUITS.flatMap((suit) => {
      return RANKS.map((rank) => new Card(suit, rank));
    });
  }
}
