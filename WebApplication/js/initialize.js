       var map;
		  var oms;
	   function initialize() {
            
            var styledMap = new google.maps.StyledMapType(grey_styles, {name: "Grey"});
            var bwstyledMap = new google.maps.StyledMapType(bw_styles, {name: "Black & White"});
            var retrostyledMap = new google.maps.StyledMapType(retro_styles, {name: "Retro"});
            var nightstyledMap = new google.maps.StyledMapType(night_styles, {name: "Night"});
            var nightlightstyledMap = new google.maps.StyledMapType(night_light_styles, {name: "Night Light"});
            var papirostyledMap = new google.maps.StyledMapType(papiro_styles, {name: "Papiro"});
            var cartoonstyledMap = new google.maps.StyledMapType(cartoon_styles, {name: "Cartoon"});
            var oneColorStylesMap = new google.maps.StyledMapType(one_color_styles, {name: "One Color"});
    
            var mapOptions = {
              center: new google.maps.LatLng(20, 0),
              zoom: 2,
			  minZoom: 2,
              mapTypeControlOptions: {
                mapTypeIds: ['cartoon_style', 'grey_style', 'bw_style', 'retro_style', 'night_style' , 'night_light_style', 'papiro_style', 'one_color_styles']
              }
    
            };
            
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            
            oms = new OverlappingMarkerSpiderfier(map,{markersWontMove: true, markersWontHide: true});
			var iw = new google.maps.InfoWindow();
oms.addListener('click', function(marker, event) {
  iw.setContent(marker.desc);
  iw.open(map, marker);
});

			
            map.mapTypes.set('cartoon_style', cartoonstyledMap);
            map.mapTypes.set('grey_style', styledMap);
            map.mapTypes.set('bw_style', bwstyledMap);
            map.mapTypes.set('retro_style', retrostyledMap);
            map.mapTypes.set('night_style', nightstyledMap);
            map.mapTypes.set('night_light_style', nightlightstyledMap);
            map.mapTypes.set('papiro_style', papirostyledMap);
            map.mapTypes.set('one_color_styles', oneColorStylesMap);
            var homeControlDiv = document.createElement('div');
            var homeControl = new HomeControl(homeControlDiv, map);
//  homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
    
            map.setMapTypeId('grey_style');
    
    //when the map zoom changes, resize the icon based on the zoom level so the marker covers the same geographic area
    google.maps.event.addListener(map, 'zoom_changed', function() {
    
        var pixelSizeAtZoom0 = 1; //the size of the icon at zoom level 0
        var maxPixelSize = 10; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels
    
        var zoom = map.getZoom();
        var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(2,zoom)); // use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in
    
        if(relativePixelSize > maxPixelSize) //restrict the maximum size of the icon
            relativePixelSize = maxPixelSize;
    
        //change the size of the icon
     
        for(i=0; i< allmarkers.length; i++ ) {
        var icon = allmarkers[i].getIcon();
        allmarkers[i].setIcon(new google.maps.MarkerImage(
            icon.url,
            null,
            null,
            null,
            new google.maps.Size(relativePixelSize, relativePixelSize))
        );
        
    }
     
               
    });
    
            
    
          }// JavaScript Document