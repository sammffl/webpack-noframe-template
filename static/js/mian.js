import '../sass/main.css';
import '../sass/test.scss';
// import Chart from 'chart.js';


var $goBack = document.getElementById('go-back');
// $goBack.addEventListener('touchend', function () {
//     history.back();
// }, false);
var ua = navigator.userAgent;
if (!/anydoor/ig.test(ua)) {
    $goBack.style.display = 'block';
}

// $goBack.style.display = 'none';
