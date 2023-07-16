#!/usr/bin/env node
/**
 * .....pnpm run dev/node-fs-utils-dev/tests/dev-specific/generate-env.mjs
 * assumes pwd is project root
 node dev/node-fs-utils-dev/tests/dev-specific/generate-env.mjs
 */
console.log("process.env.NODE_FIRST_ARG:",process.env.NODE_FIRST_ARG);
import { log } from "node:console";
import fs from "node:fs";
import {dirname} from "node:path"
import {fileURLToPath} from "node:url"
console.log("import.meta.url:",import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url)); //Folder of current file (from file://url)
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `${__dirname}/temp/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

/* get first args */
// const args = process.argv.slice(2);
// console.log(args);
// const [firstArg] = args || ["cli-env"];
const firstArg = process.env.NODE_FIRST_ARG || "cli-env";

writeToFile(`${firstArg}.raw.json`,JSON.stringify(process.env,null,2));//this works... lol interesting
