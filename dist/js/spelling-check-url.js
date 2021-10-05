const checkButton = document.querySelector('#check-button')
const input = document.querySelector('#input')
const output = document.querySelector('#output')

const createOutput = (index, word, variants) => {

    return `<p>
            <span>${index}.</span>
            <span class="error">${word}</span>
            <span>:</span>
            <span>${variants}</span>
        </p>`
}

checkButton.addEventListener('click', async () => {
    if (!input.value) return

    try {
        checkButton.disabled = true

        let response = await fetch('check.php?siteLink=' + input.value, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        response = await response.json()

        if (response == 'error') {
            throw 'Not found'
        }

        output.innerHTML = ''
        response.map((item, index) => {
            output.innerHTML += createOutput(index + 1, item[0], item[1])
        })

        checkButton.disabled = false
    } catch {
        output.innerHTML = `<p class="error">Что-то пошло не так</p>`
        checkButton.disabled = false
    }
})