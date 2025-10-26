// 自动创建 .secret.json 文件

import fs from "fs";

if (!fs.existsSync(".secret.json")) {
  fs.writeFileSync(
    ".secret.json",
    JSON.stringify(
      {
        token: "your token",
        protocol: "http",
        hostname: "ddns.fxcodeo.com",
        port: 20003,
      },
      null,
      2
    )
  );
}
