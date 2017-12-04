window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
window.onload = function () {
  var txt = data[0].lrc;
  var myMusic = id("myMusic");
  var oBtn = id("play");
  var audio = id("myMusic");
  var m_star = id("singer").getElementsByTagName("img")[0];
  m_star.src = data[0].star;
  var pre = id("prev");
  var next = id("next");
  var m_gm = id("m_gm");
  m_gm.innerHTML = data[0].name;
  var m_singer = id("m_singer");
  m_singer.innerHTML = data[0].singer;
  var album = id("album");
  album.innerHTML = data[0].album;
  var wp_totalTime = id("allTime");
  var lrcCon = id("lrcCon");
  var rand = id("rand");
  var collect = id("collect");
  var download = id("download");
  var remove = id("remove");
  var n = 0;
  var txt = data[0].lrc;
  var mark = true;
  oBtn.onclick = function () {
    if (mark) {
      audio.play();
      this.style.backgroundImage = "url(images/pause.png)";
      m_star.className = "rotate";
      download.href = audio.src + ".zip";
      p[n].style.color = "#fff";
      p[n].style.backgroundColor = "rgb(139,143,135)"
    } else {
      audio.pause();
      this.style.backgroundImage = "url(images/play.png)";
      m_star.className = "";
      p[n].style.color = "#000";
      p[n].style.backgroundColor = "rgba(139,143,135,0)"
    }
    mark = !mark;
    wp_totalTime.innerHTML = time(audio.duration)
  };
  pre.onclick = function () {
    n--;
    if (n < 0) n = data.length - 1;
    playing(n)
  };
  next.onclick = function () {
    n++;
    if (n > data.length - 1) n = 0;
    playing(n)
  };
  var rands = 2;
  rand.onclick = function () {
    rands++;
    rands %= 4;
    loop()
  };
  loop();

  function loop() {
    if (rands == 0) {
      audio.addEventListener("ended", function () {
        oBtn.style.backgroundImage = "url(images/play.png)";
        m_star.className = "";
        mark = true
      }, false);
      rand.style.backgroundImage = "url(images/one.png)"
    } else if (rands == 1) {
      audio.addEventListener("ended", function () {
        playing(n)
      }, false);
      rand.style.backgroundImage = "url(images/bloor.png)"
    } else if (rands == 2) {
      audio.addEventListener("ended", function () {
        n++;
        if (n > data.length - 1) n = 0;
        playing(n)
      }, false);
      rand.style.backgroundImage = "url(images/loor.png)"
    } else if (rands == 3) {
      audio.addEventListener("ended", function () {
        n = Math.floor(Math.random() * data.length);
        playing(n)
      }, false);
      rand.style.backgroundImage = "url(images/rand.png)"
    }
  };

  function playing(n) {
    audio.src = data[n].src;
    m_gm.innerHTML = data[n].name;
    m_singer.innerHTML = data[n].singer;
    m_star.src = data[n].star;
    album.innerHTML = data[n].album;
    txt = data[n].lrc;
    m_star.className = "rotate";
    oBtn.style.backgroundImage = "url(images/pause.png)";
    lrcCon.style.marginTop = "0px";
    mark = false;
    currentLrc();
    audio.play();
    load();
    love(p[n].love, p[n].mark);
    download.href = audio.src + ".zip";
    for (var j = 0; j < p.length; j++) {
      p[j].style.color = "#000";
      p[j].style.backgroundColor = "rgba(139,143,135,0)"
    }
    p[n].style.color = "#fff";
    p[n].style.backgroundColor = "rgb(139,143,135)"
  }

  var m_list = id("m_list");
  var oPs = '';
  for (var i = 0; i < data.length; i++) {
    oPs += "<p><span>" + data[i].name + "</span><span>" + data[i].singer + "</span></p>"
  }
  m_list.innerHTML = oPs;
  var p = m_list.getElementsByTagName("p");
  for (var i = 0; i < p.length; i++) {
    p[i].index = i;
    p[i].love = "love1";
    p[i].mark = "circle0";
    p[i].icon = false;
    p[i].onclick = function () {
      n = this.index;
      playing(n)
    }
  }
  collect.onclick = function () {
    if (!p[n].icon) {
      p[n].love = "love0";
      p[n].mark = "circle1";
      love(p[n].love, p[n].mark);
      p[n].icon = true
    } else {
      p[n].love = "love1";
      p[n].mark = "circle0";
      love(p[n].love, p[n].mark);
      p[n].icon = false
    }
  };

  function love(src1, src2) {
    collect.style.backgroundImage = "url(images/" + src1 + ".png)";
    p[n].style.backgroundImage = "url(images/" + src2 + ".png)"
  }

  function load() {
    audio.addEventListener("canplay", function () {
      wp_totalTime.innerHTML = time(audio.duration)
    }, false)
  }

  var wp_playTime = id("curTime");
  var wp_process = id("pro-bar");
  var wp_processBar = id("processBar");
  var wp_processBtn = id("processBtn");
  audio.addEventListener("timeupdate", function () {
    nowTime()
  });

  function nowTime() {
    wp_playTime.innerHTML = time(audio.currentTime);
    var n = audio.currentTime / audio.duration;
    wp_processBar.style.width = n * (wp_process.offsetWidth - wp_processBtn.offsetWidth) + "px"
  }

  var mutePro = id("mutePro");
  var muteBar = id("muteBar");
  var muteBtn = id("muteBtn");
  var m_mute = id("m_mute");
  muteBtn.onmousedown = function (ev) {
    var ev = ev || window.event;
    var x = ev.clientX - this.offsetLeft;
    console.log(this.offsetLeft);
    document.onmousemove = function (ev) {
      var w = ev.clientX - x;
      if (w <= 0) {
        w = 0
      } else if (w >= mutePro.offsetWidth - muteBtn.offsetWidth) {
        console.log(mutePro.offsetWidth);
        console.log(muteBtn.offsetWidth);
        w = mutePro.offsetWidth - muteBtn.offsetWidth
      }
      muteBar.style.width = w + "px";
      var proN = w / (mutePro.offsetWidth - muteBtn.offsetWidth);
      audio.volume = proN;
      nowTime()
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null
    }
  };
  m_mute.onclick = function () {
    audio.volume = 0;
    muteBar.style.width = "0px"
  };
  var actx = new AudioContext();
  var analyser = actx.createAnalyser();
  var audioSrc = actx.createMediaElementSource(audio);
  audioSrc.connect(analyser);
  analyser.connect(actx.destination);
  var can = id("canvas");
  var w = window.innerWidth, h = 110;
  can.width = w;
  can.height = h;
  window.onresize = function () {
    var w = window.innerWidth;
    can.width = w
  };
  var cxt = can.getContext("2d");
  color = cxt.createLinearGradient(can.width * .5, 0, can.width * .5, 110);
  color.addColorStop(0, "#00f");
  color.addColorStop(0.5, "#f00");
  color.addColorStop(1, "#0f0");
  var num = 100;

  function draw() {
    var voicehigh = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(voicehigh);
    var step = Math.round(voicehigh.length / num);
    cxt.clearRect(0, 0, can.width, can.height);
    cxt.beginPath();
    for (var i = 0; i < num; i++) {
      var value = (voicehigh[step * i]) / 3;
      cxt.fillStyle = color;
      cxt.fillRect(i * 10 + can.width * .5, 110, 7, -value + 1);
      cxt.fillRect(can.width * .5 - (i - 1) * 10, 110, 7, -value + 1)
    }
    requestAnimationFrame(draw)
  }

  draw();

  function currentLrc() {
    var lrcArr = txt.split("[");
    var html = '';
    for (var i = 0; i < lrcArr.length; i++) {
      var arr = lrcArr[i].split("]");
      var time = arr[0].split(".");
      var timer = time[0].split(":");
      var ms = timer[0] * 60 + timer[1] * 1;
      var text = arr[1];
      if (text) {
        html += "<p id=gc" + ms + ">" + text + "</p>"
      }
      lrcCon.innerHTML = html
    }
    var sum = 0;
    var curTime = 0;
    var oP = lrcCon.getElementsByTagName("p");
    audio.addEventListener("timeupdate", function () {
      curTime = parseInt(this.currentTime);
      if (document.getElementById("gc" + curTime)) {
        for (var i = 0; i < oP.length; i++) {
          oP[i].style.cssText = "color:#fff;font-size:16px;font-weight:500"
        }
        document.getElementById("gc" + curTime).style.cssText = "color:#0f0;font-size:20px;font-weight:700";
        if (oP[8 + sum].id == "gc" + curTime) {
          lrcCon.style.marginTop = 30 - sum * 30 + "px";
          sum++
        }
      }
    })
  }

  currentLrc()
};

function id(idName) {
  return document.getElementById(idName)
}

function time(cTime) {
  cTime = parseInt(cTime);
  var m = zero(Math.floor(cTime % 3600 / 60));
  var s = zero(Math.floor(cTime % 60));
  return m + ":" + s
}

function zero(num) {
  if (num < 10) {
    return "0" + num
  } else {
    return '' + num
  }
}