const inputArea = document.querySelector('#input-area')
const outputArea = document.querySelector('#output-area')
const quotesInButton = document.querySelector('#quotes-in-button')
const quotesOutButton = document.querySelector('#quotes-out-button')
const clearButton = document.querySelector('#clear-button')
const quoteCharInput = document.querySelector('#quote-char-input')
const charBeforeWordInput = document.querySelector('#char-before-word-input')
const charAfterWordInput = document.querySelector('#char-after-word-input')
const charSeparatorInput = document.querySelector('#char-separator-input')
const removeCharInput = document.querySelector('#remove-char-input')
const largeFirstCharInput = document.querySelector('#large-first-char-input')
const minusWordsInput = document.querySelector('#minus-words-input')
const inputCount = document.querySelector('#input-area-count')
const outputCount = document.querySelector('#output-area-count')

const getQuotesSettings = () => {
    const quoteChar = quoteCharInput.value
    const beforeChar = charBeforeWordInput.value
    const afterChar = charAfterWordInput.value

    let separatorChar = charSeparatorInput.value
    separatorChar = (!separatorChar) ? ' ' : separatorChar

    const removeInputValue = removeCharInput.value
    const removeChars = removeInputValue.split(' ')

    const isFirstCharIsLarge = largeFirstCharInput.checked

    const isMinusWords = minusWordsInput.checked

    return [quoteChar, beforeChar, afterChar, separatorChar, removeChars, isFirstCharIsLarge, isMinusWords]
}

const saveSettings = () => {
    const settings = JSON.stringify([inputArea.value, ...getQuotesSettings()])

    localStorage.setItem('quotesSettings', settings)
}

const fillSettingsInputs = () => {
    const settings = JSON.parse(localStorage.getItem('quotesSettings'))

    inputArea.value = settings[0]
    quoteCharInput.value = settings[1]
    charBeforeWordInput.value = settings[2]
    charAfterWordInput.value = settings[3]

    if (settings[4] !== ' ') charSeparatorInput.value = settings[4]

    removeCharInput.value = settings[5].reduce((prev, curr) => prev + ' ' + curr)

    largeFirstCharInput.checked = settings[6]
    minusWordsInput.checked = settings[7]
}

const calcCharsCount = () => {
    inputCount.innerText = `Всего символов: ${inputArea.value.length}`
    outputCount.innerText = `Всего символов: ${outputArea.value.length}`
}

const formatText = (text, quoteChar, beforeChar, afterChar, separatorChar, removeChars, isFirstCharIsLarge, isMinusWords) => {
    let newText = text.trim()

    // remove minus words
    if (isMinusWords) {
        const index = newText.indexOf('-')

        if (index !== -1) newText = newText.slice(0, index)
    }

    // delete remove chars
    removeChars.map(char => {
        if (char !== ' ') newText = newText.replaceAll(char, '')
    })

    // first large char
    if (isFirstCharIsLarge) {
        newText = newText.charAt(0).toUpperCase() + newText.slice(1)
    }

    newText = newText.replace(/\s{2,}/g, ' ')

    // add after and before chars
    newText = beforeChar + newText.replaceAll(separatorChar, afterChar + separatorChar + beforeChar) + afterChar

    return newText
}

const quotesIn = (text, quoteChar, beforeChar, afterChar, separatorChar, removeChars, isFirstCharIsLarge, isMinusWords) => {
    let newText = formatText(text, quoteChar, beforeChar, afterChar,
        separatorChar, removeChars, isFirstCharIsLarge, isMinusWords)

    newText = `${quoteChar}${newText.trim()}${quoteChar}`

    return newText
}

const quotesOut = (text, quoteChar, beforeChar, afterChar, separatorChar, removeChars, isFirstCharIsLarge, isMinusWords) => {
    let newText = text.replaceAll(quoteChar, '')

    newText = formatText(newText, quoteChar, beforeChar, afterChar,
        separatorChar, removeChars, isFirstCharIsLarge, isMinusWords)

    return newText
}


quotesInButton.addEventListener('click', () => {
    outputArea.value = quotesIn(inputArea.value, ...getQuotesSettings())

    saveSettings()
    calcCharsCount()
})

quotesOutButton.addEventListener('click', () => {
    outputArea.value = quotesOut(inputArea.value, ...getQuotesSettings())

    saveSettings()
    calcCharsCount()
})

clearButton.addEventListener('click', () => {
    outputArea.value = ''
    inputArea.value = ''

    saveSettings()
    calcCharsCount()
})

document.addEventListener('DOMContentLoaded', fillSettingsInputs)

inputArea.addEventListener('input', calcCharsCount)
outputArea.addEventListener('input', calcCharsCount)
document.addEventListener('DOMContentLoaded', calcCharsCount)