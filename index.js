import { log } from 'console'
import { FileTypes } from './FileTypes.js'
import fs from 'fs'
import path from 'path'

const __filename = path.resolve()
const __dirname = path.resolve(__filename, './')

// 读取.dat二进制文件
const dat = fs.readFileSync(path.resolve(__dirname, './test_data/Image/2023-07/test.dat'))
// 取前四位
const header = dat[0]
const next = dat[1]

// 打印FileTypes的16进制
Object.keys(FileTypes).forEach((item, index) => {
    let v = FileTypes[item][0] ^ header
    let verify = v ^ next
    if (verify === FileTypes[item][1]) {
        log('File type is: ', item)
        // 对剩余所有字节进行异或解码
        let result = dat.map((item, index) => {
            return item ^ v
        })
        // 保存解码后的文件
        fs.writeFileSync(path.resolve(__dirname, `./test_data/Image/2023-07/test.${item}`), Buffer.from(result))
    }
})
