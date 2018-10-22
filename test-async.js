const fs = require('fs');
const fetch = require('node-fetch');
const _ = require('lodash');
const util = require('util');

async function fetchRandom() {
  const url = 'https://nodejs.org/api/util.html#util_util_inspect_object_options';
  return fetch(url).catch(err => {
    throw new Error(err);
  });
}

async function* asyncGenerator() {
  console.log('Start');
  const result = await fetchRandom(); // (A)
  yield 'Result: ' + await util.inspect(result, false, 10); // (B)
  console.log('Done');
}

const ag = asyncGenerator();
ag.next().then(({value, done}) => {
  console.log(value);
});
