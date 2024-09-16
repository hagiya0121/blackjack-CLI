export default class Game {
  constructor(deck, dealer, player) {
    this.deck = deck;
    this.dealer = dealer;
    this.player = player;
  }

  async start() {
    console.log("Game Start");
    await this.player.betting();
    await this.dealer.hand.push(...this.deck.drawCard(2));
    await this.player.hand.push(...this.deck.drawCard(2));
  }
}
