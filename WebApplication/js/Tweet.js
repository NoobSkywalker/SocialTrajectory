

function Tweet(creationD, tweetC, tweetU, tweetSN, lat, long, userStatsC, userFo, userLoc, userFriendsc, lang, pla, retweetc, replytostat, replytouser, containsU, authordesc, userlistedc, userCD, keyw, sent, tweetid, ccityname, ccitylat, ccitylong, cat) {
    var nlp = new Nlptools();
    this.timeObject = getJsTimestamp(creationD);
    var timeObjectUser = getJsTimestamp(userCD);
    this.creationDate = Date.fromISO(creationD);
    this.creationDateTS = this.creationDate.getTime();
    this.tweetContent = tweetC;
    this.tweetUser = tweetU;
    this.tweetScreenName = tweetSN;
    this.latitude = lat;
    this.longitude = long;
    this.userStatusCount = parseFloat(userStatsC);
    this.userFollowers = parseFloat(userFo);
    this.userFriendscount = parseFloat(userFriendsc);
    this.userLocation = userLoc;
    this.language = lang;
    this.place = pla;
    this.retweetcount = parseFloat(retweetc);
    this.replytostatus = replytostat;
    this.replytousername = replytouser;
    this.containsUrl = containsU;
    this.authordescription = authordesc;
    this.userlistedcount = parseFloat(userlistedc);
    this.userCreationdate = new Date(timeObjectUser.year, timeObjectUser.month, timeObjectUser.day, timeObjectUser.hour, timeObjectUser.minute, timeObjectUser.second);
    this.ccityname = ccityname;
    this.ccitylat = ccitylat;
    this.ccitylong = ccitylong;
    this.keywords = keyw;
    this.sentiment = sent;
    this.beginTimevalue=0;
    this.endTimevalue=0;
    this.tweetID=tweetid;
    this.infectionrate = 0;
    this.travelspeed = 0;
    this.transferabilityfactor = 0;
    this.contagionrate = 0;
    this.category = cat;
    this.uncertainty = 1;
    this.certainty = 0;
    this.children = new Array();
     this.punctuation = /[!"&()*+#,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g;
        this.wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g;
     this.uncertaintyWordsa = /(impossible|unthinkable|unreasonable|cannot|infeasible|unreliable)/;
     this.uncertaintyWordsb = /(unlikely|odd|uneven|diverse|unsure|implausible|improbable)/;
     this.uncertaintyWordsc = /(even chance|believe|estimate|guess|maybe|suppose|think|perhaps|eventual|assume|presume)/;
     this.uncertaintyWordsd = /(likely|possibly|high chance|expected|expect|anticipated|potential|potentially|supposably|belike|presumably|reasonable|probable|plausible|firm)/;
     this.uncertaintyWordse = /(certain|certainly|sure|safe to say|of course|confident|definitly|certainly|most likely|most probably|assured|reliable)/;
    
    this.getCredibility = function() {


        //Treshold and Ratings;
        var lengthcharactersTresh = 120;
        var lengthwordsTresh = 10;
        var statuscountTresh = 100;
        var followerscountTresh = 100;
        var friendscountTresh = 100;
        var daysTresh = 100;

        //
        var containsqmrating = 0;
        var containsemoticonrating = 0;
        var containsexrating = 0;
        var numberofUrlsrating = 0;
        var containsUserRating = 0;
        var containshashtagRating = 0;
        var containsstocksymbolRating = 0;
        var hasdescriptionRating = 0;
        var isretweetRating = 0;
    


        //MSG Features
        var lengthcharacters = this.tweetContent.replace(" ", "").length;
        var lengthwords = this.tweetContent.split(" ").length;
        var containsqm = this.tweetContent.indexOf("?") != -1;
        var containsex = this.tweetContent.indexOf("!") != -1;
        var containsemoticon = (this.tweetContent.indexOf(":-)") != -1 || this.tweetContent.indexOf(";-)") != -1 || this.tweetContent.indexOf(":-(") != -1 || this.tweetContent.indexOf(";-(") != -1);
        var numberofURLS = this.containsUrl;
        var containsusername = this.tweetContent.indexOf("@") != -1;
        var containshashtag = this.tweetContent.indexOf("#") != -1;
        var containsstocksymbol = this.tweetContent.indexOf("$") != -1;
        var isretweet = this.tweetContent.indexOf("RT") != -1;

        //USER Features

        var millisecondDifference = this.creationDate.valueOf() - this.userCreationdate.valueOf();
        var days = millisecondDifference / 1000 / 3600 / 24;
        var statuscount = this.userStatusCount;
        var followerscount = this.followers;
        var friendscount = this.friendscount;
        var hasdescription = this.containsDesc;

        var lengthrating = Math.min((((lengthcharacters / lengthcharactersTresh) * 7)), 7);
        var lengthwordsrating = Math.min((((lengthwords / lengthwordsTresh)) * 7), 7);
        var statuscountrating = Math.min((((this.userStatusCount / statuscountTresh)) * 7), 7);
        var followerscountrating = Math.min((((this.userFollowers / followerscountTresh)) * 7), 7);
        var friendscountrating = Math.min((((this.userFriendscount / friendscountTresh)) * 7), 7);
        var daysrating = Math.min((((days / daysTresh)) * 7), 7);

        if (containsqm) {
            containsqmrating = 7;
        }
        if (containsemoticon) {
            containsemoticonrating = 7;
        }
        if (containsex) {
            containsexrating = 7;
        }
        if (numberofURLS) {
            numberofUrlsrating = 7;
        }
        if (containsusername) {
            containsUserRating = 7;
        }
        if (containshashtag) {
            containshashtagRating = 7;
        }
        if (containsstocksymbol) {
            containsstocksymbolRating = 7;
        }
        if (hasdescription) {
            hasdescriptionRating = 7;
        }
        if (isretweet) {
            isretweetRating = 7
        }


        var sum = lengthrating + lengthwordsrating + statuscountrating + followerscountrating + friendscountrating + daysrating + containsqmrating + containsemoticonrating + containsexrating + numberofUrlsrating + containsUserRating + containshashtagRating + containsstocksymbolRating + hasdescriptionRating + isretweetRating;
        //writeDebug("lengthr: "+ lengthrating + "lengthwordsrating: "+ lengthwordsrating + "statuscountrating: "+ statuscountrating + "followerscountrating: "+ followerscountrating + "friendscountrating: "+ friendscountrating + "daysrating: "+ daysrating + "containsqmrating: "+ containsqmrating + "containsemoticonrating: "+ containsemoticonrating + "containsexrating: "+ containsexrating + "numberofUrlsrating: "+ numberofUrlsrating + "containsUserRating: "+ containsUserRating + "containshashtagRating: "+ containshashtagRating + "containsstocksymbolRating: "+ containsstocksymbolRating + "hasdescriptionRating: "+ hasdescriptionRating + "isretweetRating: "+ isretweetRating );
        var average = sum / (15);
        return average;
    };

    this.getEmoticon = function() {
        if (this.sentiment == 0) {
            return "neutral";
        }
        if (this.sentiment == -1) {
            return "neg";
        }
        if (this.sentiment == 1) {
            return "pos";
        }
    };

    this.getEmocolor = function() {
        if (this.sentiment == 0) {
            return "#eddc22";
        }
        if (this.sentiment == -1) {
            return "#e22323";
        }
        if (this.sentiment == 1) {
            return "#108504";
        }
    };
    this.radius = this.getCredibility();
    this.cx= 10;
    this.cy=150;
    this.color = this.getEmocolor();


    this.getJulian = function() {
        return Math.floor((this.creationDate.getTime() / 86400000)  + 2440587.5);
    }
    
    

    

    this.calculateCertainty = function() {
        var keywords = [];
       var keywordsstring="";
        keywords= this.tweetContent.split(this.wordSeparators);

        for (var k=0; k<keywords.length ; k++)
        {
            var tempword = keywords[k];
           
           tempword = tempword.toLowerCase();
            tempword = tempword.replace(nlp.punctuation, "");
            tempword = tempword.replace(/[^\w\s]/gi, '');
             keywordsstring+= " "+tempword
       }
        
            if (this.uncertaintyWordsa.test(keywordsstring.toLowerCase())) {
                this.uncertainty =0;
            }
            
            else if (this.uncertaintyWordsb.test(keywordsstring.toLowerCase())) {
                this.uncertainty =0.25;
            }
            
           else  if (this.uncertaintyWordsc.test(keywordsstring.toLowerCase())) {
                this.uncertainty =0.5;
            }
            
          else   if (this.uncertaintyWordsd.test(keywordsstring.toLowerCase())) {
                this.uncertainty =0.75;
            }
            
          else   if (this.uncertaintyWordse.test(keywordsstring.toLowerCase())) {
                this.uncertainty =1;
            }
          

       


    }
    
this.calculateCertainty();


}

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
