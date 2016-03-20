        /**
* creates a traffic visualization of all incoming tweets
*  
*/  

var nodes;
var force;
var svg;
var circle;
var radius,n,m,padding,color,x,width;
function drawtraffic(allt)
{
nodes=allt;
var margin = {top: -8, right: 0, bottom: 0, left: 60},
    width = $('#sentiment-drift').width()- margin.left - margin.right,
	
    height = 600 - margin.top - margin.bottom;
//writeDebug(width);
   n = 200,
    m = 10,
    padding = 6,
    radius = d3.scale.sqrt().range([0, 12]),
    color = ['#e22323','#eddc22','#108504']
    x = d3.scale.linear().domain([0,window.totaltimevalue]).range([0,width]);
	  yfriends = d3.scale.linear().domain([0,window.maxfriends]).range([350,0]);
	   yretweets = d3.scale.linear().domain([0,window.maxretweets]).range([350,0]);
	    yfollower = d3.scale.linear().domain([0,window.maxfollower]).range([350,0]);
  window.trafficscale = x(1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
	
	var yAxis = d3.svg.axis()
    .scale(yfriends)
    .orient("left");


 this.nodes = allTweets;
force = d3.layout.force()
    .nodes(allt)
    .size([width, height])
	
    .on("tick", tick)
    .start();
	
 svg = d3.select("#sentiment-drift").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
		thewindow = svg.append("rect")
		.attr("id",'window')
                             .attr("x", 50)
                            .attr("y", 0)
                            .attr("width",  (window.thespinner).spinner( "value" )*x(1))
                           .attr("height", 340)
						   .attr("opacity",0.2);
  svg = svg.append("g")
    .attr("transform", "translate(" + 50 + "," + margin.top + ")");
	

	
	
	  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0," + 0 + ")")
      .call(yAxis);
	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 350 + ")")
      .call(xAxis);
	
	
 
 this.circle = svg.selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .attr("r", function(d) { return d.radius; })
	.attr("cx", function(d) { return (x(1)*d.beginTimevalue); })
	.attr("cy", function(d) { return yfriends(d.userFriendscount); })
	.attr("class", function(d) { return "senti "+ d.keywords; })
		.attr("opacity",0.9)
    .style("fill", function(d) { return d.color; })
	 .call(d3.helper.tooltip()
                .attr({class: function(d, i) { return "tooltip"; }})
                .style({color: '#000',background:'white',border:"1px solid #000"})
                .text(function(d){ return '" '+d.tweetContent+ '"' + " by "+ d.tweetUser +"on "+ d.beginTimevalue + "<br>Followers: "+ d.userFollowers+ "<br>Friends: "+ d.userFriendscount+ "<br>Retweetcount: "+ d.retweetcount; })
            )
	 .on('mouseover', function(d, i){ d3.select(this).style({stroke: 'black'}); })
     .on('mouseout', function(d, i){ d3.select(this).style({stroke: 'none'}); })
  //  .call(force.drag);
	
}

function update(data)
{
 this.circle = svg.selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .attr("r", function(d) { return d.radius; })
	.attr("cx", function(d) { return (x(1)*d.beginTimevalue); })
	.attr("cy", function(d) { return y(d.userFriendscount); })
	.attr("opacity",0.6)
    .style("fill", function(d) { return d.color; })
	 .call(d3.helper.tooltip()
                .attr({class: function(d, i) { return "tooltip"; }})
                .style({color: '#000',background:'white',border:"1px solid #000"})
                .text(function(d){ return '" '+d.tweetContent+ '"' + " by "+ d.tweetUser +"on "+ d.beginTimevalue; })
            )
	 .on('mouseover', function(d, i){ d3.select(this).style({stroke: 'black'}); })
     .on('mouseout', function(d, i){ d3.select(this).style({stroke: 'none'}); })
  //  .call(force.drag);
}


function tick(e) {
 // circle
      //.each(collide(.5))
     
      //.attr("cy", function(d) { return d.y; });
}

// Move nodes toward cluster focus.
function gravity(alpha) {
  return function(d) {
    d.y += (d.cy - d.y) * alpha;
   // var pos = Math.random()*300;
	var pos = x(1)*d.beginTimevalue;
	d.x += (pos - d.x) * alpha;
  };
}





// Resolve collisions between nodes.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + radius.domain()[1] + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
          || x2 < nx1
          || y1 > ny2
          || y2 < ny1;
    });
  };
}

