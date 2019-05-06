/**
 * Created by manman on 2018/11/21.
 */

/*side初始化*/
$(document).ready(function () {

    /*改变皮肤颜色*/
    var flag = getCookie("flagc");
    console.log(flag);
    if (flag == "true") {
        changeMenuColor();
    } else {
        MenuColor();
    }

//黑蓝rgb(0, 0, 173) none repeat scroll 0% 0% / auto padding-box border-box
    //灰白rgb(119, 119, 119) none repeat scroll 0% 0% / auto padding-box border-box
    $("#changeColor").click(function () {
        var bg = $(this).css("background-color");
        //alert(bg);
        if (bg == "rgb(119, 119, 119)") {
            changeMenuColor();
            removeCookie("flagc");
            setCookie("flagc", "true", 30);
        } else if (bg == "rgb(26, 19, 184)") {
            MenuColor();
            removeCookie("flagc");
            setCookie("flagc", "false", 30);
        }
    });


    /*设置窗口*/
    $(".settingBox").hide();
    $("#set").click(function () {
        $(".settingBox").toggle();
    });
    //点击确认关闭窗口
    $(".setBoxbtn").click(function () {
        $(".settingBox").hide();
        var isisSet = $("input:radio[name=set]:checked").val();
        //console.log(isisSet);
        if (isisSet == "setClose") {
            $(".smartpanel").hide();//设置不展示
            $("#panelMsg").find('img').attr("src", "http://39.108.251.214:83/SmartPannel/img/side_icon03Red.png");
        } else {
            $(".smartpanel").show();//设置展示
            $("#panelMsg").find('img').attr("src", "http://39.108.251.214:83/SmartPannel/img/side_icon03.png");
        }
    });


    /*面板初始化*/
    panel();

});


/*---------------------------------------------------------------------------------------------------------*/


//保存到cookie，根据cookie的值改变选择默认值
function panel() {
    var cooki = document.cookie;
 /*    alert(cooki);*/
    if (cooki.indexOf('radioindex') != -1) {
        cooki = "{\"" + cooki + "\"}";
        cooki = cooki.replace(/\s*/g, "").replace(/=/g, '":"').replace(/;/g, '","');
        var json = eval("(" + cooki + ")"); //将coolies转成json对象
        document.getElementsByName("set")[json.radioindex].checked = true;
    }
    else
        saveCookie();

    //拿到设置的值，看是否展示面板
    var isSet = $("input[type=radio][name=set]:checked").val();
    console.log(isSet);
    if (isSet == "setOpen") {
        panelShow();//展示
    } else {
        panelHide();//不展示
    }

}


/*将设置选择保存到cookie中方法*/
function saveCookie() {
    var radios = document.getElementsByName("set");
    var d = new Date();
    d.setHours(d.getHours() + (24 * 365)); //保存一年
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked)
            document.cookie = 'radioindex =' + i + "; expires=" + d.toGMTString();
    }
}

/*默认展示面板，滑动出现*/
function panelShow() {
    $("#panelMsg").click(function () {
     /*   $(".smartpanel").animate({
            width: 'toggle'
        });*/
        $(".smartpanel").toggle();
        /*面板信息按钮红点*/
        if ($(this).find('img').attr('src') == 'http://39.108.251.214:83/SmartPannel/img/side_icon03.png') {
            $(this).find('img').attr('src', 'http://39.108.251.214:83/SmartPannel/img/side_icon03Red.png');
        } else {
            $(this).find('img').attr('src', 'http://39.108.251.214:83/SmartPannel/img/side_icon03.png');
        }
    });

}

/*默认不不不展示面板*/
function panelHide() {
    $(".smartpanel").hide();
    $("#panelMsg").find('img').attr("src", "http://39.108.251.214:83/SmartPannel/img/side_icon03Red.png");
    $("#panelMsg").click(function () {
      /*  $(".smartpanel").animate({
            width: 'toggle'
        });*/
        $(".smartpanel").toggle();
        /*信息红点图片切换*/
        if ($(this).find('img').attr('src') == 'http://39.108.251.214:83/SmartPannel/img/side_icon03Red.png') {
            $(this).find('img').attr('src', 'http://39.108.251.214:83/SmartPannel/img/side_icon03.png');
        } else {
            $(this).find('img').attr('src', 'http://39.108.251.214:83/SmartPannel/img/side_icon03Red.png');
        }
    });

}


