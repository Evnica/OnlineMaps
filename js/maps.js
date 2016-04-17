/**
 * Author: Evnica
 * Date: 13.04.2016.
 */

$.getScript("https://maps.googleapis.com/maps/api/js");

function initMap() {

    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv,
        {
        center: {lat: 44.540, lng: -78.546},
        zoom: 8
        }
    );


}