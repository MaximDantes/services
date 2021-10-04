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
const ownSymbolsCheckbox = document.querySelector('#own-symbols-checkbox')
const ownSymbolsInput = document.querySelector('#own-symbols-input')
const passwordSymbolsInput = document.querySelector('#password-symbols-input')
const passwordsOutput = document.querySelector('#passwords-output')
const passwordsListOutput = document.querySelector('#passwords-list-output')

const generatePassword = (symbols, length) => {
    let password = ''

    for (let i = 0; i < length; i++) {
        password += symbols[Math.floor(Math.random() * (symbols.length - 1))]
    }

    return password
}

const setSettings = () => {
    numberCheckbox.checked = false
    lowercaseCheckbox.checked = false
    uppercaseCheckbox.checked = false
    digitsCheckbox.checked = false
    specialSymbolsCheckbox.checked = false
    russianSymbolsCheckbox.checked = false
    ownSymbolsCheckbox.checked = false
    numberCheckbox.dispatchEvent(new Event('change'))
    lowercaseCheckbox.dispatchEvent(new Event('change'))
    uppercaseCheckbox.dispatchEvent(new Event('change'))
    digitsCheckbox.dispatchEvent(new Event('change'))
    specialSymbolsCheckbox.dispatchEvent(new Event('change'))
    russianSymbolsCheckbox.dispatchEvent(new Event('change'))
    ownSymbolsCheckbox.dispatchEvent(new Event('change'))

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

    numberCheckbox.dispatchEvent(new Event('change'))
    lowercaseCheckbox.dispatchEvent(new Event('change'))
    uppercaseCheckbox.dispatchEvent(new Event('change'))
    digitsCheckbox.dispatchEvent(new Event('change'))
    specialSymbolsCheckbox.dispatchEvent(new Event('change'))
    russianSymbolsCheckbox.dispatchEvent(new Event('change'))
    ownSymbolsCheckbox.dispatchEvent(new Event('change'))
}

const showPassword = (password) => {
    const pass = document.createElement('div')
    pass.classList.add('password')
    pass.innerHTML = `<span>1.</span> <span>${password}</span>`

    passwordsOutput.appendChild(pass)

    passwordsListOutput.value += `${password}\n`
}

russianSymbolsCheckbox.addEventListener('change', e => {
    debugger
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[А-ЯЁ, а-яё]/g, '')

    if (e.currentTarget.checked) {
        if (lowercaseCheckbox.checked) {
            passwordSymbolsInput.value += 'ёйцукенгшщзхъфывапролджэячсмитьбю'
        }

        if (lowercaseCheckbox.checked) {
            passwordSymbolsInput.value += 'ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ'
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
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[a-z, а-яё]/g, '')

    if (e.currentTarget.checked) {
        passwordSymbolsInput.value += 'zyxwvutsrqponmlkjihgfedcba'

        if (russianSymbolsCheckbox.checked) {
            passwordSymbolsInput.value += 'ёйцукенгшщзхъфывапролджэячсмитьбю'
        }
    }
})

uppercaseCheckbox.addEventListener('change', e => {
    passwordSymbolsInput.value = passwordSymbolsInput.value.replaceAll(/[A-Z, А-ЯЁ]/g, '')
debugger
    if (e.currentTarget.checked) {
        passwordSymbolsInput.value += 'ZYXWVUTSRQPONMLKJIHGFEDCBA'

        if (russianSymbolsCheckbox.checked) {
            passwordSymbolsInput.value += 'ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ'
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
    for (let i = 0; i < +countInput.value; i++) {
        showPassword(generatePassword([...passwordSymbolsInput.value], +lengthInput.value))
    }
})