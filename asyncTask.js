// 创建一个包含100个任务的数组
const tasks = Array.from({ length: 100 }, (_, index) => () => asyncTask(index));
const taskLength = tasks.length;

let currentIndex = 0;
const results = [];

// 定义一个异步函数来执行任务
async function executeTasks() {
  const concurrency = 10; // 同时执行的任务数
  
  async function runNextTask() {
    const taskIndex = currentIndex++;
    if (taskIndex >= tasks.length) {
      return;
    }
    const task = tasks[taskIndex];
    const result = await task();
    results.push(result);
  }

  // 同时启动最多10个任务
  Promise.all(Array(concurrency).fill(null).map(runNextTask)).then(() => {
    if (results.length >= taskLength) {
      console.log("所有任务已完成");
      console.log(results);
    } else {
      console.log('等待3秒');
      setTimeout(executeTasks, 3000); // 如果还有任务，则等待 3 秒后继续执行
    }
  });
  
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
