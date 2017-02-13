class EduMap extends React.Component {
    constructor(props) {
        super(props);

        this.opts = {
            mapConfig: props.mapConfig,
            eduConfig: props.eduConfig
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
            zoomControl: false,
            center: [
                mapConfig.InitPosition.Y,
                mapConfig.InitPosition.X
            ],
            layers: [
                opts.baseLayers.vec.base,
                opts.baseLayers.vec.anno,
                opts.baseLayers.img.base,
                opts.baseLayers.img.anno
            ],
            zoom: mapConfig.InitPosition.Zoom
        });
        map.on('zoomend', this.changeSchoolTip.bind(this));

        L.control.zoom({
            position: 'topright',
            zoomInTitle: '放大',
            zoomOutTitle: '缩小'
        }).addTo(map);

        L.control.scale({ imperial: false }).addTo(map);
        this.map = map;
        var showBaseLayer = mapConfig.ShowBaseLayer;
        this.showBaseLayer(showBaseLayer.Type, showBaseLayer.ShowAnno);
    }

    changeSchoolTip(e) {
        var zoom = this.map.getZoom();
        var cls = "schooltip-on";
        zoom >= (this.opts.eduConfig.SchoolTipLevel || 16) ?
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

    getSchoolIcon(stype, always) {
        if (always) {
            return L.divIcon({ className: "school-icon always " + stype, iconSize: [22, 22] });
        }

        if (!this.schoolIcons) {
            this.schoolIcons = {};
        }

        if (!this.schoolIcons[stype]) {
            this.schoolIcons[stype] = L.divIcon({ className: "school-icon " + stype, iconSize: [22, 22] });
        }

        return this.schoolIcons[stype];
    }

    addLayers(layers) {
        var layerCfg = this.opts.eduConfig.Layers;
        for(let layer of layers) {
            var cfg = layerCfg[layer.SType];
            if (cfg) {
                cfg.layer = L.geoJSON(layer.Schools, {
                    onEachFeature: function (ft, layer) {
                        var sType = ft.properties.SType;
                        if (sType === "x_xq" || sType === "c_xq") {
                            // 学区样式
                        } else {
                            var icon = this.getSchoolIcon(sType);
                            layer.setIcon(icon).bindTooltip(
                                '<span class="schoolname-tip ' + sType + '-tip-on">' + (ft.properties.ShortName || ft.properties.Name) + '</span>',
                                {
                                    direction: "right",
                                    permanent: true
                                });
                        }
                    }.bind(this)
                }).addTo(this.map);

                if (layer.SType === "x_xq" || layer.SType === "c_xq") {
                    //绑定学区popup
                } else {
                    //绑定学校popup
                    var popup = EduSchoolPopup.getPopup();
                    cfg.layer
                       .bindPopup(popup)
                       .on('popupopen', function (e) {
                           this.setSchoolPopupContent(e.layer.feature.properties);
                       }.bind(this));
                }

                cfg.on ? this.turnLayerOn(layer.SType) : this.turnLayerOff(layer.SType);
            }
        }
    }

    setSchoolPopupContent(content) {
        EduSchoolPopup.getPopupContent().setContent(content);
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

        this.refs.rLayerToggle.on('change', function (e) {
            var bVec = e.data.vec;
            this.showBaseLayer(bVec ? 'vec' : 'img', true);
        }.bind(this));
    }

    showSchoolPopup(school) {
        var map = this.map;
        var center = [school.Lat, school.Lng];
        map.setView(center);
        var marker = L.marker(center, { icon: this.getSchoolIcon(school.SType, true), zIndexOffset: 999999 }).addTo(map);
        if (this.schoolMarker) {
            this.schoolMarker.remove();
        }
        this.schoolMarker = marker;
        //marker.on('popupclose', function () {
        //    this.remove();
        //}.bind(marker));
        EduSchoolPopup.getPopupContent().setContent(school);
        var popup = EduSchoolPopup.getPopup();
        marker.bindPopup(popup).openPopup();
    }

    render() {
        return (
        <div className="edu-map">
            <EduBaseLayerToggle ref='rLayerToggle' vec={this.opts.mapConfig.ShowBaseLayer.Type == 'vec'} />
            <div id="map" ref="mapDOM"></div>
        </div>);
    }
}