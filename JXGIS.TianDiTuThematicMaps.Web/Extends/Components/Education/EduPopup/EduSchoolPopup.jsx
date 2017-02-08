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
        return (
            <div className="schoolpopup">
                <h3>
                    {s.Name}
                    <span className={'badge_' + s.SType }>{s.SchoolType}</span>
                </h3>
                <table>
                    <tr>
                        <th style={{ width: '80px' }}>地址</th>
                        <td style={{ width: '220px' }}>{s.Address}</td>
                    </tr>
                    <tr>
                        <th>电话</th>
                        <td>{s.Telephone}</td>
                    </tr>
                    <tr>
                        <th>网站</th>
                        <td>{s.Website ? <a href={s.Website.startsWith('http') ? s.Website : ('http://' + s.Website)} target="_blank">{s.Website}</a> : '暂无'}</td>
                    </tr>
                </table>
                <a href={"SchoolPage?id="+s.ID} target="_blank">查看详情</a>
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
        EduSchoolPopup.popup = L.popup().setContent(popupContent.dom);
    }
    return EduSchoolPopup.popup;
}