export default class Game {
  #commandLine = null;
  #deck = null;
  #dealer = null;
  #player = null;

  constructor(commandLine, deck, dealer, player) {
    this.#commandLine = commandLine;
    this.#deck = deck;
    this.#dealer = dealer;
    this.#player = player;
  }

  async start() {
    const betAmount = await this.#commandLine.renderBetOptions();
    this.#player.setBetAmount(betAmount);

    for (let i = 0; i < 2; i++) {
      await this.#dealer.hit(this.#deck.drawCard());
      await this.#player.hit(this.#deck.drawCard());
    }
    this.#commandLine.renderMessage("GAME START");
    this.#commandLine.renderGameStatus();

    let isTurnActive = true;
    while (isTurnActive && this.#player.totalValue < 21) {
      isTurnActive = await this.#takePlayerTurn();
      this.#commandLine.renderGameStatus();
    }
  }

  async #takePlayerTurn() {
    const action = await this.#commandLine.renderActionOptions();
    switch (action) {
      case "hit":
        this.#player.hit(this.#deck.drawCard());
        return true;
      case "stand":
        return false;
      case "double":
        this.#player.double(this.#deck.drawCard());
        return false;
    }
  }
}
