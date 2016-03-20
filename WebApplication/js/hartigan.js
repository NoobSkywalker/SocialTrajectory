         /**
* Hartigan clustering implementation. Replaced by DBSCAN
*  
*/  
addEventListener('message', function(e) {
 var dbscan = new DBSCAN(D=JSON.parse(e.data.data), eps=e.data.eps, MinPts=e.data.minPts);
    dbscan.run();
}, false);



function HARTIGAN (D, eps, MinPts) {
  
 postMessage({
status: D.length 
});
    this.D=D;
    this.dist = distanceinKM;     // distance function(i1, i2) given indices of two data points
    this.eps = eps;       // neighborhood radius
    this.MinPts = MinPts; // minimum number of points to form cluster
    this.assigned = [];   // cluster assignment 0-n for each point; -1 --> noise
                          // if an element is undefined we have not yet visited the point
    this.cluster = [];    // array of clusters, each an array of point indices
    // Note that we store cluster assignments redundantly in this.assigned and this.cluster
    // to quickly determine which points are in a cluster and which cluster a point is in.
    // Always update both arrays!
    this.run = dbscanRun;  // run the analysis, optionally with new eps, MinPts values

}

function dbscanRun(eps, MinPts,D) {
         postMessage({
status: "DBSCAN IS RUNNING"
});
    if (eps) this.eps = eps;
    if (MinPts) this.MinPts = MinPts;
    this.assigned = new Array(this.D.length);
    this.clusters = new Array();
    
    var dlength=this.D.length;
    for (var u=0; u < dlength; u++) {
        var P= u;
        var clusterid = findClosestCluster(P);
        
        if(clusterid ==-1)
        {
            var c1 = new Cluster();
            c1.addTweet(D[u]);
        }
         else
         {
             this.clusters.get(clusterid).addTweet(D[u]);
         }
        
        
    }
     postMessage({
status: "COMPLETE"
});
}


function Cluster(id)

{
    this.id=id;
    this.tweets = [];
    this.centroid;
    
    this.addTweet = function(t)
    {
        this.tweets.push(t);
    }
}



function findClosestCluster(P) {
var clusterid= -1;
    var minDist = Number.MAX_VALUE;
    for (var s=0;s<this.cluster.length;s++)
    {
        var distance = distanceinKM(this.D[P],this.cluster[s].centroid);
        if( distance <= this.eps)
        {
            if (distance < minDist)
            {
                minDist = distance;
                clusterid = this.cluster[s].id;
            }
        }
    }

    return clusterid;
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

	function toRad(tor) {
   return tor * Math.PI / 180;
}





