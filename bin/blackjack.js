#!/usr/bin/env node
import Deck from "../src/deck.js";
import Player from "../src/player.js";
import Dealer from "../src/dealer.js";
import Game from "../src/game.js";

const deck = new Deck();
const player = new Player();
const dealer = new Dealer();
const game = new Game(deck, dealer, player);
game.start();
