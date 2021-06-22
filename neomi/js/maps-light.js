
google.maps.event.addDomListener(window, 'load', initGMap);

function initGMap() {
    var mapOptions = {
        zoom: 11,
        scrollwheel: false,
        mapTypeControl: true,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        disableDefaultUI: false,
        center: new google.maps.LatLng(40.7560139,-73.8577014),
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#d2f1ff"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#004a7e"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#e3f5fe"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#71a0bb"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ecfaff"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#d3f0ff"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f6fdff"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#bfbfbf"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f8f8f8"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#c8c8c8"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#2d87ca"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#98bfdf"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#fdfeff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#67a3cd"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#69c9ff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.8790139,-73.910),
        map: map,
        title: 'Perla App',
        icon: ''
    });

    // InfoWindow content
    var contentString = '<div id="iw-container">' +
        '<div class="iw-content">' +
        '<h4>Perla Center</h4><h5>Opening Times:</h5>' +
        '<h6>Sunday - Thursday &nbsp; &nbsp; 10am - 11pm</h6>' +
        '<h5>Address:</h5>' +
        '<h6>V15 Bath Rd, Heathrow, Longford, Hounslow TW6 2AB, UK<br>'+
        '<br>Phone.  +44 171 127 8528<br>e-mail: perla.app@example.com</h6>'+
        '</div>'+
        '</div>';




    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 350
    });



    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


}
