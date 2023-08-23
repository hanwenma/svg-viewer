"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const utils_1 = require("./utils");
// 是否使用 svg 标签
const useSVG = false;
// 执行命令时被激活
function activate(context) {
    // 注册命令，commandId 参数必须与 package.json 中的 command 字段匹配
    let disposable = vscode.commands.registerCommand("svg-viewer.previewsvg", () => {
        const url = (0, utils_1.getActiveTextUrl)();
        const content = useSVG ? (0, utils_1.getFileContent)(url) : (0, utils_1.toBase64)(url);
        (0, utils_1.opedWebview)(useSVG ? content : `<img src="${content}" />`);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// 停用命令时执行
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map