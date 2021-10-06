const createOutput = (index, word, variants) => {

    return `<p>
            <span>${index}.</span>
            <span class="error">${word}</span>
            <span>:</span>
            <span>${variants}</span>
        </p>`
}

const spellingCheck = async (text, url) => {
    try {
        if (!text) throw 'Not found'

        let response = await fetch(url + text, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        response = await response.json()

        if (response == 'error') {
            throw 'Not found'
        }

        let result = ''
        response.map((item, index) => {
            result += createOutput(index + 1, item[0], item[1])
        })

        return result
    } catch {
        return new Promise((resolve) => {
            resolve(`<p class="error">Что-то пошло не так</p>`)
        })
    }
}

export default spellingCheck