<script>
  import { startQuiz, stopQuiz, getRanking } from '$lib/api';
  import { onMount } from 'svelte';
  import GradientBar from '$lib/components/GradientBar.svelte';
  let ranking = [];

  // 播放滴声的函数
  function playBeep(duration = 150, frequency = 2000) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // 设置频率和音量
    oscillator.frequency.value = frequency; 
    gainNode.gain.value = 1;

    // 连接音频节点
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 开始播放
    oscillator.start();
    setTimeout(() => {
      oscillator.stop(); // 停止播放
    }, duration);
  }

  async function start() {
    try {
      await startQuiz();
      playBeep(); // 播放滴声
      
      fetchRanking();
    } catch (error) {
      alert("启动失败：" + error.message);
    }
  }

  async function stop() {
    try {
      await stopQuiz();
      ranking = [];
    } catch (error) {
      alert("停止失败：" + error.message);
    }
  }

  async function fetchRanking() {
    try {
      ranking = await getRanking();
    } catch (error) {
      console.error("获取排名失败", error);
    }
  }

  onMount(() => {
    const interval = setInterval(fetchRanking, 1000);
    return () => clearInterval(interval);
  });
</script>
<div>
  <GradientBar ></GradientBar>
</div>
<div class="container mt-5">
  <h1>主持人端</h1>
  <div class="mb-3">
    <button on:click={start} class="btn btn-primary me-2">开始抢答</button>
    <button on:click={stop} class="btn btn-danger">清空排名</button>
  </div>

  <h2>排名</h2>
  <ul class="list-group">
    {#each ranking as user, i}
      <li class="list-group-item">
        {i + 1}. {user.username} - {user.time}
      </li>
    {/each}
  </ul>
</div>
