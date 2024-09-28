export default class Game {
  #commandLine = null;
  #dealer = null;
  #player = null;

  constructor(commandLine, dealer, player) {
    this.#commandLine = commandLine;
    this.#dealer = dealer;
    this.#player = player;
  }

  async start() {
    let isContinue = true;
    while (isContinue) {
      this.#commandLine.renderMessage("start");
      const betAmount = await this.#commandLine.renderBetOptions();
      this.#player.betting(betAmount);
      this.#firstDealCards();
      await this.#startPlayerTurn();
      this.#startDealerTurn();
      const result = this.#judgePlayerWin();
      this.#player.updateCredit(result);
      this.#commandLine.renderMessage(result);
      isContinue = await this.#commandLine.renderContinueOptions();
    }
    this.#commandLine.renderMessage("end");
  }

  #firstDealCards() {
    this.#dealer.resetHand();
    this.#player.resetHand();
    for (let i = 0; i < 2; i++) {
      this.#dealer.hit(this.#dealer.dealCard());
      this.#player.hit(this.#dealer.dealCard());
    }
    this.#dealer.reverseFirstCard();
    this.#commandLine.renderGameStatus();
  }

  async #startPlayerTurn() {
    let isTurnActive = true;
    while (isTurnActive) {
      if (this.#player.isBusted()) return;
      const action = await this.#commandLine.renderActionOptions();
      isTurnActive = await this.#handlePlayerAction(action);
      this.#commandLine.renderGameStatus();
    }
  }

  async #handlePlayerAction(action) {
    switch (action) {
      case "hit":
        this.#player.hit(this.#dealer.dealCard());
        return true;
      case "stand":
        return false;
      case "double":
        this.#player.double(this.#dealer.dealCard());
        return false;
    }
  }

  #startDealerTurn() {
    this.#dealer.reverseFirstCard();
    if (this.#player.isBusted()) return;
    this.#dealer.takeAction();
    this.#commandLine.renderGameStatus();
  }

  #judgePlayerWin() {
    const playerTotal = this.#player.totalValue;
    const dealerTotal = this.#dealer.totalValue;

    if (this.#player.isBusted()) return "lose";
    if (this.#dealer.isBusted()) return "win";
    if (playerTotal === dealerTotal) return "draw";
    return playerTotal > dealerTotal ? "win" : "lose";
  }
}
