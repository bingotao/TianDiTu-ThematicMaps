class ContentPopup extends LPopup {
    constructor(props) {
        super(props);
        this.state = {
            props: {},
            alias: {}
        };
    }

    render() {
        var s = this.state.props;
        var alias = this.state.alias;
        var cTableContent = [];
        for (var n in s) {
            var a = alias[n];
            var v = s[n];
            if (v && n) {
                cTableContent.push(<tr><th>{a}</th><td>{v}</td></tr>);
            }
        }

        return (
            <div className="content-popup">
                <div className="content-popup-title">{s.ShortName || s.Name}</div>
                <div className="content-popup-content">
                    <table>
                        {cTableContent}
                    </table>
                </div>
            </div>
            );
    }
}