/*
var jsonVis = 'https://evnica.cartodb.com/api/v2/viz/3c0d290c-21eb-11e6-8e1b-0e3a376473ab/viz.json';
var options = {
    search: false,
    zoomControl: true,
    center: [46.77796299949992, 13.872985839843748],
    zoom: 9,
    cartodb_logo: true,
    fullscreen: true,
    time_slider: false
};

window.onload = function () {
    cartodb.createVis('map', jsonVis, options).done(function () {
        
    });
};*/

var staticLayerSource = 'https://evnica.cartodb.com/api/v2/viz/68c6e6f6-25b8-11e6-b721-0e787de82d45/viz.json';
var frameSource = 'https://evnica.cartodb.com/api/v2/viz/7b13579c-2516-11e6-a806-0ecd1babdde5/viz.json';
var sublayers = [];

var CARTOCSS = [
    'Map {',
    '-torque-frame-count: 386;',
    '-torque-animation-duration: 30;',
    '-torque-time-attribute:"date";',
    '-torque-aggregation-function:"count(cartodb_id)";',
    '-torque-resolution:4;',
    '-torque-data-aggregation:linear;',
    '}',

    '#pest_2{',
    'comp-op: lighter;',
    'marker-fill-opacity: 0.9;',
    'marker-line-color: #FFF;',
    'marker-line-width: 0;',
    'marker-line-opacity: 1;',
    'marker-type: ellipse;',
    'marker-width: 9;',
    'marker-fill: #000000;',
    '}',

    '#pest_2[frame-offset=1] {',
    'marker-width:11;',
    'marker-fill-opacity:0.45;',
    '}',

    '#pest_2[frame-offset=2] {',
    'marker-width:13;',
    'marker-fill-opacity:0.225;',
    '}'
].join('\n');

var map_object;
var options = {
    zoomControl: true,
    center: [46.77796299949992, 13.872985839843748],
    zoom: 9,
    cartodb_logo: true
};

window.onload = function () {
    initialize();
};
var torqueLayer;

function initialize() {
    //create a leaflet map
    map_object = new L.map('map', options);
    L.tileLayer
    ('https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/reduced.day/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O',
        {
            attribution: 'Nokia Reduced'
        }).addTo(map_object);
    //create a dark frame around Carinthia
    cartodb.createLayer(map_object, frameSource).addTo(map_object);
    //create a static layer with all points
    cartodb.createLayer(map_object, staticLayerSource).addTo(map_object)
    //if created, add this layer to sublayers array
        .done(function(layer) {
            for (var i = 0; i < layer.getSubLayerCount(); i++) {
                sublayers[i] = layer.getSubLayer(i);
            }
        })
        //if not created, log error
        .error(function(err) {
            console.log("error: " + err);
        });

    torqueLayer = new L.TorqueLayer({
        user       : 'evnica',
        table      : 'pest_2',
        cartocss: CARTOCSS,
        steps: 387,
        animationDuration: 30,
        time_slider: true
    });

    


    // pause animation at last frame
    torqueLayer.on('change:time', function(changes) {
        if (changes.step === torqueLayer.provider.getSteps()-1) {

            setTimeout( clear, 1000 );
        }
    });

    torqueLayer.addTo(map_object);
    torqueLayer.hide();
}

function clear()
{
    torqueLayer.pause();
    torqueLayer.hide();
    torqueLayerShown = false;
}

function addTimeSlider(layer) {
    
}

var sublayer0Shown = true;
//bind a toggle function for the static content on the button
$("#sublayer0").on('click', function() {
    if (sublayer0Shown) {
        sublayers[0].hide();
    } else {
        sublayers[0].show();
    }
    sublayer0Shown = !sublayer0Shown;
});


var torqueLayerShown = false;
//bind a toggle function for the static content on the button
$("#torqueLayer").on('click', function() {
    if (torqueLayerShown) {
        torqueLayer.hide();
        torqueLayer.stop();
    } else {
        torqueLayer.show();
        torqueLayer.play();
    }
    torqueLayerShown = !torqueLayerShown;
});