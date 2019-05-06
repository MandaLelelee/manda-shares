$.extend({
    //通用智能面板
    smartPanel: function (divId, panelHtmlData) {
        $(divId).empty();
        $(divId).append(panelHtmlData);
    },
    //定制化echarts的折线图和柱形图
    smartPanel_lineMap: function (params) {
        $(params.panelDivId).empty();
        $(params.panelDivId).append('<div id="child" style="width: 280px;height:300px;  border-radius: 6px;background-color: aliceblue"></div>');     //将子div添加到父div中
        var myChart = echarts.init(document.getElementById("child"));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: params.xdata
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: params.sdata,
                type: params.type  //折线图：line,柱形图：bar
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    //文本框模板
    smartPanel_text: function (params) {
        var divHtml = '<div id="text" style="width: 280px;height:300px; border-radius: 6px; background-color: aliceblue;word-wrap:break-word"><p>主题：' + params.title + '</p>\n' +
            '    <p>内容：' + params.content + '</p>\n' +
            '    <p>作者：' + params.user + '</p></div>';
        return divHtml;
    },
    textPanel: function (params) {
        //判断返回的data是否为字符串
        if (params.data && params.data.constructor === String) {
            $("#lineMap").empty();
            $("#lineMap").append('<div id="text" style="width: 280px;height:300px;  border-radius: 6px;background-color: aliceblue;word-wrap:break-word">' + params.data + '</div>');
        } else {
            alert("params.data必须是字符串");
        }
    }
});
