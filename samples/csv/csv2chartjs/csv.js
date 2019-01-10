// File APIに対応しているか確認
if(window.File) {
    var result = document.getElementById('result');
    var select = document.getElementById('select');
 
    // ファイルが選択されたとき
    select.addEventListener('change', function(e) {
        // 選択されたファイルの情報を取得
        var fileData = e.target.files[0];
 
        var reader = new FileReader();
        // ファイル読み取りに失敗したとき
        reader.onerror = function() {
            alert('ファイル読み取りに失敗しました')
        }
        // ファイル読み取りに成功したとき
        reader.onload = function() {
            // 行単位で配列にする
            var lineArr = reader.result.split("\n");
            // 行と列の二次元配列にする
            var itemArr = [];
            for (var i = 0; i < lineArr.length; i++) {
                itemArr[i] = lineArr[i].split(",");
            }
 
            // tableで出力
            var insert = '<table id="graph02">';
            for (var i = 0; i < itemArr.length; i++) {
                insert += '<tr>';
                for (var j = 0; j < itemArr[i].length; j++) {
                    if (j==0) {
                        insert += '<th><span>';
                        insert += itemArr[i][j];
                        insert += '</span></th>';
                    }
                    else{
                        insert += '<td><span>';
                        insert += itemArr[i][j];
                        insert += '</span></td>';
                    }
                }
                insert += '</tr>';
            }
            insert += '</table>';
            result.innerHTML = insert;

        // グラフ作成
        graphGenerator();
        }
 
        // ファイル読み取りを実行
        reader.readAsText(fileData);
        //reader.readAsText(fileData, 'Shift_JIS');

    }, false);
}
