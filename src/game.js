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
    this.#commandLine.renderMessage("start");
    const betAmount = await this.#commandLine.renderBetOptions();
    this.#player.setBetAmount(betAmount);

    this.#dealer.hand.length = 0;
    this.#player.hand.length = 0;
    for (let i = 0; i < 2; i++) {
      await this.#dealer.hit(this.#deck.drawCard());
      await this.#player.hit(this.#deck.drawCard());
    }
    this.#commandLine.renderGameStatus();

    let isTurnActive = true;
    while (isTurnActive && this.#player.totalValue < 21) {
      const action = await this.#commandLine.renderActionOptions();
      isTurnActive = await this.#handlePlayerAction(action);
      this.#commandLine.renderGameStatus();
    }

    if (this.#player.isBusted()) {
      this.#commandLine.renderMessage("lose");
      const isContinue = await this.#commandLine.renderContinueOptions();
      this.#handleContinue(isContinue);
      return;
    }

    while (this.#dealer.totalValue < 17) {
      await this.#dealer.hit(this.#deck.drawCard());
      this.#commandLine.renderGameStatus();
    }

    this.#commandLine.renderMessage(this.#judgeResult());
    const isContinue = await this.#commandLine.renderContinueOptions();
    this.#handleContinue(isContinue);
  }

  async #handlePlayerAction(action) {
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

  #judgeResult() {
    const playerTotal = this.#player.totalValue;
    const dealerTotal = this.#dealer.totalValue;

    if (dealerTotal > 21) return "win";
    if (playerTotal === dealerTotal) return "draw";
    return playerTotal > dealerTotal ? "win" : "lose";
  }

  #handleContinue(isContinue) {
    if (isContinue) {
      this.start();
    } else {
      this.#commandLine.renderMessage("end");
      process.exit(0);
    }
  }
}
