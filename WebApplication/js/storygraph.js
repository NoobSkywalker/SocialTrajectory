        /**
* creates forced network graph for discussions
*  
*/  
var path;
var text;
var thecircle;
var visstory;
var svgstory;
var graphnodes={};
var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);
var circlerange = d3.scale.linear().domain([2, 6]).range([0,9]);	

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();

}

function dragged(d) {
  
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}

function updatestorygraph()
{
	 storyforce.stop();
	 allpaths.remove();
	allcircles.remove();
	alltext.remove();
		allpaths = visstory.append("svg:g");
	allcircles =  visstory.append("svg:g");
	alltext =  visstory.append("svg:g");
	
	 storyforce.stop();
	
	
	
 path = allpaths.selectAll("path")
    .data(window.thelinks)
  .enter().append("svg:path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
	
	

thecircle = allcircles.selectAll("circle")
    .data(window.thenodes)
  .enter().append("svg:circle")
    .attr("r", function(d) {return circlerange(d.radius)})
	.attr("class",function(d) { return "graph " + d.keywords; })
	 .style("fill", function(d) { return d.color; })
	 
    .call(storyforce.drag)
	.on('mouseover', function(d, i){ d3.select(this).style({stroke: 'white'}); })
     .on('mouseout', function(d, i){ d3.select(this).style({stroke: 'black'}); })



 text = alltext.selectAll("circle")
    .data(window.thenodes)
  .enter().append("svg:g")
  .attr("class", "shadow");


text.append("svg:text")
    .attr("x", 8)
    .attr("y", ".31em")
    .attr("class", "shadow")
    .text(function(d) {	var sliced = (d.name).slice(0,10)+"..."
	return sliced; })


text.append("svg:text")
    .attr("x", 8)
    .attr("y", ".31em")
		.call(d3.helper.tooltip()
                .attr({class: function(d, i) { return "tooltip"; }})
                .style({color: '#000',background:'white',border:"1px solid #000"})
                .text(function(d){ return '" '+d.name+ '"' ; })
            )
    .text(function(d) { 
	var sliced = (d.name).slice(0,10)+"..."
	return sliced; });


  storyforce.start();
}


function drawStorygraph()
{

var w = 960,
    h = 500;

 storyforce = d3.layout.force()
    .size([w, h])

    .linkDistance((window.linkdistance).spinner("value"))
    .charge(-300)
    .on("tick", tickgraph)
	
	svgstory = d3.select("#story-drift").append("svg:svg").attr("width", 930).attr("height", 570)
	bg = svgstory.append("svg:rect")
	  .attr("width", "100%")
        .attr("height", "500")
        .attr("fill", "grey")
		.attr("opacity", "0.0")
	.call(d3.behavior.zoom().scaleExtent([-10, 10]).on('zoom', zoomed));
	visstory = svgstory.append("svg:g").attr("transform", "translate(0,0)")
	
	allpaths = visstory.append("svg:g");
	allcircles =  visstory.append("svg:g");
	alltext =  visstory.append("svg:g");

window.thelinks = storyforce.links();
window.thenodes = storyforce.nodes();


visstory.append("svg:defs").selectAll("marker")
    .data(["neutral", "neg", "pos"])
  .enter().append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

 path = allpaths.selectAll("path")
 thecircle =allcircles.selectAll("circle")
	text = alltext.selectAll("g")



	
}


function tickgraph() {
  path.attr("d", function(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  });

  thecircle.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

  text.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
  
 /* thecircle.attr("cx", function(d) { return d.x = Math.max(6, Math.min(900 - 6, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(6, Math.min(300 - 6, d.y)); });*/

}

function zoomed() {
  visstory.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}