// JavaScript Document
var APPLICATION_SERVER = "http://47.95.229.30:8011/AjaxVANTIQData";
var VANTIQ_SERVER = "https://dev.vantiq.cn/api/v1/resources/procedures";
var VANTIQ_Authorization = "Basic cG9jX3p5ejpwb2Nfenl6" //命名空间为  poc_zyz

function ajaxPost(Url, data, successHandler, errorHandler) {
    var predata = {
        "Url": VANTIQ_SERVER + Url,
        "Authorization": VANTIQ_Authorization,
        "Method": "POST",
        "Data": data
    };

    $.ajax({
        url: APPLICATION_SERVER,
        type: 'POST',
        data: JSON.stringify(predata),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            successHandler && successHandler(result);
        },
        error: function (resp) {
            errorHandler && errorHandler({code: resp.status, msg: resp.responseText});
        }
    });
}

function Auth(type, url, data) {
    var result = {};
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function (data) {
            //alert(JSON.stringify(data));
            result = data;
        }
    });
    return result;
}
//用于根据sourceId 来获取相应的 UI
function getUiBySourceId(sourceId, liId) {
    if (sourceId == "1001") {
        return "<div id=\"q1001\" onclick=\"addAccessNum(this)\"> <a href=\"javascript:window.open('http://www.perfect99.com/activity/GYbrand.aspx');\">" +
            "<p style=\"font-weight:bold;color: #2A2F37\">完美社会公益活动</p>" +
            "<p style='text-indent:2em'>坚持“取之社会，用之社会”的公益理念为动力源泉全力促进“华人世界和谐共进”20多年来，完美公司倾情捐助各项社会公益事业捐资总额近8亿元，以下记录，可见一斑......</p></a></div>"
    }
    if (sourceId == "1002") {
        return "<div id=\"q1002\" onclick=\"addAccessNum(this)\">" +
            "<a href=\"javascript:window.open('http://www.perfect99.com/news/News18663.html');\" style=\"overflow: hidden;height:150px;\">" +
            " <p style=\"font-weight:bold;color: #2A2F37\">落实“百日行动”部署，完美召开合规经营专题会议</p>" +
            "<p style='text-indent:2em'>国家市场监督管理总局等13个部门1月8日召开联合部署整治“保健”市场乱象百日行动电视电话会议。会议决定自8日起，在全国范围内集中开展为期100天的联合整治“保健”市场乱象行动。1月9日，完美（中国）有限公司积极贯彻落实会议精神，迅速召......</p></a></div>"
    }
    if (sourceId == "1003") {
        //alert(liId.substr(1));
        $(liId).append('<div id="q1003" style="width: 360px;height:150px;"></div>');     //将子div添加到父div中
        var myChart = echarts.init(document.getElementById("q1003"));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2019下半年月报销金额图',
                textStyle: {
                    fontSize: 14
                },
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                x: 2,
                y: 26,
                x2: 2,
                y2: 2
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '报销金额',
                    type: 'bar',
                    barWidth: '50%',
                    data: [600, 520, 200, 334, 390, 330]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            window.open('https://www.baidu.com/');
        });
    }
    if (sourceId == "1004") {
        return "<div id=\"q1004\"onclick=\"addAccessNum(this)\">" +
            "<a href=\"javascript:window.open('https://www.baidu.com/');\" style=\"overflow: hidden;height:150px;\">" +
            "<p style=\"font-weight:bold;color: #2A2F37\">市内交通费报销说明</p>" +
            "<img src='vantiqimg/baoxiao.jpg' style=\"padding-left: 55px;\"></a></div>"
    }
    if (sourceId == "1005") {
        return "<div id=\"q1005\"onclick=\"addAccessNum(this)\">" +
            "<a href=\"javascript:window.open('https://www.baidu.com/');\" style=\"overflow: hidden;height:150px;\">" +
            "<p style=\"font-weight:bold;color: #2A2F37\">公司差旅费报销单</p>" +
            "<img src='vantiqimg/travelbaoxiao.png' style=\"padding-left: 55px;\"></a></div>"
    }
    if (sourceId == "1006") {
        //alert(liId.substr(1));
        $(liId).append('<div id="q1006" onclick="addAccessNum(this)" style="width: 360px;height:150px;"></div>');     //将子div添加到父div中
        var myChart = echarts.init(document.getElementById("q1006"));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '2019年报销占比',
                textStyle: {
                    fontSize: 14
                },
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['差旅费', '交通费', '补贴费', '餐饮费', '通讯费']
            },
            series: [
                {
                    name: '报销种类',
                    type: 'pie',
                    radius: '55%',
                    center: ['60%', '65%'],
                    data: [
                        {value: 800, name: '差旅费'},
                        {value: 310, name: '交通费'},
                        {value: 500, name: '补贴费'},
                        {value: 235, name: '餐饮费'},
                        {value: 100, name: '通讯费'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        // 处理点击事件并且跳转到相应的页面
        myChart.on('click', function (params) {
            window.open('https://www.baidu.com/');
        });
    }
    if (sourceId == "1007") {
        return "<div id=\"q1007\" onclick=\"addAccessNum(this)\">" +
            "<a href=\"javascript:window.open('https://www.baidu.com/');\" style=\"overflow: hidden;height:150px;\">" +
            "<p style=\"font-weight:bold;color: #2A2F37\">手机通讯费报销单</p>" +
            "<img src='vantiqimg/phonebaoxiao.png' style=\"padding-left: 45px;\"></a></div>"
    }
    else {
        return "<div id=\"" + sourceId + "\">sourceId :" + sourceId + "</div>"
    }

}

//页面带参
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//获取资源类型
function getResourceType(resourceId) {
    var db ={
        "1001":"bx",
        "1002":"bx",
        "1003":"bx",
        "1004":"xw",
        "1005":"xw",
        "1006":"xw",
        "1007":"hd",
        "1008":"bx",
        "1009":"hd"

    }
    var resourceType;
    for(i in db){
        if(i == resourceId){
            resourceType = db[i];
        }
    }
    return resourceType;
}

