class ResidencePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showSchoolArea(type) {
        this.fire('onShowSchoolAreaClick', { type: type, residence: this.state }, false);
    }
    render() {
        var s = this.state;
        return (
        <div className='residencepopup'>
            <div className='residencepopup-name'>{s.name}</div>
            <div className='residencepopup-address'><antd.Icon type="environment-o" /><span>{s.address}</span></div>
            <div>
                <antd.Button size='small' onClick={e=>this.showSchoolArea('x_xq')} type="primary">小学学区</antd.Button>
                <antd.Button size='small' onClick={e=>this.showSchoolArea('c_xq')} type="primary">初中学区</antd.Button>
            </div>
        </div>);
    }
}

ResidencePopup.getPopupContent = function () {
    if (!ResidencePopup.popupContent) {
        var dom = document.createElement('div');
        ResidencePopup.popupContent = ReactDOM.render(<ResidencePopup />, dom);
        ResidencePopup.popupContent.dom = dom;
    }
    return ResidencePopup.popupContent;
}

ResidencePopup.getPopup = function () {
    if (!ResidencePopup.popup) {
        var popupContent = ResidencePopup.getPopupContent();
        ResidencePopup.popup = L.popup({ offset: [0, -5] }).setContent(popupContent.dom);
    }
    return ResidencePopup.popup;
}

ResidencePopup.setContent = function (residence) {
    ResidencePopup.getPopupContent().setState(residence);
}

ResidencePopup.removeMarker = function () {
    if (ResidencePopup.marker) {
        ResidencePopup.marker.remove();
    }
}

ResidencePopup.clearMarker = function () {
    ResidencePopup.marker && ResidencePopup.marker.remove();
}