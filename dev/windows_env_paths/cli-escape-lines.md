# Cli Escape Lines
* note. literally node cannot see the front slash without quotes
```bash
node ./cli-node.mjs "c:/Users/Public/Docum ents"
node ./cli-node.mjs "c:/Users/Public/Documents"
node ./cli-node.mjs c:/Users/Public/Documents
node ./cli-node.mjs c:\Users\Public\Documents
```

## One
```bash
node ./cli-node.mjs c:\Users\Public\Documents
node ./cli-node.mjs c:\\Users\\Public\\Documents
node ./cli-node.mjs "c:\Users\Public\Documents"
node ./cli-node.mjs 'c:\Users\Public\Documents'
```