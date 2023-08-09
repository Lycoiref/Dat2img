import { log } from 'console'
import { FileTypes } from './src/FileTypes.js'
import fs from 'fs'
import path from 'path'

export default class DatToImg {
    constructor() {
        this.__filename = path.resolve()
        this.__dirname = path.resolve(this.__filename, './')
    }
    byFile(filepath, outputDir) {
        // 读取.dat二进制文件
        const dat = fs.readFileSync(path.resolve(this.__dirname, filepath))
        // 取前四位
        const header = dat[0]
        const next = dat[1]

        // 打印FileTypes的16进制
        Object.keys(FileTypes).forEach((item, index) => {
            let v = FileTypes[item][0] ^ header
            let verify = v ^ next
            if (verify === FileTypes[item][1]) {
                log(`Translating dat file to ${item}`)
                // 对剩余所有字节进行异或解码
                let result = dat.map((item, index) => {
                    return item ^ v
                })
                // 检查是否存在images文件夹
                if (!fs.existsSync(path.resolve(this.__dirname, './images'))) {
                    fs.mkdirSync(path.resolve(this.__dirname, './images'))
                }
                // 检查是否存在outputDir文件夹
                if (outputDir && !fs.existsSync(path.resolve(this.__dirname, `./images/${outputDir}`))) {
                    fs.mkdirSync(path.resolve(this.__dirname, `./images/${outputDir}`))
                }
                let filename = filepath.split('/').pop().split('.')[0]
                // 保存解码后的文件
                fs.writeFileSync(
                    path.resolve(this.__dirname, `./images${outputDir ? `/${outputDir}/` : '/'}${filename}.${item}`),
                    Buffer.from(result)
                )
            }
        })
    }
    byDirectory(dirpath, outputDir) {
        // 读取目录下所有文件
        const files = fs.readdirSync(path.resolve(this.__dirname, dirpath))
        // 遍历所有文件
        files.forEach((item, index) => {
            // 判断是否是dat文件
            if (!item.endsWith('.dat')) {
                return
            }
            this.byFile(`${dirpath}/${item}`, outputDir)
        })
    }
}
