
/**
*DBSCAN worker calculating clusterers. via message the clusters are send to the gui after calculating all
*  
*/  


addEventListener('message', function(e) {
  
   var dbscan = new DBSCAN(D=JSON.parse(e.data.data), eps=e.data.eps, MinPts=e.data.minPts, tf=e.data.timeframe);
    

 
    dbscan.run();
}, false);



function DBSCAN (D, eps, MinPts,tf) {
  
 postMessage({
status: D.length 
});
    this.D=D;
    this.dist = distanceinKM;     // distance function(i1, i2) given indices of two data points
    this.eps = eps;       // neighborhood radius
    this.MinPts = MinPts; // minimum number of points to form cluster
    this.assigned = [];   // cluster assignment 0-n for each point; -1 --> noise
      this.timeframe = tf;                   //
    this.cluster = [];    // array of clusters, each an array of point indices
    this.allClusters = [];
    this.noise = [];
   
    this.run = dbscanRun;  // run the analysis, optionally with new eps, MinPts values
    this.getNeighbors = dbscanGetNeighbors;   // private
    this.expandCluster = dbscanExpandCluster; // private
}

function dbscanRun(eps, MinPts,D) {
         postMessage({
status: "DBSCAN IS RUNNING"
});
    if (eps) this.eps = eps;
    if (MinPts) this.MinPts = MinPts;
    this.assigned = new Array(this.D.length);
    this.cluster = new Array();
    var dlength=this.D.length;
    for (var u=0; u < dlength; u++) {
        var P= u;
        if (this.assigned[P] != undefined)  // already visited
        continue;
        
        this.assigned[P] = -2;
        var N = this.getNeighbors(P);
        //console.log('neighbors: ' + N);
        if (N.length + 1 < this.MinPts) {
            this.assigned[P] = -1; // noise
            this.noise.push(P);
          
        }
        else {
            var C = this.cluster.length; // next cluster index
            this.cluster[C] = [];  // new cluster
            this.allClusters[C] = new Cluster(null,null);
            //console.log('cluster ' + C);
            this.expandCluster(P, N, C);
        }
        
    }
    console.log(JSON.stringify(this.allClusters));
     postMessage({
         clusters:JSON.stringify(this.allClusters),
          noise:JSON.stringify(this.noise),
status: "COMPLETE",
         
});
    
  
    
    
}

function dbscanGetNeighbors(P) {
    var neighbors = [];
    var dlength = this.D.length;
    for (var t=0; t<dlength;t++) {
        var i=t;
        if (this.D[i] == this.D[P]) continue;
        
        if (distanceinKM(this.D[P], this.D[i]) <= this.eps && distanceTimeframeInMinutes(this.D[P], this.D[i]) <= this.timeframe)
            neighbors.push(i);
    }
    return neighbors;
}

function dbscanExpandCluster(P, N, C) {
    this.cluster[C].push(P);
 this.allClusters[C].tweets.push(P);
    this.assigned[P] = C;
  
    for (var PP = 0; PP < N.length; PP++) {  // PP is P' -- note P' is indexing N, not D
        //console.log('> ' + N[PP]);
        if (this.assigned[N[PP]] === undefined) {  // P' not yet visited?
           // console.log('> visiting');
           this.assigned[N[PP]]=-2;
            var NP = this.getNeighbors(N[PP]);  // NP is N'
           // console.log('> neighbors: ' + NP);
            if (NP.length >= this.MinPts) {
                  N = N.concat(NP.filter(function(p) { return p != P && N.indexOf(p) == -1 } ));
               // console.log('expanded neighborhood: ' + N);
            }
        }
        if (!(this.assigned[N[PP]] > -1)) {  // P' not yet assigned to a cluster?
            
            this.assigned[N[PP]] = C;
			this.cluster[C].push(N[PP]);
             this.allClusters[C].tweets.push(N[PP]);
        }
	
    }
}

function distanceinKM(tweet1, tweet2)
{
	
		var tm1lat = toRad(tweet1.latitude);
	var tm1long = toRad(tweet1.longitude);
	var tm2lat = toRad(tweet2.latitude);
	var tm2long = toRad(tweet2.longitude);
	 var radiusOfEarth = 6371000;// Earth's radius in meters.
    var diffLatitude =  tm2lat -tm1lat;
     var diffLongitude = tm2long -  tm1long;
     var a = Math.sin(diffLatitude / 2) * Math.sin(diffLatitude / 2) +
         Math.cos(tm1lat) * Math.cos(tm2lat) *  Math.sin(diffLongitude / 2) * Math.sin(diffLongitude / 2);
      var dc = 2 * Math.asin(Math.sqrt(a));
     var distance = radiusOfEarth * dc;
     return distance/1000;
	
}

function distanceTimeframeInMinutes(tweet1, tweet2)
	{
		
	
		
		var distance = tweet1.creationDateTS-tweet2.creationDateTS; 
		
	    return (distance/1000)/60;
		
	}



	function toRad(tor) {
   return tor * Math.PI / 180;
}

function Cluster(id) {
    this.id=id;
	this.tweets = [];
}





