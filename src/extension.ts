import * as vscode from 'vscode';
import Completions from "./completions";
import Documenter from './documenter';

/**
 * Run a set up when the function is activated
 *
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext)
{
    ['vue'].forEach(lang => {
        vscode.languages.registerCompletionItemProvider(lang, new Completions(), '*', '@');
    });

    vscode.commands.registerTextEditorCommand('vue-docblocker.trigger', (textEditor:vscode.TextEditor) => {
        textEditor.selection = new vscode.Selection(textEditor.selection.start, textEditor.selection.start);
        let range = new vscode.Range(textEditor.selection.start, textEditor.selection.end);
        let documenter = new Documenter(range, textEditor);
        let snippet = documenter.autoDocument();
        textEditor.insertSnippet(snippet);
    });
}

/**
 * Shutdown method for the extension
 */
export function deactivate()
{
}
