import { defineConfig } from "tsup";
import { uploadCode } from "./scripts/upload";

export default defineConfig({
  entry: ["src/main.ts"], // 入口文件
  splitting: false, // 是否拆分文件
  sourcemap: false, // 是否生成 sourcemap
  clean: true, // 打包前是否清除输出目录
  format: ["esm"], // 输出格式
  minify: false, // 是否压缩
  treeshake: false, // 是否进行树摇
  // 构建成功后执行
  async onSuccess() {
    uploadCode();
  },
});
