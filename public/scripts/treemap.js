var w = 1280 - 80,
  h = 800 - 180,
  x = d3.scale.linear().range([0, w]),
  y = d3.scale.linear().range([0, h]),
  color = d3.scale.category20(),
  root,
  node;

var treemap = d3.layout.treemap()
  .size([w, h])
  .value(function (d) {
    return d.total;
  });

var svg = d3.select("#body").append("div")
  .attr("class", "chart")
  .style("width", w + "px")
  .style("height", h + "px")
  .append("svg:svg")
  .attr("width", w)
  .attr("height", h)
  .append("svg:g")
  .attr("transform", "translate(.5,.5)");

d3.json("../data/treemap.json", function (data) {
  node = root = data;
  var nodes = treemap.nodes(root)
    .filter(function (d) {
      return !d.children;
    });

  var cell = svg.selectAll("g")
    .data(nodes)
    .enter().append("g")
    .attr("class", "cell")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .on("click", function (d) {
      return zoom(node === d.parent ? root : d.parent);
    });

  cell.append("rect")
    .attr("x", function (d) {
      return 1;
    })
    .attr("y", function (d) {
      return 1;
    })
    .attr("width", function (d) {
      return d.dx - 2;
    })
    .attr("height", function (d) {
      return d.dy - 2;
    })
    .style("fill", function (d) {
      return color(d.parent.name);
    });

  cell.append("text")
    .attr("x", function (d) {
      return d.dx / 2;
    })
    .attr("y", function (d) {
      return d.dy / 2;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d.name;
    })
    .style("opacity", function (d) {
      d.w = this.getComputedTextLength();
      return d.dx > d.w ? 1 : 0;
    });

  // 트리맵 안에 요소를 추가하려면 여기에 추가합니다.
  cell.append('circle')
    .attr('cx', function (d) {
      return d.dx / 2;
    }).attr('cy', function (d) {
    return d.dy / 2 + 30;
  }).attr('r', function (d) {
    return 10;
  }).attr('fill', function (d) {
    return 'rgba(0,0,0,0.2)';
  });

  d3.select(window).on("click", function () {
    zoom(root);
  });

  d3.select("select").on("change", function () {
    // change 일 경우 cell안의 내용을 다시 그려 주어야 합니다.
    // 데이터의 dimension name에 따라 선택 할 수 있습니다.
    var that = this;
    treemap.value(function (d) {
      return d[that.value];
    }).nodes(root);
    zoom(node);
  });

  /** TREEMAP에 어떠한 그래프 또는 도형을 그리고자 한다면,
   * cell 에 원하는 도형을 그리고
   * change가 호출될때 해당 그래프를 크기에 맞게 수정하여야합니다. */

});


function zoom(d) {
  var kx = w / d.dx, ky = h / d.dy;
  x.domain([d.x, d.x + d.dx]);
  y.domain([d.y, d.y + d.dy]);

  var t = svg.selectAll("g.cell").transition()
    .duration(d3.event.altKey ? 7500 : 750)
    .attr("transform", function (d) {
      return "translate(" + x(d.x) + "," + y(d.y) + ")";
    });

  t.select("rect")
    .attr("width", function (d) {
      return kx * d.dx - 1;
    })
    .attr("height", function (d) {
      return ky * d.dy - 1;
    })

  t.select("text")
    .attr("x", function (d) {
      return kx * d.dx / 2;
    })
    .attr("y", function (d) {
      return ky * d.dy / 2;
    })
    .style("opacity", function (d) {
      return kx * d.dx > d.w ? 1 : 0;
    });

  node = d;
  d3.event.stopPropagation();
}
