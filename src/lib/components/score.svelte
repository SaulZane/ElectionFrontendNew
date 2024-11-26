<script>
  export let department = "XX部门"; // 上级调用时动态传入部门名称
  export let resetSignal = false; // 外部传入的重置信号
  let score = 100.0; 

  // State for toggling flip
  let isFlipped = false;

  // 点击按钮时增加或减少分数
  const addScore = () => {
    score += 5;
    triggerFlip();
  };

  const subtractScore = () => {
    score -= 5;
    triggerFlip();
  };

  // 重置分数
  $: if (resetSignal) {
    score = 100.0;
    triggerFlip();
  }

  // 设置分数
  const setScore = () => {
    const input = prompt("请输入新的分数:", score);
    const value = parseFloat(input, 10);
    if (!isNaN(value)) {
      score = value;
      triggerFlip();
    }
  };

  // Trigger the flip animation
  const triggerFlip = () => {
    isFlipped = !isFlipped;
  };
</script>

<div class="container mt-2 text-center">
  <!-- 第一行：部门名称 -->
  <div class="row mb-1">
    <div class="col">
      <h4>{department}</h4> <!-- Adjusted heading size -->
    </div>
  </div>

  <!-- 第二行：分数显示 -->
  <div class="row mb-2">
    <div class="col d-flex justify-content-center">
      <div class="score-container {isFlipped ? 'flipped' : ''}">
        <!-- Front face -->
        <div class="score-front d-flex align-items-center justify-content-center">
          <p class="fs-1 fw-bold mb-0">{score.toFixed(1)}</p> <!-- Larger and bold font -->
        </div>
        <!-- Back face -->
        <div class="score-back d-flex align-items-center justify-content-center">
          <p class="fs-1 fw-bold mb-0">{score.toFixed(1)}</p> <!-- Larger and bold font -->
        </div>
      </div>
    </div>
  </div>

  <!-- 第三行：加分、减分、设置分数 -->
  <div class="row">
    <div class="col d-flex justify-content-center gap-2">
      <button class="btn btn-sm btn-success" on:click={addScore}>
        +5
      </button>
      <button class="btn btn-sm btn-danger" on:click={subtractScore}>
        -5
      </button>
      <button class="btn btn-sm btn-secondary" on:click={setScore}>
        手
      </button>
    </div>
  </div>
</div>

<style>
  .score-container {
    position: relative;
    width: 90px; /* Reduced width */
    height: 45px; /* Reduced height */
    perspective: 800px; /* Adjusted perspective for compact size */
  }

  .score-front,
  .score-back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex; /* Flex for centering content */
    align-items: center;
    justify-content: center;
    backface-visibility: hidden; /* Ensure back is hidden */
    transform-origin: center;
    transition: transform 0.5s; /* Smooth transition for flipping */
  }

  .score-front {
    transform: rotateX(0deg); /* Default view */
  }

  .score-back {
    transform: rotateX(-180deg); /* Hidden at start */
  }

  .score-container.flipped .score-front {
    transform: rotateX(180deg); /* Front flips out */
  }

  .score-container.flipped .score-back {
    transform: rotateX(0deg); /* Back flips in */
  }

  .fs-1 {
    font-size: 3rem; /* Larger font size */
    font-weight: bold; /* Bold text */
  }

  h4 {
    font-size: 1.5rem; /* Adjusted heading size */
    margin-bottom: 0.5rem; /* Reduced margin */
  }

  .btn-sm {
    padding: 0.25rem 0.5rem; /* Smaller button padding */
    font-size: 1rem; /* Adjusted button text size */
  }

  .row {
    margin-bottom: 0.5rem; /* Reduced spacing between rows */
  }
</style>
