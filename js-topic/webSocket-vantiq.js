$(document).ready(function () {
    console.log("ready!");
    // 一进页面就跟vantiq链接
    console.log("Going to authenticate with Vantiq server");
    WebSocketTest();

});
var ws;

var newValue = new Array();

//订阅topic
function subscribeTopic(){
    var body = {};
    body.op = "subscribe";
    body.resourceName = "topics";
    body.resourceId = "/aShuiNewData"

    console.log("data to be sent: " + JSON.stringify(body));
    ws.send(JSON.stringify(body));
}

function aylData(data) {
    var jsObject = JSON.parse(data)
    for(var i=0;i<jsObject.length;i++){
        alert(jsObject[i].keyData);  //取json中的值
    }
}

//连接vantiq的webSocket
function WebSocketTest() {
    //判断浏览器是否支持 webSocket
    if ("WebSocket" in window) {
        console.log("WebSocket is supported by your Browser!");
        // 建 websocket
        ws = new WebSocket("wss://dev.vantiq.cn/api/v1/wsock/websocket");

        function abToString(ab) {
            var binaryString = '';
            var bytes = new Uint8Array(ab);
			var unicodeStr =  utf8ByteToUnicodeStr(bytes);
            /*var length = bytes.length;

            for (var i = 0; i < length; i++) {
                binaryString += String.fromCharCode(bytes[i]);
            }
            return binaryString;
			*/
			return unicodeStr
        }

        function processMessage(msg) {
            var evtObject = JSON.parse(msg);



            console.log("evt: " + JSON.stringify(evtObject));

            if (evtObject["status"] == 200) {
                console.log("horray!, message is successfully sent to the Vantiq server");
                // 成功连接
                // evtObject["body"] contains the response data
                // evtObject["errors"] contains any errors associated with the request
            } else if (evtObject["status"] == 100) {
                console.log("Vantiq pushed something to our client")
                var request_id = evtObject.headers["X-Request-Id"];
                var topic_id = evtObject.body.topic;
                console.log("request_id: " + request_id);

                //判断是否是所订阅的topic
                if(topic_id =="/aShuiNewData/publish"){

                    var a =  evtObject.body.newValue;
                    var b = [];
                    var v = [];

                    for (var i = 0; i<a.length ; i++){
                        b.push(a[i].keyData);
                        v.push(a[i].event);
                    }

                    var myChart = echarts.init(document.getElementById('form-data-test'));

                    var dataAxis = v;
                    var data = b;

                    option = {
                        title: {
                            text: '2018年销售额',
                            subtext: '单位（万）'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                        },
                        xAxis: {
                            data: dataAxis,
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            z: 10
                        },
                        yAxis: {
                            nameLocation:"start",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                },
                            },
                        },
                        dataZoom: [
                            {
                                type: 'inside'
                            }
                        ],
                        series: [
                            { // For shadow
                                type: 'bar',
                                itemStyle: {
                                    normal: {color: 'rgba(0,0,0,0.05)'}
                                },
                                barGap:'-100%',
                                barCategoryGap:'40%',
                                animation: false
                            },
                            {
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#83bff6'},
                                                {offset: 0.5, color: '#188df0'},
                                                {offset: 1, color: '#188df0'}
                                            ]
                                        )
                                    },
                                    emphasis: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 1, color: '#83bff6'}
                                            ]
                                        )
                                    }
                                },
                                data: data
                            }
                        ]
                    };

                    // Enable data zoom when user click bar.
                    var zoomSize = 6;
                    myChart.on('click', function (params) {
                        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                        myChart.dispatchAction({
                            type: 'dataZoom',
                            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                        });
                    });

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                }
            }
        }

        // the WebSocket has received a message from the server
        function wsonmessage(evt) {
            console.log("wsonmessage is called!");
            // the server returns a Blob in evt.data (rather than text)
            var blobReader = new FileReader();
            blobReader.addEventListener("loadend", function () {
                processMessage(abToString(blobReader.result));
            });
            blobReader.readAsArrayBuffer(evt.data);
        }
        ws.onopen = function () {
            // Web Socket is connected, send data using send()
            var body = {};

            body.op = "validate";
            body.resourceName = "system.credentials";
            body.object = "LX_R1BzMZp8KJCphpgO1MC96JtVj3y5CdS_6fIraw3o=";
            // body.op =  "authenticate";
            // body.resourceName = "system.credentials";
            // body.object = { "username": "YOUR USERNAME", "password": "YOUR PASSWORD" };

            console.log("Sent message: " + JSON.stringify(body));

            ws.send(JSON.stringify(body));
            // alert("Message is sent...");
            console.log("Message is sent...");
            //subscribeTopic(); //一连接上vantiq webSocket就订阅 topic的
        };

        ws.onmessage = wsonmessage

        ws.onclose = function () {
            console.log("Connection is closed...");
        };
    } else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}

function utf8ByteToUnicodeStr(utf8Bytes){
    var unicodeStr ="";
    for (var pos = 0; pos < utf8Bytes.length;){
        var flag= utf8Bytes[pos];
        var unicode = 0 ;
        if ((flag >>>7) === 0 ) {
            unicodeStr+= String.fromCharCode(utf8Bytes[pos]);
            pos += 1;

        } else if ((flag &0xFC) === 0xFC ){
            unicode = (utf8Bytes[pos] & 0x3) << 30;
            unicode |= (utf8Bytes[pos+1] & 0x3F) << 24;
            unicode |= (utf8Bytes[pos+2] & 0x3F) << 18;
            unicode |= (utf8Bytes[pos+3] & 0x3F) << 12;
            unicode |= (utf8Bytes[pos+4] & 0x3F) << 6;
            unicode |= (utf8Bytes[pos+5] & 0x3F);
            unicodeStr+= String.fromCharCode(unicode) ;
            pos += 6;

        }else if ((flag &0xF8) === 0xF8 ){
            unicode = (utf8Bytes[pos] & 0x7) << 24;
            unicode |= (utf8Bytes[pos+1] & 0x3F) << 18;
            unicode |= (utf8Bytes[pos+2] & 0x3F) << 12;
            unicode |= (utf8Bytes[pos+3] & 0x3F) << 6;
            unicode |= (utf8Bytes[pos+4] & 0x3F);
            unicodeStr+= String.fromCharCode(unicode) ;
            pos += 5;

        } else if ((flag &0xF0) === 0xF0 ){
            unicode = (utf8Bytes[pos] & 0xF) << 18;
            unicode |= (utf8Bytes[pos+1] & 0x3F) << 12;
            unicode |= (utf8Bytes[pos+2] & 0x3F) << 6;
            unicode |= (utf8Bytes[pos+3] & 0x3F);
            unicodeStr+= String.fromCharCode(unicode) ;
            pos += 4;

        } else if ((flag &0xE0) === 0xE0 ){
            unicode = (utf8Bytes[pos] & 0x1F) << 12;;
            unicode |= (utf8Bytes[pos+1] & 0x3F) << 6;
            unicode |= (utf8Bytes[pos+2] & 0x3F);
            unicodeStr+= String.fromCharCode(unicode) ;
            pos += 3;

        } else if ((flag &0xC0) === 0xC0 ){ //110
            unicode = (utf8Bytes[pos] & 0x3F) << 6;
            unicode |= (utf8Bytes[pos+1] & 0x3F);
            unicodeStr+= String.fromCharCode(unicode) ;
            pos += 2;

        } else{
            unicodeStr+= String.fromCharCode(utf8Bytes[pos]);
            pos += 1;
        }
    }
    return unicodeStr;
}