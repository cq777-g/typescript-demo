// ts引入js文件问题解决方案： .d.ts类型定义文件（翻译文件）
import superagent from "superagent";
import path from "path";
import fs from "fs";
import DellAnalyzer from "./dellAnalyzer";

// 组合设计模式
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, "../data/course.json");

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }
}

const url = "http://www.dell-lee.com";

// 单例模式: 不允许通过new创建多个实例
const analyzer = DellAnalyzer.getInstance();
new Crowller(url, analyzer);
