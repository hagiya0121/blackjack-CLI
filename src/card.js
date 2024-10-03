export default class Card {
  #suit = "";
  #rank = "";
  #isHidden = false;

  constructor(suit, rank) {
    this.#suit = suit;
    this.#rank = rank;
    this.#isHidden = false;
  }

  displaySuit() {
    return this.#isHidden ? "?" : this.#suit;
  }

  displayRank() {
    return this.#isHidden ? "??" : this.#rank;
  }

  hideCard() {
    this.#isHidden = true;
  }

  openCard() {
    this.#isHidden = false;
  }

  getValue() {
    if (this.#isHidden) return 0;
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
