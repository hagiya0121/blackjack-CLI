#!/usr/bin/env node
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

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

class Deck {
  constructor() {
    this.cards = this.#createCards();
  }

  #createCards() {
    return SUITS.flatMap((suit) => {
      return RANKS.map((rank) => new Card(suit, rank));
    });
  }
}

const deck = new Deck();
console.log(deck.cards);
