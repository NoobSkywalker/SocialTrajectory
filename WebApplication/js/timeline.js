        /**
* class that creates a timeline for each calculated trajectory 
@deprecated
*  
*/  



var playInterval;
var slideDuration = 500; // in milliseconds
var autoRewind = false;

function createTimeline(maxday){
$(function() {
    $( "#slider" ).slider({
        value: 0,
        min: 0,
        max: maxday,
        step: 1,
        slide: function( event, ui ) {
            drawTweets(ui.value);
			window.currentday=ui.value;
			
        }
    });
	writeDebug(maxday);
    
    $( "#play" ).button({
      icons: {
        primary: "ui-icon-play"
      },
      text: false
    }).click(function () {
        if (playInterval != undefined) {
            clearInterval(playInterval);
            playInterval = undefined;
            $(this).button({
                icons: {
                    primary: "ui-icon-play"
                }
            });
            return;
        }
        $(this).button({
            icons: {
                primary: "ui-icon-pause"
            }
        });
        playInterval = setInterval(function () {
            window.currentday++;
            if (window.currentday > maxday) {
                if (autoRewind) {
                   window.currentday = 0;
                }
                else {
                    clearIntveral(playInterval);
                    return;
                }
            }
            drawTweets(window.currentday);
			$( "#slider" ).slider( "value", window.currentday );
        }, slideDuration);
    });
});
}
// JavaScript Document