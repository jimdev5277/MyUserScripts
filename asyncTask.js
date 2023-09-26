// 创建一个包含100个任务的数组
const tasks = Array.from({ length: 100 }, (_, index) => () => asyncTask(index));

// 定义一个异步函数来执行任务
async function executeTasks() {
  const concurrency = 10; // 同时执行的任务数
  const results = [];
  let currentIndex = 0;

  async function runNextTask() {
    const taskIndex = currentIndex++;
    if (taskIndex >= tasks.length) {
      return;
    }

    const task = tasks[taskIndex];
    const result = await task();
    results.push(result);

    // 继续执行下一个任务
    await runNextTask();
  }

  // 同时启动最多10个任务
  await Promise.all(Array(concurrency).fill(null).map(runNextTask));

  console.log("所有任务已完成");
  console.log(results);
}

// 模拟一个异步任务，这里使用setTimeout来模拟异步操作
function asyncTask(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`任务 ${index} 已完成`);
      resolve(`任务 ${index} 结果`);
    }, Math.random() * 1000); // 模拟随机执行时间
  });
}

executeTasks();
