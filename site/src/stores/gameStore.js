import { reactive } from "vue"
import wordSvc from '@/services/wordService.js'

const ws = new wordSvc()

const gameStore = {
    state: reactive({
        dateLabel: `Today`,
        answer: ``,
        hint: ``,
        currentRowIdx: 0,
        currentColIdx: 0,
        grid: [ // consider adding states with possible letters (n=nope,c=correct,w=wrong-position)
            [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
            [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
            [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
            [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
            [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
            [{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``},{ltr:``,s:``}],
        ],
        invalidWordRowIdx: -1
    }),
    constants: {
        numRows: 6,
        numCols: 5
    },    
    currentRowHasSpace() {
        return this.state.currentColIdx < this.constants.numCols
    },
    getKeyState(ltr) {
        if (!ltr) return ``
        const states = ['c','w','n']
        for(var i = 0; i < states.length; i++) {
            const s = states[i]
            const exists = this.state.grid.some(arr => arr.some(cell => cell.ltr == ltr && cell.s == s))
            if (exists) return s
        }
        return ``
    },
    backspace() {
        if (this.state.currentColIdx == 0) return // prevent backspace if row is empty
        this.state.currentColIdx -= 1
        let rowIdx = this.state.currentRowIdx
        this.state.grid[rowIdx][this.state.currentColIdx].ltr = ``
    },
    submitRow() {
        const letters = this.state.grid[this.state.currentRowIdx].map(x => x.ltr)
        const word = letters.join('')
        try {
            const res = ws.submit(word) // success
            this.state.grid[this.state.currentRowIdx].map(c => c.s = `c`)
            return `Success`
        } catch (err) {
            if (err.msg) {
                // invalid word
                this.state.invalidWordRowIdx = this.state.currentRowIdx
                setTimeout(() => this.state.invalidWordRowIdx = -1, 1500)
                return `That is not a word`
            }
            else if (err.newRow) {
                this.state.grid[this.state.currentRowIdx] = err.newRow
                this.state.currentRowIdx += 1
                this.state.currentColIdx = 0
                return `Next`
            }
        }
    },
    addLetter(ltr) {
        let rowIdx = this.state.currentRowIdx
        let colIdx = this.state.currentColIdx
        this.state.grid[rowIdx][colIdx].ltr = ltr
        this.state.currentColIdx += 1
    }
}

export default gameStore