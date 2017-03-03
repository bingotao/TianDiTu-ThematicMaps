; function __leafletExtends__() {
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
        /*
        嘉兴天地图扩展
        使用：
            var vec = L.tileLayer.TDTJX({type: 'vec'});
            var vec_anno = L.tileLayer.TDTJX({type: 'vec_anno'});
            map = L.map('map', {
                crs: L.CRS.TDT_EPSG4326,
                center: [30.75, 120.75],
                zoom: 19
            })
            map.addLayer(vec);
            map.addLayer(vec_anno);
        */
        L.TileLayer.TDTJX = L.TileLayer.extend({
            urls: {
                vec: {
                    g: {
                        url: 'http://t0.tianditu.com/vec_c/wmts',
                        options: {
                            layer: 'vec',
                            tilematrixSet: "c",
                            format: "tile"
                        }
                    },
                    s: {
                        url: 'http://srv.zjditu.cn/ZJEMAP_2D/wmts',
                        options: {
                            layer: 'ZJEMAP_2D',
                            tilematrixSet: "esritilematirx",
                            format: "image/png"
                        }
                    },
                    d: {
                        url: 'http://220.191.220.90/JXEMAP/service/wmts',
                        options: {
                            layer: 'JXEMAP',
                            tilematrixSet: "TileMatrixSet0",
                            format: "image/png"
                        }
                    }
                },
                vec_anno: {
                    g: {
                        url: 'http://t0.tianditu.com/cva_c/wmts',
                        options: {
                            layer: 'cva',
                            tilematrixSet: "c",
                            format: "tile"
                        }
                    },
                    s: {
                        url: 'http://srv.zjditu.cn/ZJEMAPANNO_2D/wmts',
                        options: {
                            layer: 'ZJEMAPANNO_2D',
                            tilematrixSet: "esritilematirx",
                            format: "image/png"
                        }
                    },
                    d: {
                        url: 'http://220.191.220.90/JXEMAPANNO/service/wmts',
                        options: {
                            layer: 'JXEMAPANNO',
                            tilematrixSet: "TileMatrixSet0",
                            format: "image/png"

                        }
                    }
                },
                img: {
                    g: {
                        url: 'http://t0.tianditu.com/img_c/wmts',
                        options: {
                            layer: 'img',
                            tilematrixSet: "c",
                            format: "tile"
                        }
                    },
                    s: {
                        url: 'http://srv.zjditu.cn/ZJDOM_2D/wmts',
                        options: {
                            layer: 'ZJDOM_2D',
                            tilematrixSet: "esritilematirx",
                            format: "image/jpeg"
                        }
                    },
                    d: {
                        url: 'http://220.191.220.90/JXIMG/service/wmts',
                        options: {
                            layer: 'JXIMG',
                            tilematrixSet: "TileMatrixSet0",
                            format: "image/png"
                        }
                    }
                },
                img_anno: {
                    g: {
                        url: 'http://t0.tianditu.com/cia_c/wmts',
                        options: {
                            layer: 'cia',
                            tilematrixSet: "c",
                            format: "tile"
                        }
                    },
                    s: {
                        url: 'http://srv.zjditu.cn/ZJDOMANNO_2D/wmts',
                        options: {
                            layer: 'ZJDOMANNO_2D',
                            tilematrixSet: "esritilematirx",
                            format: "image/png"
                        }
                    },
                    d: {
                        url: 'http://220.191.220.90/JXIMGANNO/service/wmts',
                        options: {
                            layer: 'JXIMGANNO',
                            tilematrixSet: "TileMatrixSet0",
                            format: "image/png"

                        }
                    }
                }
            },
            initialize: function (options) {
                this.type = options.type;
                this.options.maxZoom = 20;
                this.options.minZoom = 2;
                var titleSize = 256;
                var baseOption = {
                    width: titleSize,
                    height: titleSize,
                    service: 'WMTS',
                    request: 'GetTile',
                    version: '1.0.0',
                    tileSize: 256,
                    style: "default",
                    errorTileUrl: "http://10.73.1.48/geosoc/Content/img/error.png"
                };
                for (var n in this.urls) {
                    var urlCfg = this.urls[n];
                    for (var m in urlCfg) {
                        urlCfg[m].options = L.extend(urlCfg[m].options, baseOption);
                    }
                }
                this.matrixIds = this.getDefaultMatrix();
            },
            onAdd: function (map) {
                L.TileLayer.prototype.onAdd.call(this, map);
            },
            getTileUrl: function (tilePoint) {
                var map = this._map;
                crs = map.options.crs;
                tileSize = 256;
                nwPoint = tilePoint.multiplyBy(tileSize);

                nwPoint.x += 1;
                nwPoint.y -= 1;
                zoom = tilePoint.z;

                sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
                nw = crs.project(map.unproject(nwPoint, zoom));
                se = crs.project(map.unproject(sePoint, zoom));
                tilewidth = se.x - nw.x;

                ident = this.matrixIds[zoom].identifier;
                X0 = this.matrixIds[zoom].topLeftCorner.lng;
                Y0 = this.matrixIds[zoom].topLeftCorner.lat;
                tilecol = Math.floor((nw.x - X0) / tilewidth);
                tilerow = -Math.floor((nw.y - Y0) / tilewidth);

                var urlOption = this.getUrlOption(this.type, zoom);
                var url = urlOption.url;
                url = L.Util.template(url, { s: this._getSubdomain(tilePoint) });
                return url + L.Util.getParamString(urlOption.options, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow + "&tilecol=" + tilecol;
            },
            getUrlOption: function (type, zoom) {
                return this._getUrlOptionsByZoom(this.urls[type], zoom);
            },
            _getUrlOptionsByZoom: function (opt, zoom) {
                //0-13级使用国家服务
                if (zoom < 14) return opt.g;
                    //14-17级使用省厅服务
                else if (zoom < 18) return opt.s;
                    //18-20级使用地市级
                else return opt.d;
            },
            setParams: function (params, noRedraw) {
                L.extend(this.wmtsParams, params);
                if (!noRedraw) {
                    this.redraw();
                }
                return this;
            },
            getDefaultMatrix: function () {
                var matrixIds = new Array(22);
                for (var i = 0; i < 22; i++) {
                    matrixIds[i] = {
                        identifier: "" + i,
                        topLeftCorner: new L.LatLng(90, -180)
                    };
                }
                return matrixIds;
            }
        });
        /*
            options:{
                type:'vec'['vec_anno','img','img_anno']
            }
        */
        L.tileLayer.TDTJX = function (options) {
            return new L.TileLayer.TDTJX(options);
        };

        L.CRS.TDT_EPSG4326 = L.extend({
        }, L.CRS.Earth, {
            code: 'EPSG:4326',
            projection: L.Projection.LonLat,
            transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
        });

        /*
        扩展Draw
        组件*/
        if (L.Draw) {
            L.Draw.Feature.include({
                _fireCreatedEvent: function (layer) {
                    var data = {
                        layer: layer, layerType: this.type
                    };

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
                           },this);
                draw.enable();
            */
            L.Draw.initDraw = function (map, type, options) {
                var constructor = L.Draw.Marker;
                type = (type && type.toLowerCase) ? type.toLowerCase() : null;
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
            };

            //修改默认提示为中文
            L.drawLocal = {
                draw: {
                    toolbar: {
                        actions: {
                            title: '取消',
                            text: '取消'
                        },
                        finish: {
                            title: '完成',
                            text: '完成'
                        },
                        undo: {
                            title: '删除最后一个点',
                            text: '删除最后一个点'
                        },
                        buttons: {
                            polyline: '线',
                            polygon: '多边形',
                            rectangle: '矩形',
                            circle: '圆',
                            marker: '点'
                        }
                    },
                    handlers: {
                        circle: {
                            tooltip: {
                                start: '点击并拖动以绘制圆'
                            },
                            radius: '半径'
                        },
                        marker: {
                            tooltip: {
                                start: '点击放置点'
                            }
                        },
                        polygon: {
                            tooltip: {
                                start: '点击开始绘制',
                                cont: '点击继续绘制',
                                end: '双击结束绘制'
                            }
                        },
                        polyline: {
                            error: '<strong>错误:</strong>图形边界不能相交!',
                            tooltip: {
                                start: '点击开始绘制线',
                                cont: '点击继续绘制',
                                end: '双击结束绘制'
                            }
                        },
                        rectangle: {
                            tooltip: {
                                start: '点击并拖动以绘制矩形'
                            }
                        },
                        simpleshape: {
                            tooltip: {
                                end: '释放鼠标以完成绘制'
                            }
                        }
                    }
                },
                edit: {
                    toolbar: {
                        actions: {
                            save: {
                                title: '保存更改',
                                text: '保存'
                            },
                            cancel: {
                                title: '放弃编辑，放弃所有的更改。',
                                text: '取消'
                            }
                        },
                        buttons: {
                            edit: '编辑图层',
                            editDisabled: '停止编辑',
                            remove: '删除图层',
                            removeDisabled: '没有可以删除的图层'
                        }
                    },
                    handlers: {
                        edit: {
                            tooltip: {
                                text: '拖动节点进行编辑',
                                subtext: '点击取消以放弃更改'
                            }
                        },
                        remove: {
                            tooltip: {
                                text: '点击要素进行平移'
                            }
                        }
                    }
                }
            };

        }
    }
};
__leafletExtends__();
