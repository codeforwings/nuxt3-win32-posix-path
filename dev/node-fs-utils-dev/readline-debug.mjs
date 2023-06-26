import readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process';
import {promisify} from 'node:util';

let rl = readline.createInterface({
  input,
  output,
  prompt:'hit enter to continue'
});
const question = promisify(rl.question).bind(rl);
const tmp = await question('What is your name?')
console.log('tmp is ',tmp);

rl.close();
