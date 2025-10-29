import { defineConfig } from "tsup";
import { uploadCode } from "./scripts/upload";

export default defineConfig({
  // 入口文件
  entry: ["src/main.ts"],
  // 是否拆分代码为多个文件
  splitting: false,
  // 是否生成 sourcemap
  sourcemap: false,
  // 打包前是否清空输出目录
  clean: true,
  // 打包格式
  format: ["esm"],
  // 是否压缩代码
  minify: false,
  // 打包成功后的回调
  async onSuccess() {
    uploadCode(process.env.SERVER);
  },
});
