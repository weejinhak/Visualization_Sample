// Variables
var width = 500;
var height = 500;
var radius = Math.min(width, height) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

// Create primary <g> element
var g = d3.select('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

var arc = d3.arc()
  .startAngle(function (d) {
    return d.x0
  })
  .endAngle(function (d) {
    return d.x1
  })
  .innerRadius(function (d) {
    return d.y0
  })
  .outerRadius(function (d) {
    return d.y1
  });


var data;
d3.json('./data/sunburst.json', function (nodeData) {
  data = nodeData;
  createSunburst('size')
});
d3.select("select").on("change", function () {
  console.log(this.value);
  createSunburst(this.value);
});

function createSunburst(dimension) {
  g.selectAll('*').remove();
  var val = dimension;
  var partition = d3.partition()
    .size([2 * Math.PI, radius]);

  var root = d3.hierarchy(data)
    .sum(function (d) {
      return d[val]
    });
  partition(root);
  
  var arcs = g.selectAll('path')
    .data(root.descendants())
    .enter().append('g')
    .append('path')
    .attr("display", function (d) {
      return d.depth ? null : "none";
    })
    .attr("d", arc)
    .style('stroke', '#fff')
    .style("fill", function (d) {
      return color((d.children ? d : d.parent).data.name);
    });
}



