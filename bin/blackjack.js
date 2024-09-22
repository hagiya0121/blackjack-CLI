#!/usr/bin/env node
import Deck from "../src/deck.js";
import Player from "../src/player.js";
import CommandLine from "../src/commandLine.js";
import Game from "../src/game.js";

const deck = new Deck();
const player = new Player();
const dealer = new Player();
const commandLine = new CommandLine(dealer, player);
const game = new Game(commandLine, deck, dealer, player);
game.start();
