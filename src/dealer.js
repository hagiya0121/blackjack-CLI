import Hand from "./hand.js";

export default class Dealer {
  #deck = null;
  #hand = null;

  constructor(deck) {
    this.#deck = deck;
  }

  get hand() {
    return this.#hand;
  }

  getTotalValue() {
    return this.#hand.calcTotalValue();
  }

  initializeHand(cards) {
    this.#hand = new Hand(cards);
  }

  dealCard() {
    return this.#deck.drawCard();
  }

  dealOpeningHand(role) {
    const cards = Array.from({ length: 2 }, () => this.dealCard());
    role.initializeHand(cards);
    if (role === this) this.#hand.hideFirstCard();
  }

  isBusted() {
    return this.getTotalValue() > 21;
  }

  takeAction() {
    this.#hand.openFirstCard();
    while (this.getTotalValue() < 17) {
      this.#hand.addCard(this.dealCard());
    }
  }

  resetDeckIfLow() {
    if (this.#deck.remainingCards() < 10) {
      this.#deck.reset();
    }
  }
}
