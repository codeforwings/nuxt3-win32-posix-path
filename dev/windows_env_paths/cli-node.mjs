/**
 * Testing how zsh passes arguments to node
 node dev/windows_env_paths/cli-node.mjs "c:/Users/Public/Docum ents"
 * @type {string[]}
 */
const args = process.argv.slice(2);
console.log(args,args[0][2],'len: ',args.length);
