<script>
    import { submitAnswer } from '$lib/api';
    import GradientBar from '$lib/components/GradientBar.svelte';
    let username = '';
    let message = '';
  
    async function handleSubmit() {
      try {
        if (!username) {
          throw new Error('名字不能为空！');
        }
        await submitAnswer(username);
        message = "抢答成功，请看大屏！";
      } catch (error) {
        alert("抢答失败：" + error.message);
      }
    }
  </script>
  <div>
    <GradientBar ></GradientBar>
  </div>
  <div class="container mt-5">
    <h1>选手端</h1>
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="输入你的名字" bind:value={username} />
    </div>
    <button on:click={handleSubmit} class="btn btn-success">抢答</button>
    <p class="mt-3">{message}</p>
  </div>
  