class EduClearButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.fire('onClick', this, false);
    }

    render() {
        return (
            <antd.Tooltip title="清空" placement="left">
                <div className="educlearbutton iconfont icon-qingkong1" onClick={this.onClick}>

                </div>
            </antd.Tooltip>
            );
    }
}