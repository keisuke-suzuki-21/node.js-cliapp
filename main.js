// commanderライブラリからprogramオブジェクトをインポート
import {program} from "commander";
// node:fs/promisesからfsモジュール全体をインポート
import * as fs from "node:fs/promises";
// markdown文字列を変換処理するモジュールのインポート
import { md2html } from "./md2html.js";


// gfmオプションを定義する
program.option("--gfm","GFMを有効にする")
// コマンドライン引数をパースし、ファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];
// コマンドライン引数のオプションを取得する
const options = program.opts();
// コマンドライン引数で指定されなかったオプションにデフォルト値をあげる
const cliOptions = {
    gfm: options.gfm ?? false,
};

fs.readFile(filePath,{ encoding:"utf8"}).then(file => {
    // Markdownファイルをhtmlに変換する
    const html = md2html(file,cliOptions);
    console.log(html);
}).catch(err => {
    // console.log("fs.redeFileがpromiseをrejectとして返した");
    console.error(err.message);
    // 終了ステータス１としてプロセスを終了する
    process.exit(1);
});
