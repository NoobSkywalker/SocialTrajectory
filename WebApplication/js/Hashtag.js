/**
* Class that represents the hashtag
*  
*/

function Hashtag(hashtagname,id,size,arrayposition) {

    this.name= hashtagname;
    this.hashid=id;
    this.clusters = new Array();
    this.noise = new Array();
    this.tweets = new Array();
    this.size = size;
    this.arrayposition = arrayposition;
    this.billboards = null;
    this.primitives = null;
    this.clusterblocks = null;
    this.lines = null;
    this.maptweets = null;
    this.calculationReady=false;
    this.biggestCluster=0;
    this.topicSimpson = 0;
    this.sentvariance =0;
    this.displacementthresh= 100;
    this.sentimentturns=0;
    this.sentimentturnratio=0;
    this.sentturnthresh=0.5;
    this.speedvariance=0;
    this.distancevariance=0;
    this.convexHull = null;
    this.turnpoints =0;
    this.turnpointratio =0;
    this.areavariance =0;
    //Sentiment
    this.negativePortion = 0;
    this.positivePortion = 0;
    this.neutralPortion = 0;
    this.negativeAmount = 0;
    this.positiveAmount= 0;
    this.neutralAmount = 0;
    this.tweetsinclusters=0;
    this.certaintyRatio=0;
    this.direction=0;
     this.credibilityvariance =0;
     this.displacementtourratio = 0;
    this.labels = [];
    //Temporal
    this.timeVariance =0;
    this.AvgTimeDiff = 0;
    this.MaxTimeDiff = 0;
    this.MinTimeDiff = 0;
    this.clusterTimeVariance=0;

    this.avgSpeed = 0;
    this.minSpeed = 0;
    this.maxSpeed = 0;

    //Friends
    this.avgFriendscount = 0;
    this.maxFriendscount=0;
    this.minFriendscount=0;

    //Retweets
    this.avgRetweet = null;
    this.minRetweet = null;
    this.maxRetweet = null;

    //Statuscount
    this.avgStatuscount = null;
    this.minStatuscount = null;
    this.maxStatuscount = null;


    //Followers
    this.avgFollowers = null;
    this.minFollowers = null;
    this.maxFollowers = null;

    this.avgcred =null;
    this.anglesum =null;
    this.clusterdistance = 0;
    this.totaldistance =0;
    this.displacement = null;


    /**
* Calculates all angles and directions between the clusters
*  
*/
    
    this.calculateAngles = function() {
        var danglesum =0;
        var lastangle=0;
         
        for( var k=0;k<this.clusters.length-1;k++)
        {
            var la1 = this.clusters[k].centroidlat;
            var lo1 =  this.clusters[k].centroidlong;
            var la2 =  this.clusters[k+1].centroidlat;
            var lo2 = this.clusters[k+1].centroidlong;
            
            var currentangle= this.angleFromCoordinate (la1,lo1,la2,lo2 );
            if(currentangle-lastangle>=90)
            {
                this.turnpoints++;
            }
                lastangle= currentangle;
        


            danglesum +=currentangle;
        }

        this.turnpointratio = (this.turnpoints/this.clusters.length)*100
        var dla1 =  this.clusters[0].centroidlat;
        var dlo1 =  this.clusters[0].centroidlong;
        var dla2 =  this.clusters[this.clusters.length-1].centroidlat;
        var dlo2 =  this.clusters[this.clusters.length-1].centroidlong;



        this.anglesum = danglesum/this.clusters.length-1;
        this.direction =  this.angleFromCoordinate (dla1,dlo1,dla2,dlo2 );
    }

  /**
* Calculates certainty ratio for the clusters
*  
*/
    this.countCertainty = function()
    {
        var uncertainty = 0;
        for (var k=0; k<this.clusters.length ; k++)
        {
            
                uncertainty+=this.clusters[k].certaintyRatio;
            
        }


        this.certaintyRatio = uncertainty/this.clusters.length;
        


    }

  /**
* Calculates the average credibility
*  
*/
    this.countCredibility = function()
    {
        var cred = 0;
        for (var k=0; k<this.clusters.length ; k++)
        {

            cred+=this.clusters[k].avgcred;

        }


        this.avgcred = cred/this.clusters.length;


    }


 /**
* Calculates time difference variables
*  
*/
    this.calculateAvgTimeDiff = function() {
        var difference = 0;
        var min=1000000000;
        var max=0;
        for( var k=0;k<this.clusters.length;k++)
        {

            difference+= this.clusters[k].AvgTimeDiff;
            if(this.clusters[k].AvgTimeDiff >max)
            {
                max = this.clusters[k].AvgTimeDiff;
            }
            if(this.clusters[k].AvgTimeDiff <min)
            {
                min = this.clusters[k].AvgTimeDiff;
            }

        }
        this.AvgTimeDiff = difference/this.clusters.length;
        this.MaxTimeDiff=max;
        this.MinTimeDiff=min;
    }

 /**
* Calculates statistical values for friends in the hashtag
*  
*/
    this.calculateFriends = function() {
        var friends =0;
        var min=1000000000;
        var max=0;
        for( var k=0;k<this.clusters.length;k++)
        {

            friends+= this.clusters[k].avgFriendscount;
            if(this.clusters[k].maxFriendscount >max)
            {
                max = this.clusters[k].maxFriendscount;
            }
            if(this.clusters[k].minFriendscount <min)
            {
                min = this.clusters[k].minFriendscount;
            }

        }
        this.avgFriendscount = friends/this.clusters.length;
        this.maxFriendscount=max;
        this.minFriendscount=min;
    }
 /**
* Calculates statistical values for retweet in the hashtag
*  
*/
    this.calculateRetweets = function() {
        var retweets =0;
        var min=1000000000;
        var max=0;
        for( var k=0;k<this.clusters.length;k++)
        {

            retweets+= this.clusters[k].avgRetweet;
            if(this.clusters[k].maxRetweet >max)
            {
                max = this.clusters[k].maxRetweet;
            }
            if(this.clusters[k].minRetweet <min)
            {
                min = this.clusters[k].minRetweet;
            }

        }
        this.avgRetweet = retweets/this.clusters.length;
        this.maxRetweet=max;
        this.minRetweet=min;
    }
 /**
* Calculates statistical values for statuscount in the hashtag
*  
*/
    this.calculateStatuscount = function() {
        var statuscount =0;
        var min=1000000000;
        var max=0;
        for( var k=0;k<this.clusters.length;k++)
        {

            statuscount+= this.clusters[k].avgStatuscount;
            if(this.clusters[k].maxStatuscount >max)
            {
                max = this.clusters[k].maxStatuscount;
            }
            if(this.clusters[k].minStatuscount <min)
            {
                min = this.clusters[k].minStatuscount;
            }

        }
        this.avgStatuscount = statuscount/this.clusters.length;
        this.maxStatuscount=max;
        this.minStatuscount=min;
    }

 /**
* Calculates statistical values for followers in the hashtag
*  
*/
    this.calculateFollowers = function() {
        var followers =0;
        var min=1000000000;
        var max=0;
        for( var k=0;k<this.clusters.length;k++)
        {

            followers+= this.clusters[k].avgFollowers;
            if(this.clusters[k].maxFollowers >max)
            {
                max = this.clusters[k].maxFollowers;
            }
            if(this.clusters[k].minFollowers <min)
            {
                min = this.clusters[k].minFollowers;
            }

        }
        this.avgFollowers = followers/this.clusters.length;
        this.maxFollowers=max;
        this.minFollowers=min;
    }




 /**
* Calculates statistical values for sentiment in the hashtag
*  
*/
    this.calculateSentiment = function() {

        var neg=0;
        var pos=0;
        var neut=0;
        var size=0;
        var biggestclust=0;
        this.negativeAmount=0;
        this.positiveAmount=0;
        this.neutralAmount=0;

        for( var k=0;k<this.clusters.length;k++)
        {
            this.negativeAmount+=this.clusters[k].negativeAmount;
            this.positiveAmount+=this.clusters[k].positiveAmount;
            this.neutralAmount+=this.clusters[k].neutralAmount;
            size+=this.clusters[k].tweetsincluster.length;

            if(this.clusters[k].tweetsincluster.length>biggestclust)
            {
                biggestclust = this.clusters[k].tweetsincluster.length;
            }

        }
        this.biggestCluster= biggestclust;
        this.tweetsinclusters=size;
        this.negativePortion = ( this.negativeAmount /size)*100;
        this.positivePortion = (  this.positiveAmount / size)*100;
        this.neutralPortion = ( this.neutralAmount / size)*100;


    }

 /**
* Calculates statistical distance based values  in the hashtag
*  
*/
    this.calculateDistance = function() {
        var cdist =0;

        var minSpeed = 15000000000;
        var maxSpeed = 0;
        var avgs = 0;
        var speedvariancesum = 0;
        var   credvarsum=0;
        
        var arearadiussum=0;


        this.clusters.sort(function(a, b){return a.timenode-b.timenode});

        for( var k=0;k<this.clusters.length-1;k++)
        {
            var la1 = this.clusters[k].centroidlat;
            var lo1 =  this.clusters[k].centroidlong;
            var la2 =  this.clusters[k+1].centroidlat;
            var lo2 = this.clusters[k+1].centroidlong;

            console.log( la1+" "+ lo1 + " " + la2 + " " + lo2);

            var currdist = this.distanceinKMll2 (la1,lo1,la2,lo2 );
            cdist += currdist;


            var currentspeed=0;
            var timediff = (new Date(this.clusters[k+1].timenode) - new Date(  this.clusters[k].timenode))/1000;
            if(timediff===0 || currdist ===0)
            {

            }
            else
            {
                currentspeed =  (currdist/timediff);
            }

            if(currentspeed < minSpeed)
            {
                this.minSpeed=currentspeed;
                minSpeed=currentspeed;
            }


            if(currentspeed > maxSpeed)
            {
                this.maxSpeed=currentspeed;
                maxSpeed=currentspeed;
            }
            
            avgs+=currentspeed;


        }

        this.minSpeed = this.minSpeed.toPrecision(4);
        this.maxSpeed = this.maxSpeed.toPrecision(4);
        this.totaldistance = cdist.toPrecision(4);
       
        this.clusterdistance = (cdist/(this.clusters.length)).toPrecision(4);
        this.avgSpeed = (avgs/(this.clusters.length)).toPrecision(4);
        var dlat1=  this.clusters[0].centroidlat;


        var dlat2= this.clusters[this.clusters.length-1].centroidlat;

        var dlong1=  this.clusters[0].centroidlong;
        var dlong2=this.clusters[this.clusters.length-1].centroidlong;


        this.displacement = this.distanceinKMll2 (dlat1,dlong1,dlat2,dlong2 );
        var distvarsum=0;
        
         this.displacementtourratio = (this.displacement/ this.totaldistance)*100;
       // if(this.displacement<tresh)
        

        for( var o=0;o<this.clusters.length-1;o++)
        {
            var la1 = this.clusters[o].centroidlat;
            var lo1 =  this.clusters[o].centroidlong;
            var la2 =  this.clusters[o+1].centroidlat;
            var lo2 = this.clusters[o+1].centroidlong;

            var currrentdist = this.distanceinKMll2 (la1,lo1,la2,lo2 );
            var timediff = (new Date(this.clusters[o+1].timenode) - new Date(  this.clusters[o].timenode))/1000;
            var currentspeed =  (currrentdist/timediff);
            speedvariancesum+=(currrentdist-this.clusterdistance)*(currrentdist-this.clusterdistance);
            distvarsum+=(currentspeed-this.avgSpeed)*(currentspeed-this.avgSpeed);
           


        }

        this.distancevariance = (1/(this.clusters.length))*distvarsum;

        this.speedvariance =(1/(this.clusters.length))*speedvariancesum;




    }

 /**
* Calculates statistical values for time and content based attributes in the hashtag
*  
*/

    this.calcTimeVariance = function() {
        var variancesum =0;
        var avgtopicdiv=0;
        var avgt=0;
         var avgcred=0;
        var avgsentiment=0;
        var sentsum=0;
        var credsum=0;
        var arearadiussum=0;
        var clusterTimeVariancesum=0;
        var avgradius=0;
        for( var g=0;g<this.clusters.length;g++)
        {

            avgtopicdiv+=this.clusters[g].topicSimpson;
            avgt+=(this.clusters[g].avgtime);
            avgsentiment+=(this.clusters[g].avgsent);
            avgcred+= this.clusters[g].avgcred;
            avgradius+=this.clusters[g].coveredAreaRadiusinKM;
        }
        avgsentiment = avgsentiment/this.clusters.length;
        avgt = avgt/this.clusters.length;
        avgcred = avgcred/this.clusters.length;
        avgradius =avgradius/this.clusters.length;
        console.log("avgsentiment "+ avgsentiment);
        this.topicSimpson = avgtopicdiv/this.clusters.length;

        for( var k=0;k<this.clusters.length;k++)
        {
            console.log("######### CALCULATING Variance:");
            sentsum+=(this.clusters[k].avgsent-avgsentiment)*(this.clusters[k].avgsent-avgsentiment);
            variancesum+=(((new Date(this.clusters[k].avgtime)- new Date(avgt))*((new Date(this.clusters[k].avgtime)- new Date(avgt)))))/1000/60/60;
            clusterTimeVariancesum += this.clusters[k].timeVariance;
            credsum+=(this.clusters[k].avgcred-avgcred)*(this.clusters[k].avgcred-avgcred);
            arearadiussum+=(this.clusters[k].coveredAreaRadiusinKM-avgradius)*(this.clusters[k].coveredAreaRadiusinKM-avgradius);
        }

        this.timeVariance = (1/(this.clusters.length))*(variancesum/1000/60/60);
        this.clusterTimeVariance = (1/(this.clusters.length))*(clusterTimeVariancesum);
        this.sentvariance= (1/(this.clusters.length))*sentsum;
        this.credibilityvariance = (1/(this.clusters.length))*credsum;
         this.areavariance = (1/(this.clusters.length))*arearadiussum;
        
        console.log( this.sentvariance);


        if(this.clusters.length>1)
        {
            for( var l=0;l<this.clusters.length-1;l++)
            {
                console.log("######### CALCULATING SentimentTurns:");

                var firstclust= this.clusters[l];
                var secondclust= this.clusters[l+1];
                var sentdiff=firstclust.avgsent-secondclust.avgsent;
                if(Math.abs(sentdiff)>this.sentturnthresh)
                {
                    this.sentimentturns++;
                }

                console.log(firstclust.avgsent + " " +secondclust.avgsent);
            }
            this.sentimentturnratio=  (this.sentimentturns/this.clusters.length)*100;

        }

    }






     /**
* returns angle between two coordinates
*  
*/

    this.angleFromCoordinate = function(lat1, long1,  lat2, long2) {

          var a1 =this.toRad(lat1), a2 = this.toRad(lat2);
    var a3 = this.toRad((long2-long1));

    // see http://mathforum.org/library/drmath/view/55417.html
    var y = Math.sin(a3) * Math.cos(a2);
    var x = Math.cos(a1)*Math.sin(a2) -
            Math.sin(a1)*Math.cos(a2)*Math.cos(a3);
    var f = Math.atan2(y, x);

    return (this.toDegree(f)+360) % 360;
     
    }


    this.distanceinKMll2 = function (lat1,long1,lat2,long2 )
    {

        var tm1lat = this.toRad(lat1);
        var tm1long = this.toRad(long1);
        var tm2lat = this.toRad(lat2);
        var tm2long = this.toRad(long2);
        var radiusOfEarth = 6371000;// Earth's radius in meters.
        var diffLatitude =  tm2lat -tm1lat;
        var diffLongitude = tm2long -  tm1long;
        var a = Math.sin(diffLatitude / 2) * Math.sin(diffLatitude / 2) +
            Math.cos(tm1lat) * Math.cos(tm2lat) *  Math.sin(diffLongitude / 2) * Math.sin(diffLongitude / 2);
        var dc = 2 * Math.asin(Math.sqrt(a));
        var distance = radiusOfEarth * dc;
        return distance/1000;

    }

    this.toRad = function(tor) {
        return tor * Math.PI / 180;
    }



    this.toDegree = function(val)
    {
        return val * (180/Math.PI)
    }

 /**
* recalculates all attributes 
*  
*/
    this.recalculateValues = function()
    {
        
        console.log("######### RECALCULATING TRAJECTORY VALUES");
        this.convexHull = new ConvexHullGrahamScan();
        for (var b=0; b< this.clusters.length;b++)
        {

            this.clusters[b].calculateTimeBoxplot();
            this.clusters[b].calculateCentroid();
            this.clusters[b].calculateSentiment();
            this.clusters[b].calculateAvgTimeDiff();
            this.clusters[b].calculateCredibilityBoxplot();
            this.clusters[b].calculateFriendscountBoxplot();
            this.clusters[b].calculateRetweetBoxplot();
            this.clusters[b].calculateStatuscountBoxplot();
            this.clusters[b].calculateFollowersBoxplot();
            this.clusters[b].countCertainty();
            this.clusters[b].countCategory();
            this.clusters[b].calculateTopicSimpson();
            this.convexHull.addPoint(this.clusters[b].centroidlong,this.clusters[b].centroidlat);


        }  
        this.calculateDistance();
        this.calculateAngles();
        this.calculateSentiment();
        this.calculateAvgTimeDiff();
        this.countCredibility();
        this.calculateFriends();
        this.calculateRetweets();
        this.calculateStatuscount();
        this.calculateFollowers();
        this.calcTimeVariance();



    }
     /**
* returns compass direction helperfunction
*  
*/
    this.getCompassDirection = function(bearing) {
     var tmp = Math.round(bearing / 22.5);
        var direction = null;
     switch(tmp) {
          case 1:
               direction = "NNE";
               break;
          case 2:
               direction = "NE";
               break;
          case 3:
               direction = "ENE";
               break;
          case 4:
               direction = "E";
               break;
          case 5:
               direction = "ESE";
               break;
          case 6:
               direction = "SE";
               break;
          case 7:
               direction = "SSE";
               break;
          case 8:
               direction = "S";
               break;
          case 9:
               direction = "SSW";
               break;
          case 10:
               direction = "SW";
               break;
          case 11:
               direction = "WSW";
               break;
          case 12:
               direction = "W";
               break;
          case 13:
               direction = "WNW";
               break;
          case 14:
               direction = "NW";
               break;
          case 15:
               direction = "NNW";
               break;
          default:
               direction = "N";
     }
     return direction;
    }






}


