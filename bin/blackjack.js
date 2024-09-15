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

class Player {
  constructor() {
    this.hand = [];
    this.money = 500;
    this.bet = 0;
  }
}

class Dealer {
  constructor() {
    this.hand = [];
    this.publicCard = null;
  }
}

class Game {
  constructor(deck, dealer, player) {
    this.deck = deck;
    this.dealer = dealer;
    this.player = player;
  }
}
