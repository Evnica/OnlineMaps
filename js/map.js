/**
 * Project: OnlineMaps
 * Author: Evnica
 * Date: 17.04.2016
 * Version: 0.1
 */

var map, rescueLayer, currentIndex = 1, iterator = 1, kmlOptions;
var proceed = false;

function initMap()
{
    map = new google.maps.Map(document.getElementById('map'),
        {
            center: {lat: 46.75, lng: 13.87},
            zoom: 9,
            mapTypeControl: false,
            /*mapTypeControlOptions:
             {
             style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
             position: google.maps.ControlPosition.BOTTOM_LEFT
             },*/
            scaleControl: true,
            streetViewControl: false
        }                        );
    map.set('styles', [
        {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
                {visibility: 'off'}
            ]
        }
    ]);

    kmlOptions = {
        suppressInfoWindows: true,
        preserveViewport: true,
        map:map
    };

    var kmlLayerFrame = new google.maps.KmlLayer("http://evnica.com/kml/frameDark.kmz", kmlOptions);
    var kmlLayerBorder = new google.maps.KmlLayer("http://evnica.com/kml/kaernten.kml", kmlOptions);
}

function loadRescueStations()
{
    var kmlLayerStation = new google.maps.KmlLayer("http://evnica.com/kml/rescueStations.kmz", kmlOptions);
}


function loadRescueKml(i)
{
    var url = "http://evnica.com/kml/" + i + "min.kmz";
    var rescueLayer = new google.maps.KmlLayer(url, kmlOptions);
}

function pause()
{
    proceed = false;
}

function playRescue()
{
    proceed = true;
    setTimeout(loadRescueStations(), 500);
    createSpinner({ x : 75, y : 75, size : 44});

    for (var i=iterator; i<21; i++) {
        if (proceed == true)
        {
            setTimeout(function() {
                loadRescueKml(currentIndex);
                currentIndex ++;
            }, 1000*i);
        }
        else
        {
            iterator = currentIndex;
            alert('dfk');
        }
    }



}







