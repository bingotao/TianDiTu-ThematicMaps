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
            eduMap.turnLayer(e.data.layerType, e.data.visible);
        });

        eduNav.on('schoolItemClick', function (e) {
            eduMap.showSchoolPopup(e.data);
        });
    }

    render() {
        return (
        <div className="edu-main">
            <EduHeader ref="eduHeader" />
            <EduMap ref="eduMap" mapConfig={this.props.MapConfig} eduConfig={this.props.EducationConfig} />
            <EduNav ref="eduNav" mapConfig={this.props.MapConfig} eduConfig={this.props.EducationConfig} />
        </div>);
    }
}