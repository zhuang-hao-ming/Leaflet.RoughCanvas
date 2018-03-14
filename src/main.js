

import rough from '../node_modules/roughjs/src/index'


var RoughCanvas = L.Canvas.extend({
	_initContainer: function () {

		L.Canvas.prototype._initContainer.call(this)
		this._rc = rough.canvas(this._container)
	},

	_updatePoly: function (layer, closed) {


		if (!this._drawing) { return; }

		var i, j, len2, p,
			parts = layer._parts,
			len = parts.length,
			ctx = this._ctx;

		if (!len) { return; }

		this._drawnLayers[layer._leaflet_id] = layer;


		//------------------------ rough sketch begin

		var svgPathStr = L.SVG.pointsToPath(parts, closed);
		console.log(closed)

		var options = layer.options;
		var pathOption = {}


		pathOption.roughness = options.roughness || 1;
		pathOption.bowing = options.bowing || 1;
		pathOption.stroke = options.strokeColor || '#000000';
		pathOption.strokeWidth = options.strokeWidth || 1;
		if (closed) {
			pathOption.fill = options.fillColor || options.color;
			pathOption.fillStyle = options.fillStyle || '';
			pathOption.fillWeight = options.fillWeight || '';
			pathOption.hachureAngle = options.hachureAngle || -41;
			pathOption.hachureGap = options.hachureGap || 4;
			// pathOption.simplification = options.simplification || 1;
		}
		pathOption.curveStepCount = options.curveStepCount || 9;
		
		console.log(pathOption)
		this._rc.path(svgPathStr, pathOption)

		// //----------------------------- rough sketch end

	},
})

L.Canvas.RoughCanvas = RoughCanvas

L.Canvas.roughCanvas = () => {
	return new RoughCanvas()
}
