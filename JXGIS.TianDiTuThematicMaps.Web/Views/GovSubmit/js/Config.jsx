/*
    节点结构
    {
        key: '',
        name: '',
        displayName: '',
        children: [
            {
                key: '',
                name: '',
                displayName: '',
                layerName: '',
                layerIconClass: ''
            }
        ]
    }
*/

var treeData = [
    {
        key: '嘉兴银监分局',
        children: [
            {
                key: '银行网点'
            },
            {
                key: '自助银行'
            }
        ]
    },
    {
        key: '市编委办',
        children: [
            {
                key: '政府机构'
            }
        ]
    },
    {
        key: '市财政局（地税局）',
        children: [
            {
                key: '税务机构'
            }
        ]
    },
    {
        key: '市档案局（市委党研室、市志办）',
        children: [
            {
                key: '档案馆'
            }
        ]
    },
    {
        key: '市发展改革委（物价局、服务业发展局）',
        children: [
            {
                key: '产业集聚区'
            },
            {
                key: '加油（气）站、充电站'
            },
            {
                key: '中心镇'
            }
        ]
    },
    {
        key: '市法院',
        children: [
            {
                key: '法院'
            }
        ]
    },
    {
        key: '市公安局',
        children: [
            {
                key: '车管所'
            },
            {
                key: '户籍人口统计信息[定制]'
            },
            {
                key: '汽车检测站'
            }
        ]
    },
    {
        key: '市国税局',
        children: [
            {
                key: '税务机构'
            }
        ]
    },
    {
        key: '市环保局',
        children: [
            {
                key: '环境监测机构'
            }
        ]
    },
    {
        key: '市建委规划局',
        children: [
            {
                key: '公共停车场'
            },
            {
                key: '火车站'
            },
            {
                key: '历史文化街区'
            },
            {
                key: '历史文化名镇'
            },
            {
                key: '美丽乡村'
            }
        ]
    },
    {
        key: '市建委园林局',
        children: [
            {
                key: '公园'
            },
            {
                key: '垃圾处理场'
            },
            {
                key: '污水处理厂'
            }
        ]
    },
    {
        key: '市交通运输局',
        children: [
            {
                key: '城乡道路'
            },
            {
                key: '公共自行车租用服务点'
            },
            {
                key: '公交站'
            },
            {
                key: '驾校'
            },
            {
                key: '客运港口、码头'
            },
            {
                key: '汽车客运站'
            },
            {
                key: '治超站'
            }
        ]
    },
    {
        key: '市教育局（市委教工委）',
        children: [
            {
                key: '初中'
            },
            {
                key: '高校'
            },
            {
                key: '普通高中'
            },
            {
                key: '特殊教育学校'
            },
            {
                key: '小学'
            },
            {
                key: '幼儿园'
            },
            {
                key: '职业高中'
            }
        ]
    },
    {
        key: '市经信委（中小企业局）',
        children: [
            {
                key: '工业园区'
            },
            {
                key: '通讯营业网点'
            },
            {
                key: '重点企业'
            }
        ]
    },
    {
        key: '市科技局（市地震局、市知识产权局）',
        children: [
            {
                key: '高新技术园区'
            }
        ]
    },
    {
        key: '市旅游委',
        children: [
            {
                key: '景点'
            }
        ]
    },
    {
        key: '市民政局（市委社工办）',
        children: [
            {
                key: '殡仪馆'
            },
            {
                key: '慈善机构'
            },
            {
                key: '公墓'
            },
            {
                key: '婚姻管理机构'
            },
            {
                key: '救灾仓储'
            },
            {
                key: '捐赠点'
            },
            {
                key: '烈士纪念设施'
            },
            {
                key: '社会福利院'
            },
            {
                key: '社会救助机构'
            },
            {
                key: '收养登记机关'
            },
            {
                key: '乡镇、行政村'
            },
            {
                key: '养老机构'
            },
            {
                key: '应急避灾场所'
            }
        ]
    },
    {
        key: '市农办、市农业经济局（市海洋渔业局、市林业局）',
        children: [
            {
                key: '农家乐[定制]'
            },
            {
                key: '农业精品园'
            },
            {
                key: '重点企业'
            }
        ]
    },
    {
        key: '市气象局',
        children: [
            {
                key: '气象机构'
            }
        ]
    },
    {
        key: '市人力社保局',
        children: [
            {
                key: '人才市场'
            },
            {
                key: '职业介绍所'
            }
        ]
    },
    {
        key: '市商务局（粮食局）',
        children: [
            {
                key: '加油（气）站、充电站'
            }
        ]
    },
    {
        key: '市社保事务局',
        children: [
            {
                key: '医保定点药店'
            },
            {
                key: '医保定点医疗机构'
            },
            {
                key: '异地就医联网结算医院'
            }
        ]
    },
    {
        key: '市市场监管局（市工商局、市食品药品监管局）',
        children: [
            {
                key: '市场'
            },
            {
                key: '所有药店'
            }
        ]
    },
    {
        key: '市司法局',
        children: [
            {
                key: '法律援助机构'
            },
            {
                key: '公证机构'
            },
            {
                key: '基层法律服务所'
            },
            {
                key: '律师事务所'
            },
            {
                key: '人民调解委员会'
            },
            {
                key: '司法鉴定机构'
            }
        ]
    },
    {
        key: '市体育局',
        children: [
            {
                key: '体育场馆'
            }
        ]
    },
    {
        key: '市统计局',
        children: [
            {
                key: '人口统计信息'
            }
        ]
    },
    {
        key: '市卫生计生委',
        children: [
            {
                key: '艾滋病自愿咨询检测机构'
            },
            {
                key: '计划生育管理机构'
            },
            {
                key: '人类辅助生殖机构'
            },
            {
                key: '所有医疗机构'
            },
            {
                key: '体检机构'
            },
            {
                key: '预防接种服务机构'
            }
        ]

    },
    {
        key: '市文广新局',
        children: [
            {
                key: '博物馆'
            },
            {
                key: '非物质文化遗产'
            },
            {
                key: '基层文体服务中心'
            },
            {
                key: '纪念馆'
            },
            {
                key: '图书馆'
            },
            {
                key: '文化馆'
            },
            {
                key: '文物保护单位'
            },
            {
                key: '演出场所'
            },
            {
                key: '艺术馆'
            },
            {
                key: '展览馆'
            }
        ]
    },
    {
        key: '市信访局',
        children: [
            {
                key: '信访机构'
            }
        ]
    },
    {
        key: '市行政服务中心(公共资源交易办)',
        children: [
            {
                key: '行政（便民）服务中心'
            }
        ]
    },
    {
        key: '市应急办',
        children: [
            {
                key: '应急联络机构'
            }
        ]
    },
    {
        key: '市邮政局',
        children: [
            {
                key: '邮政网点'
            }
        ]
    },
    {
        key: '市综合行政执法局',
        children: [
            {
                key: '公共停车场'
            }
        ]
    },
    {
        key: '团市委',
        children: [
            {
                key: '少年宫'
            }
        ]
    }
];

var layerConfig = {
    'default': L.divIcon({ className: 'layer-icon-default', iconSize: [24, 36], popupAnchor: [0, -24] }),
    '自助银行': L.divIcon({ className: 'layer-icon-circle iconfont icon-renminbi zzyh', iconSize: [20, 20] })
};