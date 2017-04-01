class PublicService extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="public-service">
            <PoliceOfficeSearch />
        </div>
        );
    }
}

var ps = ReactDOM.render(<PublicService />, document.getElementById('main'));