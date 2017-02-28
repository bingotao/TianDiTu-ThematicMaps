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

        EduSchoolPopup.getPopupContent().on('onShowSchoolAreaClick', function (e) {
            eduMap.showSchoolArea(e.data.ID);
        });

        EduSchoolPopup.getPopupContent().on('onShowResidenceClick', function (e) {
            eduNav.select('cxq');
            eduNav.searchResidenceByID(null, e.data.schoolID);
        });

        ResidencePopup.getPopupContent().on('onShowSchoolAreaClick', function (e) {
            eduMap.showSchoolArea(null, e.data.residence.Y, e.data.residence.X, e.data.type);
        });

        EduSchoolAreaPopup.getPopupContent().on('onShowResidenceClick', function (e) {
            eduNav.select('cxq');
            eduNav.searchResidenceByID(e.data.schoolAreaID, null);
        });

        eduNav.on('onResidenceLoaded', function (e) {
            eduMap.addResidence(e.data.rows.features);
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