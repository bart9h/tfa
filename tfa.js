
function render_pol (pol)
{//
	var x_pos = 40;
	var y_pos = 80;
	var padding = 6; //TODO: usar largura do whitespace

	function add_text (str, sty)
	{//
		var svgns = 'http://www.w3.org/2000/svg';
		var el = document.createElementNS (svgns, 'text');

		el.appendChild (document.createTextNode (str));

		var svg = document.getElementById ('polinomio');
		svg.appendChild (el);

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

		x_pos += bbox.width + padding;
	}//

	function sig (x)
	{//
		return x < 0 ? x : ('+' + x);
	}//

	add_text ('p(x) = ');
	x_pos += padding;
	var i;
	for (i = pol.length-1; i >= 0; --i) {
		if (pol[i] == 0)
		continue;

		add_text ((i == pol.length-1) ? pol[i] : sig(pol[i]));
		if (i != 0) {
			add_text ('.', 'exp');
			add_text ('x');
			if (i != 1)
				add_text (i, 'exp');
		}
	}
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

// vim600:fdm=marker:fmr={//,}//:
