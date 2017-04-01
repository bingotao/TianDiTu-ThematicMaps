class PoliceOfficeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            officeTree: null,
            defaultExpandedKeys: null,
            expandedKeys: null
        };

        this._funsBind(["treeNodeClick", "filterNodes", "onExpand"]);
        this.eventList = {
            treeNodeClick: 'treeNodeClick'
        };
    }

    onExpand(expandedKeys, e) {
        this.setState({ expandedKeys: expandedKeys });
    }

    filterNodes(text) {
        text = text.trim();
        var ot = this.state.officeTree;
        var expandedKeys = [ot.ID];

        const loop = (treeNode, expand) => {
            var e = expand === true || treeNode.Name.indexOf(text) > -1;
            if (treeNode.SubOffice) {
                var v = false;
                for (var i = 0, l = treeNode.SubOffice.length; i < l ; i++) {
                    var node = treeNode.SubOffice[i];
                    var r = loop(node, e);
                    if (r) {
                        expandedKeys.indexOf(node.ID) === -1 && node.SubOffice && expandedKeys.push(node.ID);
                        treeNode.visible = true;
                        v = true;
                    }
                }
                e = v;
            }
            treeNode.visible = e;
            return e;
        }

        loop(ot, false);

        this.setState({ expandedKeys: text ? expandedKeys : [ot.ID] });
    }

    treeNodeClick(keys, event) {
        this.fire(this.eventList.treeNodeClick, { node: event.node.props.node }, false);
    }

    getTree() {
        var ot = this.state.officeTree;
        var cTree = null;

        const loop = data => data.map((item) => {
            if (item.SubOffice) {
                return (
                      <antd.Tree.TreeNode className={'tree-node '+ this._getClass(item.visible===undefined||item.visible)} node={item} key={item.ID} title={item.Name}>
                          {loop(item.SubOffice)}
                      </antd.Tree.TreeNode>
                    );
            }
            return <antd.Tree.TreeNode className={'tree-node ' + this._getClass(item.visible === undefined || item.visible)} node={item} key={item.ID} title={item.Name } />;
        });

        if (ot) {
            cTree =
            <antd.Tree onExpand={this.onExpand} expandedKeys={this.state.expandedKeys} defaultExpandedKeys={this.state.defaultExpandedKeys} onSelect={this.treeNodeClick}>
                <antd.Tree.TreeNode className="tree-node active" node={ot} key={ot.ID} title={ot.Name }>
                    {loop(ot.SubOffice)}
                </antd.Tree.TreeNode>
            </antd.Tree>;
        }

        return cTree;
    }

    componentDidMount() {
        $.post('GetPoliceOffices', function (rt) {
            if (rt.ErrorMessage) {
                antd.message.error(rt.ErrorMessage);
            } else {
                this.setState({
                    officeTree: rt.Data,
                    defaultExpandedKeys: [rt.Data.ID],
                    expandedKeys: [rt.Data.ID]
                });
            }
        }.bind(this), 'json');
    }

    render() {
        var s = this.state;
        var ot = s.officeTree;
        var cTree = this.getTree();
        return (
        <div className="po-search">
            <div>
                <antd.Input.Search onSearch={this.filterNodes} />
            </div>
            <div>
                {cTree}
            </div>
        </div>
        );
    }
}