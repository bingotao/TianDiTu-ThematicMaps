class PlanningPanel extends React.Component {
    constructor(props) {
        super(props);

        this.planningType = {
            drive: 1,
            bus: 0,
            walk: 2
        };

        this.eventList = {
            startEndToggle: 'startEndToggle',
            planningTypeSelected: 'planningTypeSelected',
            startPointSetted: 'startPointSetted',
            endPointSetted: 'endPointSetted',
            quickSearchPanelToggled: 'quickSearchPanelToggled',
            quickSearchResultsSetted: 'quickSearchResultsSetted',
            resultPanelToggled: 'resultPanelToggled',
            allCleared: 'allCleared',
            tripModeSelected: 'tripModeSelected',
            routeResultSetted: 'routeResultSetted',
            buslineClick: 'buslineClick',
            busSublineClick: 'busSublineClick'
        };

        this.tripMode = {
            lessTime: 1,
            lessTransfer: 2,
            lessWalk: 4,
            noSubway: 8,
            lessTime2: 0,
            lessDistance: 1,
            lessHighway: 2,
            onlyWalk: 3
        };

        this.planning = {
            icons: {
                start: L.divIcon({ className: 'rt-icons-start', iconSize: [26, 42], iconAnchor: [13, 40], popupAnchor: [0, -40] }),
                end: L.divIcon({ className: 'rt-icons-end', iconSize: [26, 42], iconAnchor: [13, 40], popupAnchor: [0, -40] }),
                busStation: L.divIcon({ className: 'rt-icons-station', iconSize: [22, 21], popupAnchor: [0, -15] })
            },
            lineStyle: {
                lineDefault: {
                    color: '#f26161',
                    weight: 4
                },
                lineWalk: {
                    color: '#47a2fd',
                    weight: 5,
                    dashArray: '5,8'
                },
                activeLine: {
                    color: '#1eb739',
                    weight: 5
                }
            },
            map: null,
            start: null,
            end: null,
            busLines: [],
            driveLine: null,
            stations: [],
            activeLine: null
        };

        this.currentFocus = null;

        this.state = {
            planningType: this.planningType.drive,//drive,bus,walk
            tripMode: 0,
            start: {
                point: null,
                name: _const_.ept,
                focus: false
            },
            end: {
                point: null,
                name: _const_.ept,
                focus: false
            },
            quickSearchPanel: {
                show: false,
                results: null
            },
            resultPanel: {
                show: false,
                results: null
            }
        };

        this._funsBind([
            'startEndToggle', 'quickSearchResultItemClick', 'getRoutePlanning', 'buslineClick',
            'setMapStart', 'setMapEnd', 'busSublineClick']);
    }

    setMap(map) {
        this.planning.map = map;
    }

    startEndToggle(callback) {
        this.setState(
            (s, p) => {
                return {
                    start: s.end,
                    end: s.start
                };
            },
            (e=> {
                var s = this.state;
                var r = callback && callback.bind(this)({ start: s.start, end: s.end });
                if (r !== false) {
                    this.fire("startEndToggle",
                    {
                        start: s.start,
                        end: s.end
                    }, false);
                }
            }).bind(this));
    }

    selectPlanningType(planningType, callback) {
        var s = this.state;
        var ns = { planningType: planningType };

        switch (planningType) {
            case this.planningType.bus:
                ns.tripMode = this.tripMode.lessTime;
                break;
            case this.planningType.drive:
                ns.tripMode = this.tripMode.lessTime2;
                break;
            case this.planningType.walk:
                ns.tripMode = this.tripMode.onlyWalk;
                break;
        }
        this.setState(
            this._getUpdateStateFun(ns)
            , e=> {
                var s = this.state;
                var args = {
                    planningType: s.planningType,
                    tripMode: s.tripMode
                };
                var r = callback && callback.bind(this)(args);
                if (r !== false) {
                    this.fire("planningTypeSelected", args, false);
                }
            });
    }

    setStart(start, callback) {
        this.setState(
            this._getUpdateStateFun({ start: start }),
            (e=> {
                var r = callback && callback.bind(this)(this.state.start);
                if (r !== false) this.fire('startPointSetted', this.state.start, false);
            }));
    }

    setEnd(end, callback) {
        this.setState(
            this._getUpdateStateFun({ end: end }),
            (e=> {
                var r = callback && callback.bind(this)(this.state.end);
                if (r !== false) this.fire('endPointSetted', this.state.end, false);
            }));
    }

    clearStart(focus) {
        var start = this.state.start;
        start.name = '';
        start.point = null;
        this.setStart(
            start,
            (e=> {
                focus && this.focusStart();
                return false;
            }));
    }

    clearEnd(focus) {
        var end = this.state.end;
        end.name = '';
        end.point = null;
        this.setEnd(
            end,
            e=> {
                focus && this.focusEnd();
                return false;
            });
    }

    focusStart() {
        this.refs.start.input.refs.input.focus();
        this.currentFocus = "start";
    }

    focusEnd() {
        this.refs.end.input.refs.input.focus();
        this.currentFocus = "end";
    }

    toggleQuickSearchPanel(show, callback) {
        var qsp = this.state.quickSearchPanel;
        qsp.show = show === true || show === false ? show : !qsp.show;

        this.setState(
            this._getUpdateStateFun({ quickSearchPanel: qsp }),
            (e=> {
                var show = this.state.quickSearchPanel.show;
                var r = callback && callback.bind(this)(show);
                if (r !== false) this.fire('quickSearchPanelToggled', { show: show }, false);
            }
        ).bind(this));
    }

    addQuickSearchResults(items, callback) {
        var quickSearchPanel = this.state.quickSearchPanel;
        quickSearchPanel.results = items;

        this.setState(
            this._getUpdateStateFun({ quickSearchPanel: quickSearchPanel }),
            e=> {
                var rt = callback && callback.bind(this)({ items: items });
                if (rt !== false) {
                    this.fire('quickSearchResultsSetted', { items: items }, false);
                }
            });
    }

    toggleResultPanel(show, callback) {
        var rp = this.state.resultPanel;
        callback = callback && callback.bind(this);
        rp.show = show === true || show === false ? show : !rp.show;

        this.setState(
            this._getUpdateStateFun({ resultPanel: rp }),
            (e=> {
                var show = this.state.resultPanel.show;
                var r = callback && callback(show);
                if (r !== false) this.fire('resultPanelToggled', { show: show }, false);
            }
        ).bind(this));
    }

    clearAll(callback) {
        var s = this.state;
        var start = s.start;
        var end = s.end;
        start.name = '';
        start.point = null;
        end.name = '';
        end.point = null;

        this.setState(
            this._getUpdateStateFun({
                start: start,
                end: end
            }),
            e=> {
                var rt = callback && callback.bind(this)(this);
                if (rt !== false)
                    this.fire('allCleared', { context: this }, false);
            });
    }

    getPOI(text) {
        antd.message.info('正在搜索...');
        this._getPOI(text, function (rt) {
            var records = rt.records;
            records = records && records.length && records[0].name ? records : [];
            if (records) {
                this.refs.quickSearchPanel.scrollTop = 0;
                this.toggleQuickSearchPanel(true);
                this.addQuickSearchResults(records);
            }
        });
    }

    _getPOI(text, callback) {
        $.post("../Common/GetPOI", { searchText: text }, callback.bind(this), 'json');
    }

    quickSearchResultItemClick(poi) {
        this.currentFocus == "start" ?
            this.setStart({ name: poi.name, point: { x: parseFloat(poi.x), y: parseFloat(poi.y) } }) :
            this.setEnd({ name: poi.name, point: { x: parseFloat(poi.x), y: parseFloat(poi.y) } });
        this.toggleQuickSearchPanel(false);
    }

    selectTripMode(tripMode, callback) {
        this.setState(
            this._getUpdateStateFun({ tripMode: tripMode }),
            e=> {
                var args = {
                    planningType: this.state.planningType,
                    tripMode: tripMode
                };
                var rt = callback && callback.bind(this)(args);
                if (rt !== false) this.fire('tripModeSelected', args, false);
            });
    }

    getRoutePlanning() {
        var s = this.state;
        var start = s.start;
        var end = s.end;
        if (
            start.point && start.point.x
            &&
            end.point && end.point.x
        ) {
            var condition = {
                startName: start.name,
                endName: end.name,
                start: start,
                end: end,
                planningType: s.planningType,
                tripMode: s.tripMode
            };
            this._getRoutePlanning(condition);
        }
    }

    _getRoutePlanning(condition) {
        antd.message.info('路径规划中...');
        $.post('../Common/GetRoute', condition, function (rt) {
            this.clearMapRoutePlanning();

            var lines = rt.results && rt.results.length && rt.results[0].lines;
            this.setRoutePlanningResult(condition, lines || rt.result);
            this.toggleResultPanel(true);
            if (lines) {
                this.buslineClick(1, lines[0]);
            } else {
                this.setMapDriveRoute(rt.result);
            }
        }.bind(this), 'json');
    }

    setRoutePlanningResult(condition, routeResult, callback) {
        this.condition = condition;
        var resultPanel = this.state.resultPanel;
        resultPanel.results = routeResult;
        this.setState(
            this._getUpdateStateFun({ resultPanel: resultPanel }),
            e=> {
                var args = { routeResult: routeResult };
                var r = callback && callback.bind(this)(args);
                if (r !== false)
                    this.fire('routeResultSetted', args, false);
            }
        );
    }

    getBusResults(lines) {
        return lines.map(function (item, index) {
            if (index === 0) { item.active = true; }
            return (
                    <BusLine ref={"bus" + (index + 1)} index={index + 1} busline={item} buslineClick={this.buslineClick} busSublineClick={this.busSublineClick} />
                );
        }.bind(this));
    }

    busSublineClick(item) {
        this.setActiveSubline(item);
        this.fire(this.eventList.busSublineClick, { busSubline: item }, false);
    }

    getRouteResults() {
        var rlt = this.state.resultPanel.results;
        if (rlt) {
            if (this.condition.planningType === this.planningType.bus) {
                return this.getBusResults(rlt);
            } else {
                return this.getDriveOrWalkResults(rlt);
            }
        }
        return null;
    }

    routeItemClick(item) {
        this.setMapActiveLine(item);
    }

    getDriveOrWalkResults(result) {
        var cItems = result.simple.item.map(function (item, index) {
            return <div onClick={e=>this.routeItemClick(item)} className="rt-item"><span>{index + 1}</span>{item.strguide}</div>
        }.bind(this));

        return (
        <div className="driveorwalkresult">
            <div className="rt-start">起点：{this.condition.startName}</div>
            {cItems}
            <div className="rt-end">终点：{this.condition.endName}</div>
        </div>);
    }

    setMapDriveRoute(result) {
        var orig = result.orig.split(',');
        var dest = result.dest.split(',');

        var routelatlons = result.routelatlon.split(';').map(function (c) {
            var s = c.split(',');
            return [parseFloat(s[1]), parseFloat(s[0])];
        });

        routelatlons.length--;

        var start = L.latLng(parseFloat(orig[1]), parseFloat(orig[0]));
        var end = L.latLng(parseFloat(dest[1]), parseFloat(dest[0]));

        this.setMapStart(start, this.condition.startName);
        this.setMapEnd(end, this.condition.endName);
        this._setMapDriveLine(routelatlons);
    }

    buslineClick(index, busline) {
        for (var i in this.refs) {
            if (i.indexOf('bus') > -1) {
                this.refs[i].setState((s, p) => { return { active: false, close: true } });
            }
        }
        this.refs['bus' + index].setState((s, p) => { return { active: true, close: false } });

        this._setMapBusline(busline);

        this.fire('buslineClick', { busline: busline }, false);
    }

    clearMapStart() {
        this.planning.start && this.planning.start.remove();
        this.planning.start = null;
    }

    setMapStart(point, name) {
        this.clearMapStart();
        var pl = this.planning;
        pl.start = L.marker(point, { icon: pl.icons.start }).bindPopup(name, { className: 'rt-popup-name' }).addTo(pl.map);
    }

    clearMapEnd() {
        this.planning.end && this.planning.end.remove();
        this.planning.end = null;
    }

    setMapEnd(point, name) {
        this.clearMapEnd();
        var pl = this.planning;
        pl.end = L.marker(point, { icon: pl.icons.end }).bindPopup(name, { className: 'rt-popup-name' }).addTo(pl.map);
    }

    clearMapActiveLine() {
        this.planning.activeLine && this.planning.activeLine.remove();
        this.planning.activeLine = null;
    }

    clearMapBusLines() {
        this.planning.busLines && this.planning.busLines.forEach(function (layer, index) { layer.remove(); });
        this.planning.busLines = null;
    }

    clearStations() {
        this.planning.stations && this.planning.stations.forEach(function (layer, index) { layer.remove(); });
        this.planning.stations = null;
    }

    clearMapRoutePlanning() {
        this.clearMapStart();
        this.clearMapEnd();
        this.clearMapActiveLine();
        this.clearMapBusLines();
        this.clearMapDriveLine();
        this.clearStations();
    }

    setMapActiveLine(item) {
        this.clearMapActiveLine();

        var line = item.streetLatLon.split(';').map(function (c) {
            var s = c.split(',');
            return [parseFloat(s[1]), parseFloat(s[0])];
        });

        line.length--;

        var pl = this.planning;
        pl.activeLine = L.polyline(line, pl.lineStyle.activeLine).addTo(pl.map);
    }

    setActiveSubline(item) {
        this.clearMapActiveLine();
        var line = item.segmentLine[0].linePoint.split(';').map(function (c) {
            var s = c.split(',');
            return [parseFloat(s[1]), parseFloat(s[0])];
        });

        line.length--;

        var pl = this.planning;
        pl.activeLine = L.polyline(line, pl.lineStyle.activeLine).addTo(pl.map);

    }

    _setMapBusline(busline) {
        this.clearMapBusLines();
        this.clearStations();
        this.clearMapActiveLine();

        var start = this.condition.start;
        var end = this.condition.end;

        this.setMapStart([start.point.y, start.point.x], start.name);
        this.setMapEnd([end.point.y, end.point.x], end.name);

        var pl = this.planning;
        var bls = [];
        var sts = [];

        var segments = busline.segments;
        for (var i = 0, l = segments.length; i < l ; i++) {
            var seg = segments[i];
            var lineStyle = seg.segmentType == 1 ? pl.lineStyle.lineWalk : pl.lineStyle.lineDefault;

            var linePoint = seg.segmentLine[0].linePoint;

            var linePoints = linePoint.split(';').map(function (c) {
                var s = c.split(',');
                return [parseFloat(s[1]), parseFloat(s[0])];
            });

            linePoints.length--;

            var bl = L.polyline(linePoints, lineStyle).addTo(pl.map);
            bls.push(bl);
            if (i !== l - 1) {
                var lonlat = seg.stationEnd.lonlat;
                var pnt = lonlat.split(',');
                pnt = [pnt[1], pnt[0]];
                var st = L.marker(pnt, { icon: pl.icons.busStation }).bindPopup(seg.stationEnd.name, { className: 'rt-popup-name' }).addTo(pl.map);
                sts.push(st);
            }
        }

        pl.busLines = bls;
        pl.stations = sts;

    }

    clearMapDriveLine() {
        this.planning.driveLine && this.planning.driveLine.remove();
        this.planning.driveLine = null;
    }

    _setMapDriveLine(coordinates) {
        this.clearMapDriveLine();
        var pl = this.planning;
        pl.driveLine = L.polyline([coordinates], pl.lineStyle.lineDefault).addTo(pl.map);
    }

    centerMapPoint(point) {
        this.planning.map.setView(point);
    }

    centerExtent(extent) {
        this.planning.map.fitBounds(extent);
    }

    componentDidMount() {
        var evts = this.eventList;
        this.on([
            evts.startEndToggle,
            evts.startPointSetted,
            evts.endPointSetted,
            evts.planningTypeSelected,
            evts.tripModeSelected], this.getRoutePlanning);

        this.on(evts.startPointSetted, e=> {
            var pnt = [e.data.point.y, e.data.point.x];
            this.setMapStart(pnt, e.data.name);
            this.centerMapPoint(pnt);
        });

        this.on(evts.endPointSetted, e=> {
            var pnt = [e.data.point.y, e.data.point.x];
            this.setMapEnd(pnt, e.data.name);
            this.centerMapPoint(pnt);
        });

        this.on(evts.startEndToggle, e=> {
            this.setMapStart([e.data.start.point.y, e.data.start.point.x], e.data.start.name);
            this.setMapEnd([e.data.end.point.y, e.data.end.point.x], e.data.end.name);
        });

        this.on([evts.routeResultSetted, evts.buslineClick], e=> {
            var start = this.condition.start.point;
            var end = this.condition.end.point;

            this.centerExtent([
                [start.y, start.x], [end.y, end.x]
            ]);
        });
    }

    render() {
        var atv = _const_.atv;
        var ept = _const_.ept;

        var s = this.state;
        var start = s.start;
        var end = s.end;

        var cQuickSearchResults = s.quickSearchPanel.results && s.quickSearchPanel.results.map(function (c, i) {
            return <QuickSearchResultItem onClick={this.quickSearchResultItemClick} poi={c } />;
        }.bind(this));

        cQuickSearchResults = (cQuickSearchResults && cQuickSearchResults.length) ? cQuickSearchResults : (<div className="quicksearchresultnotfound">未找到相应结果</div>);

        var cTripMode = null;

        switch (s.planningType) {
            case this.planningType.drive:
                cTripMode =
                <ul>
                    <li className={this._getClass(s.tripMode === 0)} onClick={e=> { this.selectTripMode(0) }}>推荐路线</li>
                    <li className={this._getClass(s.tripMode === 1)} onClick={e=> { this.selectTripMode(1) }}>路程最短</li>
                    <li className={this._getClass(s.tripMode === 2)} onClick={e=> { this.selectTripMode(2) }}>少走高速</li>
                </ul>;
                break;
            case this.planningType.bus:
                cTripMode =
                <ul>
                    <li className={this._getClass(s.tripMode === 1)} onClick={e=> { this.selectTripMode(1) }}>推荐路线</li>
                    <li className={this._getClass(s.tripMode === 2)} onClick={e=> { this.selectTripMode(2) }}>少换乘</li>
                    <li className={this._getClass(s.tripMode === 4)} onClick={e=> { this.selectTripMode(4) }}>少步行</li>
                </ul>;
                break;
            case this.planningType.walk:
                <ul></ul>
                break;
            default:
                break;
        }

        var cRouteResult = this.getRouteResults();

        return (
            <div className="planningpanel">
                <ul className="pp-type">
                    <li onClick={e=>this.selectPlanningType(this.planningType.drive)} className={this._getClass(s.planningType == this.planningType.drive)}><span className="iconfont icon-qiche-copy"></span>驾车</li>
                    <li onClick={e=>this.selectPlanningType(this.planningType.bus)} className={this._getClass(s.planningType == this.planningType.bus)}><span className="iconfont icon-gongjiao"></span>公交</li>
                    <li onClick={e=>this.selectPlanningType(this.planningType.walk)} className={this._getClass(s.planningType == this.planningType.walk)}><span className="iconfont icon-iconfontjiaotongiconwalk"></span>步行</li>
                </ul>
                <div className="pp-inputs">
                    <div>
                        <div><antd.Input.Search ref='start' placeholder="搜索 起点，或在地图上选择起点..." onBlur={e=> { this.state.start.focus = false; this.setState({ start: this.state.start }); }} onFocus={e=> { this.state.start.focus = true; this.setState(this.state); this.focusStart(); }} onChange={e=> { var value = e.target.value; s.start.name = value; s.start.point = null; this.setState({start:s.start}); }} onSearch={e=> this.getPOI(e)} value={start.name } /><antd.Icon onClick={e=> { this.clearStart(true) }} type={"close-circle " + this._getClass(s.start.focus) } /></div>
                        <div><antd.Input.Search ref='end' placeholder="搜索 终点，或在地图上选择终点..." onBlur={e=> { this.state.end.focus = false; this.setState({ end: this.state.end }); }} onFocus={e=> { this.state.end.focus = true; this.setState(this.state); this.focusEnd(); }} onChange={e=> { var value = e.target.value; s.end.name = value; s.end.point = null; this.setState({ end: s.end }); }} onSearch={e=> this.getPOI(e)} value={end.name } /><antd.Icon onClick={e=> { this.clearEnd(true) }} type={"close-circle " + this._getClass(s.end.focus)} /></div>
                    </div>
                    <antd.Tooltip placement={"right"} title={"起始点切换"}>
                        <antd.Icon type="swap" onClick={e=>this.startEndToggle()} />
                    </antd.Tooltip>
                </div>
                <div ref="quickSearchPanel" className={"pp-quicksearchpanel " + this._getClass(s.quickSearchPanel.show)}>
                    {cQuickSearchResults}
                </div>
                <div className={"pp-resultpanel " + this._getClass(s.resultPanel.show)}>
                <div className="tripmode">
                    {cTripMode}
                </div>
                <div className="pp-routeresults">
                    {cRouteResult}
                </div>
                </div>
            </div>
            );
    }
}

class QuickSearchResultItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var poi = this.props.poi;
        return (
        <div onClick={e=>this.props.onClick(poi)} className="quicksearchresultitem">
            <antd.Icon type="environment" />{poi.name}<span>{poi.address}</span>
        </div>
        );
    }
}

class BusLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false,
            active: false
        };
        this._funsBind(['click']);
    }

    click() {
        this.props.buslineClick(this.props.index, this.props.busline);
    }

    busSublineClick(item) {
        this.props.busSublineClick(item);
    }

    toggleDetailPanel(close) {
        close = close === undefined ? !this.state.close : !!close;
        if (!close) {
            this.click(this.props.index, this.props.busline);
        }
        this.setState({ close: close });
    }

    render() {
        var s = this.state;
        var close = s.close;
        var atv = s.active;
        var props = this.props;

        var busline = props.busline;

        var cBuslineName = busline.lineName.split('|').map(
                           function (name, index) {
                               return <span>{name}</span>;
                           });
        var cBuslineDetails = busline.segments.map(
            function (item, index) {
                switch (item.segmentType) {
                    case 1:
                        return <div onClick={e=>this.busSublineClick(item)} className="busline-details-item"><span className="iconfont icon-iconfontjiaotongiconwalk"></span><div>步行至<span>{item.stationEnd.name || '目的地'}</span></div></div>;
                        break;
                    default:
                        return <div onClick={e=>this.busSublineClick(item)} className="busline-details-item"><span className="iconfont icon-gongjiao"></span><div>从<span>{item.stationStart.name}</span>上车乘坐<span>{item.segmentLine[0].lineName}</span>至<span>{item.stationEnd.name}</span>下车</div></div>;
                        break;
                }
            }.bind(this));

        return (
        <div className={"busline " + this._getClass(atv)}>
            <div className="busline-name" onClick={this.click}>
                <span>线路 {props.index}</span>
                <div>{cBuslineName}</div>
                <antd.Tooltip placement='right' title={close?"详情":"收起"}>
                <antd.Icon onClick={e=> { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); this.toggleDetailPanel(); }} type={close ? "down" : "up" } />
                </antd.Tooltip>
            </div>
            <div className={"busline-details "+this._getClass(!close)}>
                {cBuslineDetails}
            </div>
        </div>);
    }
}