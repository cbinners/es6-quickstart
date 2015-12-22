# Project Quickstart

es6, sequelize, node.js, webpack, scss

If you are having problems getting Gulp to cooperate with es6, for example: ` No gulpfile found`, your local and global gulp versions may not be correct. You need to make sure that both versions are atleast `3.9.0`:

```
$ gulp -v
[14:10:25] Requiring external module babel-core/register
[14:10:25] CLI version 3.9.0
[14:10:25] Local version 3.9.0
```

If you are having trouble, and can't seem to update the global gulp version, and are using nvm, removing system gulp worked for me:

`rm /usr/local/bin/gulp`
