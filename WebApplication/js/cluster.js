/**
* Class that represents the episodic clusters
*  
*/


function Cluster(tweets, id) {

    this.centroidlat = 0;
    this.centroidlong = 0;

    this.tweetsincluster = tweets;
    this.topics = new Object ();
    this.wordmap = new Object ();
    this.sortedwords=  new MinHeap();
    this.sortedtopics=  new MinHeap();
    this.avgsent=0;
    this.timenode=null;
    this.initizalizing= true;
    this.convexHull=null;
    this.coveredAreaRadiusinKM=0;
    this.unCertainTweets = [];
    this.cid = id;
    this.avgRetweets =0;
    this.avgFollowers =0;
    this.avgFriendscount =0;
    
    this.AvgTimeDiff = 0;
     this.MaxTimeDiff = 0;
      this.MinTimeDiff = 0;

    
    this.certaintyRatio=0;
    this.topicsims=0;
    
    this.topicSimpson=0;
    this.timeVariance=0;
    
    
    //Time 
    this.maxtime =null;
    this.q3time =null;
    this.mediantime =null;
    this.avgtime =null;
    this.q1time =null;
    this.mintime =null;
    this.size = tweets.length;
    this.averageTimeDate =null;
    
    
    //Credibility
    this.maxcred =null;
    this.q3cred =null;
    this.mediancred =null;
    this.avgcred =null;
    this.q1cred =null;
    this.mincred =null;
    
    
    //Friends 
    this.maxFriendscount =  null;
        this.q3Friendscount = null;
        this.medianFriendscount = null;
        this.avgFriendscount = null;
        this.q1Friendscount = null;
        this.minFriendscount = null;
    
    //Retweets
     this.maxRetweet =  null;
        this.q3Retweet = null;
        this.medianRetweet = null;
        this.avgRetweet = null;
        this.q1Retweet = null;
        this.minRetweet = null;
    
    
     //Followers
     this.maxFollowers =  null;
        this.q3Followers= null;
        this.medianFollowers =null;
        this.avgFollowers = null;
        this.q1Followers = null;
        this.minFollowers = null;
    
    
     //Statuscount
     this.maxStatuscount =  null;
        this.q3Statuscount= null;
        this.medianStatuscount =null;
        this.avgStatuscount = null;
        this.q1Statuscount = null;
        this.minStatuscount = null;

    
    
    
    this.positivePortion = 0;
            this.neutralPortion = 0;
            this.negativePortion = 0;
    
     this.positiveAmount = 0;
            this.neutralAmount = 0;
            this.negativeAmount = 0;



    this.stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|a|a|lo|en|ik|ta|hq|es|si|de|dr|di|dont|yo|xd|le|uu|xq|fa|zu|ca|til|ir|ji|ut|'s|able|about|above|according|accordingly|across|actually|after|afterwards|again|against|ain't|all|allow|allows|almost|alone|along|already|also|although|always|am|among|amongst|an|and|another|any|anybody|anyhow|anyone|anything|anyway|anyways|anywhere|apart|appear|appreciate|appropriate|are|aren't|around|as|aside|ask|asking|associated|at|available|away|awfully|b|be|became|because|become|becomes|becoming|been|before|beforehand|behind|being|believe|below|beside|besides|best|better|between|beyond|both|brief|but|by|c|c'mon|c's|came|can|can't|cannot|cant|cause|causes|certain|certainly|changes|clearly|co|com|come|comes|concerning|consequently|consider|considering|contain|containing|contains|corresponding|could|couldn't|course|currently|d|definitely|described|despite|did|didn't|different|do|does|doesn't|doing|don't|done|down|downwards|during|e|each|edu|eg|eight|either|else|elsewhere|enough|entirely|especially|et|etc|even|ever|every|everybody|everyone|everything|everywhere|ex|exactly|example|except|f|far|few|fifth|first|five|followed|following|follows|for|former|formerly|forth|four|from|further|furthermore|g|get|gets|getting|given|gives|go|goes|going|gone|got|gotten|greetings|h|had|hadn't|happens|hardly|has|hasn't|have|haven't|having|he|he's|hello|help|hence|her|here|here's|hereafter|hereby|herein|hereupon|hers|herself|hi|him|himself|his|hither|hopefully|how|howbeit|however|i|i'd|i'll|i'm|i've|ie|if|ignored|immediate|in|inasmuch|inc|indeed|indicate|indicated|indicates|inner|insofar|instead|into|inward|is|isn't|it|it'd|it'll|it's|its|itself|j|just|k|keep|keeps|kept|know|knows|known|l|last|lately|later|latter|latterly|least|less|lest|let|let's|like|liked|likely|little|look|looking|looks|ltd|m|mainly|many|may|maybe|me|mean|meanwhile|merely|might|more|moreover|most|mostly|much|must|my|myself|n|name|namely|nd|near|nearly|necessary|need|needs|neither|never|nevertheless|new|next|nine|no|nobody|non|none|noone|nor|normally|not|nothing|novel|now|nowhere|o|obviously|of|off|often|oh|ok|okay|old|on|once|one|ones|only|onto|or|other|others|otherwise|ought|our|ours|ourselves|out|outside|over|overall|own|p|particular|particularly|per|perhaps|placed|please|plus|possible|presumably|probably|provides|q|que|quite|qv|r|rather|rd|re|really|reasonably|regarding|regardless|regards|relatively|respectively|right|s|said|same|saw|say|saying|says|second|secondly|see|seeing|seem|seemed|seeming|seems|seen|self|selves|sensible|sent|serious|seriously|seven|several|shall|she||shouldshouldn't|since|six|so|some|somebody|somehow|someone|something|sometime|sometimes|somewhat|somewhere|soon|sorry|specified|specify|specifying|still|sub|such|sup|sure|t|t's|take|taken|tell|tends|th|than|thank|thanks|thanx|that|that's|thats|the|their|theirs|them|themselves|then|thence|there|there's|thereafter|thereby|therefore|therein|theres|thereupon|these|they|they'd|they'll|they're|they've|think|third|this|thorough|thoroughly|those|though|three|through|throughout|thru|thus|to|together|too|took|toward|towards|tried|tries|truly|try|trying|twice|two|u|un|under|unfortunately|unless|unlikely|until|unto|up|upon|us|use|used|useful|uses|using|usually|uucp|v|value|various|very|via|viz|vs|w|want|wants|was|wasn't|way|we|we'd|we'll|we're|we've|welcome|well|went|were|weren't|what|what'swhateverwhen|whence|whenever|where|where's|whereafter|whereas|whereby|wherein|whereupon|wherever|whether|which|while|whither|who|who's|whoever|whole|whom|whose|why|will|willing|wish|with|within|without|won't|p|lk|@|ya|ko|fr|jq|el|tv|ha|ne|w|mau|va|tpi|bc|ki|00|ra|ii|yi|se|tj|ci|wonder|would|wouldn't|x|y|yes|yet|you|you'd|you'll|you're|you've|your|yours|yourself|yourselves|z|zero)$/,
        
       
        this.punctuation = /[!"&()*+#,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
        this.wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
        this.discard = /^(@|https?:)/,
        this.re = /^[a-z0-9 ]$/i,
        this.htmlTags = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
        this.matchTwitter = /^https?:\/\/([^\.]*\.)?twitter\.com/;


    //this.averageTime = Date.fromISO(avgTime);


	


    Date.fromISO= function(s){
        var day, tz,
            rx=/^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
            p= rx.exec(s) || [];
        if(p[1]){
            day= p[1].split(/\D/);
            for(var i= 0, L= day.length;i<L;i++){
                day[i]= parseInt(day[i], 10) || 0;
            };
            day[1]-= 1;
            day= new Date(Date.UTC.apply(Date, day));
            if(!day.getDate()) return NaN;
            //adjust for time zone offset:
            if(p[5]){
                tz= (parseInt(p[5], 10)*60);
                if(p[6]) tz+= parseInt(p[6], 10);
                if(p[4]== '+') tz*= -1;
                if(tz) day.setUTCMinutes(day.getUTCMinutes()+ tz);
            }
            return day;
        }
        return NaN;
    }

    
    /**
* Returns the JulianTimestamp of the clusters average time
*  
*/
    
    this.getJulian = function() {
        return Math.floor((this.averageTime.getTime() / 86400000)  + 2440587.5);
    }

   /**
* Calculates the certainty for a cluster
*  
*/
    this.countCertainty = function()
    {
        var uncertainty = 0;
        var sentsum=0;
         for (var k=0; k<this.tweetsincluster.length ; k++)
        {
              sentsum+=parseInt(this.tweetsincluster[k].sentiment);
            this.tweetsincluster[k].calculateCertainty();
          if(this.tweetsincluster[k].uncertainty>0)
          {
              uncertainty+=this.tweetsincluster[k].uncertainty;
          }
            if(this.tweetsincluster[k].uncertainty<1)
            {
                this.unCertainTweets.push(this.tweetsincluster[k].tweetContent);
            }
        }
        
        this.avgsent=sentsum/this.tweetsincluster.length;
        this.certaintyRatio = uncertainty/this.tweetsincluster.length;
        console.log(this.unCertainTweets);
        
    }
    
    
    
    
     /**
* counts the words and the sentiment in a cluster
*  
*/  
    this.countWords = function()
    {
        var allContent = "";
        var keywords = [];
        for (var k=0; k<this.tweetsincluster.length ; k++)
        {
            var Content = this.tweetsincluster[k].tweetContent;


            keywords= Content.split(this.wordSeparators);
            var currentsent = this.tweetsincluster[k].sentiment;

            for ( t in keywords) {
                var i = keywords[t];

                i = i.toLowerCase();
                i = i.replace(this.punctuation, "");
                i = i.replace(/[^\w\s]/gi, '');

                var tempword = new word(i);
                if (this.stopWords.test(i.toLowerCase())) {
                    continue;
                }
                /*if(!this.re.test(i))
                {
                    continue;
                }*/

                if (i.length<3) {
                    continue;
                }
                if (this.discard.test(i)) {
                    continue;
                }
                if (!this.wordmap.hasOwnProperty(i)) {

                    this.wordmap[i] = tempword;
                }
                this.wordmap[i].increaseamount();

                if(currentsent==-1)
                {
                    this.wordmap[i].addneg();
                }
                if(currentsent==1)
                {
                    this.wordmap[i].addpos();
                }
                /*
				wordmap[i].addcred(currentcred);
				wordmap[i].appearences.push(this.tweets[currentDate);
				*/

            }

        }

    }

     /**
* counts the topics the dominant ones as well as metadataaverages
*  
*/  
    this.countCategory = function()
    {
        this.topics = new Object ();
        for (var k=0; k<this.tweetsincluster.length ; k++)
        {
            var t = this.tweetsincluster[k].category;
            
            this.avgRetweets += this.tweetsincluster[k].retweetcount;
            this.avgFollowers +=this.tweetsincluster[k].userFollowers;
            this.avgFriendscount +=this.tweetsincluster[k].userFriendscount;
            this.averageSentiment = parseFloat(this.averageSentiment)+ parseFloat(this.tweetsincluster[k].sentiment.valueOf());
            var temptopic = new topic(t);

            if (!this.topics.hasOwnProperty(t)) {

                this.topics[t] = temptopic;
                
            }
        this.topics[t].increaseamount();




        }
        this.avgRetweets = (this.avgRetweets/this.tweetsincluster.length);
        this.avgFollowers =(this.avgFollowers/this.tweetsincluster.length);
        this.avgFriendscount =(this.avgFriendscount/this.tweetsincluster.length);
        this.averageSentiment = this.averageSentiment/this.tweetsincluster.length;
        for (var key in this.topics) {

            this.sortedtopics.push(this.topics[key]);
        }

    }


    this.sortWordmap = function()
    {

        for (var key in this.wordmap) {

            this.sortedwords.push(this.wordmap[key]);
        }
    }


     /**
* calculates the centroid for this cluster
*  
*/  
    this.calculateCentroid = function ()
    {
        
        if(this.tweetsincluster.length==1)
        {
            this.centroidlat = this.tweetsincluster[0].latitude;
               this.centroidlong = this.tweetsincluster[0].longitude;
            
        }
        
        else
        {
        var sum_x=0;
        var sum_y=0;
        var sum_z=0;

            
          this.convexHull = new ConvexHullGrahamScan();
        for ( var t=0;t<this.tweetsincluster.length;t++)
        {
            

            var lat = this.toRad(this.tweetsincluster[t].latitude);
            var lon = this.toRad(this.tweetsincluster[t].longitude);
            this.convexHull.addPoint(lon,lat);

            sum_x = sum_x + Math.cos(lat) * Math.cos(lon);
            sum_y = sum_y + Math.cos(lat) * Math.sin(lon);
            sum_z = sum_z + Math.sin(lat);
        } 
        var avg_x = sum_x / this.tweetsincluster.length;
        var avg_y = sum_y / this.tweetsincluster.length;
        var avg_z = sum_z / this.tweetsincluster.length;
        var center_lon = Math.atan2(avg_y,avg_x);
        var hyp = Math.sqrt(avg_x*avg_x + avg_y*avg_y) ;
        var center_lat = Math.atan2(avg_z, hyp);

        this.centroidlat = this.toDegree(center_lat);
        this.centroidlong =this.toDegree(center_lon);
        this.size = this.tweetsincluster.length;
        }

    }
    
    
     this.calculateMaxArea = function ()
    {
        var maxdist=0;
       
        for ( var t=0;t<this.tweetsincluster.length;t++)
        {
            

            var lat = this.toRad(this.tweetsincluster[t].latitude);
            var lon = this.toRad(this.tweetsincluster[t].longitude);
             var currentdist = this.distanceinKMll2 (lat,lon,this.centroidlat,this.centroidlong );
            
            
            if(currentdist>maxdist)
            {
                maxdist= currentdist;
            }
            
            
        } 
       this.coveredAreaRadiusinKM = maxdist;
        
      
       

    }
    
         /**
* Calculates Statistical values for Credibility
*  
*/  
     
    this.calculateCredibilityBoxplot = function ()
    {


        //sortbyCredibility
        this.tweetsincluster.sort(function(a, b){return a.getCredibility()-b.getCredibility()});


        var q1pos=Math.floor(this.tweetsincluster.length*0.25);
        var q3pos=Math.floor(this.tweetsincluster.length*0.75);
        
        var medianpos=Math.floor(this.tweetsincluster.length*0.5);
        var maxpos=this.tweetsincluster.length-1;
        var minpos=0;
        var medianpos=Math.round(this.tweetsincluster.length*0.5);
        var avgcred=0;
        for ( var t=0;t<this.tweetsincluster.length;t++)
        {
            var cred = this.tweetsincluster[t].getCredibility();
           avgcred+= cred ;
      
        }  
        
        
        
        if(medianpos == 1)
        {
            medianpos =0;
        }
           if(q1pos == 1)
        {
            q1pos =0;
        }
           if(q3pos == 1)
        {
            q3pos =0;
        }
           if(maxpos == 1)
        {
            maxpos =0;
        }
           if(minpos == 1)
        {
            minpos =0;
        }
        
       
        this.maxcred =  this.tweetsincluster[maxpos].getCredibility();
        this.q3cred = this.tweetsincluster[q3pos].getCredibility();
        this.mediancred = this.tweetsincluster[medianpos].getCredibility();
        this.avgcred = avgcred/this.tweetsincluster.length;
        this.q1cred = this.tweetsincluster[q1pos].getCredibility();
        this.mincred = this.tweetsincluster[minpos].getCredibility();


    }
    
             /**
* Calculates Statistical values for Friends
*  
*/  
    this.calculateFriendscountBoxplot = function ()
    {


        //sortbyFriendscount
        this.tweetsincluster.sort(function(a, b){return a.userFriendscount-b.userFriendscount});


        var q1pos=Math.floor(this.tweetsincluster.length*0.25);
        var q3pos=Math.floor(this.tweetsincluster.length*0.75);
        
        var medianpos=Math.floor(this.tweetsincluster.length*0.5);
        var maxpos=this.tweetsincluster.length-1;
        var minpos=0;
        var medianpos=Math.round(this.tweetsincluster.length*0.5);
        if(medianpos == 1)
        {
            medianpos =0;
        }
           if(q1pos == 1)
        {
            q1pos =0;
        }
           if(q3pos == 1)
        {
            q3pos =0;
        }
           if(maxpos == 1)
        {
            maxpos =0;
        }
           if(minpos == 1)
        {
            minpos =0;
        }
        
       
        this.maxFriendscount =  this.tweetsincluster[maxpos].userFriendscount;
        this.q3Friendscount = this.tweetsincluster[q3pos].userFriendscount;
        this.medianFriendscount = this.tweetsincluster[medianpos].userFriendscount;
        this.avgFriendscount = this.tweetsincluster[q1pos].userFriendscount;
        this.q1Friendscount = this.tweetsincluster[q1pos].userFriendscount;
        this.minFriendscount = this.tweetsincluster[minpos].userFriendscount;


    }
    
             /**
* Calculates Statistical values for Retweets
*  
*/  
    this.calculateRetweetBoxplot = function ()
    {


        //sortbyFriendscount
        this.tweetsincluster.sort(function(a, b){return a.retweetcount-b.retweetcount});


        var q1pos=Math.floor(this.tweetsincluster.length*0.25);
        var q3pos=Math.floor(this.tweetsincluster.length*0.75);
        
        var medianpos=Math.floor(this.tweetsincluster.length*0.5);
        var maxpos=this.tweetsincluster.length-1;
        var minpos=0;
        var medianpos=Math.round(this.tweetsincluster.length*0.5);
        if(medianpos == 1)
        {
            medianpos =0;
        }
           if(q1pos == 1)
        {
            q1pos =0;
        }
           if(q3pos == 1)
        {
            q3pos =0;
        }
           if(maxpos == 1)
        {
            maxpos =0;
        }
           if(minpos == 1)
        {
            minpos =0;
        }
        
      
       
        this.maxRetweet =  this.tweetsincluster[maxpos].retweetcount;
        this.q3Retweet = this.tweetsincluster[q3pos].retweetcount;
        this.medianRetweet = this.tweetsincluster[medianpos].retweetcount;
        this.avgRetweet = this.tweetsincluster[q1pos].retweetcount;
        this.q1Retweet = this.tweetsincluster[q1pos].retweetcount;
        this.minRetweet = this.tweetsincluster[minpos].retweetcount;


    }
    
             /**
* Calculates Statistical values for Statuscount
*  
*/  
        this.calculateStatuscountBoxplot = function ()
    {


        //sortbyFriendscount
        this.tweetsincluster.sort(function(a, b){return a.userStatusCount-b.userStatusCount});


        var q1pos=Math.floor(this.tweetsincluster.length*0.25);
        var q3pos=Math.floor(this.tweetsincluster.length*0.75);
        
        var medianpos=Math.floor(this.tweetsincluster.length*0.5);
        var maxpos=this.tweetsincluster.length-1;
        var minpos=0;
        var medianpos=Math.round(this.tweetsincluster.length*0.5);
        if(medianpos == 1)
        {
            medianpos =0;
        }
           if(q1pos == 1)
        {
            q1pos =0;
        }
           if(q3pos == 1)
        {
            q3pos =0;
        }
           if(maxpos == 1)
        {
            maxpos =0;
        }
           if(minpos == 1)
        {
            minpos =0;
        }
        
       
        this.maxStatuscount =  this.tweetsincluster[maxpos].userStatusCount;
        this.q3Statuscount= this.tweetsincluster[q3pos].userStatusCount;
        this.medianStatuscount = this.tweetsincluster[medianpos].userStatusCount;
        this.avgStatuscount = this.tweetsincluster[q1pos].userStatusCount;
        this.q1Statuscount = this.tweetsincluster[q1pos].userStatusCount;
        this.minStatuscount = this.tweetsincluster[minpos].userStatusCount;


    }
    
             /**
* Calculates Statistical values for Followers
*  
*/  
    
        this.calculateFollowersBoxplot = function ()
    {


        //sortbyFollowers
        this.tweetsincluster.sort(function(a, b){return a.userFollowers-b.userFollowers});


        var q1pos=Math.floor(this.tweetsincluster.length*0.25);
        var q3pos=Math.floor(this.tweetsincluster.length*0.75);
        
        var medianpos=Math.floor(this.tweetsincluster.length*0.5);
        var maxpos=this.tweetsincluster.length-1;
        var minpos=0;
        var medianpos=Math.round(this.tweetsincluster.length*0.5);
        if(medianpos == 1)
        {
            medianpos =0;
        }
           if(q1pos == 1)
        {
            q1pos =0;
        }
           if(q3pos == 1)
        {
            q3pos =0;
        }
           if(maxpos == 1)
        {
            maxpos =0;
        }
           if(minpos == 1)
        {
            minpos =0;
        }
        
    
       
        this.maxFollowers =  this.tweetsincluster[maxpos].userFollowers;
        this.q3Followers= this.tweetsincluster[q3pos].userFollowers;
        this.medianFollowers = this.tweetsincluster[medianpos].userFollowers;
        this.avgFollowers = this.tweetsincluster[q1pos].userFollowers;
        this.q1Followers = this.tweetsincluster[q1pos].userFollowers;
        this.minFollowers = this.tweetsincluster[minpos].userFollowers;


    }

         /**
* Calculates Time Variances 
*  
*/  
        
    this.calculateAvgTimeDiff = function ()
    {
        
        this.tweetsincluster.sort(function(a, b){return a.creationDate-b.creationDate});
            
        var difference = 0;
        var max=0;
        var min=10000000000000;
        
        for ( var t=0;t<this.tweetsincluster.length-1;t++)
        {
            var dif = (new Date(this.tweetsincluster[t+1].creationDate)-new Date(this.tweetsincluster[t].creationDate))/1000/60;
            
           difference+= dif ;
           if(dif >max)
           {
               max = dif;
           }
            if(dif <min)
           {
               min = dif;
           }
        }  
        
        difference = difference / (this.tweetsincluster.length-1);
         console.log("Difference "+difference);
        this.AvgTimeDiff=difference;
        var timesum =0;
          for ( var u=0;u<this.tweetsincluster.length;u++)
        {
          timesum   = (new Date(this.tweetsincluster[t].creationDate)-this.avgtime);
            
        }
        this.timeVariance = (1/(this.tweetsincluster.length))*(timesum/1000/60/60);
        
         this.MaxTimeDiff=max;
         this.MinTimeDiff=min;
        console.log(timeVariance);
    }
    

    
             /**
* Calculates Statistical values for Time
*  
*/  
    
    this.calculateTimeBoxplot = function ()
    {


        //sortbyTime
        this.tweetsincluster.sort(function(a, b){return a.creationDate-b.creationDate});

       var averageTime=0;
        var q1pos=Math.floor(this.tweetsincluster.length*0.25);
        var q3pos=Math.floor(this.tweetsincluster.length*0.75);
        
        var medianpos=Math.floor(this.tweetsincluster.length*0.5);
        var maxpos=this.tweetsincluster.length-1;
        var minpos=0;
        var medianpos=Math.round(this.tweetsincluster.length*0.5);
        var averageTime=0;
        for (var s=0; s< this.tweetsincluster.length; s++)
	{
		averageTime+=  this.tweetsincluster[s].creationDate.valueOf();
		
	}

	this.avgtime = averageTime/this.tweetsincluster.length;
        
        if(this.initizalizing)
        {
      this.timenode =  this.avgtime;
        this.initizalizing=false;
        }
            
        this.averageTimeDate  = new Date(Math.round(this.avgtime)*1000);
        
        if(medianpos == 1)
        {
            medianpos =0;
        }
           if(q1pos == 1)
        {
            q1pos =0;
        }
           if(q3pos == 1)
        {
            q3pos =0;
        }
           if(maxpos == 1)
        {
            maxpos =0;
        }
           if(minpos == 1)
        {
            minpos =0;
        }
        
       
        this.maxtime =  this.tweetsincluster[maxpos].creationDate;
        this.q3time = this.tweetsincluster[q3pos].creationDate;
        this.mediantime = this.tweetsincluster[medianpos].creationDate;
        
        this.q1time = this.tweetsincluster[q1pos].creationDate;
        this.mintime = this.tweetsincluster[minpos].creationDate;


    }
    
             /**
* Calculates Statistical values for Sentiment
*  
*/  
     this.calculateSentiment = function ()
    {
            var neg = 0;
            var pos = 0;
          var neut = 0;


            for ( var t=0;t<this.tweetsincluster.length;t++)
        {

            if(this.tweetsincluster[t].sentiment==='0')
            {
                neut += 1;
            }
             else if(this.tweetsincluster[t].sentiment==='1')
            {
                pos += 1;
            }
             else if(this.tweetsincluster[t].sentiment==='-1')
            {
                neg += 1;
            }
            
           
        } 
           this.positiveAmount = pos;
            this.neutralAmount = neut;
            this.negativeAmount = neg;
            this.positivePortion = (pos/this.tweetsincluster.length)*100;
            this.neutralPortion = (neut/this.tweetsincluster.length)*100;
            this.negativePortion = (neg/this.tweetsincluster.length)*100;

    }

    this.toRad = function(val)
 {
    return val * Math.PI / 180;
  }

    
        this.toDegree = function(val)
 {
    return val * 180/Math.PI
  }


         /**
* Calculates Statistical values for Topic ( Diversity )
*  
*/  

this.calculateTopicSimpson = function ()
    {
        
       
        
            
        var simpsum = 0;
      
    
        
       for (var key in (this.topics)) {
         
           var curvar = parseInt(this.topics[key].amount)*(this.topics[key].amount-1);
           
           var teiler = ( this.tweetsincluster.length*(this.tweetsincluster.length-1))
           
 simpsum += curvar / teiler;
          
        }
    
    simpsum = 1-simpsum;
    console.log("##### Calculating Simpson-Index: "+simpsum);
    this.topicSimpson=simpsum;
}


         /**
* Calculates distance between to lat long points
*  
*/  
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



}