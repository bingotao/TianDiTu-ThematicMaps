class Map extends React.Component {
    constructor(props) {
        super(props);
        this.center = [30.76366907304589, 120.75013160705568];
        this.layers = {};
    }

    getIcon(layerName) {
        var icon = this.props.layerConfig[layerName];
        return icon || this.props.layerConfig['default'];
    }

    initMap() {
        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        var baseLayers = {
            vec: {
                anno: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}", { subdomains: subdomains }),
                base: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}", { subdomains: subdomains })
            },
            img: {
                anno: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}", { subdomains: subdomains }),
                base: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}", { subdomains: subdomains })
            }
        };

        var vecGroup = L.layerGroup([baseLayers.vec.base, baseLayers.vec.anno]);
        var imgGroup = L.layerGroup([baseLayers.img.base, baseLayers.img.anno]);
        this.vecGroup = vecGroup;
        this.imgGroup = imgGroup;

        var map = L.map('map', {
            attributionControl: false,
            zoomControl: false,
            center: this.center,
            layers: [
                vecGroup
            ],
            zoom: 13
        });

        map.createPane('GovLayersPane');

        L.control.zoom({ position: 'topright', zoomInTitle: '方大', zoomOutTitle: '缩小' }).addTo(map);
        L.control.scale({ position: 'bottomright' }).addTo(map);
        this.map = map;
    }

    toggleBaseMap(vec) {
        vec = !!vec;
        if (vec) {
            this.imgGroup.remove();
            this.vecGroup.addTo(this.map);
        } else {
            this.vecGroup.remove();
            this.imgGroup.addTo(this.map);
        }
    }

    panBy(point) {
        this.map.panBy(point);
    }

    getLayer(layerName) {
        return this.layers[layerName];
    }

    removeLayer(layerName) {
        var layer = this.getLayer(layerName);
        if (layer) {
            layer.remove(this.map);
        }
    }

    resetLayers(layerNames) {
        for (var n in this.layers) {
            var layer = this.layers[n];
            this.removeLayer(n);
        }

        for (var i = 0, l = layerNames.length; i < l; i++) {
            this.addLayer(layerNames[i]);
        }
    }

    addLayer(layerName) {
        var layer = this.getLayer(layerName);
        if (layer) {
            layer.addTo(this.map);
        }
        else {
            $.post('GetLayer', { layerName: layerName }, function (rt) {
                var obj = JSON.parse(rt);
                if (obj.ErrorMessage) {
                    antd.message.error(obj.ErrorMessage);
                } else {
                    var layer = obj.Data;
                    var cls = layer.MarkerSymbolClass;
                    var fts = layer.FeatureCollection;
                    var alias = layer.FieldAlias;
                    var layerName = layer.LayerName;

                    var icon = this.getIcon(layerName);

                    var popup = ContentPopup.getPopup();

                    var l = L.geoJSON(fts, {
                        onEachFeature: function (ft, layer) {
                            layer.setIcon(icon);
                            layer.alias = alias;
                        }
                    }, { pane: 'GovLayersPane' }).bindPopup(popup);

                    l.on('popupopen', function (e) {
                        var props = e.layer.feature.properties;
                        var alias = e.layer.alias;
                        ContentPopup.setContent({
                            props: props,
                            alias: alias
                        });
                    });

                    this.layers[layerName] = l;
                    this.addLayer(layerName);
                }
            }.bind(this), 'json');
        }
    }

    componentDidMount() {
        this.initMap();
    }

    render() {
        return (
        <div id="map">

        </div>
        );
    }
}