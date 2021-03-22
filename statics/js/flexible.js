//根据屏幕大小改变根元素字体大小
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) { //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
                docEl.style.fontSize = '100px';
                document.getElementsByTagName('body')[0].style.maxWidth = '750px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
                document.getElementsByTagName('body')[0].style.maxWidth = '750px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 直接拿设计稿的宽高除以100就好，字体大小通过媒体查询自己设置
