function Cluster(tweets, size, clat,clong , hashtag, size, avgTime, id) {
	this.size = size;
    this.centroidlat = clat;
    this.centroidlong = clong;
    this.hashtag = hashtag;
    this.tweetsincluster = tweets;
     this.topics = new Object ();
    this.wordmap = new Object ();
     this.sortedwords=  new MinHeap();
    this.sortedtopics=  new MinHeap();
    this.cid = id;
    this.avgRetweets =0;
     this.avgFollowers =0;
    this.avgFriendscount =0;
    this.calculateCentroid();
    this.tweets = [];
   this.stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|a|a|lo|en|ik|ta|hq|es|si|de|dr|di|dont|yo|xd|le|uu|xq|fa|zu|ca|til|ir|ji|ut|'s|able|about|above|according|accordingly|across|actually|after|afterwards|again|against|ain't|all|allow|allows|almost|alone|along|already|also|although|always|am|among|amongst|an|and|another|any|anybody|anyhow|anyone|anything|anyway|anyways|anywhere|apart|appear|appreciate|appropriate|are|aren't|around|as|aside|ask|asking|associated|at|available|away|awfully|b|be|became|because|become|becomes|becoming|been|before|beforehand|behind|being|believe|below|beside|besides|best|better|between|beyond|both|brief|but|by|c|c'mon|c's|came|can|can't|cannot|cant|cause|causes|certain|certainly|changes|clearly|co|com|come|comes|concerning|consequently|consider|considering|contain|containing|contains|corresponding|could|couldn't|course|currently|d|definitely|described|despite|did|didn't|different|do|does|doesn't|doing|don't|done|down|downwards|during|e|each|edu|eg|eight|either|else|elsewhere|enough|entirely|especially|et|etc|even|ever|every|everybody|everyone|everything|everywhere|ex|exactly|example|except|f|far|few|fifth|first|five|followed|following|follows|for|former|formerly|forth|four|from|further|furthermore|g|get|gets|getting|given|gives|go|goes|going|gone|got|gotten|greetings|h|had|hadn't|happens|hardly|has|hasn't|have|haven't|having|he|he's|hello|help|hence|her|here|here's|hereafter|hereby|herein|hereupon|hers|herself|hi|him|himself|his|hither|hopefully|how|howbeit|however|i|i'd|i'll|i'm|i've|ie|if|ignored|immediate|in|inasmuch|inc|indeed|indicate|indicated|indicates|inner|insofar|instead|into|inward|is|isn't|it|it'd|it'll|it's|its|itself|j|just|k|keep|keeps|kept|know|knows|known|l|last|lately|later|latter|latterly|least|less|lest|let|let's|like|liked|likely|little|look|looking|looks|ltd|m|mainly|many|may|maybe|me|mean|meanwhile|merely|might|more|moreover|most|mostly|much|must|my|myself|n|name|namely|nd|near|nearly|necessary|need|needs|neither|never|nevertheless|new|next|nine|no|nobody|non|none|noone|nor|normally|not|nothing|novel|now|nowhere|o|obviously|of|off|often|oh|ok|okay|old|on|once|one|ones|only|onto|or|other|others|otherwise|ought|our|ours|ourselves|out|outside|over|overall|own|p|particular|particularly|per|perhaps|placed|please|plus|possible|presumably|probably|provides|q|que|quite|qv|r|rather|rd|re|really|reasonably|regarding|regardless|regards|relatively|respectively|right|s|said|same|saw|say|saying|says|second|secondly|see|seeing|seem|seemed|seeming|seems|seen|self|selves|sensible|sent|serious|seriously|seven|several|shall|she||shouldshouldn't|since|six|so|some|somebody|somehow|someone|something|sometime|sometimes|somewhat|somewhere|soon|sorry|specified|specify|specifying|still|sub|such|sup|sure|t|t's|take|taken|tell|tends|th|than|thank|thanks|thanx|that|that's|thats|the|their|theirs|them|themselves|then|thence|there|there's|thereafter|thereby|therefore|therein|theres|thereupon|these|they|they'd|they'll|they're|they've|think|third|this|thorough|thoroughly|those|though|three|through|throughout|thru|thus|to|together|too|took|toward|towards|tried|tries|truly|try|trying|twice|two|u|un|under|unfortunately|unless|unlikely|until|unto|up|upon|us|use|used|useful|uses|using|usually|uucp|v|value|various|very|via|viz|vs|w|want|wants|was|wasn't|way|we|we'd|we'll|we're|we've|welcome|well|went|were|weren't|what|what'swhateverwhen|whence|whenever|where|where's|whereafter|whereas|whereby|wherein|whereupon|wherever|whether|which|while|whither|who|who's|whoever|whole|whom|whose|why|will|willing|wish|with|within|without|won't|p|lk|@|ya|ko|fr|jq|el|tv|ha|ne|w|mau|va|tpi|bc|ki|00|ra|ii|yi|se|tj|ci|wonder|would|wouldn't|x|y|yes|yet|you|you'd|you'll|you're|you've|your|yours|yourself|yourselves|z|zero)$/,
	this.punctuation = /[!"&()*+#,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
	this.wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
	this.discard = /^(@|https?:)/,
       this.re = /^[a-z0-9 ]$/i,
	this.htmlTags = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
	this.matchTwitter = /^https?:\/\/([^\.]*\.)?twitter\.com/;

	
	this.averageTime = Date.fromISO(avgTime);
	var averageSentiment = 0;
	/*for (var s=0; s< tweets.length; s++)
	{
		averageTime+= tweets[s].creationDate.valueOf();
		averageSentiment = parseFloat(averageSentiment)+ parseFloat(tweets[s].sentiment.valueOf());
	}

	this.averageTime = averageTime/tweets.length
	this.averageSentiment = averageSentiment/tweets.length;	*/
	
	
	
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
    
    this.getJulian = function() {
    return Math.floor((this.averageTime.getTime() / 86400000)  + 2440587.5);
}
    
    
    this.countWords = function()
    {
         var allContent = "";
        var keywords = [];
        for (var k=0; k<this.tweets.length ; k++)
        {
          var Content = this.tweets[k].tweetContent;
        
       
        		keywords= Content.split(this.wordSeparators);
            var currentsent = this.tweets[k].sentiment;
			 
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
    
    
     this.countCategory = function()
    {
        
        for (var k=0; k<this.tweets.length ; k++)
        {
          var t = this.tweets[k].category;
             console.log(this.tweets[k].retweetcount);
          this.avgRetweets += this.tweets[k].retweetcount;
            this.avgFollowers +=this.tweets[k].userFollowers;
            this.avgFriendscount +=this.tweets[k].userFriendscount;
        this.averageSentiment = parseFloat(this.averageSentiment)+ parseFloat(this.tweets[k].sentiment.valueOf());
            var temptopic = new topic(t);

				if (!this.topics.hasOwnProperty(t)) {
                  
					this.topics[t] = temptopic;
				}
				this.topics[t].increaseamount();
	
				
			
        
        }
         this.avgRetweets = (this.avgRetweets/this.tweets.length);
           this.avgFollowers =(this.avgFollowers/this.tweets.length);
         this.avgFriendscount =(this.avgFriendscount/this.tweets.length);
         this.averageSentiment = this.averageSentiment/this.tweets.length;
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
    
    
    
    function calculateCentroid()
	{
		var sum_x=0;
		var sum_y=0;
		var sum_z=0;
		
		for ( var tc in this.tweetsincluster)
		{
		
			    
					var lat = Math.toRadians(tc.latitude);
			       var lon = Math.toRadians(tc.longitude);
			        
			        sum_x = sum_x + Math.cos(lat) * Math.cos(lon);
			        sum_y = sum_y + Math.cos(lat) * Math.sin(lon);
			        sum_z = sum_z + Math.sin(lat);
		} 
				var avg_x = sum_x / this.tc.length;
				var avg_y = sum_y / this.tc.length;
			    var avg_z = sum_z / this.tc.length;
			   var center_lon = Math.atan2(avg_y,avg_x);
			   var hyp = Math.sqrt(avg_x*avg_x + avg_y*avg_y) ;
			    var center_lat = Math.atan2(avg_z, hyp);
		
			    this.centroidlat = Math.toDegrees(center_lat);
			    this.centroidlong =Math.toDegrees(center_lon);
			    this.size = this.tweetsincluster.length;
		
		
	}
         
   
  

   
    
	
	
	
	
}