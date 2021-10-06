import { getText, getParagraph, getSentence } from './speech-code'

const output = document.querySelector('#output')
const getTextButton = document.querySelector('#get-text-button')
const languageSelect = document.querySelector('#language-select')
const paragraphCountInput = document.querySelector('#paragraph-count-input')
const minSymbolsCountInput = document.querySelector('#min-symbols-count-input')
const maxSymbolsCountInput = document.querySelector('#max-symbols-count-input')
const beforeSymbolInput = document.querySelector('#before-symbol-input')
const afterSymbolInput = document.querySelector('#after-symbol-input')
const lowercaseRadio = document.querySelector('#lowercase-radio')
const uppercaseRadio = document.querySelector('#uppercase-radio')



const createText = async (language, paragraphCount, minSymbolsCount,
                       maxSymbolsCount, beforeSymbol, afterSymbol, useCase) => {
    // try {
    //     const formData = new FormData()
    //     formData.append("language", language)
    //     formData.append("paragraphCount", paragraphCount)
    //     formData.append("minSymbolsCount", minSymbolsCount)
    //     formData.append("maxSymbolsCount", maxSymbolsCount)
    //     formData.append("beforeSymbol", beforeSymbol)
    //     formData.append("afterSymbol", afterSymbol)
    //     formData.append("useCase", useCase)
    //
    //     const response = await fetch(`${themePath.templateUrl}/ajax/text-generate.php`, {
    //         body: formData,
    //         method: 'post'
    //     })
    //
    //     if (response == 'error') throw 'Some error'
    //
    // } catch (e) {
    //     console.error(e)
    //     return 'Что-то пошло не так'
    // }
    return getParagraph(5)
}

getTextButton.addEventListener('click', async () => {
    let useCase = 'default'
    if (lowercaseRadio.checked) useCase = 'lower'
    if (uppercaseRadio.checked) useCase = 'upper'

    output.value = await createText(languageSelect.value, +paragraphCountInput.value, +minSymbolsCountInput.value,
        +maxSymbolsCountInput.value, beforeSymbolInput.value, afterSymbolInput.value, useCase)
})

