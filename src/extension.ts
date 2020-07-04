import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {

	const command = "emailer.sendEmail";
	const commandHandler = () => {
		const emailFilePath = vscode.window.activeTextEditor?.document.fileName;
		const emailCommand = `cat ${emailFilePath} | sendmail -vt`;
		cp.exec(emailCommand, (error, _stdout, stderr) => {
			if (error) {
				let errorMessage = `Error: ${stderr}`;

				if (stderr.toLowerCase().includes("untitled")) {
					errorMessage = "File must be saved before it can be sent.";
				}

				vscode.window.showErrorMessage(errorMessage);
				console.error(`Error: ${error}`);
				return;
			}

			vscode.window.showInformationMessage('Email sent!');
		});
	};

	context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

export function deactivate() {}
