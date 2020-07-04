import * as vscode from 'vscode';
import * as cp from 'child_process';
import { stdout, stderr } from 'process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "emailer" is now active');

	// TODO: Start postfix here if postfix isn't running

	const disposable = vscode.commands.registerCommand('emailer.sendEmail', () => {
		// The code you place here will be executed every time your command is executed

		const emailCommand = "cat /Users/pranthiksamal/Downloads/testeml.eml | sendmail -t";
		cp.exec(emailCommand, (err, stdout, stderr) => {
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (err) {
        console.log("error: " + err);
      }
    });

		vscode.window.showInformationMessage('Email sent!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	// TODO: Shut down postfix if it's still running
}
