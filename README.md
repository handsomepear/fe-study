# fe study

## 修改第三方模块的 bug

通过 webpack 配置引入路径的别名来映射到自己改 bug 后的文件地址

-   第一种方式

```javascript
module.exports = {
    chainWebpack: (config) => {
        // lodash/_apply 是引入node_modules中文件的路径 我们通过alias映射到了我们自己的_apply.js文件
        config.resolve.alias.set('lodash/_apply', path.resolve(__dirname, 'src/assets/_apply.js'));
    },
};
```

-   第二种方式 通过 `patch-package` 包修改

1. 安装 patch-package
2. 修改 package.json,新增命令 `postinstall`
3. 修改 node_modules 里面的代码
4. 执行命令 `npx patch-package 包名`

会生成一个 patches 的文件夹 里面有修改过的文件的 diff 记录
