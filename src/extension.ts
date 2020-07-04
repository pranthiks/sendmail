import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "emailer" is now active');

	// TODO: Start postfix here if postfix isn't running

	const disposable = vscode.commands.registerCommand('emailer.sendEmail', () => {
		const filePath = vscode.window.activeTextEditor?.document.fileName;
		const emailCommand = `cat ${filePath} | sendmail -vt`;
		console.log(`Running sendmail command: ${emailCommand}`);
		cp.exec(emailCommand, (error, stdout, stderr) => {
      if (error) {
				vscode.window.showErrorMessage(`Error: ${stderr}`);
				return;
			}

			console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
			vscode.window.showInformationMessage('Email sent!');
    });

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// TODO: Shut down postfix if it's still running
}
