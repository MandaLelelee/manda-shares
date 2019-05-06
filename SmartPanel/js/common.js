
/*
* type              请求的方式  默认为get
* url               发送请求的地址
* param             发送请求的参数
* isShowLoader      是否显示loader动画  默认为false
* dataType          返回JSON数据  默认为JSON格式数据
* callBack          请求的回调函数
*/
(function(){
    function AjaxRequest(opts){
        this.type         = opts.type || "GET";
        this.url          = opts.url;
        this.data        = opts.data || {};
        this.isShowLoader = opts.isShowLoader || false;
        this.dataType     = opts.dataType || "JSON";
        this.callBack     = opts.callBack;
        this.init();

    }

    AjaxRequest.prototype = {
        //初始化
        init: function(){
            this.sendRequest();
        },
        //渲染loader
        showLoader: function(){
            if(this.isShowLoader){
                var loader = '<div class="ajaxLoader"><div class="loader">加载中...</div></div>';
                $("body").append(loader);
            }
        },
        //隐藏loader
        hideLoader: function(){
            if(this.isShowLoader){
                $(".ajaxLoader").remove();
            }
        },
        //发送请求
        sendRequest: function(){
            var self = this;
            //alert(JSON.stringify(this));
            $.ajax({
                type: this.type,
                url: this.url,
                data: this.data,
                dataType: this.dataType,
                beforeSend: this.showLoader(),
                success: function(res){
                    self.hideLoader();
                    if (res != null && res != "") {
                        if(self.callBack){
                            if (Object.prototype.toString.call(self.callBack) === "[object Function]") {   //Object.prototype.toString.call方法--精确判断对象的类型
                                self.callBack(res);
                            }else{
                                console.log("callBack is not a function");
                            }
                        }
                    }
                }
            });
        }
    };

    window.AjaxRequest = AjaxRequest;
})();




