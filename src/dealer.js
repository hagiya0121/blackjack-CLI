export default class Dealer {
  #deck = null;
  #hand = [];
  #totalValue = 0;

  constructor(deck) {
    this.#deck = deck;
    this.#hand = [];
    this.#totalValue = 0;
  }

  get hand() {
    return this.#hand;
  }

  get totalValue() {
    return this.#totalValue;
  }

  dealCard() {
    return this.#deck.drawCard();
  }

  resetHand() {
    this.#hand = [];
  }

  hit(card) {
    this.#hand.push(card);
    this.#calcTotalValue();
  }

  isBusted() {
    return this.totalValue > 21;
  }

  takeAction() {
    while (this.#totalValue < 17) {
      this.hit(this.dealCard());
    }
  }

  #calcTotalValue() {
    const values = this.#hand.map((card) => card.getValue());
    let totalValue = values.reduce((acc, curr) => acc + curr);
    let aceCount = values.filter((value) => value === 11).length;
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
    this.#totalValue = totalValue;
  }
}
