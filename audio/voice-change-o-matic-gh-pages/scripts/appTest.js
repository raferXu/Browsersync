// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);
if(!navigator.getUserMedia) {
  console.log(new Error('getUserMedia is not implemented in this browser'));
}var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var stream;
var analyser = audioCtx.createAnalyser();
/*
var distortion = audioCtx.createWaveShaper();  //给音频添加失真效果
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();  //指定多个不同的一般滤波器类型的双二阶滤波器
var convolver = audioCtx.createConvolver();  //音频应用混响效果
*/
var gainNode = audioCtx.createGain();


var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");
var intendedWidth = document.querySelector('.wrapper').clientWidth;
canvas.setAttribute('width',intendedWidth);
var drawVisual;

if (navigator.getUserMedia) {
    navigator.getUserMedia ({audio: true},function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         /*
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(biquadFilter);
         biquadFilter.connect(convolver);
         convolver.connect(gainNode);
         gainNode.connect(audioCtx.destination);
         */
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      	 visualize();
      },function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}


function visualize() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;  //可视化的数据值的数量.
  // var bufferLength=analyser.frequencyBinCount*44100/audioCtx.sampleRate|0;
    console.log(bufferLength);  //128
    var dataArray = new Uint8Array(bufferLength);
    console.log(dataArray);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    function draw() {
      // AudioContext 创建一个 AnalyserNode,
      // 然后用 requestAnimationFrame 和 <canvas> 去反复收集当前音频的频率数据, 并绘制为一个柱状风格的输出(频谱).
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      drawVisual = window.requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);  //将当前频率数据复制到传入其中的Uint8Array
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
      for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);
        x += barWidth + 1;
      }
    }
    draw();
}