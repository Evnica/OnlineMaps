/**
 * Inspired by html5demos: https://github.com/remy/html5demos/blob/master/demos/canvas.html
 * Adapted by Evnica on 13.04.2016.
 */

function buildSpinner(data) {

    var canvas = document.getElementById('clockSpinner'); //locate the spinner
    var context = canvas.getContext("2d"),
        i = 0, //counter
        degrees = 60,           //number of sectors to draw in a circle

        degreesList = [];       //list of ordinal numbers of sectors
        for (i = 0; i < degrees; i++)
        {
            degreesList.push(i); //add to an array numbers from 0 to degrees-1 (0 to 59, 1 item per second)
        }

    i = 0; //reset counter

    window.canvasTimer = setInterval(draw, 1000); //set the frequency of picture appearance 1 per second


    function draw() {
        var color, start, end;
        var currentDegree;
        if (i == 0)
        {
            reset();
        }
        context.save();
        currentDegree = degreesList[i]; //0 in the first iteration
        color = Math.floor(255/degrees*i*2.5);
        context.strokeStyle = 'rgb(' + color + ', ' + 210 + ', ' + 0 + ')';

        context.lineWidth = data.size;
        context.beginPath();
        start = Math.floor(360/degrees*(currentDegree) - 90); //start at the top: 90 degrees, 12 o'clock
        end = Math.floor(360/degrees*(currentDegree+1)) - 89;
        //context.arc(x, y, r, sAngle, eAngle, counterclockwise);
        context.arc(data.x, data.y, data.size, (Math.PI/180)*start, (Math.PI/180)*end, false);
        context.stroke();
        context.restore();
        i++;
        if (i >= degrees)
        {
            i = 0;
        }
    }
    function reset() {
        context.clearRect(0,0,150,150); // clear canvas around the spinner
    }
}