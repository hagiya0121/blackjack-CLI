export default class Hand {
  #cards = [];
  #totalValue = 0;

  constructor(cards) {
    this.#cards = cards;
    this.#updateTotalValue();
  }

  get cards() {
    return this.#cards;
  }

  get totalValue() {
    return this.#totalValue;
  }

  hideFirstCard() {
    this.#cards[0].hideCard();
  }

  openFirstCard() {
    this.#cards[0].openCard();
  }

  addCard(card) {
    this.#cards.push(card);
    this.#updateTotalValue();
  }

  countCards() {
    return this.#cards.length;
  }

  #updateTotalValue() {
    const values = this.#cards.map((card) => card.getValue());
    let totalValue = values.reduce((acc, curr) => acc + curr);
    let aceCount = values.filter((value) => value === 11).length;
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
    this.#totalValue = totalValue;
  }
}
