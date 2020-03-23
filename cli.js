#!/bin/env node
(function () {
  const fs = require('fs');
  const argv = process.argv;

  function usage() {
    console.log(`${argv[1]}: game.md locale\nexample: ${argv[1]}: mygame.md EN_en`)
    return -1;
  }

  if (argv.length !== 4) {
    process.exit(usage())
  }
  fs.readFile(argv[2], { encoding: 'utf-8' }, (error, data) => {
    if (error && error.errno !== 0) {
      console.error(`${error}`) && process.exit(error.errno);
    } else {
      const gameData = parseData(data);
      writeOutput(argv[2], gameData, argv[3]);
    }
  });

  function parseData(markdownData) {
    const lines = markdownData.split(/(\n|\r)/g);
    const game = { questions: [] };
    let questionBuffer = null;

    lines.forEach((line) => {
      let lineBeginning = line.split(/\s+/g)[0];
      if (!['##', '#', '`', ' ', '-'].includes(lineBeginning)) {
        lineBeginning = line[0];
      }
      let trimmedLine = line.replace(lineBeginning, '').trim();
      switch (lineBeginning) {
        case '#':
          game['name'] = trimmedLine;
          break;
        case '##':
          if (questionBuffer) {
            game['questions'].push(questionBuffer);
          }
          questionBuffer = { id: trimmedLine }
          break;
        case ' ':
          if (questionBuffer['text']) {
            questionBuffer['text'] += trimmedLine + '\n';
          } else {
            questionBuffer['text'] = trimmedLine + '\n';
          }
          break;
        case '`':
          if (questionBuffer) {
            if (!questionBuffer['expressions']) {
              questionBuffer['expressions'] = [];
            }
            questionBuffer['expressions'].push(trimmedLine.replace('`', ''));
          } else {
            game['startInstruction'] = trimmedLine.replace('`', '');
          }
          break;
        case '-':
          if (!questionBuffer['answers']) {
            questionBuffer['answers'] = {};
          }
          const action = trimmedLine.match(/`.*`/i)[0].replace(/`/g, '').trim()
          trimmedLine = trimmedLine.replace(`\`${action}\``, '')
          const conditions = trimmedLine.match(/\[(.*)\]/g)
          if (conditions) {
            conditions.forEach((condition) => {
              trimmedLine = trimmedLine.replace(condition, '');
              if (!questionBuffer['conditions']) {
                questionBuffer['conditions'] = {};
              }
              questionBuffer['conditions'][trimmedLine] = condition.replace(/(\[|\])/g, '')
            })
          }
          questionBuffer['answers'][trimmedLine] = action
          break;
        case undefined:
          if (questionBuffer && questionBuffer['text']) {
            questionBuffer['text'] += '\n'
          }
          break;
      }
    });
    return game;
  }

  function writeOutput(URI, gameData, locale) {
    const outputFileName = URI.replace('.md', `_${locale}.json`);
    fs.writeFile(outputFileName,
      JSON.stringify(gameData),
      { encoding: 'utf-8' },
      (error) => {
        if (error && error.errno !== 0) {
          console.error(`${error}`) && process.exit(error.errno);
        } else {
          console.log(`${outputFileName} written.`)
        }
      });
  }
})();
