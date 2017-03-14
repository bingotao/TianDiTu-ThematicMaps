class GovSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: {
                open: true
            },
            vec: true
        };
        this.closeCatalog = this.closeCatalog.bind(this);
        this.openCatalog = this.openCatalog.bind(this);
        this.toggleCatalog = this.toggleCatalog.bind(this);
        this.baseMapClick = this.baseMapClick.bind(this);
    }

    baseMapClick() {
        var vec = !this.state.vec;
        this.state.vec = vec;
        this.setState(this.state);

        this.refs.govMap.toggleBaseMap(vec);
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
        cCatalog.on('checkedStateChange', function (e) {
            var govMap = this.refs.govMap;
            govMap.resetLayers(e.data);
        }, this);

        this.on('catalogToggle', function (e) {
            var open = e.data.open;
            var govMap = this.refs.govMap;
            govMap.panBy(open ? [-150, 0] : [150, 0]);
        }, this);
    }

    render() {
        var p = this.props;
        var s = this.state;
        var c = s.catalog;
        var vec = !s.vec;

        var cBtnTogglBaseMap =
            (<antd.Tooltip placement="right" title={vec ? '地图' : '影像'}>
                <span onClick={this.baseMapClick} className={"basemap-btn-toggle iconfont " + (vec ? 'icon-ditu2' : 'icon-iconweixing')}></span>
            </antd.Tooltip>);

        return (
            <div className="govsubmit">
                <div className="govsubmit-header"></div>
                <div className="govsubmit-map">
                    <antd.Tooltip placement="right" title={'资源目录'}>
                        <antd.Icon onClick={this.toggleCatalog} className={"catalog-btn-toggle " + (c.open ? 'active' : '')} type="book" />
                    </antd.Tooltip>

                    {cBtnTogglBaseMap}

                    <Map ref="govMap" layerConfig={layerConfig} />
                </div>
                <div className={"govsubmit-catalog " + (c.open?"active":"")}>
                    <span onClick={this.closeCatalog} className="catalog-btn-close">
                        <antd.Icon type="close-circle" />
                    </span>
                    <div className="govsubmit-catalog-header"><antd.Icon type="bars" />资源目录</div>
                    <div className="govsubmit-catalog-body">
                        <Catalog ref='catalog' treeData={p.treeData} />
                    </div>
                </div>
            </div>
            );
    }
}

govsubmit = ReactDOM.render(<GovSubmit treeData={treeData } />, document.getElementById('main'));