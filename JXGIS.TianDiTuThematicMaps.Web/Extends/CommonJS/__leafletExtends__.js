function __leafletExtends__() {
	if (L) {
		if (LatLon) {
			L.Circle.include({
				toGeoJSON2: function (multi) {
					var pointCount = (multi || 1) * 36;

					var lat = this._latlng.lat;
					var lng = this._latlng.lng;
					var radius = this.options.radius;
					var center = LatLon(lat, lng);

					var latlng = [];

					var bearing = 360 / pointCount;
					for (var i = 0; i <= 360 ; i += bearing) {
						var p = center.destinationPoint(radius, i);
						latlng.push([p.lon, p.lat]);
					}

					return L.GeoJSON.getFeature(this, {
						type: 'Polygon',
						coordinates: [latlng]
					});
				}
			});
		}

		//扩展Draw组件
		if (L.Draw) {
			L.Draw.Feature.include({
				_fireCreatedEvent: function (layer) {
					var data = { layer: layer, layerType: this.type };

					//创建要素后触发
					this.fire(L.Draw.Event.CREATED, data);

					this._map.fire(L.Draw.Event.CREATED, data);
				},
				toggleEnable: function () {
					this._enabled ? this.disable() : this.enable();
				}
			});
			/*
			创建绘制工具
			使用方法：
				var draw = L.Draw.initDraw('polygon').on(L.Draw.Event.CREATED, function (e) {
								e.layer.addTo(map);
						   });
				draw.enable();
			*/
			L.Draw.include({
				initDraw: function (map, type, options) {
					var constructor = L.Draw.Marker;
					type = type.toLowerCase();
					switch (type) {
						case 'circle':
							constructor = L.Draw.Circle;
							break;
						case 'polyline':
							constructor = L.Draw.Polyline;
							break;
						case 'polygon':
							constructor = L.Draw.Polygon;
							break;
						case 'rectangle':
							constructor = L.Draw.Rectangle;
							break;
						default:
							constructor = L.Draw.Marker;
					}
					return new constructor(map, options);
				}
			});
		}
	}
}

__leafletExtends__();