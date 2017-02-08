class EduBaseLayerToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vec: this.props.vec ? true : false
        };
    }

    change() {
        var bVec = !this.state.vec;
        this.setState({ vec: bVec });
        this.fire('change', { vec: bVec }, false);
    }

    render() {
        return (
        <div className="baselayertoggle">
            <antd.Tooltip placement="left" overlayClassName={!this.state.vec ? 'img-tooltip' : ''} title={this.state.vec ? '卫 星' : '地 图'} arrowPointAtCenter>
            <div onClick={this.change.bind(this)} className={'iconfont ' + (this.state.vec ? 'icon-iconweixing' : 'icon-ditu2')}>

            </div>
            </antd.Tooltip>
        </div>);
    }
}