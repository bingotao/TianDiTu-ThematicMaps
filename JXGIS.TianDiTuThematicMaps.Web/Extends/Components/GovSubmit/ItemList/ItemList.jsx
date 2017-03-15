class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCount: 0,
            rows: [],
            currentPage: 1,
            layerName: '',
            keyword: ''
        };

        this.getItems = this.getItems.bind(this);
        this.pageNumberChange = this.pageNumberChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.itemClick = this.itemClick.bind(this);
    }

    setTitle(title, callback) {
        this.state.layerName = title;
        this.setState(this.state, callback);
    }

    pageNumberChange(page, pageSize) {
        this.state.currentPage = page;
        this.setState(this.state, this.getItems);
    }

    getItems() {
        var s = this.state;
        var layerName = s.layerName;
        var keyword = s.keyword;
        var currentPage = s.currentPage;
        this._getItems({
            layerName: s.layerName,
            keyword: s.keyword,
            pageNumber: currentPage,
            pageSize: 20
        });
    }

    _getItems(condition) {
        $.post('GetItems', condition, this.loadData, 'json');
    }

    loadData(rt) {
        var obj = JSON.parse(rt);
        if (obj.ErrorMessage) {
            antd.message.error(obj.ErrorMessage);
        } else {
            var data = obj.Data;
            var count = data.count;
            var fts = data.ftCol.features;

            var s = this.state;
            s.totalCount = count;
            s.rows = fts;

            this.refs.listContainer.scrollTop = 0;
            this.setState(s);
        }
    }

    reset() {
        var s = this.state;
        s.totalCount = 0,
        s.rows = [],
        s.currentPage = 1,
        layername = '';
        this.setState(s);
    }

    search(text) {
        var s = this.state;
        s.keyword = text;
        s.currentPage = 1;
        s.rows = [];
        this.setState(s, this.getItems);
    }

    itemClick(feature) {
        this.fire('itemClick', { feature: feature }, false);
    }

    render() {
        var s = this.state;
        var ps = this.props;

        var cItems = [];
        for (var i = 0, l = s.rows.length; i < l ; i++) {
            var item = s.rows[i];
            cItems.push(<ListItem onItemClick={this.itemClick} feature={item } />);
        }

        return (
            <div className={"itemlist " + (s.showItemList ? 'active':'' )}>
                <div className="itemlist-header"><antd.Icon type="bars" />{s.layerName}</div>
                <div className="itemlist-search">
                    <antd.Input.Search value={s.keyword} placeholder="请输入关键字..."
                                       onChange={e => { s.keyword = e.target.value; this.setState(s) }}
                                       onSearch={e=>{this.search(e)}} />
                </div>
                <div ref="listContainer" className="item-list-items">
                    <div>{cItems}</div>
                </div>
                <div className="item-pagenation">
                    <antd.Pagination size="small" onChange={this.pageNumberChange} current={s.currentPage} pageSize={20} total={s.totalCount} />
                </div>
            </div>);
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var ft = this.props.feature;
        var props = ft.properties;
        var name = props.ShortName || props.Name;
        var location = props.Address || '暂无';
        var telephone = props.Telephone || '暂无';
        var website = props.Website || '暂无';

        return (
                <div className="item" onClick={e=>this.props.onItemClick(this.props.feature)}>
                    <div className="item-name"><span>{name}</span></div>
                    <div className="item-loc"><antd.Icon type="environment-o" /><span>{location}</span></div>
                    <div className="item-tel"><antd.Icon type="phone" /><span>{telephone}</span></div>
                    <div className="item-web"><antd.Icon type="cloud-o" /><span>{website}</span></div>
                </div>
                );
    }
}