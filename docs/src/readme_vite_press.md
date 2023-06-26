# Vite Press Learning Exercise
1. Need to use vscode / webstorm to inject the header or w/e
    * i think there is also called a snippet / wrapper / file template

# Concepts
* "On this page"
* Edit on GitHub 
  * `/edit/ to /tree/`
    * to view

# Things to do
* [x] .gitignore
* [ ] search
* [ ] cheatsheet
* [ ] Front Matter / Header Section
* [ ] Update Config.js
* [ ] vscode spacing / etc
* [ ] look for other themes
* [ ] deploy to github pages
  * doesnt this make more sense as a submodule? to get another github page?
* JSDocs
* pnpm
* [ ] edit links
* [ ] pandoc export
* [ ] glob cheatsheet
* [ ] columns



Notes
---
## Git Ignore
```gitignore
/docs/.vitepress/cache/
/docs/.vitepress/dist/
```
# Syntax Highlighting
[https://github.com/shikijs/shiki/blob/main/docs/languages.md](https://github.com/shikijs/shiki/blob/main/docs/languages.md)
```js
console.log('hello world');
```
```bash
echo "hello world"
```
```python
print("hello world")
```
```powershell
Write-Host "hello world"
```
```ahk
#Requires AutoHotkey v2
; some comment
MsgBox, hello world
tooltip("hello world")
```
```jsonc
{
  "hello": "world"
}
```
```yaml
hello: 
  - world
  - kenobi 
```

# Config
* config.js
  * themeConfig
    * nav
      * added src/
    * sidebar (navigation)
## Sidebar Plugin
[https://github.com/JonathanSchndr/vitepress-plugin-auto-sidebar](https://github.com/JonathanSchndr/vitepress-plugin-auto-sidebar)


# Info Dump
* cheatsheet
* search
* vscode setup for markdown
* BLOCK COMMENTS STILL NOT WORK

# Nice to have
* add vuetify or something
* need layout? or use vitepress? 
1. relative paths
2. windows to /c/users/kenobi
3. 