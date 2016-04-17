/**
 * Project: OnlineMaps
 * Author: Evnica
 * Date: 17.04.2016
 * Version: 0.1
 */

$.getScript("http://maps.google.com/maps/api/js?sensor=true&language=de&region=DE&async=2&callback=MapApiLoaded", function () {});
function initMap()
{
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 46.75, lng: 13.87},
        zoom: 9
    });
    map.set('styles', [
        {
            featureType: 'road',
            elementType: 'labels.icon',
            stylers: [
                {visibility: 'off'}
            ]
        }
    ]);

    var kmlOptions = {
        suppressInfoWindows: true,
        preserveViewport: true,
        map:map
    };
    var kmlLayerFrame = new google.maps.KmlLayer("http://evnica.com/kml/frameDark.kmz", kmlOptions);
    var kmlLayerBorder = new google.maps.KmlLayer("http://evnica.com/kml/kaernten.kml", kmlOptions);
}
