var ctx = document.getElementById("myChart").getContext("2d");

var original = Chart.defaults.global.legend.onClick;
Chart.defaults.global.legend.onClick = function(e, legendItem) {
  update_caption(legendItem);
  original.call(this, e, legendItem);
};

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [{
      label: 'sales',
      backgroundColor: "rgba(153,255,51,1)",
      data: [12, 19, 3, 17, 28, 24, 7],
    }, {
      label: 'purchase',
      backgroundColor: "rgba(255,153,0,1)",
      data: [30, 29, 5, 5, 20, 3, 10],
    }, {
      label: 'profit',
      backgroundColor: "rgba(255,255,0,1)",
      data: [8, 10, 2, -12, -8, -21, 3],
    }]
  }
});

var labels = {
  "sales": true,
  "purchase": true,
  "profit": true
};

var caption = document.getElementById("caption");

var update_caption = function(legend) {
  labels[legend.text] = legend.hidden;

  var selected = Object.keys(labels).filter(function(key) {
    return labels[key];
  });

  var text = selected.length ? selected.join(" & ") : "nothing";

  caption.innerHTML = "The chart is displaying " + text;
};