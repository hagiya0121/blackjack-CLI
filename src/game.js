export default class Game {
  constructor(deck, dealer, player) {
    this.deck = deck;
    this.dealer = dealer;
    this.player = player;
  }

  start() {
    console.log("Game Start");
    this.player.betting();
  }
}
