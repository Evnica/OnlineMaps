/**
 * Project: OnlineMaps
 * Author: Evnica
 * Date: 17.04.2016
 * Version: 0.1
 */

var canvas, context, radius, gradient;

function createClock()
{
    canvas = document.getElementById("clockCanvas"); //Create a canvas object from the HTML canvas element
    context = canvas.getContext('2d'); //Create a 2d drawing object for the canvas object
    radius = canvas.height / 2; //Using the canvas height to calculate the clock radius, makes the clock work for all canvas sizes.
    context.translate(radius, radius); //Remap the (0,0) position of the drawing object to the center of the canvas
    radius = radius * 0.9;
}

function drawClock()
{
    drawFace();
    drawNumbers();
    drawHands();
}

function drawFace()
{
    context.beginPath();
    context.arc(0, 0, radius, 0, 2*Math.PI); //arc(centerX, centerY, radius, startAngle, endAngle, counterclockwise)
    context.fillStyle = 'white';
    context.fill();

    gradient = context.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05);
    //Create 3 color stops, corresponding with the inner, middle, and outer edge of the arc:
    gradient.addColorStop(0,"#003300");
    gradient.addColorStop(0.5, "#e6ffe6");
    gradient.addColorStop(1, "#003300");
    context.strokeStyle = gradient; //Define the gradient as the stroke style of the drawing object
    context.lineWidth = radius * 0.1; //Define the line width of the drawing object (10% of radius)
    context.stroke(); //Draw the circle

    context.beginPath();
    context.arc(0, 0, radius*0.07, 0, 2*Math.PI);
    context.fillStyle = "#003300";
    context.fill();

}

function drawNumbers()
{
    var angle, number;

    context.font = radius * 0.25 + "px + arial, sans-serif";
    //Set the text alignment to the middle and the center of the print position:
    context.textBaseline = "middle";
    context.textAlign = "center";

    for (number = 1; number < 13; number++)
    {
        angle = number * Math.PI / 6; //numbers must be placed every 30 degrees starting with 30 degrees
        context.rotate(angle);
        context.translate(0, -radius*0.75);
        context.rotate(-angle);
        context.fillText(number.toString(), 0, 0);
        context.rotate(angle);
        context.translate(0, radius*0.75);
        context.rotate(-angle);
    }
}

function drawHands()
{
    var now, hour, minute, second;
    now = new Date();
    hour = now.getHours();
    minute = now.getMinutes();
    second = now.getSeconds();
    hour = hour % 12; //full hour in 12-hour system
    //calculate hour hand position in degrees
    hour = (hour * Math.PI / 6) + (minute * Math.PI / 360 /*6*60*/) + (second*Math.PI / 21600 /*360*60*/);
    drawHand(hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI / 30) + (second*Math.PI / 1800 /*30*60*/);
    drawHand(minute, radius * 0.73, radius * 0.04);
    second = second*Math.PI / 30;
    drawHand(second, radius * 0.8, radius * 0.02);
}

function drawHand(position, length, width)
{
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0, 0);
    context.rotate(position);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-position);
}