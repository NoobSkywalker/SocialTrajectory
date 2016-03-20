/**
* Class that represents the time boxplots
*  Inspired by http://informationandvisualization.de/blog/box-plot
*/

(function() {

   
    d3.box = function() {
        var width = 1,
            height = 1,
            duration = 0,
            domain = null,
            value = Number,
            whiskers = boxWhiskers,
            quartiles = boxQuartiles,
            showLabels = true, // whether or not to show text labels
            numBars = 4,
            curBar = 1,
            tickFormat = null;

        // For each small multiple…
        function box(g) {
            g.each(function(data, i) {
                //d = d.map(value).sort(d3.ascending);
                //var boxIndex = data[0];
                //var boxIndex = 1;
                var d = data[1].sort(d3.ascending);
                var average = [];
                average.push(data[2]);
                // console.log(boxIndex); 
                //console.log(d); 

                var g = d3.select(this),
                    n = d.length,
                    min = d[0],
                    max = d[n - 1];

                // Compute quartiles. Must return exactly 3 elements.
                var quartileData = d.quartiles = quartiles(d);

                // Compute whiskers. Must return exactly 2 elements, or null.
                var whiskerIndices = whiskers && whiskers.call(this, d, i),
                    whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

                // Compute outliers. If no whiskers are specified, all data are "outliers".
                // We compute the outliers as indices, so that we can join across transitions!
                var outlierIndices = whiskerIndices
                ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
                : d3.range(n);

                // Compute the new x-scale.
                var x1 = d3.scale.linear()
                .domain(domain && domain.call(this, d, i) || [min, max])
                .range([height, 0]);

                // Retrieve the old x-scale, if this is an update.
                var x0 = this.__chart__ || d3.scale.linear()
                .domain([0, Infinity])
                // .domain([0, max])
                .range(x1.range());

                // Stash the new scale.
                this.__chart__ = x1;


                var getorigin = d3.scale.linear()
                .domain([height, 0])
                .range(domain && domain.call(this, d, i) || [min, max]);


                // Note: the box, median, and box tick elements are fixed in number,
                // so we only have to handle enter and update. In contrast, the outliers
                // and other elements are variable, so we need to exit them! Variable
                // elements also fade in and out.

                // Update center line: the vertical line spanning the whiskers.
                var center = g.selectAll("line.center")
                .data(whiskerData ? [whiskerData] : []);

                //vertical line
                center.enter().insert("line", "rect")
                .attr("class", "center")
                .attr("x1", width / 2)
                .attr("y1", function(d) { return x0(d[0]); })
                .attr("x2", width / 2)
                .attr("y2", function(d) { return x0(d[1]); })
                .style("opacity", 1e-6)
                .transition()
                .duration(duration)
                .style("opacity", 1)
                .attr("y1", function(d) { return x1(d[0]); })
                .attr("y2", function(d) { return x1(d[1]); });

                center.transition()
                .duration(duration)
                .style("opacity", 1)
                .attr("y1", function(d) { return x1(d[0]); })
                .attr("y2", function(d) { return x1(d[1]); });

                center.exit().transition()
                .duration(duration)
                .style("opacity", 1e-6)
                .attr("y1", function(d) { return x1(d[0]); })
                .attr("y2", function(d) { return x1(d[1]); })
                .remove();

                // Update innerquartile box.
                var box = g.selectAll("rect.box")
                .data([quartileData]);

                box.enter().append("rect")
                .attr("class", "box")
                .attr("x", 0)
                .attr("y", function(d) { return x0(d[2]); })
                .attr("width", width)
                .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
                .transition()
                .duration(duration)
                .attr("y", function(d) { return x1(d[2]); })
                .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

                box.transition()
                .duration(duration)
                .attr("y", function(d) { return x1(d[2]); })
                .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

                // Update median line.
                var medianLine = g.selectAll("line.median")
                .data([quartileData[1]]);

                medianLine.enter().append("line")
                .attr("class", "median")
                .attr("x1", 0)
                .attr("y1", x0)
                .attr("x2", width)
                .attr("y2", x0)
                .transition()
                .duration(duration)
                .attr("y1", x1)
                .attr("y2", x1);

                medianLine.transition()
                .duration(duration)
                .attr("y1", x1)
                .attr("y2", x1);
                
                
                /*Tweet Circles
                box.append("g")
                .selectAll("circle")
                .data(data)     
                .enter()
                .append("circle")
                //double point size for outliers
             
                
                .attr("cy", function(d) { // jitter the points to reduce overplotting
                    return random_jitter();
                }) 
                .attr("cx", function(d) {
                    return x1(d[0]);   
                })
                //add tooltip on hover
                .append("title")
                .text(function(d) {
                    return "Date: " + d.date + "; value: " + d.value;
                });*/

           



            var drag= d3.behavior.drag().on("drag", dragmove).on("dragend", dragend);

            // Dragging update Boxplots: 
            function dragmove(d) {
                var x = d3.event.x;
                var y = d3.event.y;
                if(y < 310 && y >0 )
                {
                    var currentElement = d3.select(this).node().parentNode;
                    d3.select(this).attr("y1",  y );
                    d3.select(this).attr("y2",  y );
                }
            }

            function dragend(d) {

                var currentElement = d3.select(this).node().parentNode;
                var gettheid = $(currentElement).attr("class");
                console.log($("."+gettheid));


                var allClusters = $("."+gettheid)
                //.sort(function(a, b) { return d3.descending($(a.childNodes[3]).attr("y1"), $(b.childNodes[3]).attr("y1")); });

                console.log(allClusters);

                var parentElem = currentElement.parentNode;
                var boxPlotsElem = currentElement.parentNode.childNodes;
                console.log(parentElem);
                console.log(currentElement);
                var i = Array.prototype.indexOf.call(parentElem.childNodes, currentElement);

                $(parentElem.childNodes[0].childNodes[3]).attr("y1");


                var currentval= allClusters[i].__data__[2];
                var timediffinhours = getorigin($(parentElem.childNodes[i].childNodes[3]).attr("y1"))-currentval
                console.log("difference"+timediffinhours);
                var currenthash= getHashtagFromAll(gettheid.replace("cluster",""));
                console.log(currenthash);

                var currentclusters = currenthash.allClusters;


                currenthash.clusters[i].timenode+=(timediffinhours*60*60*1000);

                //empty boxplot
                var clearvistag= "#boxplot"+currenthash.hashid;
                $(clearvistag).empty();
                createBoxPlot(currenthash);
                currenthash.recalculateValues();
                updateRectData();
                $('svg rect').tipsy({ 
                    gravity: 'w', 
                    html: true, 
                    title: function() {
                        var d = this.__data__, val = d.val, info = d.name ;
                        return d.name +' value:' + val; 
                    }
                });





                /*if(parentElem.childNodes.length>=2)
                        {
                            var trans1 = d3.transform($(parentElem.childNodes[0]).attr("transform")) ;
                            var trans2 = d3.transform($(parentElem.childNodes[1]).attr("transform")) ;
                            var xDifference = trans2.translate[0]-trans1.translate[0];

                            console.log(xDifference);

                            var firstelementavg = $(parentElem.childNodes[0].childNodes[3]).attr("y1");
                            var selectedelementavg = $(parentElem.childNodes[i].childNodes[3]).attr("y1");
                            var lastelementavg = $(parentElem.childNodes[parentElem.childNodes.length-4].childNodes[3]).attr("y1");

                            if( firstelementavg < selectedelementavg )
                            {
                                 var transc = d3.transform($(parentElem.childNodes[i]).attr("transform")) ;

                                $(parentElem.childNodes[i]).attr("transform","translate("+trans1.translate[0]+",30)");

                                //push all one top


                            $(parentElem.childNodes[i]).prependTo( $(parentElem));
                                for( var a=0; a<i; a++)
                                {
                                     var trans = d3.transform($(allClusters[a]).attr("transform")) ;
                                    $(allClusters[a]).attr("transform","translate("+(trans.translate[0]+xDifference)+",30)");
                                }
                                 //console.log("smaller than first");
                                //TODO MOVE CLUSTER TO BEGINNING

                            }

                            else if (selectedelementavg < lastelementavg)
                            {

                                  var transl = d3.transform($(parentElem.childNodes[parentElem.childNodes.length-4]).attr("transform")) ;
                                 var transc = d3.transform($(parentElem.childNodes[i]).attr("transform")) ;
                                $(parentElem.childNodes[i]).attr("transform","translate("+transl.translate[0]+",30)");
                                $(parentElem.childNodes[parentElem.childNodes.length-4]).attr("transform","translate("+transc.translate[0]+",30)");
                                      $(parentElem.childNodes[i]).insertAfter($(parentElem.childNodes[parentElem.childNodes.length-4]));

                                //console.log("bigger than last");
                            }

                            else 
                            {
                                for( var tz=0; tz<parentElem.childNodes.length-4; tz++)
                                {


                                    if(i==0 && tz==0) 
                                    {
                                        continue;
                                    }

                                    if(i==(parentElem.childNodes.length-1) && tz==0) 
                                    {
                                        continue;
                                    }
                                    var comparedElem = parentElem.childNodes[tz];




                                    var nextElem = parentElem.childNodes[tz+1];
                                    var comparedavgline = comparedElem.childNodes[3];
                                    var nextelemavgline = nextElem.childNodes[3];

                                    console.log($(comparedavgline).attr("y1"));
                                    console.log($(nextelemavgline).attr("y1"));


                                }

                        }

                    }*/
            }


            // Update Average
            var avgLine = g.selectAll("line.avg")
            .data(average);

            avgLine.enter().append("line")
            .attr("class", "avg")
            .attr("x1", -5)
            .attr("y1", x0)
            .attr("x2", width+5)
            .attr("y2", x0)
            .style("cursor", "pointer")
            .call(drag) 
            .on("mouseover", function(d) {
                d3.select(this).style("stroke-width", "3px");
            })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke-width", "2px");

            })

            .transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1);


            avgLine.transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1);




            // Update whiskers.
            var whisker = g.selectAll("line.whisker")
            .data(whiskerData || []);

            whisker.enter().insert("line", "circle, text")
            .attr("class", "whisker")
            .attr("x1", 0)
            .attr("y1", x0)
            .attr("x2", 0 + width)
            .attr("y2", x0)
            .style("opacity", 1e-6)
            .transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1);

            whisker.transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1);

            whisker.exit().transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1e-6)
            .remove();

            // Update outliers.
            var outlier = g.selectAll("circle.outlier")
            .data(outlierIndices, Number);

            outlier.enter().insert("circle", "text")
            .attr("class", "outlier")
            .attr("r", 5)
            .attr("cx", width / 2)
            .attr("cy", function(i) { return x0(d[i]); })
            .style("opacity", 1e-6)
            .transition()
            .duration(duration)
            .attr("cy", function(i) { return x1(d[i]); })
            .style("opacity", 1);

            outlier.transition()
            .duration(duration)
            .attr("cy", function(i) { return x1(d[i]); })
            .style("opacity", 1);

            outlier.exit().transition()
            .duration(duration)
            .attr("cy", function(i) { return x1(d[i]); })
            .style("opacity", 1e-6)
            .remove();

            // Compute the tick format.
            var format = tickFormat || x1.tickFormat(8);

            // Update box ticks.
            var boxTick = g.selectAll("text.box")
            .data(quartileData);
            if(showLabels == true) {
                boxTick.enter().append("text")
                .attr("class", "box")
                .attr("dy", ".3em")
                .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
                .attr("x", function(d, i) { return i & 1 ?  + width : 0 })
                .attr("y", x0)
                .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
                .text(format)
                .transition()
                .duration(duration)
                .attr("y", x1);
            }

            boxTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1);

            // Update whisker ticks. These are handled separately from the box
            // ticks because they may or may not exist, and we want don't want
            // to join box ticks pre-transition with whisker ticks post-.
            var whiskerTick = g.selectAll("text.whisker")
            .data(whiskerData || []);
            if(showLabels == true) {
                whiskerTick.enter().append("text")
                .attr("class", "whisker")
                .attr("dy", ".3em")
                .attr("dx", 6)
                .attr("x", width)
                .attr("y", x0)
                .text(format)
                .style("opacity", 1e-6)
                .transition()
                .duration(duration)
                .attr("y", x1)
                .style("opacity", 1);
            }
            whiskerTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1)
            .style("opacity", 1);

            whiskerTick.exit().transition()
            .duration(duration)
            .attr("y", x1)
            .style("opacity", 1e-6)
            .remove();
        });
        d3.timer.flush();
    }

    box.width = function(x) {
        if (!arguments.length) return width;
        width = x;
        return box;
    };

    box.height = function(x) {
        if (!arguments.length) return height;
        height = x;
        return box;
    };

    box.tickFormat = function(x) {
        if (!arguments.length) return tickFormat;
        tickFormat = x;
        return box;
    };

    box.duration = function(x) {
        if (!arguments.length) return duration;
        duration = x;
        return box;
    };

    box.domain = function(x) {
        if (!arguments.length) return domain;
        domain = x == null ? x : d3.functor(x);
        return box;
    };

    box.value = function(x) {
        if (!arguments.length) return value;
        value = x;
        return box;
    };

    box.whiskers = function(x) {
        if (!arguments.length) return whiskers;
        whiskers = x;
        return box;
    };

    box.showLabels = function(x) {
        if (!arguments.length) return showLabels;
        showLabels = x;
        return box;
    };

    box.quartiles = function(x) {
        if (!arguments.length) return quartiles;
        quartiles = x;
        return box;
    };

    return box;
};

 function boxWhiskers(d) {
    return [0, d.length - 1];
}

function random_jitter() {
  if (Math.round(Math.random() * 1) == 0)
    var seed = -5;
  else
    var seed = 5; 
  return Math.floor((Math.random() * seed) + 1);
}

function boxQuartiles(d) {
    return [
        d3.quantile(d, .25),
        d3.quantile(d, .5),
        d3.quantile(d, .75)
    ];
}

})();