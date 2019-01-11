
function pulldownIni2() {
    var flag     = false;
    var $menu    = $('.menu');
    var $menuBtn = $('.menu-btn');

    $menuBtn.on('click', function() {

        if (!flag) {
            // スクロール禁止
            $(window).on('touchmove.noScroll', function(e) {
                e.preventDefault();
            });

            // メニューを表示
            $menu.fadeIn(function() {
                flag = true;
            });
        } else {
            // スクロール禁止 解除
            $(window).off('.noScroll');

            // メニューを非表示
            $menu.fadeOut(function() {
                flag = false;
            });
        }
    });
}



function pulldownIni() {
    // イベント登録
        $(document).on('touchstart touchmove touchend','#prefectureModalList span',function(event){
//    $('span').on('touchstart touchmove touchend', function(event){
        // タッチスタートでフラグを設定
        if ('touchstart' == event.type){
            $(this).attr('data-touchstarted', '');
            return;
        }

        // タッチムーブが発生したら、フラグを消す。(タップと判定させない為)
        if ('touchmove' == event.type){
            $(this).removeAttr('data-touchstarted');
            return;
        }

        // タッチエンド時にフラグがあれば、タップと判定する。
        if ('undefined' != typeof $(this).attr('data-touchstarted')){

            // ここでタップ時のイベントハンドラを呼び出す。
            onListItemTapped.call(this, event);

            // フラグを削除
            $(this).removeAttr('data-touchstarted');
        }
    });

    // PCからのクリックにも対応
    $('li').on('click', function(event){
        onListItemTapped.call(this, event);
    });
}


/*
* タップ、クリック時の処理
*/
function onListItemTapped(event){
    event.preventDefault();

    // TODO: タップ時の処理
    console.log( event.type );
    $(this).addClass("is_hidden");
    $(this).prev("button").toggleClass("pulldown_btn_active");
}