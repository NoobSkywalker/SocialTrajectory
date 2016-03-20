        /**
* Loads the UI dialogs
*  
*/  


function loaddialogs(){

    $(function() {


        $( "#chooseHashtags" ).dialog({
            autoOpen: true,
            width: '680',
            height:'400',
            minWidth:'610',
            position: ['left', 'center'],
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });

        $( "#chooseHashtags" ).dialogExtend({
            minimizable: true,

        });



        $( "#toolbar" ).dialog({
            autoOpen: true,
            width: '340',
            height:'270',
            resizable:false,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });
        $( "#toolbar" ).dialogExtend({
            minimizable: true,
            resizable:false,


        });

        $("#toolbar").dialogExtend("minimize");


        $( "#legend" ).dialog({
            autoOpen: true,
            width: '230',
            height:'300',
            resizable:false,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });
        $( "#legend" ).dialogExtend({
            minimizable: true,
            resizable:false,


        });

        $( "#calculationoptions" ).dialog({
            autoOpen: true,
            width: '340',
            height:'250',
            resizable:false,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });
        $( "#calculationoptions" ).dialogExtend({
            minimizable: true,
            resizable:false,


        });

        //slider ranking
        $( "#rankingtopicslider" ).slider({
            value:50,
            min: 0,
            max: 100,
            step: 1,
            slide: function( event, ui ) {
                $( "#rankingtopic" ).val( "" + ui.value );
            }
        });
        $( "#rankingtopic" ).val( "" + $( "#rankingtopicslider" ).slider( "value" ) + ""  );
        $( "#rankingsentimentslider" ).slider({
            value:50,
            min: 0,
            max: 100,
            step: 1,
            slide: function( event, ui ) {
                $( "#rankingsentiment" ).val( "" + ui.value );
            }
        });
        $( "#rankingsentiment" ).val( "" + $( "#rankingsentimentslider" ).slider( "value" ) + ""  );
        $( "#rankingstructureslider" ).slider({
            value:50,
            min: 0,
            max: 100,
            step: 1,
            slide: function( event, ui ) {
                $( "#rankingstructure" ).val( "" + ui.value );
            }
        });
        $( "#rankingstructure" ).val( "" + $( "#rankingstructureslider" ).slider( "value" ) + ""  );
        $( "#rankingspeedslider" ).slider({
            value:50,
            min: 0,
            max: 100,
            step: 1,
            slide: function( event, ui ) {
                $( "#rankingspeed" ).val( "" + ui.value );
            }
        });
        $( "#rankingspeed" ).val( "" + $( "#rankingspeedslider" ).slider( "value" ) + ""  );
        
        //dbscaradiusslider
         $( "#dbscanradiusslider" ).slider({
            value:50,
            min: 0,
            max: 500,
            step: 1,
            slide: function( event, ui ) {
                $( "#dbscanradius" ).val( "" + ui.value + " km" );
            }
        });


        //dbscanminneighboorhoodslider
        $( "#dbscanneighborhoodminslider" ).slider({
            value:50,
            min: 0,
            max: 500,
            step: 5,
            slide: function( event, ui ) {
                $( "#dbscanneighborhoodmin" ).val( "" + ui.value + " Tweets");
            }
        });
        $( "#dbscanneighborhoodmin" ).val( "" + $( "#dbscanneighborhoodminslider" ).slider( "value" ) + " Tweets"  );
        
        //dbscaradiusslider
         $( "#dbscanradiusslider" ).slider({
            value:50,
            min: 0,
            max: 500,
            step: 1,
            slide: function( event, ui ) {
                $( "#dbscanradius" ).val( "" + ui.value + " km" );
            }
        });
        $( "#dbscanradius" ).val( "" + $( "#dbscanradiusslider" ).slider( "value" ) + " km"  );
        
         //dbscaradiusslider
         $( "#dbscantimeslider" ).slider({
            value:60,
            min: 0,
            max: 1440,
            step: 15,
            slide: function( event, ui ) {
                $( "#dbscantime" ).val( "" + ui.value + " min" );
            }
        });
        $( "#dbscantime" ).val( "" + $( "#dbscantimeslider" ).slider( "value" ) + " min"  );





        $("#legend").dialogExtend("minimize");

        
       
        
         $( "#rankingoptions" ).dialog({
            autoOpen: false,
            width: '340',
            height:'300',
            resizable:false,
             
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });
      
        

        
        $( "#rankedlist" ).dialog({
            autoOpen: true,
            width: '1554',
            height:'400',
            resizable: true,
            minHeight:'400',
             minWidth: '1554',
            position: ['right', 'bottom'],
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });

        $( "#rankedlist" ).dialogExtend({
            minimizable: true,

        });
        
                 $("#rankingbutton").on("click",function() {
                     
             $( "#rankingoptions" ).dialog({
            autoOpen: false,
            width: '340',
            height:'300',
            resizable:false,
               
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            }

        });
                         $( "#rankingoptions" ).dialogExtend({
            minimizable: true,

        });

        
                     
            
           $( "#rankingoptions" ).dialog( "open" );
 
});





    });





}