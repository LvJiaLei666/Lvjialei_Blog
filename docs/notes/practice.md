# 练习

> 主要放一些平时碰到的面试题以及解决方案

## lazyMan

> 实现一个LazyMan，可以按照以下方式调用:

```js
LazyMan("Hank");
// 输出:
// Hi! This is Hank!
LazyMan("Hank").sleep(10).eat("dinner");
// 输出
// Hi! This is Hank!
// 等待10秒..
// Wake up after 10
// Eat dinner~
LazyMan("Hank").eat("dinner").eat("supper");
// 输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
LazyMan("Hank").sleepFirst(5).eat("supper")
//输出
//等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。

```

> 思路：通过链式调用，每次调用都返回一个新的LazyMan实例，通过队列的方式，将每次调用的方法放入队列中，然后通过next方法，依次执行队列中的方法
>
> 这里有一个需要注意的点，就是sleepFirst方法，需要将其放在队列的最前面，所以需要使用unshift方法，而不是push方法
>
> constructor中的setTimeout是为了执行完所有的同步任务后在执行

代码如下：

[//]: # (/code/LazyMan.js)

```js
class LazyManClass {
  constructor(name) {
    this.name = name
    this.taskList = [];

    this.taskList.push(() => {
      console.log(`Hi This is ${this.name}`)
      this.next()
    })

    setTimeout(() => this.next(), 0)
  }

  next() {
    if (!this.taskList.length) return

    const item = this.taskList.shift()
    item()
  }

  eat(foot) {
    this.taskList.push(() => {
      console.log(`Eat ${foot}`)
      this.next()
    })
    return this
  }

  sleep(delay) {
    this.taskList.push(
      () => {
        setTimeout(() => {
          console.log(`Wake up after ${delay}`)
          this.next()
        }, 1000 * delay)

      })
    return this
  }

  sleepFirst(delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()
      }, delay * 1000)
    }
    this.taskList.unshift(task)
    return this
  }


}

function LazyMan(name) {
  return new LazyManClass(name)
}


```

## 简易任务调度器编程题

**目标：** 创建一个任务调度器类，可以在指定的未来时间执行任务。

**要求：**

1. 实现一个名为 `TaskScheduler` 的类。
2. 类应包含一个 `schedule(taskName, delay, callback)` 方法：
    - `taskName` —— 任务的名称。
    - `delay` —— 执行任务前的等待时间，单位为毫秒。
    - `callback` —— 时间到达时执行的函数。
3. 类应包含一个 `start()` 方法，调用后开始监视并在适当的时间执行所有已安排的任务。
4. 添加一个 `cancel(taskName)` 方法来取消指定的已安排任务。
5. 即使在 `start()` 方法已经被调用之后，新安排的任务也应该被正确监视和执行。

**使用示例：**

```javascript
const scheduler = new TaskScheduler();

scheduler.schedule('hello', 2000, () => {
  console.log('Hello, World!');
});

scheduler.schedule('goodbye', 4000, () => {
  console.log('Goodbye, World!');
});

scheduler.start();

// 在某些条件下取消任务
scheduler.cancel('goodbye');
```

在这个示例中，`hello` 任务应在 2 秒后执行，输出 `"Hello, World!"`，而 goodbye 任务应在 4 秒后执行，除非它在执行之前被取消。

技术提示： 使用 JavaScript 的 setTimeout 和 clearTimeout 函数以及合适的数据结构来管理任务。

> 实现思路
> 1. 使用一个对象来存储任务，key为任务名称，value为任务的延迟时间、回调函数以及是否已经调度的标志位
> 2. 使用一个对象来存储计时器，key为任务名称，value为计时器的id
> 3. 调度任务时，先判断任务是否已经调度，如果没有调度，则调用setTimeout，将任务放入队列中，等待执行
> 4. 调度程序启动时，遍历任务列表，调度所有尚未调度的任务
> 5. 取消任务时，清除计时器，将任务的调度标志位设置为false
> 6. 如果需要重新安排任务，可以选择将任务留在列表中
     代码如下

[//]: # (/code/TaskScheduler.js)

```js
class TaskScheduler {
  constructor() {
    this.tasks = {};
    this.timers = {};
    this.isStarted = false;
  }

  schedule(taskName, delay, callback) {
    if (!taskName || !delay || !callback) {
      throw new Error('Invalid arguments');
    }
    // 存储回调函数及其延迟。
    this.tasks[taskName] = {delay, callback, scheduled: false};

    // 如果调度程序已启动，请立即调度任务。
    if (this.isStarted) {
      this.scheduleTask(taskName);
    }
  }

  scheduleTask(taskName) {
    const task = this.tasks[taskName];
    if (task && !task.scheduled) {
      task.scheduled = true;
      // 调度任务并存储计时器ID。
      this.timers[taskName] = setTimeout(() => {
        task.callback();
        // 任务执行完成后，重置任务状态。
        task.scheduled = false;
        this.timers[taskName] = null;
      }, task.delay);
    }
  }

  start() {
    this.isStarted = true;
    // 调度所有尚未调度的任务。
    for (let taskName in this.tasks) {
      this.scheduleTask(taskName);
    }
  }

  cancel(taskName) {
    if (this.timers[taskName]) {
      clearTimeout(this.timers[taskName]);
      // 如果您希望能够重新安排任务，也可以选择将任务留在列表中。
      // this.tasks[taskName].scheduled = false;
      this.timers[taskName] = null;
    }
  }
}

const scheduler = new TaskScheduler();

scheduler.schedule('hello', 2000, () => {
  console.log('Hello, World!');
});

scheduler.schedule('goodbye', 4000, () => {
  console.log('Goodbye, World!');
});

scheduler.start();

// 在某些条件下取消任务
scheduler.cancel('goodbye');
```

## **类型转换器**

目标是创建一个类型，它将接收一个输入类型，并转换为一个新的输出类型，根据以下规则：

1. 如果输入类型是一个字符串字面量类型，则输出类型是一个包含原始字符串和其大写形式的联合类型。
2. 如果输入类型是一个数字字面量类型，则输出类型是一个包含数字和其字符串形式的联合类型。
3. 如果输入类型是一个布尔类型，则输出类型是一个字符串字面量类型，内容为"true"或"false"。

例如：

```typescript
// type Transform<T> = // ... 实现这里的类型逻辑

type Test1 = Transform<'hello'>;  // 'hello' | 'HELLO'
type Test2 = Transform<42>;       // 42 | '42'
type Test3 = Transform<true>;     // 'true'
type Test4 = Transform<false>;    // 'false'
```

您需要使用`TypeScript`中的高级类型，如条件类型、模板字面量类型等来实现这个Transform类型。

这个题目旨在考察您对TypeScript中类型系统的理解，尤其是如何根据条件创建新的类型。它是一个高级题目，要求有相当程度的TypeScript知识。

实现

```typescript

type Transform<T> = T extends string ? Uppercase<T> : T extends number ? T | `${T}` : T extends boolean ? `${T}` : never
```


## 题目：**排除属性**

目标是创建一个工具类型 ExcludeProps，它接受两个类型参数：一个对象类型 T 和一个联合类型 U。ExcludeProps 的结果类型应该是一个新的对象类型，它包含了原始类型 T 中那些键不在类型 U 中的所有属性。

例如：

```typescript
type ExampleType = {
  id: number;
  name: string;
  age: number;
  visible: boolean;
};

type ResultType = ExcludeProps<ExampleType, 'age' | 'visible'>;
// 应该等于
// {
//   id: number;
//   name: string;
// }
```

在这个例子中，ResultType 应该是一个不包含 age 和 visible 属性的 ExampleType。

要完成这个题目，您需要利用TypeScript中的映射类型（Mapped Types）和条件类型。

实现

```typescript
type ExcludeProps<T, U> = { [P in keyof T as P extends U ? never : P]: T[P] }
```
