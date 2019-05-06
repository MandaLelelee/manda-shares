/**
 * Created by manman on 2019/1/11.
 */
//回到顶部，供页面调用的
function goTop() {
    $('html,body').animate({'scrollTop': 0}, 500);
}


//查看更多收起待办，供页面调用的
function closedb() {
    $(".daiban").hide();
    $('#done').attr('id', 'toDo');
}


//点击页面的按钮或者链接，然后推送消息，供页面调用的
function show() {
    //拿到设置的值，看是否展示面板
    var isSet = $("input[type=radio][name=set]:checked").val();
    console.log(isSet);
    if (isSet == "setOpen") {
        $(".vantiqMesg").show();
        $("#mesg").attr("id", "mesgread");//展示
            Mesgshow();
    } else {
        $(".vantiqMesg").hide();//不展示
        $("#mesgread").attr("id", "mesg");
        //添加红点
        $("<img id='redpoint' src='img/redpoint.png' style='position: absolute;" +
            "width: 12px;height: 13px;margin-left: 30px;margin-top: 5px;'>").insertAfter("#mesg");

        $("#mesg").click(function () {
            $("#redpoint").remove();
        });
    }
}

/*---------------------------------------------------------------------------------------------------------*/

/*消息显示的话，其他就隐藏*/
function Mesgshow() {
    if ($(".vantiqMesg").is(":visible") && $(".daiban").is(":visible")) {
        $(".daiban").hide();
        $("#done").attr("id", "toDo");

    }
    if ($(".vantiqMesg").is(":visible") && $(".wmsettingBox").is(":visible")) {
        $(".wmsettingBox").hide();
        $("#setshow").attr("id", "set");

    }
    if ($(".vantiqMesg").is(":visible") && $(".daiban").is(":visible") && $(".wmsettingBox").is(":visible")) {
        $(".daiban").hide();
        $("#done").attr("id", "toDo");
        $(".wmsettingBox").hide();
        $("#setshow").attr("id", "set");
    }
}

//消息推送
function panel() {
    //保存到cookie，根据cookie的值改变选择默认值
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
        $(".vantiqMesg").show();
        $("#mesg").attr("id", "mesgread");//展示
        $("#mesgread").click(function () {
            $(".vantiqMesg").toggle();
            /*改变图标*/
            if (event.target.id == "mesgread") {
                event.target.id = "mesg";
            } else {
                event.target.id = "mesgread";
            }
            Mesgshow();
        });
    } else {
        $(".vantiqMesg").hide();//不展示
        $("#mesg").click(function () {
            $(".vantiqMesg").toggle();
            /*改变图标*/
            if (event.target.id == "mesg") {
                event.target.id = "mesgread";
            } else {
                event.target.id = "mesg";
            }
            Mesgshow();
        });

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

/*---------------------------------------------------------------------------------------------------------*/
/*智能面板加载*/
$(document).ready(function () {

    //消息推送窗口
    panel();

    //待办窗口
    $(".daiban").hide();

    $("#toDo").click(function () {
        $(".daiban").toggle();
        if (event.target.id == "toDo") {
            event.target.id = "done";
        } else {
            event.target.id = "toDo";
        }

        if ($(".daiban").is(":visible") && $(".vantiqMesg").is(":visible")) {
            $(".vantiqMesg").hide();
            $("#mesgread").attr("id", "mesg");
        }
        if ($(".daiban").is(":visible") && $(".wmsettingBox").is(":visible")) {
            $(".wmsettingBox").hide();
            $("#setshow").attr("id", "set");
        }
        if ($(".daiban").is(":visible") && $(".vantiqMesg").is(":visible") && $(".wmsettingBox").is(":visible")) {
            $(".vantiqMesg").hide();
            $("#mesgread").attr("id", "mesg");
            $(".wmsettingBox").hide();
            $("#setshow").attr("id", "set");
        }
    });


    //配置窗口
    $(".wmsettingBox").hide();

    $("#set").click(function () {
        $(".wmsettingBox").toggle();
        if (event.target.id == "set") {
            event.target.id = "setshow";
        } else {
            event.target.id = "set";
        }


        if ($(".wmsettingBox").is(":visible") && $(".vantiqMesg").is(":visible")) {
            $(".vantiqMesg").hide();
            $("#mesgread").attr("id", "mesg");
        }
        if ($(".wmsettingBox").is(":visible") && $(".daiban").is(":visible")) {
            $(".daiban").hide();
            $("#done").attr("id", "toDo");
        }
        if ($(".wmsettingBox").is(":visible") && $(".vantiqMesg").is(":visible") && $(".daiban").is(":visible")) {
            $(".vantiqMesg").hide();
            $("#mesgread").attr("id", "mesg");
            $(".daiban").hide();
            $("#done").attr("id", "toDo");
        }
    });

    $(".settingBoxbtn").click(function () {
        $(".wmsettingBox").hide();
        $("#setshow").attr("id", "set");
    });


});



