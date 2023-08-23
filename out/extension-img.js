"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const utils_1 = require("./utils");
// 执行命令时被激活
function activate(context) {
    // 使用控制台输出诊断信息(console.log)和错误(console.error)
    // 这行代码只会在你的扩展被激活时执行一次
    console.log('Congratulations, your extension "svg-viewer" is now active!');
    // 注册命令，commandId 参数必须与 package.json 中的 command 字段匹配
    let disposable = vscode.commands.registerCommand("svg-viewer.previewsvg", () => {
        const url = (0, utils_1.getActiveTextUrl)();
        const base64 = (0, utils_1.toBase64)(url);
        (0, utils_1.opedWebview)(base64);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// 停用命令时执行
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension-img.js.map