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
      await this.#setupTurn();
      await this.#startPlayerTurn();
      this.#startDealerTurn();
      this.#processResult();
      if (this.#player.hasNoCredit()) break;
      isContinue = await this.#commandLine.renderContinueOptions();
    }
    this.#commandLine.renderMessage("end");
  }

  async #setupTurn() {
    this.#commandLine.renderMessage("start");
    const options = this.#player.createBetOptions();
    const betAmount = await this.#commandLine.renderBetOptions(options);
    this.#player.betting(betAmount);
    this.#firstDealCards();
    this.#commandLine.renderGameStatus();
  }

  #firstDealCards() {
    this.#dealer.resetDeckIfLow();
    this.#dealer.dealOpeningHand(this.#player);
    this.#dealer.dealOpeningHand(this.#dealer);
  }

  async #startPlayerTurn() {
    if (this.#player.isBlackjack()) return;

    let isTurnActive = true;
    while (isTurnActive && this.#player.getTotalValue() < 21) {
      const action = await this.#commandLine.renderActionOptions();
      isTurnActive = await this.#executePlayerAction(action);
      this.#commandLine.renderGameStatus();
    }
  }

  async #executePlayerAction(action) {
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
    if (this.#player.isBlackjack() || this.#player.isBusted()) return;

    this.#dealer.takeAction();
    this.#commandLine.renderGameStatus();
  }

  #processResult() {
    const result = this.#judgeGameResult();
    this.#player.updateCredit(result);
    this.#commandLine.renderMessage(result);
  }

  #judgeGameResult() {
    const playerTotal = this.#player.getTotalValue();
    const dealerTotal = this.#dealer.getTotalValue();

    if (this.#player.isBlackjack()) return "blackjack";
    if (this.#player.isBusted()) return "lose";
    if (this.#dealer.isBusted()) return "win";
    if (playerTotal === dealerTotal) return "draw";
    return playerTotal > dealerTotal ? "win" : "lose";
  }
}
