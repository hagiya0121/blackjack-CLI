export default class Card {
  #suit = "";
  #rank = "";

  constructor(suit, rank) {
    this.#suit = suit;
    this.#rank = rank;
  }

  get suit() {
    return this.#suit;
  }

  get rank() {
    return this.#rank;
  }

  getValue() {
    switch (this.#rank) {
      case "A":
        return 11;
      case "J":
      case "Q":
      case "K":
        return 10;
      default:
        return parseInt(this.#rank);
    }
  }
}
