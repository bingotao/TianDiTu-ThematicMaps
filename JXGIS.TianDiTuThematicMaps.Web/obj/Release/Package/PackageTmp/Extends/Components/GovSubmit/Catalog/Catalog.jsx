class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            treeData: props.treeData,
            autoExpandParent: true,
            showItemList: false
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

    showItemDetailClick(layerName) {
        this.fire('showItemDetailClick', { layerName: layerName }, false);
    }

    render() {
        var cThis = this;
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
                var cDisplay =
                <span>
                    {displayName}
                    <antd.Tooltip placement="right" title="查看明细">
                        <antd.Icon onClick={cThis.showItemDetailClick.bind(cThis, layerName)} type="file-text" />
                    </antd.Tooltip>
                </span>;
                cNodes.push(<antd.Tree.TreeNode className={cls} layerName={layerName} isLeaf={true} key={key} title={cDisplay } />);
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