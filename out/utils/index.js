"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebviewContent = exports.opedWebview = exports.getActiveTextUrl = exports.toBase64 = exports.getFileContent = void 0;
const vscode = require("vscode");
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
function getFileContent(url) {
    return fs.readFileSync(url, "utf-8");
}
exports.getFileContent = getFileContent;
// 获取 base54 格式
function toBase64(url) {
    const content = fs.readFileSync(url);
    return `data:image/svg+xml;base64,${content.toString("base64")}`;
}
exports.toBase64 = toBase64;
// 获取当前文件绝对路径
function getActiveTextUrl() {
    let url = "";
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        url = editor.document.fileName;
    }
    return url;
}
exports.getActiveTextUrl = getActiveTextUrl;
// 创建并显示新的 webview
function opedWebview(contentStr) {
    const panel = vscode.window.createWebviewPanel("SVGPreview", // 只供内部使用，即 webview 的标识
    "SVG Preview", // 面板标题
    vscode.ViewColumn.One, // 给新的 webview 面板一个编辑器视图
    {} // Webview 选项
    );
    // 设置HTML内容
    panel.webview.html = getWebviewContent(contentStr);
}
exports.opedWebview = opedWebview;
// 获取模版结购
function getWebviewContent(contentStr) {
    return template.replace('<!-- content -->', contentStr);
}
exports.getWebviewContent = getWebviewContent;
//# sourceMappingURL=index.js.map