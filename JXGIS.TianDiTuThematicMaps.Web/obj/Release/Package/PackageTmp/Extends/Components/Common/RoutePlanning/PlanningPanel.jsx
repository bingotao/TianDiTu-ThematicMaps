class PlanningPanel extends React.Component {
    constructor(props) {
        super(props);

        this.routeType = {
            drive: 'drive',
            bus: 'bus',
            walk: 'walk'
        };

        this.currentFocus = null;

        this.state = {
            routeType: this.routeType.drive,//drive,bus,walk
            start: {
                point: null,
                name: '开始',
                focus: false
            },
            end: {
                point: null,
                name: '结束',
                focus: false
            },
            quickSearchPanel: {
                show: false,
                results: []
            },
            resultPanel: {
                show: false,
                results: []
            }
        };

        this.functionBind(['startEndToggle', 'QuickSearchResultItemClick']);
    }

    functionBind(funs) {
        for (var i = 0, l = funs.length; i < l; i++) {
            this[funs[i]] = this[funs[i]].bind(this);
        }
    }

    startEndToggle(callback) {
        callback = callback && callback.bind(this);
        var s = this.state;
        var tmp = s.start;
        s.start = s.end;
        s.end = tmp;
        this.setState(s, (e=> {
            var r = callback && callback(this.state.start, this.state.end);
            if (r !== false) {
                this.fire("startEndToggle",
                {
                    start: s.start,
                    end: s.end
                }, false);
            }
        }).bind(this));
    }

    selectRouteType(routeType, callback) {
        callback = callback && callback.bind(this);
        var s = this.state;
        s.routeType = routeType;
        this.setState(s, (e=> {
            var r = callback && callback(this.state.routeType);
            if (r !== false) {
                this.fire("routeTypeSelected", this.state.routeType, false);
            }
        }));
    }

    setStart(start, callback) {
        callback = callback && callback.bind(this);
        this.setState({ start: start }, (e=> {
            var r = callback && callback(this.state.start);
            if (r !== false) this.fire('startPointSetted', this.state.start, false);
        }).bind(this));
    }

    setEnd(end, callback) {
        callback = callback && callback.bind(this);
        this.setState({ end: end }, (e=> {
            var r = callback && callback(this.state.end);
            if (r !== false) this.fire('endPointSetted', this.state.end, false);
        }).bind(this));
    }

    clearStart(focus) {
        var start = this.state.start;
        start.name = '';
        start.point = null;
        this.setStart({ start: start }, e=> {
            focus && this.focusStart();
            return false;
        });
    }

    clearEnd(focus) {
        var end = this.state.end;
        end.name = '';
        end.point = null;
        this.state.end = end;
        this.setEnd({ end: end }, e=> {
            focus && this.focusEnd();
            return false;
        });
    }

    focusStart() {
        this.refs.start.refs.input.focus();
        this.currentFocus = "start";
    }

    focusEnd() {
        this.refs.end.refs.input.focus();
        this.currentFocus = "end";
    }

    toggleQuickSearchPanel(show, callback) {
        var qsp = this.state.quickSearchPanel;
        callback = callback && callback.bind(this);
        qsp.show = show === true || show === false ? show : !qsp.show;

        this.setState({ quickSearchPanel: qsp }, (e=> {
            var show = this.state.quickSearchPanel.show;
            var r = callback && callback(show);
            if (r !== false) this.fire('quickSearchPanelToggled', { show: show }, false);
        }).bind(this));
    }

    toggleResultPanel(show, callback) {
        var rp = this.state.resultPanel;
        callback = callback && callback.bind(this);
        rp.show = show === true || show === false ? show : !rp.show;

        this.setState({ resultPanel: rp }, (e=> {
            var show = this.state.resultPanel.show;
            var r = callback && callback(show);
            if (r !== false) this.fire('resultPanelToggled', { show: show }, false);
        }).bind(this));
    }

    clearAll() {
        var s = this.state;
        var start = s.start;
        var end = s.end;
        start.name = '';
        start.point = null;
        end.name = '';
        end.point = null;

        this.fire('allCleared', { context: this }, false);
    }

    getPOI(text) {
        this._getPOI(text, function (rt) {
            var obj = JSON.parse(rt);
            var records = obj.records;

            records = records && records.length && records[0].name ? records : [];

            var s = this.state;
            var quickSearchPanel = s.quickSearchPanel;
            quickSearchPanel.show = true;
            quickSearchPanel.results = records;
            this.setState({ quickSearchPanel: quickSearchPanel });

        }, 'json');
    }

    _getPOI(text, callback) {
        $.post("../PublicService/GetPOI", { searchText: text }, callback.bind(this));
    }

    QuickSearchResultItemClick(poi) {
        this.currentFocus == "start" ?
            this.setStart({ name: poi.name, point: { x: poi.x, y: poi.y } }) :
            this.setEnd({ name: poi.name, point: { x: poi.x, y: poi.y } });
        this.toggleQuickSearchPanel(false);
    }

    render() {
        var aCls = 'active';
        var ept = '';

        var s = this.state;
        var start = s.start;
        var end = s.end;

        var cQuickSearchResults = s.quickSearchPanel.results.map(function (c, i) {
            return <QuickSearchResultItem onClick={this.QuickSearchResultItemClick} poi={c } />;
        }.bind(this));

        cQuickSearchResults = cQuickSearchResults.length ? cQuickSearchResults : (<div className="quicksearchresultnotfound">未找到相应结果</div>);
        return (
            <div className="planningpanel">
                <ul className="pp-type">
                    <li onClick={e=>this.selectRouteType(this.routeType.drive)} className={s.routeType == this.routeType.drive ? aCls : ept}>驾车</li>
                    <li onClick={e=>this.selectRouteType(this.routeType.bus)} className={s.routeType == this.routeType.bus ? aCls : ept}>公交</li>
                    <li onClick={e=>this.selectRouteType(this.routeType.walk)} className={s.routeType == this.routeType.walk ? aCls : ept}>步行</li>
                </ul>
                <div className="pp-inputs">

                    <div>
                        <div><antd.Input ref='start' placeholder="搜索 起点，或在地图上选择起点..." onBlur={e=> { this.state.start.focus = false; this.setState({ start: this.state.start }); }} onFocus={e=> { this.state.start.focus = true; this.setState(this.state); this.focusStart(); }} onChange={e=> { var value = e.target.value; this.state.start.name = value; this.setStart(this.state.start);  this.getPOI(value)}} value={start.name } /><antd.Icon onClick={e=> { this.clearStart(true) }} type={"close-circle " + (s.start.focus ? aCls : ept) } /></div>
                        <div><antd.Input ref='end' placeholder="搜索 终点，或在地图上选择终点..." onBlur={e=> { this.state.end.focus = false; this.setState({ end: this.state.end }); }} onFocus={e=> { this.state.end.focus = true; this.setState(this.state); this.focusEnd(); }} onChange={e=> { var value = e.target.value; this.state.end.name = value; this.setEnd(this.state.end); this.getPOI(value)}} value={end.name } /><antd.Icon onClick={e=> { this.clearEnd(true) }} type={"close-circle " + (s.end.focus ? aCls : ept)} /></div>
                    </div>
                    <antd.Tooltip placement={"right"} title={"起始点切换"}>
                        <antd.Icon type="swap" onClick={e=>this.startEndToggle()} />
                    </antd.Tooltip>
                </div>
                <div className={"pp-quicksearchpanel " + (s.quickSearchPanel.show ? aCls : '')}>
                    {cQuickSearchResults}
                </div>
                <div className={"pp-resultpanel " + (s.resultPanel.show ? aCls : '')}>


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