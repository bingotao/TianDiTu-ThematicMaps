class EduSchoolPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setContent(content) {
        this.setState(content);
    }

    render() {
        var s = this.state;
        var p = s.SType === 'x' || s.SType === 'c' ? <a href='#'>显示学区</a> : null;
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
                    <a href={"SchoolPage?id="+s.ID} target="_blank">查看详情</a>
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