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
        steps: 386,
        step: 1,
        animationDuration: 30,
        time_slider: true
    });

    torqueLayer.on('change:time', function(changes) {
        if (changes.step === torqueLayer.provider.getSteps()-29) {

            document.getElementById('torque_time').innerHTML = '1348';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-28) {

            document.getElementById('torque_time').innerHTML = '1348';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-27) {

            document.getElementById('torque_time').innerHTML = '1365';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-26) {

            document.getElementById('torque_time').innerHTML = '1382';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-25) {

            document.getElementById('torque_time').innerHTML = '1399';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-24) {

            document.getElementById('torque_time').innerHTML = '1416';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-23) {

            document.getElementById('torque_time').innerHTML = '1433';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-22) {

            document.getElementById('torque_time').innerHTML = '1450';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-21) {

            document.getElementById('torque_time').innerHTML = '1467';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-20) {

            document.getElementById('torque_time').innerHTML = '1484';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-19) {

            document.getElementById('torque_time').innerHTML = '1500';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-18) {

            document.getElementById('torque_time').innerHTML = '1512';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-17) {

            document.getElementById('torque_time').innerHTML = '1523';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-16) {

            document.getElementById('torque_time').innerHTML = '1534';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-15) {

            document.getElementById('torque_time').innerHTML = '1545';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-14) {

            document.getElementById('torque_time').innerHTML = '1556';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-13) {

            document.getElementById('torque_time').innerHTML = '1567';
            setTimeout(function(){document.getElementById('torque_time').innerHTML = '1571'}, 300);
        }
        else if (changes.step === torqueLayer.provider.getSteps()-12) {

            document.getElementById('torque_time').innerHTML = '1584';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-11) {

            document.getElementById('torque_time').innerHTML = '1601';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-10) {

            document.getElementById('torque_time').innerHTML = '1615';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-9) {

            document.getElementById('torque_time').innerHTML = '1628';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-8) {

            document.getElementById('torque_time').innerHTML = '1641';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-7) {

            document.getElementById('torque_time').innerHTML = '1654';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-6) {

            document.getElementById('torque_time').innerHTML = '1667';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-5) {

            document.getElementById('torque_time').innerHTML = '1680';
            setTimeout(function(){document.getElementById('torque_time').innerHTML = '1681'}, 500);
        }
        else if (changes.step === torqueLayer.provider.getSteps()-4) {

            document.getElementById('torque_time').innerHTML = '1682';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-3) {

            document.getElementById('torque_time').innerHTML = '1685';
        }
        else if (changes.step === torqueLayer.provider.getSteps()-2) {

            document.getElementById('torque_time').innerHTML = '1713';
            setTimeout(function(){document.getElementById('torque_time').innerHTML = '1715'}, 500);
        }
        else if (changes.step === torqueLayer.provider.getSteps()-1) {
            document.getElementById('torque_time').innerHTML = '1734';
            setTimeout( clear, 1000 );
            setTimeout(function(){document.getElementById('torque_time').innerHTML = ''}, 1000);
        }
    });

    torqueLayer.addTo(map_object);
    torqueLayer.hide();
}

function clear()
{
    torqueLayer.pause();
    torqueLayerPlaying = false;
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
var torqueLayerPlaying = false;
//bind a toggle function for the static content on the button
$("#torqueLayer").on('click', function() {
    if (torqueLayerShown) {
        torqueLayer.hide();
        torqueLayer.stop();
    } else {
        torqueLayer.show();
        torqueLayer.play();
        torqueLayerPlaying = true;
    }
    torqueLayerShown = !torqueLayerShown;
});

$("#pause").on('click', function() {
    if (torqueLayerShown && torqueLayerPlaying) {
        torqueLayer.pause();
        torqueLayerPlaying = false;
    }
});

$("#play").on('click', function() {
    if (torqueLayerShown && !torqueLayerPlaying) {
        torqueLayer.play();
        torqueLayerPlaying = true;
    }
});