import * as vscode from "vscode";
import { getActiveTextUrl, getFileContent, toBase64, opedWebview } from "./utils";

// 是否使用 svg 标签
const useSVG = false;

// 执行命令时被激活
export function activate(context: vscode.ExtensionContext) {

  // 注册命令，commandId 参数必须与 package.json 中的 command 字段匹配
  let disposable = vscode.commands.registerCommand(
    "svg-viewer.previewsvg",
    () => {
      const url = getActiveTextUrl();
      const content = useSVG ? getFileContent(url) : toBase64(url);
      opedWebview(useSVG ? content: `<img src="${content}" />`);
    }
  );

  context.subscriptions.push(disposable);
}

// 停用命令时执行
export function deactivate() {}
