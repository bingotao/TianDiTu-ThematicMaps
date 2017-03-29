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
            tripModeSelected: 'tripModeSelected'
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

        this.currentFocus = null;

        this.state = {
            planningType: this.planningType.drive,//drive,bus,walk
            tripMode: 0,
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

        this._funsBind(['startEndToggle', 'quickSearchResultItemClick', 'getRoutePlanning']);
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
            this._getUpdateStateFun({ start: start }),
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
            this._getUpdateStateFun({ end: end }),
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
            this._getUpdateStateFun(items),
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
        $.post("../PublicService/GetPOI", { searchText: text }, callback.bind(this), 'json');
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
        $.post('../PublicService/GetRoute', condition, function (rt) {
            this.setRoutePlanningResult();
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

    getRouteResults() {
        var rlt = s.resultPanel.results;
        if (rlt) {
            if (this.condition.planningType === this.planningType.bus) {
                return this.getBusResults(rlt);
            } else {
                return this.getDriveOrWalkResults(rlt);
            }
        }
        return null;
    }

    getDriveOrWalkResults(result) {



    }


    componentDidMount() {
        var evts = this.eventList;
        this.on([
            evts.startEndToggle,
            evts.startPointSetted,
            evts.endPointSetted,
            evts.planningTypeSelected,
            evts.tripModeSelected].join(' '), this.getRoutePlanning);
    }

    render() {
        var atv = _const_.atv;
        var ept = _const_.ept;

        var s = this.state;
        var start = s.start;
        var end = s.end;

        var cQuickSearchResults = s.quickSearchPanel.results.map(function (c, i) {
            return <QuickSearchResultItem onClick={this.quickSearchResultItemClick} poi={c } />;
        }.bind(this));

        cQuickSearchResults = cQuickSearchResults.length ? cQuickSearchResults : (<div className="quicksearchresultnotfound">未找到相应结果</div>);

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
                    <li className={this._getClass(s.tripMode === 8)} onClick={e=> { this.selectTripMode(8) }}>不坐地铁</li>
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
                    <li onClick={e=>this.selectPlanningType(this.planningType.drive)} className={this._getClass(s.planningType == this.planningType.drive)}>驾车</li>
                    <li onClick={e=>this.selectPlanningType(this.planningType.bus)} className={this._getClass(s.planningType == this.planningType.bus)}>公交</li>
                    <li onClick={e=>this.selectPlanningType(this.planningType.walk)} className={this._getClass(s.planningType == this.planningType.walk)}>步行</li>
                </ul>
                <div className="pp-inputs">
                    <div>
                        <div><antd.Input.Search ref='start' placeholder="搜索 起点，或在地图上选择起点..." onBlur={e=> { this.state.start.focus = false; this.setState({ start: this.state.start }); }} onFocus={e=> { this.state.start.focus = true; this.setState(this.state); this.focusStart(); }} onChange={e=> { var value = e.target.value; this.state.start.name = value; this.setState({start:s.start}); }} onSearch={e=> this.getPOI(e)} value={start.name } /><antd.Icon onClick={e=> { this.clearStart(true) }} type={"close-circle " + this._getClass(s.start.focus) } /></div>
                        <div><antd.Input.Search ref='end' placeholder="搜索 终点，或在地图上选择终点..." onBlur={e=> { this.state.end.focus = false; this.setState({ end: this.state.end }); }} onFocus={e=> { this.state.end.focus = true; this.setState(this.state); this.focusEnd(); }} onChange={e=> { var value = e.target.value; this.state.end.name = value; this.setState({ end: s.end }); }} onSearch={e=> this.getPOI(e)} value={end.name } /><antd.Icon onClick={e=> { this.clearEnd(true) }} type={"close-circle " + this._getClass(s.end.focus)} /></div>
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