# Dat2img
这是一个使用`Node.js`实现的将微信.dat文件解码为一般图片格式的包

## 安装
```bash
    npm install dat2img # 使用npm安装
    yarn add dat2img # 使用yarn安装
    pnpm add dat2img # 使用pnpm安装
```

## 使用
本包目前实现了通过单文件路径以及文件夹路径两种方式进行转换
```javascript
    import DatToImg from 'dat2img'
    const dat = new DatToImg()
    // 单个文件转换
    dat.byFile(filepath, outputDir?)
    // 文件夹转换
    dat.byDirectory(dirpath, outputDir?)
```
上述代码中，outputDir为可选项，为输出文件夹名称，若不填则默认为Images文件夹根目录。
