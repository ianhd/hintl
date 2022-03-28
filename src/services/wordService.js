import words from '@/assets/five-letter-words.json'

class WordService {
    constructor() {
        this.answer = `water`
    }
    submit(word) {
        // deeds = https://i.imgur.com/8szRrgQ.png

        if (!words.includes(word))
            throw { msg: 'Not a real word' }

        if (this.answer === word) // solved!
            return true

        let temp = this.answer
        let newRow = [];
        ;[...word].forEach((ltr, idx) => { // deeds 
            if (!temp.includes(ltr)) { // n=nope
                newRow.push({ ltr, s: `n` })
                return // next letter
            }
            if (ltr == temp[idx]) { // c=correct position
                newRow.push({ ltr, s: `c` })
                temp = this.#markCharAsAccountedFor(temp, idx)
                return // next letter
            }
            const existingIdx = temp.indexOf(ltr)
            temp = this.#markCharAsAccountedFor(temp, existingIdx)
            newRow.push({ltr, s: `w`})
        })

        throw { newRow: newRow }
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