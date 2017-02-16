/*  LPopup基类 单例模式*/
class LPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }

    //  setState 重设View内容
    static setContent(content) {
        var popupContent = this.getPopupContent();
        popupContent.setState(content);
    }

    //  获取Popup内容组件
    static getPopupContent() {
        if (!this.popupContent) {
            var dom = document.createElement('div');
            this.popupContent = ReactDOM.render(React.createElement(this), dom);
            this.popupContent.dom = dom;
        }
        return this.popupContent;
    }

    //  获取Popup实体
    static getPopup() {
        if (!this.popup) {
            var popupContent = this.getPopupContent();
            this.popup = L.popup({ offset: [0, -5] }).setContent(popupContent.dom);
        }
        return this.popup;
    }

    //  设置当前Popup的layer
    static setLayer(layer) {
        this.layer = layer;
    }

    //  清空Popup的layer
    static clearLayer() {
        this.layer && this.layer.remove();
    }
}

/* 使用
class XXPopup extends LPopup {
    constructor(props){
        super(props);
        this.state=...
    }

    other methods...

    render(){
        ...
        return (
        elements...
        );
    }
}
var popup = XXPopup.getPopup();
*/