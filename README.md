## Webpack5 模块联邦实践

mf-loader-client：远程模块加载器，可以做成私有 npm 包，远程模块组件可以从这里面导入
remote-app：远程模块组件，并将其暴露出去
host-app：本地应用，远程模块引入方

### 方案一

1. `yarn start` 开启远程模块服务和本地应用服务
2. 引入远程组件

```jsx
// host-app/App.jsx
import Page1 from './src/page1';
const App = () => {
  return (
    <div>
      <Page1 />
    </div>
  );
};
export default App;

// host-app/src/page1.jsx
import MyButton from 'jjwang_remote_app/MyButton';
const Page1 = () => {
  return (
    <div>
      方式一
      <MyButton />
    </div>
  );
};
export default Page1;
```

### 方案二

1. remote-app 打包生成 remoteEntry.js 文件
2. mf-loader-client 打包
   2.1 执行 `build:publish` 后，再执行 `npm publish` 发布到私有 npm 库
   2.2 执行 `build:start` 后，生成 index.js 文件
3. `yarn start2` 开启远程模块服务、本地应用服务、远程模块加载器服务
4. 本地应用 host-app/public/index.html 引入如下 js 文件

```html
<!-- 远程模块（1生成的文件） -->
<!-- <script src="http://localhost:3008/remoteEntry.js"></script> -->
<!-- 远程模块加载器（2.2生成的文件） -->
<!-- <script src="http://localhost:3007/index.js"></script> -->
<!-- 以上2个文件都可以放到 cdn 上 -->
```

5. 通过 npm 包的方式引入远程组件

```jsx
// host-app/App.jsx
import Page2 from './src/page2';
const App = () => {
  return (
    <div>
      <Page2 />
    </div>
  );
};
export default App;

// host-app/src/page2.jsx
import { MyButton } from '@jjwang/mf-loader-client';
const Page2 = () => {
  return (
    <div>
      方式二
      <MyButton />
    </div>
  );
};
export default Page2;
```
