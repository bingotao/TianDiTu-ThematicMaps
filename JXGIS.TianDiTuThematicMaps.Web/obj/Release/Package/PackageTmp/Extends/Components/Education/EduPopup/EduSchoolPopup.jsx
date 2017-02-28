class EduSchoolPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.showSchoolDetail = this.showSchoolDetail.bind(this);
        this.onShowSchoolAreaClick = this.onShowSchoolAreaClick.bind(this);
        this.onShowResidenceClick = this.onShowResidenceClick.bind(this);
    }

    setContent(content) {
        this.setState(content);
    }

    showSchoolDetail() {
        window.open('SchoolDetails?id=' + this.state.ID, '_blank');
    }

    onShowSchoolAreaClick() {
        this.fire('onShowSchoolAreaClick', this.state, false);
    }

    onShowResidenceClick() {
        this.fire('onShowResidenceClick', { schoolID: this.state.SchoolID });
    }

    render() {
        var s = this.state;
        var p = s.SType === 'x' || s.SType === 'c' ? <span><antd.Button onClick={this.onShowSchoolAreaClick} type="primary" size="small">查看学区</antd.Button><antd.Button type="primary" size="small" onClick={this.onShowResidenceClick }>查看施教小区</antd.Button></span> : null;
        return (
            <div className="schoolpopup">
                <h3>
                    <span className={'school-icon ' + s.SType }></span>
                    {s.Name}
                </h3>
                <div><antd.Icon type="environment-o" /><span>{s.Address}</span></div>
                <div><antd.Icon type="phone" /><span>{s.Telephone}</span></div>
                <div><antd.Icon type="link" /><span>{s.Website ? <a href={s.Website.startsWith('http') ? s.Website : ('http://' + s.Website)} target="_blank">{s.Website}</a> : '暂无'}</span></div>
                <div><antd.Icon type="mail" /><span>{s.Email || '暂无'}</span></div>
                <div>
                    <antd.Button type="primary" onClick={this.showSchoolDetail} size="small">查看详情</antd.Button>
                    {p}
                </div>
            </div>);
    }
}

EduSchoolPopup.getPopupContent = function () {
    if (!EduSchoolPopup.popupContent) {
        var dom = document.createElement('div');
        EduSchoolPopup.popupContent = ReactDOM.render(<EduSchoolPopup />, dom);
        EduSchoolPopup.popupContent.dom = dom;
    }
    return EduSchoolPopup.popupContent;
}

EduSchoolPopup.getPopup = function () {
    if (!EduSchoolPopup.popup) {
        var popupContent = EduSchoolPopup.getPopupContent();
        EduSchoolPopup.popup = L.popup({ offset: [0, -5] }).setContent(popupContent.dom);
    }
    return EduSchoolPopup.popup;
}

EduSchoolPopup.clearMarker = function () {
    EduSchoolPopup.marker && EduSchoolPopup.marker.remove();
}