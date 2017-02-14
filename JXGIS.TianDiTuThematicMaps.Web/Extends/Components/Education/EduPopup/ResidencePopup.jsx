class ResidencePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var s = this.state;
        return (
        <div className='residencepopup'>
            <div className='residencepopup-name'>{s.name}</div>
            <div className='residencepopup-address'><antd.Icon type="environment-o" /><span>{s.address}</span></div>
            <div>
                <antd.Button size='small' type="primary">查看学区</antd.Button>
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