class EduSchoolAreaPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var s = this.state;
        return (
        <div className="schooldistrictpopup">
            <div className="schooldistrictpopup-name">{s.Name}</div>
            <span>范围</span>
            <div className="schooldistrictpopup-area">{s.Area}</div>
            <span>社区</span>
            <div className="schooldistrictpopup-districts">{s.Districts}</div>
        </div>);
    }
}

EduSchoolAreaPopup.getPopupContent = function () {
    if (!EduSchoolAreaPopup.popupContent) {
        var dom = document.createElement('div');
        EduSchoolAreaPopup.popupContent = ReactDOM.render(<EduSchoolAreaPopup />, dom);
        EduSchoolAreaPopup.popupContent.dom = dom;
    }
    return EduSchoolAreaPopup.popupContent;
}

EduSchoolAreaPopup.getPopup = function () {
    if (!EduSchoolAreaPopup.popup) {
        var popupContent = EduSchoolAreaPopup.getPopupContent();
        EduSchoolAreaPopup.popup = L.popup().setContent(popupContent.dom);
    }
    return EduSchoolAreaPopup.popup;
}

EduSchoolAreaPopup.setContent = function (schoolArea) {
    EduSchoolAreaPopup.getPopupContent().setState(schoolArea);
}