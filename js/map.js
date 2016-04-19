/**
 * Project: OnlineMaps
 * Author: Evnica
 * Date: 17.04.2016
 * Version: 0.1
 */

var map,
    timeout,
    rescueStationsLayer,
    currentImg = 1, //Number of img currently displayed
    iterator = 1,     //
    kmlOptions,
    proceed = false,
    wasPausedBeforePlaying = false,
    layers = [];

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
    /*rescuePolygonLayer = new google.maps.KmlLayer(kmlOptions);*/
    rescueStationsLayer = new google.maps.KmlLayer(kmlOptions);
}

function loadRescueKml(i)
{
    if (proceed == true && i < 21)
    {
        var url = "http://evnica.com/kml/" + i + "min.kmz";
        layers.push(new google.maps.KmlLayer(url, kmlOptions));
        /*rescuePolygonLayer.setUrl(url);*/
    }
}

function pause()
{
    proceed = false;
    iterator = currentImg;
    wasPausedBeforePlaying = true;
}

function playRescue()
{
    if (proceed == false)       //if pause was pressed before or the site was just loaded
    {
        proceed = true;         // indicate it's time to start
        if (currentImg > 20)    //if all the images have been already shown
        {
            currentImg = 1; //point img to the first one
        }

        if (currentImg == 1) //if it's the start of animation, load rescue stations locations
        {
            rescueStationsLayer.setUrl("http://evnica.com/kml/rescueStations.kmz");
        }
        var i = currentImg; // iteration through images starts with the last img remembered

        startSpinner({x: 75, y: 75, size: 44});

        while (i < 21) // iterate through images
        {
            if (proceed == true) // pause could be pressed in the meanwhile
            {
                timeout = setTimeout(function () {
                    loadRescueKml(currentImg);
                    currentImg++;
                }, 1000 * i);
                i++;
            }
            else {
                break;
            }
        }
    }

}


/**
 * Inspired by html5demos: https://github.com/remy/html5demos/blob/master/demos/canvas.html
 * Adapted by Evnica on 13.04.2016.
 */

var degree = 0;

function startSpinner (data)
{
    setTimeout(createSpinner(data), 1000);
}

function createSpinner(data)
{
    var canvas = document.getElementById('clockSpinner'); //locate the spinner
    var context = canvas.getContext("2d");
    var i = degree, //counter
        degreesList = [];       //list of ordinal numbers of sectors
    for (var j = 0; j < 21; j++) //only first 20 minutes will be displayed
    {
        degreesList.push(j);
    }


    window.canvasTimer = setInterval(draw, 1000); //set the frequency of picture appearance 1 per second

    function draw() {
        if(proceed==true)
        {
            var color, start, end;
            var currentDegree;
            context.save();
            currentDegree = degreesList[i]; //0 in the first iteration

            color = Math.floor(255/60*i*2.5);
            context.strokeStyle = 'rgb(' + color + ', ' + 210 + ', ' + 0 + ')';

            context.lineWidth = data.size;
            context.beginPath();
            start = Math.floor(6*(currentDegree) - 90); //start at the top: 90 degrees, 12 o'clock
            end = Math.floor(6*(currentDegree+1) - 90);
            //context.arc(x, y, r, sAngle, eAngle, counterclockwise);
            context.arc(data.x, data.y, data.size, (Math.PI/180)*start, (Math.PI/180)*end, false);
            context.stroke();
            context.restore();
            i++;
            degree++;
            if (i > 20)
            {
                i = 0;
                proceed = false;
                reset();
            }
        }

        function reset() {
            context.clearRect(0,0,150,150); // clear canvas of the spinner
            degree = 0;
            clearInterval(window.canvasTimer);
        }
    }
}







