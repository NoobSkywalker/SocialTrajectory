         /**
* Converts sql time string to timestamp
*  
*/  
function getJsTimestamp( timeString ) {
            // split the mssql timestamp, and return it so that we 
            // can create a date in javascript
            var arrMssqldate = timeString.split( ' ' );
            var arrDate = arrMssqldate[0].split( '-', 3 );
            var arrTime = arrMssqldate[1].split( ':', 2);

            var timeObject = new Object;
            timeObject.year = arrDate[0];
            timeObject.month = arrDate[1];
            timeObject.day = arrDate[2];
            timeObject.hour = arrTime[0];
            timeObject.minute = arrTime[1];
            timeObject.second = '00';
            
            return timeObject;
    
}

function daydiff(first, second) {
    return (second-first)/(1000*60*60*24)
}

function hourdiff(first, second) {
    return (second-first)/(1000*60*60)
}

function minutediff(first, second) {
    return (second-first)/(1000*60)
}