// 上传代码脚本
import fs from "fs";
import axios from "axios";

/**
 * 上传代码到服务器
 */
export async function uploadCode(name) {
  const allConfig = readConfig();
  if (!allConfig) {
    console.log("请先配置 .secret.json 文件");
    return;
  }

  const config = allConfig[name];
  if (!config) {
    console.log(`.secret.json 文件中不存在名为 ${name} 的配置`);
    return;
  }

  const code = readCode();
  if (!code) {
    console.log("代码内容为空，将跳过上传");
    return;
  }

  const url = `${config.protocol}://${config.hostname}:${config.port}/api/code`;
  const token = config.token;
  console.log("请求地址:", url, "token:", token);
  try {
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
        timeout: 15000,
      }
    );

    if (response.status === 200) {
      console.log("代码上传游戏服务器成功");
    } else {
      console.log("代码上传游戏服务器失败");
    }
  } catch (error) {
    console.log("代码上传游戏服务器失败，错误：", error);
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
