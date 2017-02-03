class EduHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="edu-header">

        </div>);
    }
}


class EduIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        eduHeader = this.refs.eduHeader;
        eduMap = this.refs.eduMap;
        eduNav = this.refs.eduNav;

        eduNav.on('layerChange', function (e) {
            //console.log(e);
            eduMap.turnLayer(e.data.layerType, e.data.visible);
        });
    }

    render() {
        return (
        <div className="edu-main">
            <EduHeader ref="eduHeader" />
            <EduMap ref="eduMap" mapConfig={this.props.MapConfig} />
            <EduNav ref="eduNav" mapConfig={this.props.MapConfig} />
        </div>);
    }
}