const fs = require('fs');
const _ = require('lodash');
const corrs = JSON.parse(fs.readFileSync('./corr.json'));

const edges = [];
const nodes = [];
_.map(corrs, (corr, i) => {
  nodes.push({
    id: i,
    name: i + '',
  });
  const toArray = [];
  _.forEach(corr, (c, j) => {
    if (i === j) return null;
    if (c < 0.3) return null;
    toArray.push(j);
  });
  const links = _.chain(toArray).shuffle().take(3).value();
  console.log(links.length);
  console.log(links);
  _.forEach(links, link => {
    console.log('f', i, 't', link);
    edges.push({
      from: i,
      to: link,
    });
  });
});

console.log('node count ', nodes.length, 'edge count', edges.length);
fs.writeFileSync('../public/data/edges.js', `var edges = ${JSON.stringify(edges)};`);
fs.writeFileSync('../public/data/nodes.js', `var nodes = ${JSON.stringify(nodes)};`);
