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

  #createCards() {
    return SUITS.flatMap((suit) => {
      return RANKS.map((rank) => new Card(suit, rank));
    });
  }
}
