<script>
  import GradientBar from '$lib/components/GradientBar.svelte';
 
</script>
<div>
  <GradientBar ></GradientBar>
</div>
<div class="container text-center mt-5">
  <h1 class="mb-4">抢答系统</h1>
  <div class="row button-group" >
    <div class="col-md-4">
      <a href="/host" class="btn btn-primary btn-lg w-100 ">主持人端</a>
    </div>
    <div class="col-md-4 "  >
      <a href="/player" class="btn btn-success btn-lg w-100">选手端</a>
    </div>
    <div class="col-md-4">
      <a href="/screen" class="btn btn-info btn-lg w-100">大屏端</a>
    </div>
  </div>
</div>

<style>
  .button-group {
    display: flex;
    gap: 20px; /* 设置按钮之间的间距 */
  }
</style>