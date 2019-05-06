
/**
 * Created by manman on 2018/12/3.
 */
$(document).ready(function () {
    var path = "http://39.108.251.214:83/";
    function includeLinkStyle(url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    includeLinkStyle( path+"SmartPannel/css/smartpanel.css");
    $.getScript( path+"SmartPannel/js/echarts.simple.min.js");
    $.getScript( path+"SmartPannel/js/jquery.cookie.js");
    $.getScript( path+"SmartPannel/js/panelMenu.js");
    $.getScript( path+"SmartPannel/js/panelData.js");
    $.getScript( path+"SmartPannel/js/common.js");
    $.getScript( path+"SmartPannel/js/config.js");


    var a =
        "<div  class=\'smartPanelSide\'>" +
        "    <div class=\'smartpanel\' id=\'panel01\'></div>" +
        "    <div class=\'settingBox\'>" +
        "        消息面板设置:" +
        "        <br>" +
        "        <label><input value=\'setOpen\' name=\'set\' type=\'radio\' onclick=\'saveCookie()\'><span class='showOrhide'>展示</span></label><br>" +
        "        <label><input value=\'setClose\' name=\'set\' type=\'radio\'checked=\'checked\'  onclick=\'saveCookie()\'><span class='showOrhide'>隐藏</span></label>" +
        "        <br>" +
        "        <button class=\'setBoxbtn\'>确认</button>" +
        "    </div>" +
        "    <ul class=\'pnul\'>" +
        "        <li class=\'pnli\'><a href='javascript:void(0);'>" +
        "            <div class=\'sidebox\' id=\'changeColor\'><img class=\'ulimg\' src=\'http://39.108.251.214:83/SmartPannel/img/side_icon01.png\'>换肤</div>" +
        "        </a></li>" +
        "        <li class=\'pnli\'><a href='javascript:void(0);'>" +
        "            <div class=\'sidebox\' id=\'set\'><img class=\'ulimg\' src=\'http://39.108.251.214:83/SmartPannel/img/side_icon02.png\'>设置</div>" +
        "        </a></li>" +
        "        <li class=\'pnli\'><a href='javascript:void(0);'>" +
        "            <div class=\'sidebox\' id=\'panelMsg\'><img class=\'ulimg\' src=\'http://39.108.251.214:83/SmartPannel/img/side_icon03.png\'>消息</div>" +
        "        </a></li>" +
        "        <li class=\'pnli\'style=\'border:none;\'>" +
        "            <a href='javascript:goTop();' class=\'sidetop\'><img class=\'ulimg\' src=\'http://39.108.251.214:83/SmartPannel/img/side_icon04.png\'></a></li>" +
        "    </ul>" +
        "</div>"



    $(document.body).append(a);

});
