import punycode from './punycode-converter.js'

const codeButton = document.querySelector('#code-button')
const input = document.querySelector('#input')
const output = document.querySelector('#output')

const encode = (text) => {
    let result = punycode.toASCII(text)

    if (result === text) result = punycode.toUnicode(text)

    return  result
}

codeButton.addEventListener('click', () => {
    const values = input.value.split('\n')

    values.map(item => {
        if (item) output.value += `${encode(item)}\n`
    })
})