class SchoolDetails extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        var sch = this.props.School;

        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        var baseLayers = [
            L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}", { subdomains: subdomains }),
            L.tileLayer("http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}", { subdomains: subdomains })
        ];

        var center = [sch.Lat, sch.Lng];
        //init map
        map = L.map('map', {
            attributionControl: false,
            zoomControl: false,
            center: center,
            layers: baseLayers,
            zoom: 15
        });

        var icon = L.divIcon({ className: "school-icon " + sch.SType, iconSize: [22, 22] });
        L.marker(center, { icon: icon })
         .bindTooltip(sch.Name, {
             direction: "top",
             permanent: true,
             offset: [0, -15]
         }).addTo(map);
    }

    render() {
        var p = this.props.School;
        var cWebsite = !p.Website ? null : <a target="_blank" href={p.Website.startsWith('http') ? p.Website : ('http://' + p.Website) }>{p.Website}</a>;

        return (
        <div className="schooldetails">
            <div className="header"></div>
            <div className="content">
                <h1>{p.Name}</h1>
                <table>
                    <tr>
                        <th style={{width:'15%'}}>简&emsp;&emsp;称：</th>
                        <td style={{width:'35%'}}>
                            <div>{p.ShortName}</div>
                        </td>
                        <td colSpan="2" rowSpan="7" style={{ position: "relative" }}>
                        <div id="map"></div>
                        </td>
                    </tr>
                    <tr>
                        <th>地&emsp;&emsp;址：</th>
                        <td>
                            <div>
                                {p.Address}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>电&emsp;&emsp;话：</th>
                        <td>
                            <div>
                                {p.Telephone}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>网&emsp;&emsp;站：</th>
                        <td>
                            <div>
                                {cWebsite}
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <th>邮&emsp;&emsp;箱：</th>
                        <td>
                            <div>
                                {p.Email}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>邮政编码：</th>
                        <td>
                            <div>
                                {p.Postcode}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>工作时间：</th>
                        <td>
                            <div>
                                {p.WorkTime}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>施教范围：</th>
                        <td colSpan="3">
                            <div>
                                {p.SchoolDistrict}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>学校简介：</th>
                        <td colSpan="3">
                            <div>
                                {p.Abstract}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
            );
    }
}