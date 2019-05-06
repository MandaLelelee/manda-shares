
//待办列表+翻页
var  dbpage = {
    "dbpageId":"",
    "data":null,
    "maxshowdbpageitem":3,//最多显示的页码个数
    "dbpagelistcount":5,//每一页显示的内容条数
      "init":function(listCount,currentPage,options){
      	this.data=options.data,
      	this.dbpageId=options.id,
    this.maxshowdbpageitem=options.maxshowdbpageitem,//最多显示的页码个数
    this.dbpagelistcount=options.dbpagelistcount//每一页显示的内容条数
    dbpage.initPage(listCount,currentPage);
  },
  /**
     * 初始化数据处理
     * @param listCount 列表总量
     * @param currentPage 当前页
     */
  "initPage":function(listCount,currentPage){
        var maxshowdbpageitem = dbpage.maxshowdbpageitem;
        if(maxshowdbpageitem!=null&&maxshowdbpageitem>0&&maxshowdbpageitem!=""){
            dbpage.maxshowdbpageitem = maxshowdbpageitem;
        }
        var dbpagelistcount = dbpage.dbpagelistcount;
        if(dbpagelistcount!=null&&dbpagelistcount>0&&dbpagelistcount!=""){
            dbpage.dbpagelistcount = dbpagelistcount;
        }   
        dbpage.dbpagelistcount=dbpagelistcount;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }
     
        dbpage.setPageListCount(listCount,currentPage);
   },
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(listCount,currentPage){
        var dbpageCount = 1;
        if(listCount>=0){
            var dbpageCount = listCount%dbpage.dbpagelistcount>0?parseInt(listCount/dbpage.dbpagelistcount)+1:parseInt(listCount/dbpage.dbpagelistcount);
        }
        var appendStr = dbpage.getPageListModel(dbpageCount,currentPage);
        $("#"+dbpage.dbpageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(listCount,currentPage){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        dbpage.initWithUl(listCount,currentPage);
        dbpage.initPageEvent(listCount);
        dbpage.viewPage(currentPage,listCount,dbpage.dbpagelistcount,dbpage.data)
        //     fun(currentPage);
    },
    //页面显示功能
     "viewPage":function (currentPage,listCount,dbpagelistcount,data){
            var NUM=listCount%dbpagelistcount==0?listCount/dbpagelistcount:parseInt(listCount/dbpagelistcount)+1;
            if(currentPage==NUM){
                var result=data.slice((currentPage-1)* dbpagelistcount,data.length);
            }
            else{
                var result=data.slice((currentPage-1)*dbpagelistcount,(currentPage-1)*dbpagelistcount+dbpagelistcount);
            }
            options.callBack(result);
    },
    "initPageEvent":function(listCount){
        $("#"+dbpage.dbpageId +">li[class='dbpageItem']").on("click",function(){
            dbpage.setPageListCount(listCount,$(this).attr("dbpage-data"),dbpage.fun);
        });
    },
    "getPageListModel":function(dbpageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="dbpageItem";
        var nextPageClass = "dbpageItem";
        if(prePage<=0){
            prePageClass="dbpageItemDisable";
        }
        if(nextPage>dbpageCount){
            nextPageClass="dbpageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' dbpage-data='"+prePage+"' dbpage-rel='predbpage'>&lt;上一页</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(dbpage.maxshowdbpageitem/2)>0&&currentPage+parseInt(dbpage.maxshowdbpageitem/2)<=dbpageCount){
            miniPageNumber = currentPage-parseInt(dbpage.maxshowdbpageitem/2);
        }else if(currentPage-parseInt(dbpage.maxshowdbpageitem/2)>0&&currentPage+parseInt(dbpage.maxshowdbpageitem/2)>dbpageCount){
            miniPageNumber = dbpageCount-dbpage.maxshowdbpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(dbpage.maxshowdbpageitem);
        if(dbpageCount<showPageNum){
            showPageNum = dbpageCount;
        }
        for(var i=0;i<showPageNum;i++){
            var dbpageNumber = miniPageNumber++;
            var itemPageClass = "dbpageItem";
            if(dbpageNumber==currentPage){
                itemPageClass = "dbpageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' dbpage-data='"+dbpageNumber+"' dbpage-rel='itemdbpage'>"+dbpageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' dbpage-data='"+nextPage+"' dbpage-rel='nextdbpage'>下一页&gt;</li>";
       return appendStr;

    }
}