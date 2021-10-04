const inputArea = document.querySelector('#input-area')
const outputArea = document.querySelector('#output-area')
const translitButton = document.querySelector('#translit-button')
const reverseTranslitButton = document.querySelector('#reverse-translit-button')
const lowerCaseCheckbox = document.querySelector('#lower-case')
const upperCaseCheckbox = document.querySelector('#upper-case')
const whitespaceInput = document.querySelector('#whitespace')

//TODO normal reverse translit

const translit = (text, isReverse) => {
    let russianAlph = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р',
        'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']

    let translitEnglishAlphWithoutUpper = ['a', 'b', 'v', 'g', 'd', 'e', 'yo', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't',
        'u', 'f', 'h', 'c', 'ch', 'sh', 'shh', '', 'y', '', 'e', 'yu', 'ya']

    let translitEnglishAlph = [...translitEnglishAlphWithoutUpper]

    let englishAlph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    let translitRussianAlphWithoutUpper = ['а', 'б', 'ц', 'д', 'е', 'ф', 'г', 'х', 'и', 'д', 'к',
        'л', 'м', 'н', 'о', 'п', 'к', 'р', 'с', 'т', 'у', 'в', 'в', 'кс', 'й', 'з']

    let translitRussianAlph = [...translitRussianAlphWithoutUpper]

    russianAlph = [...russianAlph, ...russianAlph.toString().replaceAll(',', '').toUpperCase()]

    translitEnglishAlphWithoutUpper.map(item => {
        translitEnglishAlph.push(item.toUpperCase())
    })

    englishAlph = [...englishAlph, ...englishAlph.toString().replaceAll(',', '').toUpperCase()]

    translitRussianAlphWithoutUpper.map(item => {
        translitRussianAlph.push(item.toUpperCase())
    })

    let result = '';

    let alph = russianAlph
    let translitAlph = translitEnglishAlph

    if (isReverse) {
        alph = englishAlph
        translitAlph = translitRussianAlph
    }

    [...text].forEach(item => {
        if (alph.indexOf(item) >= 0) {
            result += translitAlph[alph.indexOf(item)]
        } else {
            result += item
        }
    })

    if (lowerCaseCheckbox.checked) result = result.toLowerCase()

    if (upperCaseCheckbox.checked) result = result.toUpperCase()

    result = result.replaceAll(' ', whitespaceInput.value)

    return  result
}

translitButton.addEventListener('click', () => {
    outputArea.value = translit(inputArea.value, false)
})

reverseTranslitButton.addEventListener('click', () => {
    outputArea.value = translit(inputArea.value, true)
})