/*
class ContentPopup extends LPopup {
    constructor(props) {
        super(props);
        this.state = {
            props: {},
            alias: {}
        };
    }

    render() {
        var s = this.state.props;
        var alias = this.state.alias;
        var cTableContent = [];
        for (var n in s) {
            var a = alias[n];
            var v = s[n];
            if (v && n) {
                cTableContent.push(<tr><th>{a}</th><td>{v}</td></tr>);
            }
        }

        return (
            <div className="content-popup">
                <div className="content-popup-title">{s.ShortName || s.Name}</div>
                <div className="content-popup-content">
                    <table>
                        {cTableContent}
                    </table>
                </div>
            </div>
            );
    }
}

class Map extends React.Component {
    constructor() {
        super();

    }

    initMap() {
        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        var baseLayers = {
            vec: {
                anno: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}", { subdomains: subdomains }),
                base: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}", { subdomains: subdomains })
            },
            img: {
                anno: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}", { subdomains: subdomains }),
                base: L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}", { subdomains: subdomains })
            }
        };

        var lat = 30.76366907304589;
        var lng = 120.75013160705568;
        this.center = [lat, lng];
        this.radius = 1000;

        this.map = L.map('map', {
            attributionControl: false,
            zoomControl: false,
            center: this.center,
            layers: [
                baseLayers.vec.base,
                baseLayers.vec.anno
            ],
            zoom: 14
        });


    }

    addLayer() {
        var popup = ContentPopup.getPopup();

        $.post('GetLayer', { layerName: '所有药店' }, function (layer) {
            var cls = layer.MarkerSymbolClass;
            var fts = layer.FeatureCollection;
            var alias = layer.FieldAlias;
            var icon = L.divIcon({ className: cls + ' iconfont icon-zixingche', iconSize: [20, 20] });

            var l = L.geoJSON(fts, {
                onEachFeature: function (ft, layer) {
                    layer.setIcon(icon);
                    layer.alias = alias;
                }
            }).bindPopup(popup).addTo(this.map);

            l.on('popupopen', function (e) {
                var props = e.layer.feature.properties;
                var alias = e.layer.alias;
                ContentPopup.setContent({
                    props: props,
                    alias: alias
                });
            });
        }.bind(this), 'json');
    }

    componentDidMount() {
        this.initMap();
    }

    render() {
        return (
        <div id="map">

        </div>
        );
    }
}

map = ReactDOM.render(<Map />, document.getElementById('app'));*/



/*
class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            treeData: props.treeData,
            autoExpandParent: true
        };
        this.getCheckedLayers = this.getCheckedLayers.bind(this);
        this.filterTree = this.filterTree.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    getCheckedLayers(e1, e2) {
        var checkedNodes = e2.checkedNodes;
        var layers = [];
        for (var i = 0, l = checkedNodes.length; i < l; i++) {
            var node = checkedNodes[i];
            if (node.props.isLeaf) {
                layers.push(node.props.layerName);
            }
        }
        this.fire('checkedStateChange', layers, false);
    }

    filterTree(text) {
        text = text || '';
        var dataList = this.props.treeData;
        var expandedKeys = [];

        function loop(data, text, parent, fit) {
            var f = false;
            for (var i = 0, l = data.length; i < l; i++) {
                var item = data[i];
                var key = item.key;
                var displayName = item.displayName || item.name || item.key;
                //父节点有 子节点全部有
                if (fit || displayName.indexOf(text) > -1) {
                    item.fit = true;
                    if (item.children) {
                        loop(item.children, text, item, true);
                    }
                    f = true;
                    expandedKeys.push(key);
                }
                    //子节点有，父节点有
                else if (item.children) {
                    f = loop(item.children, text, item);
                    item.fit = f;
                    if (f) expandedKeys.push(key);
                } else {
                    item.fit = false;
                }
            }
            return f;
        }

        loop(dataList, text);

        this.setState({
            expandedKeys: text ? expandedKeys : [],
            treeData: dataList,
            autoExpandParent: true
        });
    }

    onExpand(expandedKeys) {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    }

    render() {
        function loop(data) {
            var cNodes = [];
            for (var i = 0, l = data.length; i < l; i++) {
                var item = data[i];
                var key = item.key;
                var displayName = item.displayName || item.name || item.key;
                var layerName = item.layerName || item.name || item.key;
                var children = item.children;
                var cls = (item.fit || item.fit === undefined) ? '' : 'display-none';

                if (item.children) {
                    cNodes.push(
                        <antd.Tree.TreeNode className={cls} key={key} title={displayName}>
                            {loop(item.children)}
                        </antd.Tree.TreeNode>
                    );
                }
                cNodes.push(<antd.Tree.TreeNode className={cls} layerName={layerName} isLeaf={true} key={key} title={displayName } />);
            }
            return cNodes;
        }
        var s = this.state;

        var treeData = s.treeData;
        var expandKeys = s.expandedKeys;

        return (
        <div className="catalog">
            <div className="catalog-search">
                <antd.Input.Search placeholder="请输入关键字..." onChange={e=>this.filterTree(e.target.value)} />
            </div>
            <div className="catalog-tree">
                <antd.Tree ref='tree' onExpand={this.onExpand} autoExpandParent={s.autoExpandParent} checkable onCheck={this.getCheckedLayers} expandedKeys={expandKeys}>
                    {loop(treeData)}
                </antd.Tree>
            </div>
        </div>
);
    }
}

catalog = ReactDOM.render(<Catalog treeData={treeData } />, document.getElementById('app'));

catalog.on('checkedStateChange', function (e) {
    console.log(e.data);
});
*/

routePlanning = ReactDOM.render(<PlanningPanel />, document.getElementById('app'));