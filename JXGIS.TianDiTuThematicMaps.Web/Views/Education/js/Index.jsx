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

        eduNav.on('residenceItemClick', function (e) {
            eduMap.showResidencePopup(e.data);
        });
    }

    render() {
        return (
        <div className="edu-main">
            <EduHeader ref="eduHeader" />
            <EduMap ref="eduMap" mapConfig={this.props.MapConfig} eduConfig={this.props.EducationConfig} />
            <EduNav ref="eduNav" mapConfig={this.props.MapConfig} eduConfig={this.props.EducationConfig} />
            <div className="edu-explain">本图所示学区范围仅供参考，实际施教范围以教育局相关文件为准。</div>
        </div>);
    }
}