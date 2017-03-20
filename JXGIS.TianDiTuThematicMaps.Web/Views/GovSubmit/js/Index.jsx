class GovSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: {
                open: true
            },
            itemlist: {
                open: false
            },
            vec: true
        };
        this.closeCatalog = this.closeCatalog.bind(this);
        this.openCatalog = this.openCatalog.bind(this);
        this.toggleCatalog = this.toggleCatalog.bind(this);
        this.baseMapClick = this.baseMapClick.bind(this);
        this.setCatalogOpenState = this.setCatalogOpenState.bind(this);
        this.hiddenItemList = this.hiddenItemList.bind(this);

    }

    baseMapClick() {
        var vec = !this.state.vec;
        this.state.vec = vec;
        this.setState(this.state);
        this.refs.govMap.toggleBaseMap(vec);
    }

    setCatalogOpenState(open) {
        open = open === undefined ? !this.state.catalog.open : !!open;
        this.state.catalog.open = open;
        this.setState(this.state);
        this.fire('catalogToggle', { open: open }, false);
    }

    toggleCatalog() {
        var open = !this.state.catalog.open;
        this.state.catalog.open = open;
        this.setState(this.state);
        this.fire('catalogToggle', { open: open }, false);
    }

    openCatalog() {
        var open = true;
        this.state.catalog.open = open;
        this.setState(this.state);
        this.fire('catalogOpen', { open: open }, false);
    }

    closeCatalog() {
        var open = false;
        this.state.catalog.open = open;
        this.setState(this.state);
        this.fire('catalogClose', { open: open }, false);
    }

    componentDidMount() {
        var cCatalog = this.refs.catalog;
        var cItemlist = this.refs.itemlist;
        var cGovMap = this.refs.govMap;

        cCatalog.on('checkedStateChange', function (e) {
            var govMap = this.refs.govMap;
            govMap.resetLayers(e.data);
        }, this);

        cCatalog.on('showItemDetailClick', function (e) {
            var layerName = e.data.layerName;
            this.showItemList();
            cItemlist.setTitle(layerName, function (layerName) { cItemlist.search(layerName); });
        }, this);

        cItemlist.on('itemClick', function (e) {
            cGovMap.showFeature(e.data.feature);
        }, this);

        this.on('catalogToggle', function (e) {
            var open = e.data.open;
            var govMap = this.refs.govMap;
            govMap.panBy(open ? [-150, 0] : [150, 0]);
        }, this);

    }

    showItemList() {
        this.state.itemlist.open = true;
        this.setState(this.state);
        this.refs.itemlist.focusInput();
    }

    hiddenItemList() {
        this.state.itemlist.open = false;
        this.setState(this.state);
    }

    render() {
        var p = this.props;
        var s = this.state;
        var c = s.catalog;
        var il = s.itemlist;
        var vec = !s.vec;

        var cBtnTogglBaseMap =
            (<antd.Tooltip placement="right" title={vec ? '地图' : '影像'}>
                <span onClick={this.baseMapClick} className={"basemap-btn-toggle iconfont " + (vec ? 'icon-ditu2' : 'icon-iconweixing')}></span>
            </antd.Tooltip>);

        return (
            <div className="govsubmit">
                <div className="govsubmit-header"></div>
                <div className="govsubmit-map">
                    <div className="govsubmit-quicksearch">
                        <antd.Input onFocus={e=> {
                                var itemlist = this.refs.itemlist;
                                this.showItemList();
                                itemlist.setTitle(null,
                                    function () {
                                        itemlist.search();
                                    });
                            }} placeholder="请输入关键字..." />
                        <antd.Icon type="search" />
                    </div>
                    <antd.Tooltip placement="right" title={'资源目录'}>
                        <antd.Icon onClick={this.setCatalogOpenState.bind(this,undefined)} className={"catalog-btn-toggle " + (c.open ? 'active' : '')} type="book" />
                    </antd.Tooltip>

                    {cBtnTogglBaseMap}

                    <Map ref="govMap" layerConfig={layerConfig} />
                </div>
                <div className={"govsubmit-catalog " + (c.open?"active":"")}>
                    <span onClick={this.setCatalogOpenState.bind(this,false)} className="catalog-btn-close">
                        <antd.Icon type="close-circle" />
                    </span>
                    <div className="govsubmit-catalog-header"><antd.Icon type="bars" />资源目录</div>
                    <div className="govsubmit-catalog-body">
                        <Catalog ref='catalog' treeData={p.treeData} />
                    </div>
                </div>
                <div className={"govsubmit-itemlist " + (il.open ? 'active' : '')}>
                    <antd.Tooltip placement="right" title="返回">
                        <antd.Icon className="itemlist-close" type="arrow-left" onClick={this.hiddenItemList} />
                    </antd.Tooltip>
                    <ItemList ref="itemlist" />
                </div>
            </div>
            );
    }
}

govsubmit = ReactDOM.render(<GovSubmit treeData={treeData } />, document.getElementById('main'));