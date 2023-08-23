import * as vscode from "vscode";

const fs = require("fs");
const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SVG Preview</title>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
      }

      body{
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img, svg{
        max-height: 90%;
      }
    </style>
  </head>
  <body>
    <!-- content -->
  </body>
</html>`;

// 获取模版内容
export function getFileContent(url: string) {
  return fs.readFileSync(url, "utf-8");
}

// 获取 base54 格式
export function toBase64(url: string) {
  const content = fs.readFileSync(url);
  return `data:image/svg+xml;base64,${content.toString("base64")}`;
}

// 获取当前文件绝对路径
export function getActiveTextUrl(): string {
  let url = "";
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    url = editor.document.fileName;
  }

  return url;
}

// 创建并显示新的 webview
export function opedWebview(contentStr: string) {
  const panel = vscode.window.createWebviewPanel(
    "SVGPreview", // 只供内部使用，即 webview 的标识
    "SVG Preview", // 面板标题
    vscode.ViewColumn.One, // 给新的 webview 面板一个编辑器视图
    {} // Webview 选项
  );

  // 设置HTML内容
  panel.webview.html = getWebviewContent(contentStr);
}

// 获取模版结购
export function getWebviewContent(contentStr: string) {
  return template.replace('<!-- content -->', contentStr);
}
