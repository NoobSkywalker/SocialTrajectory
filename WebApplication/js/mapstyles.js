//Map Styles
          var cartoon_styles = [ 
              { "featureType": "landscape", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "off" }] 
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#d3d3d3" }, { "visibility": "on" } ]
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "stylers": [ { "visibility": "on" }, { "color": "#b1bc39" } ]
            },{ "featureType": "landscape.man_made", "stylers": [ { "visibility": "on" }, { "color": "#ebad02" } ] 
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#416d9f" } ] 
            },{ "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#000000" } ]
            },{ "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "off" }, { "color": "#ffffff" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "off" }, { "color": "#000000" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#ebad02" } ]
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#8ca83c" } ]
            }, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
    }

          ];
		  
		  
		  
		  var darkvisstyle =  [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}];
                
		  
    
          // Grey Scale
          var grey_styles = [ 
              { "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "stylers": [ { "visibility": "on" } ] 
            },{ "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#d3d3d3" }, { "visibility": "on" } ]
            },{ "featureType": "poi.medical", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi.medical", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#cccccc" } ] 
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#cecece" } ] 
            },{ "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#808080" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#808080" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#fdfdfd" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#d2d2d2" } ]
			}, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
            } 
          ];
    
          // Black & White
          var bw_styles = [ 
              { "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "geometry.fill",  "stylers": [ { "color": "#d3d3d3" }, { "visibility": "on" } ]
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] 
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#cecece" } ] 
            },{ "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#000000" } ]
            },{ "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "off" }, { "color": "#ffffff" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "off" }, { "color": "#000000" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#000000" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ]
			}, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
            } 
          ];
    
          // Retro
          var retro_styles = [ 
            { "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#d3d3d3" }, { "visibility": "on" } ]
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "stylers": [ { "visibility": "on" }, { "color": "#eee8ce" } ] 
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#b8cec9" } ] 
            },{ "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#000000" } ]
            },{ "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "off" }, { "color": "#ffffff" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#000000" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ] 
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#d3cdab" } ]
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#ced09d" } ]
            },{ "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
			}, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
            } 
          ];
    
          // Night
          var night_styles = [ 
            { "featureType": "landscape", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#d3d3d3" }, { "visibility": "on" } ]
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ]

            },{ "featureType": "landscape", "stylers": [ { "visibility": "on" }, {  "hue": "#0008ff" }, { "lightness": -75 }, { "saturation": 10 } ]
            },{ "elementType": "geometry.stroke", "stylers": [ { "color": "#1f1d45" } ]
            },{ "featureType": "landscape.natural", "stylers": [ { "color": "#1f1d45" } ]
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#01001f" } ] 
            },{ "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#e7e8ec" } ]
            },{ "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#151348" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#f7fdd9" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#01001f" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#316694" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#1a153d" } ]
			}, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
            
            } 
          ];   
    
          // Night Light
          var night_light_styles = [ 
              {"elementType": "geometry", "stylers": [ { "visibility": "on" }, { "hue": "#232a57" } ]
            },{ "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "hue": "#0033ff" }, { "saturation": 13 }, { "lightness":-77 } ]
            },{ "featureType": "landscape", "elementType": "geometry.stroke", "stylers": [ { "color": "#4657ab" } ] 
            },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#0d0a1f" } ] 
            },{ "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#d2cfe3" } ]
            },{ "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#0d0a1f" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#0d0a1f" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#ff9910" } ] 
            },{ "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#4657ab" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#232a57" } ]
            },{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#232a57" } ]
            },{ "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
			}, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
            } 
          ]; 
    
            
          // Papiro  
          var papiro_styles = [ 
              {"elementType": "geometry", "stylers": [ { "visibility": "on" }, { "color": "#f2e48c" } ]
            },{ "featureType": "road.highway", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "labels", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "poi.park", "elementType": "geometry.fill",  "stylers": [ { "color": "#d3d3d3" }, { "visibility": "on" } ]
            },{ "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "visibility": "off" } ] 
            },{ "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#f2e48c" } ] 
            },{ "featureType": "landscape", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" }, { "color": "#592c00" } ] 
            },{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#a77637" } ] 
            },{ "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#592c00" } ]
            },{ "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#f2e48c" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "visibility": "on" }, { "color": "#592c00" } ]
            },{ "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#f2e48c" } ]
            },{ "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#a5630f" } ] 
            },{ "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" }, { "color": "#592c00" } ] 
            },{ "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "visibility": "off" } ]
            },{ "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] 
			}, { elementType: 'labels',  stylers: [{ visibility: 'off' }]
            } 
          ];