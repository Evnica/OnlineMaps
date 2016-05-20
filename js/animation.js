var rgb = [],
    start = [],
    end = [];
var map,
    index = 0,
    playing = false,
    kmlOptions,
    lastAddedOverlay;
var images = [  "http://evnica.com/kml/img/1min.png",
                "http://evnica.com/kml/img/2min.png",
                "http://evnica.com/kml/img/3min.png",
                "http://evnica.com/kml/img/4min.png",
                "http://evnica.com/kml/img/5min.png",
                "http://evnica.com/kml/img/6min.png",
                "http://evnica.com/kml/img/7min.png",
                "http://evnica.com/kml/img/8min.png",
                "http://evnica.com/kml/img/9min.png",
                "http://evnica.com/kml/img/10min.png",
                "http://evnica.com/kml/img/11min.png",
                "http://evnica.com/kml/img/12min.png",
                "http://evnica.com/kml/img/13min.png",
                "http://evnica.com/kml/img/14min.png",
                "http://evnica.com/kml/img/15min.png",
                "http://evnica.com/kml/img/16min.png",
                "http://evnica.com/kml/img/17min.png",
                "http://evnica.com/kml/img/18min.png",
                "http://evnica.com/kml/img/19min.png",
                "http://evnica.com/kml/img/20min.png"];
var latLongBounds = [
                        {
                            north: 47.04051596439788,
                            south: 46.45048236243505,
                            east: 15.20132296591075,
                            west: 12.55243270841183
                        },
                        {
                            north: 47.05568334433206,
                            south: 46.44195363286259,
                            east: 15.22424827656963,
                            west: 12.5413694984683
                        },
                        {
                            north: 47.05817654710409,
                            south: 46.43021237452053,
                            east: 15.24307485622612,
                            west: 12.52779336303419
                        },
                        {
                            north: 47.065254355307,
                            south: 46.42053549336998,
                            east: 15.25576861229285,
                            west: 12.52522166764062
                        },
                        //5 min
                        {
                            north: 47.07561775323683,
                            south: 46.40696758036267,
                            east: 15.26810112659137,
                            west: 12.52094677259624
                        },
                        {
                            north: 47.08516036337593,
                            south: 46.39806144583835,
                            east: 15.28071762476517,
                            west: 12.51920656585733
                        },
                        {
                            north: 47.09530758084028,
                            south: 46.38546109340419,
                            east: 15.29534418667268,
                            west: 12.51718910901766
                        },
                        {
                            north: 47.10581668504457,
                            south: 46.36721132598476,
                            east: 15.30714410675842,
                            west: 12.51556153382211
                        },
                        {
                            north: 47.10921486245673,
                            south: 46.35462888433124,
                            east: 15.31235622020335,
                            west: 12.51484262161614
                        },
                        //10 min
                        {
                            north: 47.1111081877412,
                            south: 46.34983669673743,
                            east: 15.31682018742601,
                            west: 12.51422690199495
                        },
                        {
                            north: 47.11456113436023,
                            south: 46.34935539378395,
                            east: 15.32452789283053,
                            west: 12.51019813717795
                        },
                        {
                            north: 47.12276886257044,
                            south: 46.34712659401552,
                            east: 15.33384269927763,
                            west: 12.4867627844427
                        },
                        {
                            north: 47.13742317731854,
                            south: 46.34241935506626,
                            east: 15.34417447710627,
                            west: 12.46857181586733
                        },
                        {
                            north: 47.1535840270617,
                            south: 46.33982282602988,
                            east: 15.35322815128353,
                            west: 12.45288880049959
                        },
                        // 15 min
                        {
                            north: 47.15947310130673,
                            south: 46.33901058406462,
                            east: 15.36533073242824,
                            west: 12.43122742160384
                        },
                        {
                            north: 47.15947310066443,
                            south: 46.33901058901861,
                            east: 15.38463920763318,
                            west: 12.41703129133068
                        },
                        {
                            north: 47.15974996283249,
                            south: 46.338972403011,
                            east: 15.3904805566647,
                            west: 12.39378662717277
                        },
                        {
                            north: 47.16898857664683,
                            south: 46.33769811244576,
                            east: 15.39278378554593,
                            west: 12.37708821909973
                        },
                        {
                            north: 47.17395362937018,
                            south: 46.33701327820407,
                            east: 15.40186559983217,
                            west: 12.36496471314249
                        },
                        // 20 min
                        {
                            north: 47.18078502991148,
                            south: 46.33131523753399,
                            east: 15.41658622302126,
                            west: 12.34799279217626
                        }
];
var groundOverlays = [];

function prepareTheClock()
{
    var color;

    for (var i = 0; i < 20; i++)
    {
        color = Math.floor(255 / 60 * i * 2.5);
        rgb.push('rgb(' + color + ', ' + 210 + ', ' + 0 + ')');
        start.push(Math.floor(6 * (i) - 90)); //start at the top: -90 degrees, 12 o'clock
        end.push(Math.floor(6 * (i + 1) - 90)); // and at -84 degrees, which corresponds to 1 minute
    }
}

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
    prepareTheClock();
}

function stepForward()
{
    var canvas = document.getElementById('clockSpinner'); //locate the spinner
    var context = canvas.getContext("2d");
    if (index < images.length)
    {
        //draw a sector in a clock
        context.save();
        context.strokeStyle = rgb[index];
        context.lineWidth = 44; // fits to the size of the clock canvas
        context.beginPath();
        context.arc(75, 75, 44, (Math.PI / 180) * start[index], (Math.PI / 180) * end[index], false);
        context.stroke();
        context.restore();

        //draw a layer
        lastAddedOverlay = new google.maps.GroundOverlay(images[index], latLongBounds[index]);
        lastAddedOverlay.setMap(map);
        groundOverlays.push(lastAddedOverlay);
        if (index > 14) {
            groundOverlays[14].setMap(map);
        }
        if (index > 9) {
            groundOverlays[9].setMap(map);
        }
        if (index > 4) {
            groundOverlays[4].setMap(map);
        }
        index++;
    }
    else
    {
        clear();
    }
}


function play() 
{

    if (!playing) {
        playing = true;
        window.canvasTimer = setInterval(stepForward, 1000);
    }
}

function resetMap() {
    for(var i = 0; i < groundOverlays.length; i++)
    {
        groundOverlays[i].setMap(null);
    }
}

function pause() {
    if (playing)
    {
        clearInterval(window.canvasTimer);
        playing = false;
    }
}

function stop()
{
    if (playing)
    {
        clear();
    }
}

function clear() {
    clearInterval(window.canvasTimer);
    context.clearRect(0, 0, 150, 150);
    resetMap();
    index = 0;
    playing = false;
}