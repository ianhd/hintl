import words from '@/assets/five-letter-words.json'
import hints from '@/assets/hints.json'

const launchDate = new Date(`03/29/2022`)

class WordService {
    constructor() {
        this.#setTodaysAnswerAndHint()
    }
    getHint() {
        return this.hint
    }
    submit(word) {
        // deeds = https://i.imgur.com/8szRrgQ.png

        if (!words.includes(word))
            throw { msg: 'Not a real word' }

        if (this.answer === word) // solved!
            return true

        this.#processWrongWord2(word)
    }
    #setTodaysAnswerAndHint() {
        var today = new Date()
        today.setHours(0,0,0,0) // to midnight
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((launchDate - today) / oneDay))
        this.answer = Object.keys(hints)[diffDays]
        this.hint = hints[this.answer]
    }
    #processWrongWord2(word) {                                      // word =    t,r,a,m,p
        let tempAns = this.answer
        let newRow = [null,null,null,null,null]
        // mark any as c (green)                 
        ;[...this.answer].forEach((ltr,idx) => {                    // forEach   w,a,t,e,r
            if (word[idx] == ltr) {                                 // tempAns = w,a,t,e,r
                newRow[idx] = {ltr, s: `c`}                         // newRow = [?,?,?,{'e^c'},{'r^c'}]
                tempAns = 
                    this.#markCharAsAccountedFor(tempAns, idx)      // tempAns = w,a,t,_,_ 
            }
        })
        // fill in remaining empty slots in newRow
        newRow.forEach((obj,idx) => {
            if (obj) return // this slot is filled
            const wordLtr = [...word][idx]      // r
            if (tempAns.includes(wordLtr)) {    // w,a,t,_,_ contains r?
                newRow[idx] = {ltr:wordLtr,s:'w'} // wrong position
                const correctIdx = tempAns.indexOf(wordLtr)
                tempAns = 
                    this.#markCharAsAccountedFor(tempAns, correctIdx)
            } else {
                newRow[idx] = {ltr:wordLtr,s:'n'}
            }
        })
        throw { newRow }
    }
    #markCharAsAccountedFor(str, idx) {
        str = str.split('')
        str[idx] = `_`
        str = str.join('')
        return str
    }
    foo() {
        console.log('foo')
    }
}

export default WordService