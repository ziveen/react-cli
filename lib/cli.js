const fs = require('fs');
const chalk = require('chalk');
const vfs = require('vinyl-fs')
const through = require('through2')
const { basename, join } = require('path');

module.exports =  (opts) => {
    //判断是否已经存在
    if(fs.existsSync(opts.project)) {
        console.log(chalk.red('this folder is already exists'))
        return false
    }

    //创建文件
    fs.mkdir(`./${opts.project}`, err => {
        if(err) {
            console.log(chalk.red("create folder failed"))
        }
        else {
            const dest = process.cwd() + opts.project
            const cwd = join(__dirname,'../','react-template')

            vfs.src(['**/*', '!node_modules'])
            .pipe(template(dest,cwd))
            .pipe(vfs.dest(dest))
            .on('end', () => {
                console.log(chalk.green("安装成功"));
            })
        }
    })
}

function template(dest, cwd) {
    return through.obj(function (file, enc, cb) {
        if (!file.stat.isFile()) {
          return cb();
        }
    
        console.log('create:%s', file.path.replace(cwd + '/', ''));
        this.push(file);
        cb();
      });
}