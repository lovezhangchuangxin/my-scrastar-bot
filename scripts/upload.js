// 上传代码脚本
import fs from "fs";
import axios from "axios";

/**
 * 上传代码到服务器
 */
export async function uploadCode() {
  const config = readConfig();
  if (!config) return;

  const code = readCode();
  if (!code) return;

  const url = `${config.protocol}://${config.hostname}:${config.port}/api/code`;
  const token = config.token;
  const response = await axios.post(
    url,
    JSON.stringify({
      code,
      filename: "main.js",
      is_active: true,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Token": token,
      },
    }
  );

  if (response.status === 200) {
    console.log("代码上传游戏服务器成功");
  } else {
    console.log("代码上传游戏服务器失败");
  }
}

/**
 * 读取配置
 */
function readConfig() {
  const json = fs.readFileSync(".secret.json", "utf-8");
  try {
    const config = JSON.parse(json);
    return config;
  } catch (error) {
    console.log("读取配置文件失败");
    return;
  }
}

/**
 * 读取 code
 */
function readCode() {
  let code = fs.readFileSync("dist/main.js", "utf-8");
  // 删除代码中的 export 语句
  code = code.replace(/export /g, "");
  return code;
}
