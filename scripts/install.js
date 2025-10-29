// 自动创建 .secret.json 文件

import fs from "fs";

if (!fs.existsSync(".secret.json")) {
  fs.writeFileSync(
    ".secret.json",
    JSON.stringify(
      {
        official: {
          token: "your token",
          protocol: "https",
          hostname: "www.scrastar.com",
          port: 443,
        },
        test: {
          token: "your token",
          protocol: "http",
          hostname: "ddns.fxcodeo.com",
          port: 20003,
        },
      },
      null,
      2
    )
  );
}
