const readline = require('readline');
const readline_reverse = require('readline-reverse');
const fse = require('fs-extra');
const fs = require('fs');
const reader = new readline_reverse();

async function* readLines(path) {
  await reader.open(path);
  try {
    while (line < 90) {
      yield await reader.read(line);
      line++;
    }
  } finally {
    await reader.close();
  }
}

(async function () {
  for await(const line of readLines('E:/package-lock.json')) {
    console.log(line);
  }
})();

