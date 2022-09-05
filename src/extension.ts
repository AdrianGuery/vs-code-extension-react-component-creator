// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from "vscode";
import { parseComponentName, generateJSXContent, generateTestContent } from "./helpers";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("extension is now active!");

  let disposable = vscode.commands.registerCommand(
    "react-component-creator.createComponent",
    async (uri: vscode.Uri) => {
      let componentName = await vscode.window.showInputBox({
        placeHolder: "Component name",
      });

      if (componentName) {
        const { name, slug } = parseComponentName(componentName);

        let newUri = vscode.Uri.file(uri.path + "/" + name);
        await vscode.workspace.fs.createDirectory(newUri);

        //Create components folder
        let path;

        //Create the main component
        try {
          path = vscode.Uri.file(`${newUri.path}/${name}.tsx`);
          await vscode.workspace.fs.writeFile(
            path,
            Buffer.from(generateJSXContent(name, slug))
          );
        } catch (error: any) {
          vscode.window.showInformationMessage(error.message);
        }

        //Create component.module.scss
        try {
          path = vscode.Uri.file(`${newUri.path}/${name}.module.scss`);
          let content = `.root{\n  //To complete\n}`;
          await vscode.workspace.fs.writeFile(path, Buffer.from(content));
        } catch (error: any) {
          vscode.window.showInformationMessage(error.message);
        }

        //Create test file component.test.tsx
        try {
          path = vscode.Uri.file(`${newUri.path}/${name}.test.tsx`);
          let content = generateTestContent(name);
          await vscode.workspace.fs.writeFile(path, Buffer.from(content));
        } catch (error: any) {
          vscode.window.showInformationMessage(error.message);
        }

        vscode.window.showInformationMessage(
          "React file structure has been created successfully."
        );
      }
    }
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