/*--------------------------------------------------------------------------------------------------------*/
//回到顶部
function goTop() {
        $('html,body').animate({'scrollTop': 0}, 600);
/*    document.body.scrollTop = document.documentElement.scrollTop = 0;*/
}

/*---------------------------------------------------------------------------------------------------------*/


//换肤色11111
function MenuColor() {
    //设置背景字体颜色等样式
    var smartPanelSide = {
        background: '#b0b0b0',
        /*  color:'black',*/
    };

    /*面板*/
    var panel = {
      /*  background: '-webkit-linear-gradient(top, #fff,#eeeeee)',
        background: -'moz-linear-gradient(top, #fff, #eeeeee)',
        background: '-o-linear-gradient(top, #fff, #eeeeee)',
        background: '-ms-linear-gradient(top, #fff, #eeeeee)',*/
        background: 'white',
        /*  background:'#b0b0b0',*/
        border: '1px solid #d8d8d8',
        color: 'black',
    }
    var showOrhide ={
        color:'black',
    }

    $(".sidebox").css(smartPanelSide);
    $(".sidetop").css(smartPanelSide);
    $(".smartpanel").css(panel);
    $(".settingBox").css(panel);
    $(".showOrhide").css(showOrhide);

    //设置展开收缩时鼠标悬停的背景颜色
    var backgroundOpen = "#777777";
    var backgroundClose = "#b0b0b0";
    hover(backgroundOpen, backgroundClose);

}

//换肤色22222
function changeMenuColor() {
    ////设置背景字体颜色等样式
    var sideChange = {
        background: 'black',
    };

    /*面板*/
    var panelChange = {
    /*    background: '-webkit-linear-gradient(top, #f2f2f2,#666666)',
        background: -'moz-linear-gradient(top, #f2f2f2, #666666)',
        background: '-o-linear-gradient(top, #f2f2f2, #666666)',
        background: '-ms-linear-gradient(top, #f2f2f2, #666666)',*/
        background: '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#fff), color-stop(.2, #dddddd))',

        /*     background:'#666666',*/
        border: '1px solid #c8c8c8',
    }
    var panelChange1 = {
       /* background: '-webkit-linear-gradient(top, #f2f2f2,#666666)',
        background: -'moz-linear-gradient(top, #f2f2f2, #666666)',
        background: '-o-linear-gradient(top, #f2f2f2, #666666)',
        background: '-ms-linear-gradient(top, #f2f2f2, #666666)',*/
        background: '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#fff), color-stop(.2, #dddddd))',

        /*   background:'#666666',*/
        border: '1px solid #c8c8c8',
        color: 'black',
    }

    var showOrhide ={
        color:'white',
    }

    $(".sidebox").css(sideChange);
    $(".sidetop").css(sideChange);
    $(".smartpanel").css(panelChange);
    $(".settingBox").css(panelChange1);
/*    $(".showOrhide").css(showOrhide);*/
    //设置展开收缩时鼠标悬停的背景颜色
    var backgroundOpen = "#1A13B8";
    var backgroundClose = "black";
    hover(backgroundOpen, backgroundClose);

}

//改变按钮展开收缩时候的背景颜色方法
function hover(backgroundOpen, backgroundClose) {

    $(".smartPanelSide ul li").hover(function () {
        /*展开时*/
        $(this).find(".sidebox").stop().animate({"width": "84px"}, 200).css({
            "opacity": "1",
            "filter": "Alpha(opacity=100)",
            "background": backgroundOpen
        })
        $(this).find(".sidetop").stop().animate({"width": "45px"}, 200).css({
            "opacity": "1",
            "filter": "Alpha(opacity=100)",
            "background": backgroundOpen
        })

    }, function () {
        /*收缩时*/
        $(this).find(".sidebox").stop().animate({"width": "45px"}, 200).css({
            "opacity": "0.8",
            "filter": "Alpha(opacity=80)",
            "background": backgroundClose
        })
        $(this).find(".sidetop").stop().animate({"width": "45px"}, 200).css({
            "opacity": "0.8",
            "filter": "Alpha(opacity=80)",
            "background": backgroundClose
        })
    });
}


/*---------------------------------------------------------------------------------------------------------*/


//通用cookie
/*
 设置cookie里的值
  */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/*
 获取cookie里的值
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


/*
 删除cookie里的值
 */
function removeCookie(cname) {
    this.setCookie(cname, "", -1);
}


