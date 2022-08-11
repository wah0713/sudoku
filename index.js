// 1-9
const defaultNum = Array(9).fill(null).map((item, index) => {
    return index + 1
})

const arr = []

const getOptionalList = (i, j) => {
    const filterList = new Set()
    // 向上
    for (let x = 0; x < i; x++) {
        filterList.add(arr[x][j])
    }
    // 一行
    for (let y = 0; y < 9; y++) {
        arr[i][y] && filterList.add(arr[i][y])
    }

    const areaX = Math.floor(i / 3) * 3
    const areaY = Math.floor(j / 3) * 3
    // 同一个盒子
    for (let n = areaX; n < areaX + 3; n++) {
        for (let m = areaY; m < areaY + 3; m++) {
            const item = arr[n] && arr[n][m] || null
            item && filterList.add(item)
        }
    }

    // 当前位置可选值
    return defaultNum.filter(item => !filterList.has(item))
}

// 找出拥有最小可选值的index
findMinIndex = (list) => {
    let idx = -1
    let min = 10
    list.forEach((item, index) => {
        const length = item.length
        if (length === 0) return false

        if (Math.min(length, min) === length) {
            min = length
            idx = index
        }
    })
    return idx
}

// 总失误数
let errNum = 0

// 递归
const walk = (i) => {
    // 可选的组成的数组
    let list = []
    // 这一列完成的数量
    let completeNum = 0

    for (let o = 0; o < 9; o++) {
        if (arr[i][o]) {
            list[o] = []
            completeNum++
        } else {
            list[o] = getOptionalList(i, o)
        }
    }

    // 找出拥有最小可选值的index
    const index = findMinIndex(list)

    if (index === -1) {
        console.table(arr)
        errNum++
        if (errNum === 9) {
            // 防止死循环
            throw new Error('try again')
        }
        // 清空这一列
        arr[i] = []
    } else {
        arr[i][index] = list[index].sort(() => Math.random() - 0.5)[0]
        completeNum++
    }
    // 为满足条件，则重新递归
    if (completeNum < 9) {
        walk(i)
    }
}

arr[0] = [...defaultNum].sort(() => Math.random() - 0.5)

for (let i = 1; i < 9; i++) {
    arr[i] = []
    walk(i)
}
console.info(`success✔️`)
console.table(arr)