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
    return this.#hand.totalValue;
  }

  initializeHand(cards) {
    this.#hand = new Hand(cards);
  }

  dealCard() {
    return this.#deck.drawCard();
  }

  dealOpeningHand(player) {
    const cards = Array.from({ length: 2 }, () => this.dealCard());
    player.initializeHand(cards);
    if (player === this) this.#hand.hideFirstCard();
  }

  isBusted() {
    return this.totalValue > 21;
  }

  takeAction() {
    this.#hand.openFirstCard();
    while (this.#hand.totalValue < 17) {
      this.#hand.addCard(this.dealCard());
    }
  }

  resetDeckIfLow() {
    if (this.#deck.remainingCards() < 10) {
      this.#deck.reset();
    }
  }
}
