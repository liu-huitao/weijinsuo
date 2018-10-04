$(function () {

//    入口函数,当文档加载完成 才会执行,单独作用域,不会污染其他作用域

    function resize() {
        var windowsWidth = $(window).width();//获取屏幕宽度
        //判断属于什么尺寸类型
        var isSmallScreen = windowsWidth < 768;
        //根据类型为界面上的每一张轮播背景设置背景图片
        // $('#main-ads .carousel-inner .item')//获取到的是一个DOM数组
        $('#main-ads > .carousel-inner > .item').each(function (i, item) {
            // 因为拿到是DOM对象 需要转换
            var $item = $(item);
            // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="" />');
            }else {
                $item.empty();
            }
        });
    }

    $(window).on('resize', resize).trigger('resize');
    //tip提示
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页的容器宽度
    var $ulContainer = $('.nav-tabs');
    var width = 30;
    //遍历子元素

    $ulContainer.children().each(function (index,element) {
        width += element.clientWidth; //不转jq对象,直接使用win对象
        // $(element).width(); //先传给$ 在获取width
        // console.log($(element).width());
    });
    //此时width等于所有li的宽度总和
    // console.log(window.screen.width);
    if(window.screen.width<768){
        $ulContainer.css('width',width);
    }
    //给新闻部分每一个A注册点击事件
    var $newsTitle = $('.news-title');
    $('#news .nav-pills a').on('click',function () {
        var $this = $(this);
        var title = $this.data('title');
        $newsTitle.text(title);
    });
    //给轮播图添加滑动事件,控制滚屏
    var startX,endX;
    var offset = 30;
    var $carousels = $('.carousel');
    $carousels.on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX;
        // console.log(startX);
    });
    $carousels.on("touchmove",function (e) {
        endX = e.originalEvent.touches[0].clientX;
        // console.log(endX);
    });
   $carousels.on('touchend',function (e) {
       // console.log(e.originalEvent.touches);
       var distance = Math.abs(startX - endX);
       if (distance>offset){
           $(this).carousel(startX>endX?'next':'prev');
       }
   });
});