const defaultNum = Array(9).fill(null).map((item, index) => {
    return index + 1
})
const arr = []
let optionalList36 = []
arr[0] = [...defaultNum].sort(() => Math.random() - 0.5)
for (let i = 1; i < 5; i++) {
    arr[i] = []
    for (let j = 0; j < 9; j++) {
        let currentList = []
        const filterList = new Set()
        const selectedLeftList = []
        const rigthTopList = []
        // 向上
        for (let x = 0; x < i; x++) {
            filterList.add(arr[x][j])
        }
        // 向左
        for (let y = 0; y < j; y++) {
            filterList.add(arr[i][y])
            selectedLeftList.push(arr[i][y])
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

        // 中间
        if (areaY === 3 && (i % 3 !== 0)) {
            for (let t = 6; t < 9; t++) {
                rigthTopList.push(arr[i - 1][t])
            }
            const surplusList = rigthTopList.filter(item => !selectedLeftList.includes(item))
            if (surplusList.length <= (6 - j)) {
                currentList = surplusList
            }
        }

        // 当前位置可选值
        const optionalList = (currentList.length > 0 ? currentList : defaultNum).filter(item => !filterList.has(item))

        if (i === 3 && j === 6) {
            temp = []
            for (let t = 0; t < 6; t++) {
                temp.push(arr[i][t])
            }
            optionalList36 = defaultNum.filter(item => !temp.includes(item))
            console.log(`optionalList36`, optionalList36)
        }
        // 后面
        let flag = true
        if (j === 6 && i === 3) {
            const func = (i, j, limt = 1) => {
                const temp = []
                let f = []
                for (let t = 0; t < i; t++) {
                    temp.push(arr[t][j])
                }
                f = optionalList36.filter(item => !temp.includes(item))
                console.log(`f`, f)
                if (f.length <= limt && !arr[i][j]) {
                    arr[i][j] = f[0]
                    optionalList36 = optionalList36.filter(item => item !== arr[i][j])
                    console.log(`optionalList36`, optionalList36)
                    flag = false
                    return true
                }
                return false
            }
            const res = func(i, j)
            if (res) {
                if (func(i, j + 2)) {
                    func(i, j + 1)
                } else {
                    func(i, j + 1, 2)
                    func(i, j + 2, 2)
                }

            }
            if (flag) {
                const res = func(i, j + 1)
                if (res) {
                    if (func(i, j + 2)) {
                        func(i, j)
                    } else {
                        func(i, j, 2)
                        func(i, j + 2, 2)
                    }
                }
                if (flag) {
                    const res = func(i, j + 2)
                    if (res) {
                        if (func(i, j + 1)) {
                            func(i, j)
                        } else {
                            func(i, j, 2)
                            func(i, j + 1, 2)
                        }
                    }
                }
            }
            func(i, j, 2)
            func(i, j + 1, 1)
            func(i, j + 2, 2)
            func(i, j + 1, 1)
            flag = false
            console.log([...arr])
        } else if (j >= 7 && i === 3) {
            flag = false
        }

        if (!arr[i][j] && flag) {
            arr[i][j] = optionalList.sort(() => Math.random() - 0.5)[0]
        }
        // if (!arr[i][j]) {
        //     console.log(`filterList`, filterList);
        //     console.log(`currentList`, currentList)
        //     console.log(arr)
        // }

    }
}
console.log(`____`, )
console.log(arr)