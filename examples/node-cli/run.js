#!/bin/env node

const promptSync = require('prompt-sync')
const Game = require('mirage').Game;
const gameData = require('./game.json');

const prompt = promptSync({ sigint: true });

const game = new Game(gameData);
game.start();

const gameOn = true;

while (gameOn) {
  const question = game.display();
  // Displaying the question
  console.clear();
  console.log(`${'-'.repeat(process.stdout.columns)}\n`)
  console.log(`~ ${question.text} ~\n`)
  console.log(`${'-'.repeat(process.stdout.columns)}\n`)
  // Displaying the answers
  let i = 0;
  for (let answer in question.answers) {
    console.log(`${++i} - ${answer}\n`);
  }
  // Verifying User input
  const answerNum = parseInt(prompt());
  if (isNaN(answerNum) || answerNum > question.answers.length || answerNum < 1) {
    console.log('-- Invalid answer! --')
  } else {
    // Sending the answer to the game
    const answer = Object.keys(question.answers)[answerNum - 1]
    game.answer(answer);
  }
}
