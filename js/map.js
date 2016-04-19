/**
 * Project: OnlineMaps
 * Author: Evnica
 * Date: 17.04.2016
 * Version: 0.1
 */

var map,
    degree = 0,
    rescueStationsLayer,
    kmlOptions,
    proceed = false;
var layers = []
/*{
        serviceArea01: {url : "http://evnica.com/kml/1min.kmz"},
        serviceArea02: {url : "http://evnica.com/kml/2min.kmz"},
        serviceArea03: {url : "http://evnica.com/kml/3min.kmz"},
        serviceArea04: {url : "http://evnica.com/kml/4min.kmz"},
        serviceArea05: {url : "http://evnica.com/kml/5min.kmz"},
        serviceArea06: {url : "http://evnica.com/kml/6min.kmz"},
        serviceArea07: {url : "http://evnica.com/kml/7min.kmz"},
        serviceArea08: {url : "http://evnica.com/kml/8min.kmz"},
        serviceArea09: {url : "http://evnica.com/kml/9min.kmz"},
        serviceArea10: {url : "http://evnica.com/kml/10min.kmz"},
        serviceArea11: {url : "http://evnica.com/kml/11min.kmz"},
        serviceArea12: {url : "http://evnica.com/kml/12min.kmz"},
        serviceArea13: {url : "http://evnica.com/kml/13min.kmz"},
        serviceArea14: {url : "http://evnica.com/kml/14min.kmz"},
        serviceArea15: {url : "http://evnica.com/kml/15min.kmz"},
        serviceArea16: {url : "http://evnica.com/kml/16min.kmz"},
        serviceArea17: {url : "http://evnica.com/kml/17min.kmz"},
        serviceArea18: {url : "http://evnica.com/kml/18min.kmz"},
        serviceArea19: {url : "http://evnica.com/kml/19min.kmz"},
        serviceArea20: {url : "http://evnica.com/kml/20min.kmz"}
}*/;
var playedCompletely = false;

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

function loadRescueKml(i)
{
    if (proceed == true && i < 21)
    {
        var url = "http://evnica.com/kml/" + i + "min.kmz";
        layers.push(new google.maps.KmlLayer(url, kmlOptions));
        //layers[i].obj = new google.maps.KmlLayer(layers[i].url, kmlOptions);
    }
}

function pause()
{
    if (proceed == true)
    {
        proceed = false;
        clearInterval(window.canvasTimer);
    }
}

/**
 * The further code was inspired by html5demos: https://github.com/remy/html5demos/blob/master/demos/canvas.html
 * Adapted by Evnica on 13.04.2016.
 */

function startRescueAnimation(data) {
    if (proceed == false) // don't play if is already playing
    {
        var i = degree,//counter, doesn't always start with 0, as scenario could be stopped in the middle
            degreesList = [];       //list of ordinal numbers of sectors
        for (var j = 0; j < 20; j++) //only first 20 minutes will be displayed
        {
            degreesList.push(j);
        }

        if (i == 0) // if stations layer wasn't loaded before, load it
        {
            rescueStationsLayer = new google.maps.KmlLayer("http://evnica.com/kml/rescueStations.kmz", kmlOptions);
        }
        proceed = true;
        var canvas = document.getElementById('clockSpinner'); //locate the spinner
        var context = canvas.getContext("2d");

        function reset()
        {
            context.clearRect(0, 0, 150, 150); // clear canvas of the spinner
            degree = 0;
            clearInterval(window.canvasTimer);
            /*for (var item in layers)
            {
                if (layers[item].obj)
                {
                    layers[item].obj.setMap(null);
                    delete layers[item].obj;
                }
            }*/
        }

        if (playedCompletely == true) // if it's a new start after the scenario was completely played before and images are still on the screen
        {
            reset(); // remove images
            playedCompletely = false; // reset the flag
        }

        window.canvasTimer = setInterval(draw, 1000); //set the frequency of img appearance: 1 per second

        function draw() {
            if (proceed == true) //noone has stopped scenario before
            {
                var color, start, end;
                var currentDegree;
                context.save();
                currentDegree = degreesList[i];

                color = Math.floor(255 / 60 * i * 2.5); // shade of red for the RGB color
                context.strokeStyle = 'rgb(' + color + ', ' + 210 + ', ' + 0 + ')';

                context.lineWidth = data.size; // radius of the sector
                context.beginPath();
                start = Math.floor(6 * (currentDegree) - 90); //start at the top: -90 degrees, 12 o'clock
                end = Math.floor(6 * (currentDegree + 1) - 90); // and at -84 degrees, which corresponds to 1 minute
                //context.arc(x, y, r, sAngle, eAngle, counterclockwise);
                context.arc(data.x, data.y, data.size, (Math.PI / 180) * start, (Math.PI / 180) * end, false);
                context.stroke();
                context.restore();

                i++; // increase iterator to
                loadRescueKml(i);
                degree++; // save current degree value outside this method in case it's stopped by user to be able to
                            //resume from the point where paused
                if (i > 20) // 20 minutes covered
                {
                    degree = 0;
                    proceed = false;
                    playedCompletely = true;
                }
            }
        }
    }
}







