export default class Hand {
  #cards = [];

  constructor(cards) {
    this.#cards = cards;
  }

  get cards() {
    return this.#cards;
  }

  hideFirstCard() {
    this.#cards[0].hideCard();
  }

  openFirstCard() {
    this.#cards[0].openCard();
  }

  addCard(card) {
    this.#cards.push(card);
  }

  countCards() {
    return this.#cards.length;
  }

  calcTotalValue() {
    const values = this.#cards.map((card) => card.getValue());
    let totalValue = values.reduce((acc, curr) => acc + curr);
    let aceCount = values.filter((value) => value === 11).length;
    while (totalValue > 21 && aceCount > 0) {
      totalValue -= 10;
      aceCount--;
    }
    return totalValue;
  }
}
