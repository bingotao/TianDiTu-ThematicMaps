//class Hello extends React.Component {
//    constructor() {
//        super();
//        age = 10;
//        this.state = {
//            time: new Date().toDateString()
//        };
//    }

//    getTime() {
//        var cThis = this;
//        $.post('GetTime', function (time) {
//            cThis.setState({ time: time });
//        }, 'text');
//    }

//    render() {
//        var time = this.state.time;
//        return (
//             <div onClick={this.getTime.bind(this)}>{time}</div>
//            );
//    }
//}

class L extends React.Component {
    constructor(props) {
        super(props);

        this.events = props.events;
    }

    render() {
        var e = this.events;
        var p = this.props;
        var data = p.data;
        return (
            <li onClick={e.onClick && e.onClick.bind(this, data) }>{data.name}:{data.value}</li>
            );
    }
}

class A extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {
                name: 'ct',
                age: 18
            },
            classList: [
                { name: '语文', value: 99 },
                { name: '数学', value: 98 },
                { name: '外语', value: 97 }
            ]
        };

        this.events = props.events;


    }

    render() {
        var s = this.state;
        var e = this.events;

        var cClassList = this.state.classList.map(function (c, i) {
            var cL = <L data={c} events={
                    {
                        onClick: e.onItemClick
                    }
            } />;
            return cL;
        });

        return (
            <div onClick={e.onClick && e.onClick.bind(this, s)}>
                <h3>列表</h3>
                <ul>{cClassList}</ul>
                <button onClick={e.onBtnClick && e.onBtnClick.bind(this, s)}>按钮</button>
            </div>
            );
    }
}

//ReactDOM.render(<A events={{
//        onClick: function (data, e) {
//            console.log(data);
//        },
//        onBtnClick: function (data, e) {
//            console.log(data);
//            e.stopPropagation();
//        },
//        onItemClick: function (data, e) {
//            console.log(data);
//        }
//    }
//} />, document.getElementById('app'));


class C extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'chentao',
            schools: {
                xx: 'ds',
                highSchool: 'guangde'
            }
        };
    }

    render() {
        var s = this.state;
        return (
        <div>
            {s.name}<br />
            {s.schools.xx}<br />
            {s.schools.highSchool}
        </div>
        );
    }
}

c = ReactDOM.render(<C />, document.getElementById('app'));