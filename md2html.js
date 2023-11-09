import {marked} from "marked";

// markdown文字列を受け取り変換処理を行う関数
export function md2html(markdown, cliOptions){
    return marked.parse(markdown,{
        gfm: cliOptions.gfm,
    });
};