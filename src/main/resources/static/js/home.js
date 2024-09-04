document.addEventListener('DOMContentLoaded', function () {
    const audioElement = document.getElementById('audio');
    const canvas = document.getElementById('audio-visualizer');
    const image = new Image();
    let audioCtx;
    let analyser;
    let canvasCtx;

    if (!audioElement) {
        console.error("Audio element not found!");
    } else {
        console.log('Audio element found:', audioElement);
    }

    if (!canvas) {
        console.error("Canvas element not found!");
    } else {
        console.log('Canvas element found:', canvas);
        canvasCtx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // audioElement.volume = 1.0; // 确保音量为最大
    // audioElement.muted = false; // 确保没有静音

    function startAudioContext() {
        if (!audioCtx) {
            console.log('Creating AudioContext...');
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            console.log('AudioContext created:', audioCtx.state); // 输出 AudioContext 的状态
    
            const audioSource = audioCtx.createMediaElementSource(audioElement);
            analyser = audioCtx.createAnalyser();  // 将 analyser 赋值给全局变量
    
            // 连接音频源到分析器，再连接到目的地（扬声器）
            audioSource.connect(analyser);
            analyser.connect(audioCtx.destination);
    
            analyser.fftSize = 256;
    
            draw(); // 开始绘制波形图
        }
    }

    function draw() {
        console.log('Draw function is called');
        requestAnimationFrame(draw);

        const bufferLength = analyser.frequencyBinCount; // 确保 analyser 已经定义
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        // console.log('Frequency Data:', dataArray); // 输出频谱数据到控制台

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        // 在canvas上绘制图像背景
        canvasCtx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // 绘制频谱
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = 3*dataArray[i];
            // console.log('Bar Height:', barHeight); // 输出每个频率条的高度

            const r = barHeight + 25 * (i / bufferLength);
            const g = 250 * (i / bufferLength);
            const b = 50;

            canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
            canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    audioElement.addEventListener('play', () => {
        console.log('Audio is playing, setting up AudioContext...');
        startAudioContext();
        audioCtx.resume().then(() => {
            console.log('AudioContext state after resume:', audioCtx.state); // 应该输出 "running"
            draw(); // 确保绘制开始
        });
    });

    image.onload = function () {
        console.log('Image loaded, waiting for audio play...');
    };
});

// login.js
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in'); // 页面加载后添加fade-in类，实现渐入效果
});

// 跳转渐入效果

document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止立即跳转
        const href = this.href; // 获取目标链接

        // 触发渐出效果
        document.body.classList.remove('fade-in');
        document.body.style.opacity = 0;

        // 延迟跳转，等待过渡动画完成
        setTimeout(function() {
            window.location.href = href;
        }, 1000); // 1秒的延迟与CSS中的transition时间匹配
    });
});
