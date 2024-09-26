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
    let isContinue = true;
    while (isContinue) {
      this.#commandLine.renderMessage("start");
      await this.#handleBetAmount();
      this.#firstDealCards();
      await this.#startPlayerTurn();
      await this.#startDealerTurn();
      const result = this.#judgePlayerWin();
      this.#updateCredit(result);
      this.#commandLine.renderMessage(result);
      isContinue = await this.#commandLine.renderContinueOptions();
    }
    this.#commandLine.renderMessage("end");
  }

  async #handleBetAmount() {
    const betAmount = await this.#commandLine.renderBetOptions();
    this.#player.setBetAmount(betAmount);
    this.#player.reduceCredit(betAmount);
  }

  #firstDealCards() {
    this.#dealer.resetHand();
    this.#player.resetHand();
    for (let i = 0; i < 2; i++) {
      this.#dealer.hit(this.#deck.drawCard());
      this.#player.hit(this.#deck.drawCard());
    }
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
        this.#player.hit(this.#deck.drawCard());
        return true;
      case "stand":
        return false;
      case "double":
        this.#player.double(this.#deck.drawCard());
        return false;
    }
  }

  async #startDealerTurn() {
    if (this.#player.isBusted()) return;
    while (this.#dealer.totalValue < 17) {
      await this.#dealer.hit(this.#deck.drawCard());
    }
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

  #updateCredit(result) {
    if (result === "win") {
      this.#player.addCredit(this.#player.bet * 2);
    } else if (result === "draw") {
      this.#player.addCredit(this.#player.bet);
    }
  }
}
