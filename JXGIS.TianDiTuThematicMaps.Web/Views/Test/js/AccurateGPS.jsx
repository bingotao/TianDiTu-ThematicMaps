class AccurateGPS extends React.Component {
    constructor(props) {
        super(props);
        this.center = {
            lat: 30.76366907304589,
            lng: 120.75013160705568
        };

        this.state = {
            o: null,
            a: null
        };

        this.accurate = this.accurate.bind(this);
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {

        var vec = L.tileLayer.TDTJX({ type: 'vec' });
        var vec_anno = L.tileLayer.TDTJX({ type: 'vec_anno' });
        map = L.map('map', {
            attributionControl: false,
            zoomControl: false,
            crs: L.CRS.EPSG4490,
            center: this.center,
            zoom: 13
        })
        map.addLayer(vec);
        map.addLayer(vec_anno)

        L.control.zoom({ position: 'topright', zoomInTitle: '放大', zoomOutTitle: '缩小' }).addTo(map);
        this.map = map;

        this.icons = {
            origin: L.divIcon({ className: 'origin' }),
            accurate: L.divIcon({ className: 'accurate' }),
        };

        this.accurate();
    }

    clearPoints() {
        this.originMarker && this.originMarker.remove();
        this.accurateMarker && this.accurateMarker.remove();
    }

    addPoints(o, a) {
        this.originMarker = L.marker([o.lat, o.lng], { icon: this.icons.origin }).addTo(this.map);
        this.accurateMarker = L.marker([a.lat, a.lng], { icon: this.icons.accurate }).addTo(this.map);
        this.centerExtend(o, a);

        this.setState({
            o: o,
            a: a
        });
    }

    centerExtend(o, a) {
        var bounds = L.latLngBounds(o, a);
        this.map.fitBounds(bounds);
    }

    accurate() {
        //antd.message.info("正在获取当前坐标...");
        //jxgis.geolocation.get(
        //    function (a) {
        //        antd.message.success("获取位置成功");
        //        var pnt = {
        //            lat: a.coords.latitude,
        //            lng: a.coords.longitude
        //        };
        //        $.post("GetAccurateGPS", pnt, function (rt) {
        //            this.clearPoints();
        //            this.addPoints(pnt, rt);
        //        }.bind(this));
        //    }.bind(this),
        //    function (b) {
        //        antd.message.error(b.message);
        //    }.bind(this));



        //setInterval(function () {
        //    this.map.locate({
        //        watch: true,
        //        setView: false,
        //        maxZoom: false,
        //        timeout: 5000,
        //        maximumAge: 5000,
        //        enableHighAccuracy: true
        //    });
        //}.bind(this), 5000);

        this.map.on('locationfound', function (e) {
            var pnt = {
                lat: e.latlng.lat,
                lng: e.latlng.lng
            };
            $.post("GetAccurateGPS", pnt, function (rt) {
                this.clearPoints();
                this.addPoints(pnt, rt);
            }.bind(this));
        }.bind(this));

        this.map.on('locationerror', function (e) {
            antd.message.error(e.message);
        });

        this.map.locate({
            watch: true,
            setView: false,
            maxZoom: false,
            timeout: 5000,
            maximumAge: 5000,
            enableHighAccuracy: true
        });
    }

    render() {
        var s = this.state;
        if (s.o && s.a) {
            var distance = this.map.distance(s.o, s.a);
            var cCoords = (
                <div className="coords">
                    <table>
                        <tr>
                            <th></th>
                            <th>经度</th>
                            <th>纬度</th>
                        </tr>
                        <tr>
                            <th><span className="origin"></span>&nbsp;原始</th>
                            <td>{s.o.lat}</td>
                            <td>{s.o.lng}</td>
                        </tr>
                        <tr>
                            <th><span className="accurate"></span>&nbsp;纠偏</th>
                            <td>{s.a.lat}</td>
                            <td>{s.a.lng}</td>
                        </tr>
                        <tr>
                            <th>距离差</th>
                            <td colSpan="2">{distance}米</td>
                        </tr>
                    </table>
                </div>
           );
        }

        var cbtn = (<antd.Tooltip placement={"left"} title={"定位纠偏" }>
                <span className="location" onClick={this.accurate }>
                    <antd.Icon type="environment" />
                </span>
        </antd.Tooltip>);

        return (
        <div className="container">

            <div id="map">

            </div>
            {cCoords}
        </div>
            );
    }
}


accurateGPS = ReactDOM.render(<AccurateGPS />, document.getElementById('main'));