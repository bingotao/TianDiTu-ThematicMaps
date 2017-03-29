class EduMap extends React.Component {
    constructor(props) {
        super(props);

        this.opts = {
            mapConfig: props.mapConfig,
            eduConfig: props.eduConfig
        };

    }

    initMap() {
        var cThis = this;

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

        this.icons = {
            residence: L.divIcon({ className: "residence-icon iconfont icon-xiaoqu1", iconSize: [26, 26] }),
            x_xq: {
                color: '#ff5500',
                weight: 2,
                opacity: 0.6,
                fillOpacity: 0.1
            },
            c_xq: {
                color: '#a80085',
                weight: 2,
                opacity: 0.6,
                fillOpacity: 0.1
            }
        };

        var graphicsLayer = L.geoJSON(null, {
            onEachFeature: function (feature, layer) {
                layer.setStyle(this.icons[feature.properties.SType]);
                layer.bindPopup(EduSchoolAreaPopup.getPopup()).on('popupopen', function (e) {
                    var props = e.target.feature.properties
                    EduSchoolAreaPopup.setContent(props);
                }.bind(this));
            }.bind(this)
        }).addTo(map);
        this.graphicsLayer = graphicsLayer;

        var residenceLayer = L.geoJSON(null, {
            onEachFeature: function (feature, layer) {
                layer.setIcon(cThis.icons.residence);
                layer.bindPopup(ResidencePopup.getPopup()).on('popupopen', function (e) {
                    var props = e.target.feature.properties
                    ResidencePopup.setContent(props);
                }.bind(this));
            }
        }).addTo(map);
        this.residenceLayer = residenceLayer;
    }

    addResidence(features) {
        this.cleareResidenceLayer();
        this.residenceLayer.addData(features);
        this.map.closePopup();
        var bounds = this.residenceLayer.getBounds();
        if (bounds)
            this.map.fitBounds(bounds, { paddingTopLeft: [100, 0] });
    }

    cleareResidenceLayer() {
        this.residenceLayer.clearLayers();
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
            var cfg = layerCfg[layer.Type];
            if (cfg) {
                cfg.layer = L.geoJSON(layer.Features, {
                    onEachFeature: function (ft, layer) {
                        var sType = ft.properties.SType;

                        if (!sType) {
                            var icon = this.getSchoolIcon("gov");
                            layer.setIcon(icon).bindTooltip(
                                '<span class="schoolname-tip gov-tip-on">' + (ft.properties.ShortName || ft.properties.Name) + '</span>',
                                {
                                    direction: "right",
                                    permanent: true
                                });
                            return;
                        }

                        switch (sType) {
                            case "x_xq":
                            case "c_xq":
                                layer.setStyle(this.icons[sType]);
                                break;
                            default:
                                var icon = this.getSchoolIcon(sType);
                                layer.setIcon(icon).bindTooltip(
                                    '<span class="schoolname-tip ' + sType + '-tip-on">' + (ft.properties.ShortName || ft.properties.Name) + '</span>',
                                    {
                                        direction: "right",
                                        permanent: true
                                    });

                        }
                    }.bind(this)
                });

                if (layer.Type === "x_xq" || layer.Type === "c_xq" ) {
                    //绑定学区popup
                    var popup = EduSchoolAreaPopup.getPopup();
                    cfg.layer
                       .bindPopup(popup)
                       .on('popupopen', function (e) {
                           EduSchoolAreaPopup.setContent(e.layer.feature.properties);
                       }.bind(this));

                } else {
                    //绑定学校popup
                    var popup = EduSchoolPopup.getPopup();
                    cfg.layer
                       .bindPopup(popup)
                       .on('popupopen', function (e) {
                           
                           this.setSchoolPopupContent(e.layer.feature.properties);
                       }.bind(this));
                }

                cfg.on ? this.turnLayerOn(layer.Type) : this.turnLayerOff(layer.Type);
            }
        }
    }

    setSchoolPopupContent(content) {
        EduSchoolPopup.getPopupContent().state.SType = null;
        EduSchoolPopup.getPopupContent().setContent(content);
    }

    turnLayer(type, on) {
        on ? this.turnLayerOn(type) : this.turnLayerOff(type);
    }

    turnLayerOn(type) {
        this.$map.addClass(type + '-on');
        this.opts.eduConfig.Layers[type].layer.addTo(this.map);
    }

    toggleAllLayers(on) {
        for (var type in this.opts.eduConfig.Layers) {
            var layer = this.opts.eduConfig.Layers[type];
            if (on) {
                this.$map.addClass(type + '-on');
                this.opts.eduConfig.Layers[type].layer.addTo(this.map);
            } else {
                this.$map.removeClass(type + '-on');
                this.opts.eduConfig.Layers[type].layer.remove();
            }
        }
    }

    turnLayerOff(type) {
        this.$map.removeClass(type + '-on');
        this.opts.eduConfig.Layers[type].layer.remove();
    }

    componentDidMount() {
        this.$map = $('#map');
        this.initMap();
        this.initLayers();

        this.refs.rLayerToggle.on('change', function (e) {
            var bVec = e.data.vec;
            this.showBaseLayer(bVec ? 'vec' : 'img', true);
        }.bind(this));

        this.refs.rClearBtn.on('onClick', function () {
            this.clearMap();
        }.bind(this));
    }

    clearMap() {
        this.map.closePopup();
        EduSchoolPopup.clearMarker();
        ResidencePopup.clearMarker();
        this.graphicsLayer.clearLayers();
        this.cleareResidenceLayer();
    }

    showSchoolPopup(school) {
        var map = this.map,
            center = [school.Lat, school.Lng];
        map.setView(center);
        var marker = L.marker(center, { icon: this.getSchoolIcon(school.SType, true), zIndexOffset: 999999 }).addTo(map);
        !EduSchoolPopup.marker || EduSchoolPopup.marker.remove();
        EduSchoolPopup.marker = marker;
        EduSchoolPopup.getPopupContent().setContent(school);
        var popup = EduSchoolPopup.getPopup();
        marker.bindPopup(popup).openPopup();
    }

    showResidencePopup(residence) {
        var map = this.map,
            center = [parseFloat(residence.Y), parseFloat(residence.X)];
        map.setView(center);
        var marker = L.marker(center, { icon: this.icons.residence, zIndexOffset: 999999 }).addTo(map);
        !ResidencePopup.marker || ResidencePopup.marker.remove();
        ResidencePopup.marker = marker;
        ResidencePopup.setContent(residence);
        var popup = ResidencePopup.getPopup();
        marker.bindPopup(popup).openPopup();
    }

    showSchoolArea(schoolID, lat, lng, stype) {
        $.post('GetSchoolArea',
            {
                schoolID: schoolID,
                lat: lat,
                lng: lng,
                stype: stype
            },
            function (ro) {
                ro = JSON.parse(ro);
                if (ro.ErrorMessage) {
                    antd.message.error(ro.ErrorMessage);
                } else {
                    var data = ro.Data;
                    this.graphicsLayer.clearLayers().addData(data).bringToFront();
                    this.showSchoolPopup(data.features[0].properties.School);
                }
            }.bind(this), 'json');
    }

    render() {
        return (
        <div className="edu-map">
            <EduBaseLayerToggle ref='rLayerToggle' vec={this.opts.mapConfig.ShowBaseLayer.Type == 'vec'} />
            <EduClearButton ref='rClearBtn' />
            <div id="map" ref="mapDOM"></div>
        </div>);
    }
}