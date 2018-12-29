console.log(edges);
var container = document.getElementById('mynetwork');
var data = {
  nodes: new vis.DataSet(nodes),
  edges: new vis.DataSet(edges)
};
var options = {
  nodes: {
    shape: 'dot',
    size: 30,
    font: {
      size: 32,
      color: '#ffffff'
    },
    borderWidth: 2
  },
  edges: {
    smooth: false,
    width: 2
  },
  "physics": {
    "barnesHut": {
      "gravitationalConstant": -35135,
      "centralGravity": 0,
      "springLength": 5,
      "springConstant": 0.01,
      "damping": 0.39,
      "avoidOverlap": 0.72
    },
    "maxVelocity": 95,
    "minVelocity": 0.33,
    stabilization: false
  },
};
var network = new vis.Network(container, data, options);