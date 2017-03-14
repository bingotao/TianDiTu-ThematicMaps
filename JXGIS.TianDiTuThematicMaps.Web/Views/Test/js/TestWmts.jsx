__leafletExtends__();


var TextGridLayer = L.GridLayer.extend({
    createTile: function (coords) {
        var tile = L.DomUtil.create('div', 'test-tile');
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        tile.innerHTML = coords.x + '|' + coords.y + '|' + coords.z;
        return tile;
    }
});

var map;
$(window).load(function () {

    center = [30.75, 120.75];

    map = L.map('map', {
        preferCanvas: true,
        crs: L.CRS.EPSG4490,
        //center: [30.75, 120.75],
        center: center,
        zoom: 19
    })

    L.tileLayer.TDTJX({ type: 'img' }).addTo(map);
    L.tileLayer.TDTJX({ type: 'img_anno' }).addTo(map);

    map.createPane('aa');
    L.marker(center, { icon: new L.divIcon() }).addTo(map);
    circle = L.circle(center, 100, { pane: 'aa' })//.addTo(map);
    map.on('click', function (e) {
        console.log(e.latlng);
    });

    new TextGridLayer().addTo(map);
    polygon = L.geoJSON(circle.toGeoJSON2(4)).addTo(map);

    drawPolygon = L.Draw.initDraw(map, 'polygon', { showArea: true, repeatMode: true });
    drawPolyline = L.Draw.initDraw(map, 'polyline');
    drawRectangle = L.Draw.initDraw(map, 'rectangle', { showRadius: true });
    drawMarker = L.Draw.initDraw(map);
    drawCircle = L.Draw.initDraw(map, 'circle', { showRadius: true });
}); 