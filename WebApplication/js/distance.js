module.exports = {
  euclidean: function(v1, v2) {
      var total = 0;
      for (var i = 0; i < v1.length; i++) {
         total += Math.pow(v2[i] - v1[i], 2);      
      }
      return Math.sqrt(total);
   },
   manhattan: function(v1, v2) {
     var total = 0;
     for (var i = 0; i < v1.length ; i++) {
        total += Math.abs(v2[i] - v1[i]);      
     }
     return total;
   },
   max: function(v1, v2) {
     var max = 0;
     for (var i = 0; i < v1.length; i++) {
        max = Math.max(max , Math.abs(v2[i] - v1[i]));      
     }
     return max;
   }
    
       inkm: function(v1, v2) {
     var tm1lat = toRad(v1.latitude);
                var tm1long = toRad(v1.longitude);
                var tm2lat = toRad(v2.latitude);
                var tm2long = toRad(v2.longitude);
                var radiusOfEarth = 6371000;// Earth's radius in meters.
                var diffLatitude =  tm2lat -tm1lat;
                var diffLongitude = tm2long -  tm1long;
                var a = Math.sin(diffLatitude / 2) * Math.sin(diffLatitude / 2) +
                    Math.cos(tm1lat) * Math.cos(tm2lat) *  Math.sin(diffLongitude / 2) * Math.sin(diffLongitude / 2);
                var dc = 2 * Math.asin(Math.sqrt(a));
                var distance = radiusOfEarth * dc;
                return distance/1000;
   
   }
    
};