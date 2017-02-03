class EduNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kdt: {
                on: false,
                layers: props.mapConfig.Layers
            },
            sxx: {
                on: false,
                filters: {
                    all: {
                        count: 211,
                        on: true
                    },
                    y: {
                        count: 10,
                        on: false
                    },
                    x: {
                        count: 22,
                        on: false
                    },
                    c: {
                        count: 31,
                        on: false
                    },
                    g: {
                        count: 2,
                        on: false
                    },
                    z: {
                        count: 7,
                        on: false
                    },
                    t: {
                        count: 1,
                        on: false
                    },
                    d: {
                        count: 8,
                        on: false
                    }
                }
            },
            cxq: {
                on: false
            },
            qtzt: {
                on: false
            }
        };
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
        fts[target].on = true
        this.setState(this.state);
        //this.fire('onSchoolFilter', { target: target });
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

    render() {
        var aCls = "active";
        var ept = "";
        var s = this.state;
        var sLayers = s.kdt.layers;
        return (
        <div className="edu-nav">
            <div className="edu-navs">
                <div onClick={e=>this.select("sxx", function () { this.refs.schoolSearch.input.focus() }.bind(this))} className={s.sxx.on ? aCls : ept}>
                    <span className="iconfont icon-sousuo-sousuo"></span>
                    搜学校
                </div>
                <div className="ct-split"></div>
                <div onClick={e=>this.select("cxq", function () { this.refs.schoolSearchArea.input.focus() }.bind(this))} className={s.cxq.on ? aCls : ept}>
                    <span className="iconfont icon-xuequ"></span>
                    查学区
                </div>
                <div className="ct-split"></div>
                <div onClick={e=>this.select("kdt")} className={s.kdt.on ? aCls : ept}>
                    <span className="iconfont icon-ditu"></span>
                    览地图
                </div>
                <div className="ct-split"></div>
                <div onClick={e=>this.select("qtzt")} className={s.qtzt.on ? aCls : ept}>
                    <span className="iconfont icon-qita"></span>
                    看专题
                </div>
            </div>
            <div className="edu-nav-quicksearch">
                <input type="text" onFocus={e=> { this.select('sxx', function () { this.refs.schoolSearch.input.focus(); }.bind(this)); }} placeholder="请输入学校名称..." />
                <antd.Icon type="search" />
            </div>
            <div className="edu-nav-panel">
                <div className={s.kdt.on ? aCls : ept}>
                    <antd.Icon onClick={this.hiddenPanel.bind(this)} type="close-square" />
                    <h3 className="edu-nav-panel-header">览地图</h3>
                    <div className="edu-nav-panel-container">
                        <div className="edu-layers">
                            <div className="edu-layergroup">
                                <h3>学校</h3>
                                <div><span className="edu-icon y">幼</span><span className="edu-layer-title">幼 儿 园</span><antd.Switch size="small" defaultChecked={sLayers.y.on} onChange={e=>this.setLayerVisible('y',e)} /></div>
                                <div><span className="edu-icon x">小</span><span className="edu-layer-title">小 学</span><antd.Switch size="small" defaultChecked={sLayers.x.on} onChange={e=>this.setLayerVisible('x',e)} /></div>
                                <div><span className="edu-icon c">初</span><span className="edu-layer-title">初 中</span><antd.Switch size="small" defaultChecked={sLayers.c.on} onChange={e=>this.setLayerVisible('c',e)} /></div>
                                <div><span className="edu-icon g">高</span><span className="edu-layer-title">普通高中</span><antd.Switch size="small" defaultChecked={sLayers.g.on} onChange={e=>this.setLayerVisible('g',e)} /></div>
                                <div><span className="edu-icon z">职</span><span className="edu-layer-title">职业高中</span><antd.Switch size="small" defaultChecked={sLayers.z.on} onChange={e=>this.setLayerVisible('z',e)} /></div>
                                <div><span className="edu-icon t">特</span><span className="edu-layer-title">特殊教育</span><antd.Switch size="small" defaultChecked={sLayers.t.on} onChange={e=>this.setLayerVisible('t',e)} /></div>
                                <div><span className="edu-icon d">大</span><span className="edu-layer-title">高等院校</span><antd.Switch size="small" defaultChecked={sLayers.d.on} onChange={e=>this.setLayerVisible('d',e)} /></div>
                            </div>

                            <div className="edu-layergroup">
                                <h3>学区</h3>
                                <div><span className="edu-icon x-xq"></span><span className="edu-layer-title">小学学区</span><antd.Switch size="small" defaultChecked={sLayers.x_xq.on} onChange={e=>this.setLayerVisible('x_xq',e)} /></div>
                                <div><span className="edu-icon c-xq"></span><span className="edu-layer-title">初中学区</span><antd.Switch size="small" defaultChecked={sLayers.c_xq.on} onChange={e=>this.setLayerVisible('c_xq',e)} /></div>
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
                            <antd.Input.Search ref="schoolSearch" size="large" className="edu-search-group" placeholder="请输入学校名称..." />
                            <div className="edu-search-filter">
                                <div className={s.sxx.filters.all.on?aCls:ept} onClick={e=>this.schoolFilter('all')}>全部{s.sxx.filters.all.count ? <span className="ct-badge ct-badge-all">{s.sxx.filters.all.count}</span> : ept}</div>
                                <div className={s.sxx.filters.y.on ? aCls : ept} onClick={e=>this.schoolFilter('y')}>幼儿园{s.sxx.filters.y.count ? <span className="ct-badge ct-badge-y">{s.sxx.filters.y.count}</span> : ept}</div>
                                <div className={s.sxx.filters.x.on ? aCls : ept} onClick={e=>this.schoolFilter('x')}>小学{s.sxx.filters.x.count ? <span className="ct-badge ct-badge-x">{s.sxx.filters.x.count}</span> : ept}</div>
                                <div className={s.sxx.filters.c.on ? aCls : ept} onClick={e=>this.schoolFilter('c')}>初中{s.sxx.filters.c.count ? <span className="ct-badge ct-badge-c">{s.sxx.filters.c.count}</span> : ept}</div>
                                <div className={s.sxx.filters.g.on ? aCls : ept} onClick={e=>this.schoolFilter('g')}>高中{s.sxx.filters.g.count ? <span className="ct-badge ct-badge-g">{s.sxx.filters.g.count}</span> : ept}</div>
                                <div className={s.sxx.filters.z.on ? aCls : ept} onClick={e=>this.schoolFilter('z')}>职高{s.sxx.filters.z.count ? <span className="ct-badge ct-badge-z">{s.sxx.filters.z.count}</span> : ept}</div>
                                <div className={s.sxx.filters.t.on ? aCls : ept} onClick={e=>this.schoolFilter('t')}>特殊<br />教育{s.sxx.filters.t.count ? <span className="ct-badge ct-badge-t">{s.sxx.filters.t.count}</span> : ept}</div>
                                <div className={s.sxx.filters.d.on ? aCls : ept} onClick={e=>this.schoolFilter('d')}>高等<br />院校{s.sxx.filters.d.count ? <span className="ct-badge ct-badge-d">{s.sxx.filters.d.count}</span> : ept}</div>
                            </div>
                            <div className="edu-search-results"></div>
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
                            <antd.Input.Search ref="schoolSearchArea" size="large" className="edu-search-group" placeholder="请输入学校或小区名称..." />
                            <div className="edu-search-results"></div>
                        </div>
                    </div>
                </div>
                <div className={s.qtzt.on ? aCls : ept}>
                    <antd.Icon onClick={this.hiddenPanel.bind(this)} type="close-square" />
                    <h3 className="edu-nav-panel-header">
                        看专题
                    </h3>
                    <div className="edu-nav-panel-container"></div>
                </div>
            </div>
        </div>);
    }
}