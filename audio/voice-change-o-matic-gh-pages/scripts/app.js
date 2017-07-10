// fork getUserMedia for multiple browser versions, for those
// that need prefixes

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var voiceSelect = document.getElementById("voice");
var source;
var stream;

// grab the mute button to use below

var mute = document.querySelector('.mute');

//set up the different audio nodes we will use for the app

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var distortion = audioCtx.createWaveShaper();  //给音频添加失真效果
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();  //指定多个不同的一般滤波器类型的双二阶滤波器
var convolver = audioCtx.createConvolver();  //音频应用混响效果

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

// grab audio track via XHR for convolver node

var soundSource, concertHallBuffer;

ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg', true);

ajaxRequest.responseType = 'arraybuffer';

ajaxRequest.onload = function() {
  var audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, function(buffer) {
    // 用于异步解码音频文件中的 ArrayBuffer.
    // ArrayBuffer数据可以通过XMLHttpRequest和FileReader来获取.
    // AudioBuffer是通过AudioContext采样率进行解码的,然后通过回调返回结果.
    // 使用XHR加载一个音轨,设置请求的responsetype为ArrayBuffer使它返回一个arraybuffer数据，
    // 然后存储在audioData变量中.
    // 然后我们将这个arraybuffer数据置于decodeAudioData()方法中使用，
    // 当成功解码PCM Data后通过回调返回,
    // 将返回的结果通过AudioContext.createBufferSource()接口进行处理并获得一个AudioBufferSourceNode,
    // 将源连接至AudioContext.destination并将它设置为循环的.
      concertHallBuffer = buffer;
      soundSource = audioCtx.createBufferSource();
      soundSource.buffer = concertHallBuffer;
    }, function(e){"Error with decoding audio data" + e.err});

  //soundSource.connect(audioCtx.destination);
  //soundSource.loop = true;
  //soundSource.start();
};

ajaxRequest.send();

// set up canvas context for visualizer

var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");

var intendedWidth = document.querySelector('.wrapper').clientWidth;

canvas.setAttribute('width',intendedWidth);

var visualSelect = document.getElementById("visual");

var drawVisual;

//main block for doing the audio recording

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(biquadFilter);
         biquadFilter.connect(convolver);
         convolver.connect(gainNode);
         gainNode.connect(audioCtx.destination);

      	 visualize();
         voiceChange();

      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;


  var visualSetting = visualSelect.value;
  console.log(visualSetting);

  if(visualSetting == "sinewave") {
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };

    draw();

  } else if(visualSetting == "frequencybars") {
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;  //可视化的数据值的数量.
    console.log(bufferLength);  //128
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
      // AudioContext 创建一个 AnalyserNode,
      // 然后用 requestAnimationFrame 和 <canvas> 去反复收集当前音频的频率数据, 并绘制为一个柱状风格的输出(频谱).
      drawVisual = requestAnimationFrame(draw);

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

  } else if(visualSetting == "off") {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }

}

function voiceChange() {
  
  distortion.oversample = '4x';
  biquadFilter.gain.value = 0;
  convolver.buffer = undefined;

  var voiceSetting = voiceSelect.value;
  console.log(voiceSetting);

  if(voiceSetting == "distortion") {
    distortion.curve = makeDistortionCurve(400);
  } else if(voiceSetting == "convolver") {
    convolver.buffer = concertHallBuffer;
  } else if(voiceSetting == "biquad") {
    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.value = 1000;
    biquadFilter.gain.value = 25;
  } else if(voiceSetting == "off") {
    console.log("Voice settings turned off");
  }

}

// event listeners to change visualize and voice settings

visualSelect.onchange = function() {
  window.cancelAnimationFrame(drawVisual);
  visualize();
};

voiceSelect.onchange = function() {
  voiceChange();
};

mute.onclick = voiceMute;

function voiceMute() {
  if(mute.id == "") {
    gainNode.gain.value = 0;
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNode.gain.value = 1;
    mute.id = "";    
    mute.innerHTML = "Mute";
  }
}
