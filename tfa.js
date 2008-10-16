
var g;

function init (size)
{//
	g = new Object;
	g.state = 0;
	g.t = 0;
	g.size = size;

	g.svgns = 'http://www.w3.org/2000/svg';
	g.svg = document.getElementById ('polinomio');

	var el = document.createElementNS (g.svgns, 'text');
	el.appendChild (document.createTextNode ('-'));
	g.svg.appendChild (el);
	var bbox = el.getBBox();
	g.padding = bbox.width;
	g.svg.removeChild (el);

	exemplo_1();
}//

function render_pol (pol)
{//
	var x_pos = 0;
	var y_pos = 0;
	var group = document.createElementNS (g.svgns, 'g');
	g.svg.appendChild (group);

	function add_text (str, sty)
	{//
		var el = document.createElementNS (g.svgns, 'text');

		el.appendChild (document.createTextNode (str));

		group.appendChild (el);

		el.firstChild.nodeValue = str;
		var bbox = el.getBBox();

		el.setAttribute ('x', x_pos);
		if (sty != 'exp') {
			el.setAttribute ('y', y_pos);
		}
		else {
			el.setAttribute ('y', y_pos - bbox.height/2);
			el.setAttribute ('class', sty);
		}

		x_pos += bbox.width + g.padding;
	}//

	function sig (x)
	{//
		return x < 0 ? x : ('+' + x);
	}//

	add_text ('p(x) = ');
	x_pos += g.padding;
	var i;
	var first = true;
	for (i = pol.length-1; i >= 0; --i) {
		if (pol[i] == 0)
		continue;

		add_text (first ? pol[i] : sig(pol[i]));
		first = false;
		if (i != 0) {
			add_text ('.', 'exp');
			add_text ('x');
			if (i != 1)
				add_text (i, 'exp');
			x_pos += g.padding;
		}
	}

	// align to center
	var bbox = group.getBBox();
	var x = (g.size - bbox.width)/2;
	var y = (g.size - bbox.height)/2;
	group.setAttribute ('transform', 'translate('+x+','+y+')');
}//

function calcula_pol (pol, x)
{//
	var y = 0;

	var i;
	for (i = 0; i < pol.length; ++i) {
		y += pol[i] * Math.pow(x,i);
	}

	return y;
}//

function exemplo_1()
{// 5x^3 -3x^2 -x +7

	var pol = new Array (7, -1, -3, 5);

	var y = calcula_pol (pol, 2);
	render_pol (pol);
}//

function tick()
{//
	t += .05;
}//

function avanca()
{//
	window.setInterval (tick, 20);
}//

// vim600:fdm=marker:fmr={//,}//:
