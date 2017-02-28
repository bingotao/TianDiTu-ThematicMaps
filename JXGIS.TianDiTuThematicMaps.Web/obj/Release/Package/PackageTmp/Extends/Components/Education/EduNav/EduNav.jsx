class EduNav extends React.Component {
    constructor(props) {
        super(props);

        this.schoolSearch = {
            pageNumber: 1,
            pageSize: 10,
            searchText: '',
            stype: 'all'
        };

        this.residenceSearch = {
            pageNumber: 1,
            pageSize: 20,
            searchText: '',
            schoolID: null,
            schoolAreaID: null
        };

        this.state = {
            kdt: {
                on: false,
                allOn: true,
                allText: '关闭',
                layers: props.eduConfig.Layers
            },
            sxx: {
                current: 1,
                total: 0,
                searchResults: [],
                on: false,
                filters: {
                    all: {
                        on: true
                    },
                    y: {
                        on: false
                    },
                    x: {
                        on: false
                    },
                    c: {
                        on: false
                    },
                    g: {
                        on: false
                    },
                    z: {
                        on: false
                    },
                    t: {
                        on: false
                    },
                    d: {
                        on: false
                    }
                }
            },
            cxq: {
                on: false,
                current: 1,
                total: 3,
                searchResults: {
                    features: []
                }
            },
            qtzt: {
                on: false
            }
        };

    }

    setLayerVisibility(type, on) {
        var s = this.state;
        s.kdt.layers[type].on = on;
        this.setState(s);
        this.fire('layerChange', { layerType: type, visible: on });
    }

    select(target, callback) {
        var s = this.state;
        for (var i in s) {
            s[i].on = false;
        }
        s[target].on = true;
        this.setState(s, callback);
    }

    schoolFilter(target) {
        var fts = this.state.sxx.filters;
        for (var i in fts) {
            fts[i].on = false;
        }
        fts[target].on = true;
        this.schoolTypeChange(target);
        this.setState(this.state);
    }

    hiddenPanel() {
        var s = this.state;
        for (var i in s) {
            s[i].on = false;
        }
        this.setState(s);
    }

    setLayerVisible(layerType, visible) {
        this.fire('layerChange', { layerType: layerType, visible: visible });
    }

    schoolItemClick(school) {
        this.fire('schoolItemClick', school, false);
    }

    schoolPaginationChange(e) {
        this.schoolSearch.pageNumber = e;
        var s = this.state;
        s.sxx.current = e;
        this.setState(s);
        this.searchSchool();
    }

    schoolSearchTextChange(e) {
        this.schoolSearch.searchText = e;
        this.schoolSearch.pageNumber = 1;
        var s = this.state;
        s.sxx.current = 1;
        this.schoolSearch.stype = 'all';
        for (var n in s.sxx.filters) {
            s.sxx.filters[n].on = false;
        }
        s.sxx.filters.all.on = true;

        this.setState(s);
        this.searchSchool();
    }

    schoolTypeChange(e) {
        this.schoolSearch.stype = e;
        this.schoolSearch.pageNumber = 1;
        var s = this.state;
        s.sxx.current = 1;
        this.setState(s);
        this.searchSchool();
    }

    searchSchool() {
        var s = this.schoolSearch;
        $.post('GetSchools', {
            pageNumber: s.pageNumber,
            pageSize: s.pageSize,
            searchText: s.searchText,
            stype: s.stype
        },
        function (rt) {
            var o = JSON.parse(rt);
            if (o.ErrorMessage) {
                antd.message.error(o.ErrorMessage)
            } else {
                var d = o.Data;
                var s = this.state;
                s.sxx.total = d.Count;
                s.sxx.searchResults = d.Schools;
                this.setState(s);
                this.refs.schoolPanel.scrollTop = 0;
            }
        }.bind(this), 'json');
    }

    residenceSearchTextChange(text) {
        this.residenceSearch.searchText = text;
        this.residenceSearch.pageNumber = 1;

        this.residenceSearch.schoolID = null;
        this.residenceSearch.schoolAreaID = null;
        var s = this.state;
        s.cxq.current = 1;
        this.setState(s, this.searchResidence.bind(this));
    }

    residencePaginationChange(pageNumber) {
        this.residenceSearch.pageNumber = pageNumber;
        var s = this.state;
        s.cxq.current = pageNumber;
        this.setState(s, this.searchResidence.bind(this));
    }

    residenceItemClick(residence) {
        this.fire('residenceItemClick', residence, false);
    }

    searchResidenceByID(schoolAreaID, schoolID) {
        this.residenceSearch.searchText = '';
        this.refs.schoolSearchArea.input.refs.input.value = '';
        this.residenceSearch.schoolID = schoolID;
        this.residenceSearch.schoolAreaID = schoolAreaID;

        this.residenceSearch.pageNumber = 1;
        var s = this.state;
        s.cxq.current = 1;
        this.setState(s, this.searchResidence.bind(this));
    }

    searchResidence() {
        $.post('GetResidence', this.residenceSearch, function (rt) {
            if (rt.ErrorMessage) {
                antd.message.error(rt.ErrorMessage);
            } else {
                var data = JSON.parse(rt.Data);
                var records = data.rows;
                var total = data.count;

                var s = this.state;
                s.cxq.total = total;
                s.cxq.searchResults = records;
                this.setState(s);
                this.refs.residencePanel.scrollTop = 0;
                this.fire('onResidenceLoaded', data, false);
            }
        }.bind(this), 'json');
    }

    toggleAllLayers(e) {
        var s = this.state;
        s.kdt.allOn = e;
        s.kdt.allText = e ? '关闭' : '打开';
        for (var n in s.kdt.layers) {
            s.kdt.layers[n].on = e;
        }
        this.setState(s);
        this.fire('onToggleAllLayers', { on: e, text: s.kdt.allText });
    }

    render() {
        var aCls = "active";
        var ept = "";
        var s = this.state;
        var p = this.props;
        var sLayers = s.kdt.layers;

        var schools = s.sxx.searchResults;

        var cSchools = schools.map(function (school) {
            return <EduSchoolItem school={school} onClick={this.schoolItemClick.bind(this) } />;
        }.bind(this));

        var residences = s.cxq.searchResults.features;

        var cResidences = residences.map(function (residence, i) {
            return <ResidenceItem index={i + 1} residence={residence.properties} onClick={this.residenceItemClick.bind(this) } />;
        }.bind(this));

        var cThematicMaps = this.props.mapConfig.ThematicMaps.map(function (map) {
            return <div className="thematicmap"><span className={"iconfont " + map.icon }></span><a href={map.url} target="_blank">{map.name}</a></div>
        });

        return (
        <div className="edu-nav">
            <div className="edu-navs">
                <div onClick={e=>this.select("sxx", function () {
                        this.refs.schoolSearch.input.focus();
                        if (!s.sxx.first) {
                            s.sxx.first = true;
                            this.searchSchool();
                        }
                    }.bind(this))} className={s.sxx.on ? aCls : ept}>
                    <span className="iconfont icon-sousuo-sousuo"></span>
                    搜学校
                </div>
                <div className="ct-split"></div>
                <div onClick={e=>this.select("cxq", function () {
                        this.refs.schoolSearchArea.input.focus();
                        if (!s.cxq.first) {
                            s.cxq.first = true;
                            this.searchResidence();
                        }
                    }.bind(this))} className={s.cxq.on ? aCls : ept}>
                    <span className="iconfont icon-xuequ"></span>
                    查学区
                </div>
                <div className="ct-split"></div>
                <div onClick={e=>this.select("kdt")} className={s.kdt.on ? aCls : ept}>
                    <span className="iconfont icon-ditu"></span>
                    看地图
                </div>
                <div className="ct-split"></div>
                <div onClick={e=>this.select("qtzt")} className={s.qtzt.on ? aCls : ept}>
                    <span className="iconfont icon-qita"></span>
                    览专题
                </div>
            </div>
            <div className="edu-nav-quicksearch">
                <input type="text" onFocus={e=> {
                        this.select('sxx', function () {
                            this.refs.schoolSearch.input.focus();
                            if (!s.sxx.first) {
                                s.sxx.first = true;
                                this.searchSchool();
                            }
                        }.bind(this));
                    }} placeholder="请输入学校名称..." />
                <antd.Icon type="search" />
            </div>
            <div className="edu-nav-panel">
                <div className={s.kdt.on ? aCls : ept}>
                    <antd.Icon onClick={this.hiddenPanel.bind(this)} type="close-square" />
                    <h3 className="edu-nav-panel-header">
                        看地图
                    </h3>
                    <div className="edu-nav-panel-container">
                        <div className="edu-layers">

                            <span className="edu-nav-allcontrol"><antd.Switch size="small" checked={s.kdt.allOn} onChange={e=> { this.toggleAllLayers(e) }} />&emsp;<span className="edu-layer-title">全部{s.kdt.allText}</span></span>
                            <div className="edu-layergroup">
                                <h3>学校</h3>
                                <div><span className="edu-icon y">幼</span><span className="edu-layer-title">幼 儿 园</span><antd.Switch size="small" checked={sLayers.y.on} onChange={e=>this.setLayerVisibility('y',e)} /></div>
                                <div><span className="edu-icon x">小</span><span className="edu-layer-title">小 学</span><antd.Switch size="small" checked={sLayers.x.on} onChange={e=>this.setLayerVisibility('x', e)} /></div>
                                <div><span className="edu-icon c">初</span><span className="edu-layer-title">初 中</span><antd.Switch size="small" checked={sLayers.c.on} onChange={e=>this.setLayerVisibility('c', e)} /></div>
                                <div><span className="edu-icon g">高</span><span className="edu-layer-title">普通高中</span><antd.Switch size="small" checked={sLayers.g.on} onChange={e=>this.setLayerVisibility('g', e)} /></div>
                                <div><span className="edu-icon z">职</span><span className="edu-layer-title">职业高中</span><antd.Switch size="small" checked={sLayers.z.on} onChange={e=>this.setLayerVisibility('z', e)} /></div>
                                <div><span className="edu-icon t">特</span><span className="edu-layer-title">特殊教育</span><antd.Switch size="small" checked={sLayers.t.on} onChange={e=>this.setLayerVisibility('t', e)} /></div>
                                <div><span className="edu-icon d">大</span><span className="edu-layer-title">高等院校</span><antd.Switch size="small" checked={sLayers.d.on} onChange={e=>this.setLayerVisibility('d', e)} /></div>
                            </div>

                            <div className="edu-layergroup">
                                <h3>学区</h3>
                                <div><span className="edu-icon x-xq"></span><span className="edu-layer-title">小学学区</span><antd.Switch size="small" checked={sLayers.x_xq.on} onChange={e=>this.setLayerVisibility('x_xq', e)} /></div>
                                <div><span className="edu-icon c-xq"></span><span className="edu-layer-title">初中学区</span><antd.Switch size="small" checked={sLayers.c_xq.on} onChange={e=>this.setLayerVisibility('c_xq', e)} /></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={s.sxx.on ? aCls : ept}>
                    <antd.Icon onClick={this.hiddenPanel.bind(this)} type="close-square" />
                    <h3 className="edu-nav-panel-header">
                        搜学校
                    </h3>
                    <div className="edu-nav-panel-container">
                        <div className="edu-search-school">
                            <antd.Input.Search onSearch={value => this.schoolSearchTextChange(value)} ref="schoolSearch" size="large" className="edu-search-group" placeholder="请输入学校名称..." />
                            <div className="edu-search-filter">
                                <div className={s.sxx.filters.all.on?aCls:ept} onClick={e=>this.schoolFilter('all')}>全部</div>
                                <div className={s.sxx.filters.y.on ? aCls : ept} onClick={e=>this.schoolFilter('y')}>幼儿园</div>
                                <div className={s.sxx.filters.x.on ? aCls : ept} onClick={e=>this.schoolFilter('x')}>小学</div>
                                <div className={s.sxx.filters.c.on ? aCls : ept} onClick={e=>this.schoolFilter('c')}>初中</div>
                                <div className={s.sxx.filters.g.on ? aCls : ept} onClick={e=>this.schoolFilter('g')}>高中</div>
                                <div className={s.sxx.filters.z.on ? aCls : ept} onClick={e=>this.schoolFilter('z')}>职高</div>
                                <div className={s.sxx.filters.t.on ? aCls : ept} onClick={e=>this.schoolFilter('t')}>特殊<br />教育</div>
                                <div className={s.sxx.filters.d.on ? aCls : ept} onClick={e=>this.schoolFilter('d')}>高等<br />院校</div>
                            </div>
                            <div className="edu-search-results">
                                <div ref="schoolPanel" className="edu-results-rows">
                                    {cSchools}
                                </div>
                                <div className="edu-results-pagination">
                                    <antd.Pagination defaultPageSize={20} current={s.sxx.current} onChange={e=>this.schoolPaginationChange(e)} simple defaultCurrent={1} total={s.sxx.total} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.cxq.on ? aCls : ept}>
                    <antd.Icon onClick={this.hiddenPanel.bind(this)} type="close-square" />
                    <h3 className="edu-nav-panel-header">
                        查学区
                    </h3>
                    <div className="edu-nav-panel-container">
                         <div className="edu-search-schoolarea">
                              <antd.Input.Search onSearch={value => this.residenceSearchTextChange(value)} ref="schoolSearchArea" size="large" className="edu-search-group" placeholder="请输入小区名称..." />
                              <div className="edu-search-results">
                                  <div ref="residencePanel" className="edu-results-rows">
                                      {cResidences}
                                  </div>
                                  <div className="edu-results-pagination">
                                      <antd.Pagination defaultPageSize={20} current={s.cxq.current} onChange={e=>this.residencePaginationChange(e)} simple defaultCurrent={1} total={s.cxq.total} />
                                  </div>
                              </div>
                         </div>
                    </div>
                </div>
                <div className={s.qtzt.on ? aCls : ept}>
                    <antd.Icon onClick={this.hiddenPanel.bind(this)} type="close-square" />
                    <h3 className="edu-nav-panel-header">
                        览专题
                    </h3>
                    <div className="edu-nav-panel-container">
                        <div className="thematicmaps">{cThematicMaps}</div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

class EduSchoolItem extends React.Component {
    constructor(props) {
        super(props);
    }

    //onClick() {
    //    this.fire('click', this.props.school, false);
    //}

    render() {
        var p = this.props;
        var sch = this.props.school;

        var cLink;
        if (sch.Website) {
            cLink = <a href={sch.Website.startsWith('http') ? sch.Website : ('http://' + sch.Website)} target="_blank">{sch.Website}</a>;
        } else {
            cLink = '暂无';
        }
        return (
        <div className="edu-school" onClick={e=>p.onClick(sch)}>
            <div className="edu-school-header"><span className={'school-icon '+sch.SType}></span>{sch.Name}</div>
            <div className="edu-school-content"><antd.Icon type="environment-o" /><span>{sch.Address}</span></div>
                <div className="edu-school-content"><antd.Icon type="phone" /><span>{sch.Telephone}</span></div>
            <div className="edu-school-content"><antd.Icon type="link" /><span>{cLink}</span></div>
        </div>);
    }
}

class ResidenceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var p = this.props;
        var r = p.residence;
        return (
        <div className="residence" onClick={e=>p.onClick(r)}>
            <div className="residence-name"><span className="residence-index">{p.index}</span>{r.Name}</div>
            <div className="residence-address">
                <antd.Icon type="environment-o" /><span>{r.Address}</span>
            </div>
        </div>);
    }
}