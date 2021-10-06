import spellingCheckSrc from './spelling-check-src.js'

const checkButton = document.querySelector('#check-button')
const input = document.querySelector('#input')
const output = document.querySelector('#output')

checkButton.addEventListener('click', async () => {
    checkButton.disabled = true
    output.innerHTML = await spellingCheckSrc(input.value, `${themePath.templateUrl}/ajax/spelling-check.php?siteLink=`)
    checkButton.disabled = false
})