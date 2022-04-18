import { reactive } from "vue"

import words from '@/assets/five-letter-words.json'
import hints from '@/assets/hints.json'

import wordService from '@/services/wordService.js'
const ws = new wordService()

const launchDate = new Date(`03/29/2022`)

const gameStore = {
    load() {
        var date = this.state.date
        date.setHours(0,0,0,0) // to midnight
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((launchDate - date) / oneDay))
        this.state.answer = Object.keys(hints)[diffDays]
        this.state.hint = hints[this.state.answer]
        this.resetGrid()
        this.resetKeyboard()
    },
    state: reactive({
        dateLabel: `Today`,
        date: new Date(),
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
        allLetters: {
            top: [...'qwertyuiop'].map(ltr => ({ ltr,s:`` })),
            mid: [...'asdfghjkl'].map(ltr => ({ ltr,s:`` })),
            low: [...'zxcvbnm'].map(ltr => ({ ltr,s:`` }))
        },        
        invalidWordRowIdx: -1
    }),
    resetKeyboard() {
        Object.keys(this.state.allLetters).forEach(k => {
            this.state.allLetters[k].forEach(obj => {
                obj.s = ``
            })
        })
    },
    resetGrid() {
        this.state.grid.forEach(row => row.forEach(cell => {
            cell.ltr = ``
            cell.s = ``
        }))
        this.state.currentColIdx = 0
        this.state.currentRowIdx = 0
    },
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
            const res = ws.submit(word,this.state.answer) // success
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