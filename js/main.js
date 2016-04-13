


    function buildSpinner(data) {

    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d"),
        i = 0, degrees = data.degrees, loops = 0, degreesList = [];

    for (i = 0; i < degrees; i++) {
        degreesList.push(i);
    }

    // reset
    i = 0;

    // so I can kill it later
    window.canvasTimer = setInterval(draw, 1000/degrees);
    function reset() {
        ctx.clearRect(0,0,100,100); // clear canvas

        var left = degreesList.slice(0, 1);
        var right = degreesList.slice(1, degreesList.length);
        degreesList = right.concat(left);
    }

    function draw() {
        var c, s, e;
        var d = 0;
        if (i == 0) {
            reset();
        }
        ctx.save();
        d = degreesList[i];
        c = Math.floor(255/degrees*i);
        ctx.strokeStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
        ctx.lineWidth = data.size;
        ctx.beginPath();
        s = Math.floor(360/degrees*(d));
        e = Math.floor(360/degrees*(d+1)) - 1;
        ctx.arc(data.x, data.y, data.size, (Math.PI/180)*s, (Math.PI/180)*e, false);
        ctx.stroke();
        ctx.restore();
        i++;
        if (i >= degrees) {
            i = 0;
        }
    }
}


/*
	Strongly Typed by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				hoverDelay: 150,
				hideDelay: 350
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

	});

})(jQuery);
