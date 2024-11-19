<script>
  import { getRanking } from '$lib/api';
  import { onMount } from 'svelte';
  import Score from '$lib/components/score.svelte';
  import GradientBar from '$lib/components/GradientBar.svelte';
  let ranking = [];
  let departments = ['东所', '南所', '西所', '北所', '滨海所'];
  let resetSignal = false; // 用于通知子组件重置分数

  // 获取排名数据
  async function fetchRanking() {
    try {
      ranking = await getRanking();
    } catch (error) {
      console.error("获取排名失败", error);
    }
  }

  // 自动刷新排名
  onMount(() => {
    const interval = setInterval(fetchRanking, 1000);
    return () => clearInterval(interval); // 清理定时器
  });

  // 翻转部门名称
  function handleClick() {
    if (departments[0] === '东所') {
      departments = ['空港', '王兰庄', '金角', '聚丰', '明成'];
    } else {
      departments = ['东所', '南所', '西所', '北所', '滨海所'];
    }
    resetScores(); // 重置分数
  }

  // 重置所有分数
  function resetScores() {
    resetSignal = true;
    setTimeout(() => (resetSignal = false), 0); // 确保触发重置后恢复信号
  }
</script>
<div>
  <GradientBar ></GradientBar>
</div>
<div class="container mt-5">
  <div class="container mt-4">
    <!-- 部门分数显示 -->
    <div class="row justify-content-center text-center">
      {#each departments as department}
        <div class="col-md-2 col-sm-4 mb-3">
          <Score department={department} resetSignal={resetSignal} />
        </div>
      {/each}
    </div>
  </div>

  <!-- 排名表 -->
  <div class="table-responsive">
    <table class="table table-bordered table-striped ranking-table">
      <thead class="table-light">
        <tr class="text-center align-middle">
          <th scope="col">名次</th>
          <th scope="col">姓名</th>
          <th scope="col">抢答时间</th>
        </tr>
      </thead>
      <tbody>
        {#if ranking.length > 0}
          {#each ranking as user, i}
            <tr class="text-center align-middle">
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.time}</td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="3" class="text-center align-middle">暂无排名数据，请听主持人滴声抢答<small>（排名表每1秒刷新一次数据）</small></td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>

  <!-- 翻转部门按钮 -->
  <div class="floating-button">
    <button class="btn btn-primary btn-small" on:click={handleClick}>
      翻转部门
    </button>
  </div>

  <!-- 底部版权声明 -->
  <div class="fixed-bottom text-center mb-2">
    <small class="text-muted">
      &copy;2024  | 此网站属于业务监督科<b>张硕</b>唯一所有 | 仅授权车务科进行业务竞赛专用 | 如遇故障请联系 13920148266 | <b>保留所有权利</b>
      <br />
      <small>编码技术栈 前端：Svelte Kit + Bootstrap | 后端：Python + FastAPI | 代码辅助：ChatGPT 4.0 mini</small>
    </small>
  </div>
</div>
<style>
  .ranking-table {
    font-size: 1rem; /* 表格文字大小 */
  }

  .floating-button {
    position: fixed; /* 固定定位 */
    bottom: 20px; /* 距离页面底部 */
    right: 20px; /* 距离页面右侧 */
    z-index: 1050; /* 确保显示在最前方 */
    display: flex; /* 确保内容居中 */
    justify-content: center;
    align-items: center;
  }

  .floating-button button {
    font-size: 1rem; /* 按钮文字大小 */
    padding: 0.5rem 1rem; /* 按钮内边距 */
  }
</style>