var map_object;
var pestVis = 'https://evnica.cartodb.com/api/v2/viz/3c0d290c-21eb-11e6-8e1b-0e3a376473ab/viz.json';
var frameVis = 'https://evnica.cartodb.com/api/v2/viz/7b13579c-2516-11e6-a806-0ecd1babdde5/viz.json';
var options = {
    center: [46.77796299949992, 13.872985839843748],
    zoom: 10
};

window.onload = function(){
    map_object = new L.map('map', options);
    L.tileLayer
    ('https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/reduced.day/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O',
        {
        attribution: 'Nokia Reduced'
    }).addTo(map_object);
    cartodb.createLayer(map_object, frameVis).addTo(map_object);
    cartodb.createLayer(map_object, pestVis).addTo(map_object);
}

function animate() {
    var map_object = new L.Map("map", options);
}

function showStatic() {

}
    
function clear() {
        var map_object = new L.Map("map", options);
        var viz = 'https://evnica.cartodb.com/api/v2/viz/3c0d290c-21eb-11e6-8e1b-0e3a376473ab/viz.json';
        cartodb.createLayer(map_object, vizjson).addTo(map_object);
}