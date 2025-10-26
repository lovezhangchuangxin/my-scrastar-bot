# my-scrastar-bot

我的用于游戏 [Scrastar](http://ddns.fxcodeo.com:20003/game) 的机器人代码。

本模版提供基础的类型提示和代码打包上传功能。**不包含 bot 实际代码的模版见 `template` 分支。**

或者你也可以删除 `src` 目录下的所有文件，然后编写你的代码。

## 项目结构

- `src/main.ts` - 机器人主逻辑文件，导出 `main` 函数供游戏调用
- `scripts/install.js` - 安装依赖脚本
- `scripts/upload.js` - 上传代码到游戏服务器脚本
- `tsup.config.ts` - TypeScript 打包配置文件

## 使用方法

本项目推荐使用 [pnpm](https://pnpm.io/)。

1. 安装依赖：

   ```bash
   pnpm install
   ```

   这一步除来会下载一些开发依赖，还会自动在根目录创建一个 `.secret.json` 文件，里面存放了游戏服务器的配置信息。你需要获取你的 `token` 并填入该文件的 `token` 字段中。

   如何获取 `token` ？

   在游戏界面点击右上角的用户名，打开菜单点击设置就可以找到 `token`。

2. 开发调试：

   ```bash
   pnpm dev
   ```

3. 构建打包：

   ```bash
   pnpm build
   ```

无论是 `pnpm dev` 还是 `pnpm build`，都会将生成的代码上传到游戏服务器。

## 注意

虽然游戏中函数不需要加 `export` 关键字，但是由于不加 `tsup` 打包工具会直接删除未使用的代码，所以必须在 `main` 函数前面加上 `export`，表示导致 `main` 函数给外部使用。其他函数则不需要加 `export`。
