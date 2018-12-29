var points = [];
var numberPoint = 25;
var color = d3.scale.category20c();
for (var i = 0; i < numberPoint; i++) {
  points.push(getRadialPoint(i))
}

var line = d3.svg.line()
  .x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).interpolate('bundle');

function getRadialPoint(i, multi) {
  if (_.isNil(multi)) multi = 350;
  return {
    x: Math.cos(Math.PI * 2 / numberPoint * i) * multi,
    y: Math.sin(Math.PI * 2 / numberPoint * i) * multi,
  }
}

var links = [];

for (var i = 0; i < 70; i++) {
  links.push({
    from: Math.floor(Math.random() * numberPoint),
    to: Math.floor(Math.random() * numberPoint),
  })
}


var g = d3.select('svg').append('g').attr('transform', 'translate(500,500)');
_.forEach(points, function (point, i) {
  g.append('circle').attr('cx', point.x).attr('cy', point.y).attr('r', 10).attr('fill', color(i));
});

_.forEach(links, function (link) {
  if (link.from === link.to) return;
  var points = [
    getRadialPoint(link.from),
    getRadialPoint(link.from, 150 + Math.random() * 15),
    getRadialPoint(link.to, 150 + Math.random() * 15),
    getRadialPoint(link.to),
  ];

  g.append("path")
    .attr("d", line(points))
    .attr("stroke", color(link.from))
    .attr("stroke-width", Math.random() * 3 + 0.5)
    .attr("opacity", 0.5)
    .attr("fill", "none");
});