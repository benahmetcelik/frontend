let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let cancelBtn = document.getElementById("cancel");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let chunks = [];
let stream;
let recorder;

startBtn.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      visualize(stream);
      startBtn.disabled = true;
      stopBtn.disabled = false;
      cancelBtn.disabled = false;
      chunks = [];
      recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());

        let blob = new Blob(chunks, { type: "audio/mp3" });
        let formData = new FormData();
        formData.append("audio", blob, "recording.mp3");

        fetch("upload.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      recorder.start();
    })
    .catch((error) => {
      console.error(error);
    });
});

stopBtn.addEventListener("click", () => {
  recorder.stop();
  stopBtn.disabled = true;
  cancelBtn.disabled = true;
  startBtn.disabled = false;
});

cancelBtn.addEventListener("click", () => {
  recorder.stop();
  chunks = [];
  stopBtn.disabled = true;
  cancelBtn.disabled = true;
  startBtn.disabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;

function visualize(stream) {
  source = audioCtx.createMediaStreamSource(stream);
  let analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);



  function draw() {
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#4CAF50";

    ctx.beginPath();

    let sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = (v * HEIGHT) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }

  draw();
}
