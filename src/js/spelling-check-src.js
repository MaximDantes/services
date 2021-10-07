const createOutput = (index, word, variants) => {
    let editedVariants = variants

    if (Array.isArray(variants)) {
        editedVariants = variants.join(', ')
    }

    return `<p>
            <span>${index}.</span>
            <span class="error">${word}</span>
            <span>:</span>
            <span>${editedVariants}</span>
        </p>`
}

export const spellingCheckUrl = async (text, url) => {
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
        return `<p class="error">Что-то пошло не так</p>`
    }
}

export const spellingCheck = async (text) => {
    if (!text) return ''

    try {
        let response = await fetch('https://speller.yandex.net/services/spellservice.json/checkTexts', {
            method: 'post',
            body: 'text=' + text,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;'
            }
        })
        response = await response.json()

        if (response[0].length < 1) {
            return `<p>Ошибок не найдено</p>`
        }

        let result = ''

        response[0].map((item, index) => {
            result += createOutput(index + 1, item.word, item.s)
        })

        return result

    } catch (e) {
        console.error(e)
        return `<p class="error">Что-то пошло не так</p>`
    }
}