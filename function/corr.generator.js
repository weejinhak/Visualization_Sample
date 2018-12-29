const fs = require('fs');
const _ = require('lodash');

const pcorr = require('compute-pcorr');
const correlation = require('correlation-rank');

const raws = _.dropRight(_.drop((fs.readFileSync('./result.csv').toString()).split('\n')));
const dset = _.map(raws, raw => _.chain(raw).split(',').drop().map(d => d * 1).value());
const ret = _.map(dset, (source, i) => {
  console.log('do',i);
  return _.map(dset, target => correlation.rank(source, target))
});

fs.writeFileSync('./corr.json', JSON.stringify(ret));
