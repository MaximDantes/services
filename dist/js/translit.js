const inputArea = document.querySelector('#input-area')
const outputArea = document.querySelector('#output-area')
const translitButton = document.querySelector('#translit-button')
const reverseTranslitButton = document.querySelector('#reverse-translit-button')
const clearButton = document.querySelector('#clear-button')
const lowerCaseRadio = document.querySelector('#lower-case')
const upperCaseRadio = document.querySelector('#upper-case')
const whitespaceInput = document.querySelector('#whitespace')

const translit = (text, isReverse) => {
    let oldText = text
    let newText = ''

    if (!isReverse) {
        oldText.split('').forEach(char => {
            let newChar = ''

            switch (char.toLowerCase()) {
                case 'а':
                    newChar = 'a'
                    break
                case 'б':
                    newChar = 'b'
                    break
                case 'в':
                    newChar = 'v'
                    break
                case 'г':
                    newChar = 'g'
                    break
                case 'д':
                    newChar = 'd'
                    break
                case 'е':
                    newChar = 'e'
                    break
                case 'ё':
                    newChar = 'yo'
                    break
                case 'ж':
                    newChar = 'zh'
                    break
                case 'з':
                    newChar = 'z'
                    break
                case 'и':
                    newChar = 'i'
                    break
                case 'й':
                    newChar = 'j'
                    break
                case 'к':
                    newChar = 'k'
                    break
                case 'л':
                    newChar = 'l'
                    break
                case 'м':
                    newChar = 'm'
                    break
                case 'н':
                    newChar = 'n'
                    break
                case 'о':
                    newChar = 'o'
                    break
                case 'п':
                    newChar = 'p'
                    break
                case 'р':
                    newChar = 'r'
                    break
                case 'с':
                    newChar = 's'
                    break
                case 'т':
                    newChar = 't'
                    break
                case 'у':
                    newChar = 'u'
                    break
                case 'ф':
                    newChar = 'f'
                    break
                case 'х':
                    newChar = 'x'
                    break
                case 'ц':
                    newChar = 'c'
                    break
                case 'ч':
                    newChar = 'ch'
                    break
                case 'ш':
                    newChar = 'sh'
                    break
                case 'щ':
                    newChar = 'shh'
                    break
                case 'ъ':
                    newChar = '"'
                    break
                case 'ы':
                    newChar = "y'"
                    break
                case 'ь':
                    newChar = "'"
                    break
                case 'э':
                    newChar = "e'"
                    break
                case 'ю':
                    newChar = 'yu'
                    break
                case 'я':
                    newChar = 'ya'
                    break
                default:
                    newChar = char
                    break
            }
            if (char.toUpperCase() === char) {
                newChar = newChar[0].toUpperCase() + newChar.substring(1)
            }
            newText += newChar
        })
    } else {
        while (oldText.length > 0) {
            let oldChar = oldText[0]
            let newChar = ''
            
            switch (oldChar.toLowerCase()) {
                case 'a':
                    newChar = 'а'
                    break
                case 'b':
                    newChar = 'б'
                    break
                case 'c':
                    try {
                        if (oldText[1] === 'h') {
                            newChar = 'ч'
                            oldText = oldText.substring(1)
                            break
                        }
                    } catch {}
                    newChar = 'ц'
                    break
                case 'd':
                    newChar = 'д'
                    break
                case 'e':
                    try {
                        if (oldText[1] === "'") {
                            newChar = 'э'
                            oldText = oldText.substring(1)
                            break
                        }
                    } catch {}
                    newChar = 'е'
                    break
                case 'f':
                    newChar = 'ф'
                    break
                case 'g':
                    newChar = 'г'
                    break
                case 'i':
                    newChar = 'и'
                    break
                case 'j':
                    newChar = 'й'
                    break
                case 'k':
                    newChar = 'к'
                    break
                case 'l':
                    newChar = 'л'
                    break
                case 'm':
                    newChar = 'м'
                    break
                case 'n':
                    newChar = 'н'
                    break
                case 'o':
                    newChar = 'о'
                    break
                case 'p':
                    newChar = 'п'
                    break
                case 'r':
                    newChar = 'р'
                    break
                case 's':
                    try {
                        if (oldText[1] === "h") {
                            try {
                                if (oldText[2] === "h") {

                                    newChar = 'щ'
                                    oldText = oldText.substring(2)
                                    break
                                }
                            } catch {}
                            newChar = 'ш'
                            oldText = oldText.substring(1)
                            break

                        }
                    } catch {}
                    newChar = 'с'
                    break
                case 't':
                    newChar = 'т'
                    break
                case 'u':
                    newChar = 'у'
                    break
                case 'v':
                    newChar = 'в'
                    break
                case 'x':
                    newChar = 'х'
                    break

                case 'y':
                    try {
                        switch (oldText[1]) {
                            case 'o':
                                newChar = 'ё'
                                break
                            case "'":
                                newChar = 'ы'
                                break
                            case 'u':
                                newChar = 'ю'
                                break
                            case 'a':
                                newChar = 'я'
                                break
                        }
                        oldText = oldText.substring(1)
                        break
                    } catch {}
                    break
                case 'z':
                    try {
                        if (oldText[1] === 'h') {
                            newChar = 'ж'
                            oldText = oldText.substring(1)
                            break
                        }
                    } catch {}
                    newChar = 'з'
                    break
                case "'":
                    newChar = 'ь'
                    break
                case '"':
                    newChar = 'ъ'
                    break
                default:
                    newChar = oldChar
                    break
            }
            oldText = oldText.substring(1)
            if ((oldChar.toUpperCase() === oldChar) && ((oldChar !== '"') && (oldChar !== "'"))) {
                newChar = newChar.toUpperCase()
            }
            newText += newChar
        }
    }
        
    return newText
}

const formatText = (text) => {
    let useCase = ''
    if (lowerCaseRadio.checked) useCase = 'lower'
    if (upperCaseRadio.checked) useCase = 'upper'

    let whitespace = whitespaceInput.value
    if (!whitespace) whitespace = ' '

    let newText = text.replaceAll(' ', whitespace)

    if (useCase === 'lower') newText = newText.toLowerCase()
    if (useCase === 'upper') newText = newText.toUpperCase()

    return newText
}

translitButton.addEventListener('click', () => {
    outputArea.value = formatText(translit(inputArea.value, false))
})

reverseTranslitButton.addEventListener('click', () => {
    outputArea.value = formatText(translit(inputArea.value, true))
})

clearButton.addEventListener('click', () => {
    outputArea.value = ''
    inputArea.value = ''
})
