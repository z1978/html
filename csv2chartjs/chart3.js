function graphGenerator(){
  //window.alert("*****")

//項目用の配列を定義
var array01 = [];
var array02 = [];
$(function() {
	//th用の数値取得
	$('#graph02 th').each(function() {
			var amount01 = $(this).find('span').text();
			array01.push(amount01);
		})
		//td用の数値取得
	$('#graph02 td').each(function() {
		var amount02 = $(this).find('span').text() * 100;
		array02.push(amount02);
	})
});

//Chart.jsの基本設定
var data3 = {
		//th用の数値を反映させるため、配列変数挿入
		labels: array01,
		datasets: [{
			fillColor: "#0a50a1",
			strokeColor: "#0a50a1",
			pointStrokeColor: "#fff",
			label: '売上',
			//td用の数値を反映させるため、配列変数挿入
			data: array02
		}]
	}
	//Chart.jsの基本オプション
var option = {
	animationEasing: "easeInOutQuart",
	animation: Modernizr.canvas,
	scaleShowLabels: true,
	barValueSpacing: 65
}


$(function() {

	var ctx2 = document.getElementById("demo2").getContext("2d");
	var myChart = new Chart(ctx2, {
		type: 'line',
		data: data3
	});

	//new Chart(document.getElementById("demo2").getContext("2d")).Bar(data, option);
});

}
