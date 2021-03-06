const generateButton = document.querySelector('#generate-button')
const clearButton = document.querySelector('#clear-button')
const strengthSelect = document.querySelector('#password-strength-select')
const lengthInput = document.querySelector('#password-length-input')
const countInput = document.querySelector('#passwords-count-input')
const numberCheckbox = document.querySelector('#number-checkbox')
const lowercaseCheckbox = document.querySelector('#lowercase-checkbox')
const uppercaseCheckbox = document.querySelector('#uppercase-checkbox')
const digitsCheckbox = document.querySelector('#digits-checkbox')
const specialSymbolsCheckbox = document.querySelector('#special-symbols-checkbox')
const russianSymbolsCheckbox = document.querySelector('#russian-symbols-checkbox')
const passwordSymbolsInput = document.querySelector('#password-symbols-input')
const passwordsOutput = document.querySelector('#passwords-output')
const passwordsListOutput = document.querySelector('#passwords-list-output')
const output = document.querySelector('#output')
const outputReplace = document.querySelector('#output-replace')

const generatePassword = (symbols, length) => {
    let password = ''

    for (let i = 0; i < length; i++) {
        password += symbols[Math.floor(Math.random() * (symbols.length - 1))]
    }

    return password
}

const setSettings = () => {
    lowercaseCheckbox.checked = false
    uppercaseCheckbox.checked = false
    digitsCheckbox.checked = false
    specialSymbolsCheckbox.checked = false
    russianSymbolsCheckbox.checked = false
    lowercaseCheckbox.dispatchEvent(new Event('change'))
    uppercaseCheckbox.dispatchEvent(new Event('change'))
    digitsCheckbox.dispatchEvent(new Event('change'))
    specialSymbolsCheckbox.dispatchEvent(new Event('change'))
    russianSymbolsCheckbox.dispatchEvent(new Event('change'))

    switch (+strengthSelect.value) {
        case 0:
            lowercaseCheckbox.checked = true
            lengthInput.value = '4'
            break

        case 1:
            lowercaseCheckbox.checked = true
            digitsCheckbox.checked = true
            lengthInput.value = '6'
            break

        case 2:
            lowercaseCheckbox.checked = true
            uppercaseCheckbox.checked = true
            digitsCheckbox.checked = true
            lengthInput.value = '6'
            break

        case 3:
            lowercaseCheckbox.checked = true
            uppercaseCheckbox.checked = true
            digitsCheckbox.checked = true
            lengthInput.value = '10'
            break

        case 4:
            lowercaseCheckbox.checked = true
            uppercaseCheckbox.checked = true
            digitsCheckbox.checked = true
            specialSymbolsCheckbox.checked = true
            lengthInput.value = '15'
            break

        case 5:
            lowercaseCheckbox.checked = true
            uppercaseCheckbox.checked = true
            digitsCheckbox.checked = true
            specialSymbolsCheckbox.checked = true
            lengthInput.value = '40'
            break

        case 6:
            lowercaseCheckbox.checked = true
            uppercaseCheckbox.checked = true
            digitsCheckbox.checked = true
            specialSymbolsCheckbox.checked = true
            russianSymbolsCheckbox.checked = true
            lengthInput.value = '40'
            break

        case 7:
            digitsCheckbox.checked = true
            lengthInput.value = '15'
            break
    }

    lowercaseCheckbox.dispatchEvent(new Event('change'))
    uppercaseCheckbox.dispatchEvent(new Event('change'))
    digitsCheckbox.dispatchEvent(new Event('change'))
    specialSymbolsCheckbox.dispatchEvent(new Event('change'))
    russianSymbolsCheckbox.dispatchEvent(new Event('change'))
}

const showPassword = (password, index) => {
    const pass = document.createElement('div')
    pass.classList.add('password')
    pass.innerHTML = `${numberCheckbox.checked ? `${index}. ` : ''}${password}`

    passwordsOutput.appendChild(pass)

    passwordsListOutput.value += `${password}\n`
}

russianSymbolsCheckbox.addEventListener('change', e => {
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[??-????, ??-????]/g, '')

    if (e.currentTarget.checked) {
        if (lowercaseCheckbox.checked) {
            passwordSymbolsInput.value += '??????????????????????????????????????????????????????????????????'
        }

        if (lowercaseCheckbox.checked) {
            passwordSymbolsInput.value += '??????????????????????????????????????????????????????????????????'
        }
    }
})

specialSymbolsCheckbox.addEventListener('change', e => {
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[!@`~#$%^&*()+=\-_|\\<>?/,.\[\]{};:'"]/g, '')

    if (e.currentTarget.checked) {
        passwordSymbolsInput.value += '`~!@#$%^&*()-_=+,./\\<>?{}[];:\'"'
    }
})

lowercaseCheckbox.addEventListener('change', e => {
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[a-z, ??-????]/g, '')

    if (e.currentTarget.checked) {
        passwordSymbolsInput.value += 'zyxwvutsrqponmlkjihgfedcba'

        if (russianSymbolsCheckbox.checked) {
            passwordSymbolsInput.value += '??????????????????????????????????????????????????????????????????'
        }
    }
})

uppercaseCheckbox.addEventListener('change', e => {
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[A-Z, ??-????]/g, '')
    if (e.currentTarget.checked) {
        passwordSymbolsInput.value += 'ZYXWVUTSRQPONMLKJIHGFEDCBA'

        if (russianSymbolsCheckbox.checked) {
            passwordSymbolsInput.value += '??????????????????????????????????????????????????????????????????'
        }
    }
})

digitsCheckbox.addEventListener('change', e => {
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/\d/g, '')

    if (e.currentTarget.checked) {
        passwordSymbolsInput.value += '0123456789'
    }
})

strengthSelect.addEventListener('change', setSettings)

document.addEventListener('DOMContentLoaded', setSettings)

generateButton.addEventListener('click', () => {
    passwordsOutput.innerHTML = ''
    passwordsListOutput.value = ''

    let length = +lengthInput.value
    if (length < 1) length = 1

    let count = +countInput.value
    if (count < 1) count = 10

    for (let i = 0; i < count; i++) {
        showPassword(generatePassword([...passwordSymbolsInput.value], length), i + 1)
    }
    output.classList.remove('hidden')
    outputReplace.classList.add('hidden')
})

clearButton.addEventListener('click', () => {
    passwordsOutput.innerHTML = ''
    passwordsListOutput.value = ''
    output.classList.add('hidden')
    outputReplace.classList.remove('hidden')
})