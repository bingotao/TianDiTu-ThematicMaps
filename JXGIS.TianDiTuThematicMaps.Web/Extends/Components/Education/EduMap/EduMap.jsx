class EduMap extends React.Component {
    constructor(props) {
        super(props);

        this.opts = {
            mapConfig: props.mapConfig
        };

    }

    initMap() {
        var opts = this.opts;
        var mapConfig = opts.mapConfig;

        //init baselayers
        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        opts.baseLayers = {
            vec: {
                anno: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}", { subdomains: subdomains, opacity: 0 }),
                base: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}", { subdomains: subdomains, opacity: 0 })
            },
            img: {
                anno: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}", { subdomains: subdomains, opacity: 0 }),
                base: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}", { subdomains: subdomains, opacity: 0 })
            }
        };

        //init map
        map = L.map(this.refs.mapDOM, {
            attributionControl: false,
            center: [
                mapConfig.InitPosition.Y,
                mapConfig.InitPosition.X
            ],
            layers: [
                opts.baseLayers.vec.base,
                opts.baseLayers.vec.anno,
                opts.baseLayers.img.base,
                opts.baseLayers.img.anno,
            ],
            zoom: mapConfig.InitPosition.Zoom
        });
        map.on('zoomend', this.changeSchoolTip.bind(this));

        map.zoomControl.setPosition('bottomright');
        L.control.scale({ imperial: false }).addTo(map);
        this.map = map;
        var showBaseLayer = mapConfig.ShowBaseLayer;
        this.showBaseLayer(showBaseLayer.Type, showBaseLayer.ShowAnno);
    }

    changeSchoolTip(e) {
        var zoom = this.map.getZoom();
        var cls = "schooltip-on";
        zoom >= (this.opts.mapConfig.SchoolTipLevel || 16) ?
        this.$map.addClass(cls) : this.$map.removeClass(cls);
    }

    showBaseLayer(type, showAnno) {
        showAnno = showAnno === 'undefined' ? true : showAnno;
        var baseLayers = this.opts.baseLayers;
        var bVec = type === "vec" ? 1 : 0;
        var bImg = type === "img" ? 1 : 0;
        var bAnno = showAnno ? 1 : 0;
        baseLayers.vec.base.setOpacity(bVec);
        baseLayers.vec.anno.setOpacity(bVec * bAnno);
        baseLayers.img.base.setOpacity(bImg);
        baseLayers.img.anno.setOpacity(bImg * bAnno);
    }

    initLayers() {
        $.post('GetLayers', function (rt) {
            rt = JSON.parse(rt);
            if (rt.ErrorMessage) {
                antd.message.error(rt.ErrorMessage);
            }
            else {
                this.addLayers(rt.Data);
            }
        }.bind(this));
    }

    addLayers(layers) {
        var layerCfg = this.opts.mapConfig.Layers;
        for(let layer of layers) {
            var cfg = layerCfg[layer.SType];
            if (cfg) {
                cfg.layer = L.geoJSON(layer.Schools, {
                    onEachFeature: function (ft, layer) {
                        var sType = ft.properties.SType;
                        if (sType === "x_xq" || sType === "c_xq") {
                            // 学区样式
                        } else {
                            var icon = L.divIcon({ className: "school-icon " + sType, iconSize: [22, 22] });
                            layer.setIcon(icon).bindTooltip(
                                '<span class="schoolname-tip ' + sType + '-tip-on">' + (ft.properties.ShortName || ft.properties.Name) + '</span>',
                                {
                                    direction: "right",
                                    permanent: true
                                });
                        }
                    }
                }).addTo(this.map);
                cfg.on ? this.turnLayerOn(layer.SType) : this.turnLayerOff(layer.SType);
            }
        }
    }

    turnLayer(type, on) {
        on ? this.$map.addClass(type + '-on') : this.$map.removeClass(type + '-on');
    }

    turnLayerOn(type) {
        this.$map.addClass(type + '-on');
    }

    turnLayerOff(type) {
        this.$map.removeClass(type + '-on');
    }

    componentDidMount() {
        this.$map = $('#map');
        this.initMap();
        this.initLayers();
    }

    render() {
        return (
        <div className="edu-map">
            <div id="map" ref="mapDOM"></div>
        </div>);
    }
}