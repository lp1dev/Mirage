#!/bin/env node

const promptSync = require('prompt-sync')
const Game = require('mirage').Game;
const gameData = require('./game.json');

const prompt = promptSync({
  sigint: true
});

const game = new Game(gameData);
game.start();

const gameOn = true;

while (gameOn) {
  const question = game.display();
  // Displaying the question
  process.stdout.write('\033c');
  console.log(`${'-'.repeat(process.stdout.columns)}`)
  console.log(`~ ${question.text} ~`)
  console.log(`${'-'.repeat(process.stdout.columns)}\n\n`)  
  // Displaying the answers
  let i = 0;
  for (let answer in question.answers) {
    console.log(`${++i} : ${answer}`);
  }
  // Verifying User input
  const answerNum = parseInt(prompt());
  if (isNaN(answerNum) || answerNum > question.answers.length || answerNum < 1) {
    console.log('-- Invalid answer! --')
  } else {
    // Sending the answer
    const answer = Object.keys(question.answers)[answerNum - 1]
    console.log('\nYou said: ', answer);
    game.answer(answer);
  }
}
