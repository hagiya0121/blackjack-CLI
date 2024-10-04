import Hand from "./hand.js";

const PERCENTAGES = [0.1, 0.25, 0.5, 1];

export default class Player {
  #bet = 0;
  #credit = 1000;
  #hand = null;

  get bet() {
    return this.#bet;
  }

  get credit() {
    return this.#credit;
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

  createBetOptions() {
    return PERCENTAGES.map((per) => Math.round((this.#credit * per) / 10) * 10);
  }

  betting(amount) {
    this.#bet = amount;
    this.#credit -= amount;
  }

  hit(card) {
    this.#hand.addCard(card);
  }

  double(card) {
    this.#hand.addCard(card);
    this.#credit -= this.#bet;
    this.#bet *= 2;
  }

  isBusted() {
    return this.getTotalValue() > 21;
  }

  canDouble() {
    return this.#hand.countCards() == 2 && this.#credit >= this.#bet;
  }

  hasNoCredit() {
    return this.#credit === 0;
  }

  updateCredit(result) {
    if (result === "win") {
      this.#credit += this.bet * 2;
    } else if (result === "draw") {
      this.#credit += this.bet;
    }
  }
}
