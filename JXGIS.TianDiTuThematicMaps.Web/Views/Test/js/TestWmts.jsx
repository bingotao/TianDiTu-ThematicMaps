﻿var map;
$(window).load(function () {
    var vec = L.tileLayer.TDTJX({ type: 'vec' });
    var vec_anno = L.tileLayer.TDTJX({ type: 'vec_anno' });

    map = L.map('map', {
        crs: L.CRS.TDT_EPSG4326,
        center: [30.75, 120.75],
        zoom: 19
    })
    map.addLayer(vec);

    circle = L.circle([30.75, 120.75], 100).addTo(map);
    map.on('click', function (e) {
        console.log(e.latlng);
    });
}); 