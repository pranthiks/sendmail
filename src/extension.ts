import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('emailer.sendEmail', () => {
		const filePath = vscode.window.activeTextEditor?.document.fileName;
		const emailCommand = `cat ${filePath} | sendmail -vt`;
		console.log(`Running sendmail command: ${emailCommand}`);
		cp.exec(emailCommand, (error, stdout, stderr) => {
      if (error) {
				vscode.window.showErrorMessage(`Error: ${stderr}`);
				console.error(`error: ${error}`);
				return;
			}

			vscode.window.showInformationMessage('Email sent!');
    });

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
