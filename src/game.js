export default class Game {
  constructor(commandLine, deck, dealer, player) {
    this.commandLine = commandLine;
    this.deck = deck;
    this.dealer = dealer;
    this.player = player;
  }

  async start() {
    await this.player.betting();
    await this.dealer.hand.push(...this.deck.drawCard(2));
    await this.player.hand.push(...this.deck.drawCard(2));
    this.commandLine.renderMessage("GAME START");
    this.commandLine.renderGameStatus();
  }
}
