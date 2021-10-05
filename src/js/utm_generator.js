const templateSelect = document.querySelector('#template-select')
const urlInput = document.querySelector('#url-input')
const sourceInput = document.querySelector('#source-input')
const campaignInput = document.querySelector('#campaign-input')
const mediumInput = document.querySelector('#medium-input')
const contentInput = document.querySelector('#content-input')
const termInput = document.querySelector('#term-input')
const fastLinkInput = document.querySelector('#fast-link-input')
const output = document.querySelector('#output')
let inputs = document.querySelectorAll('input')

const generateUTM = (url, source, campaign, medium, content, term, fastLink) => {
    let utm = `http://`

    if (url) {
        utm += `${url}?`
    } else {
        utm += '[ВНИМАНИЕ, УКАЖИТЕ АДРЕС СТРАНИЦЫ]?'
    }

    if (source) utm += `utm_source=${source}`

    if (medium) utm += `&utm_medium=${medium}`

    if (campaign) utm += `&utm_campaign=${campaign}`

    if (content) utm += `&utm_content=${content}`

    if (term) utm += `&utm_term=${term}`

    if (fastLink) utm += `&flink=${fastLink}`

    return utm
}

const fillOutput = () => {
    output.value = generateUTM(urlInput.value, sourceInput.value, campaignInput.value, mediumInput.value,
        contentInput.value, termInput.value, fastLinkInput.value, )
}

document.addEventListener('DOMContentLoaded', () => {
    inputs.forEach(item => {
        item.addEventListener('keyup', fillOutput)
    })

    fillOutput()
})

templateSelect.addEventListener('change', () => {
    termInput.classList.remove('hidden')

    switch (templateSelect.value) {
        case 'default':
            sourceInput.value = ''
            mediumInput.value = ''
            campaignInput.value = ''
            contentInput.value = ''
            termInput.value = ''
            fastLinkInput.value = ''
            break

        case 'direct':
            sourceInput.value = 'yandex'
            mediumInput.value = 'cpc'
            campaignInput.value = '{campaign_id}'
            contentInput.value = '{ad_id}'
            termInput.value = '{keyword}'
            fastLinkInput.value = 'ck'
            break

        case 'awards':
            sourceInput.value = 'google'
            mediumInput.value = 'cpc'
            campaignInput.value = '{network}'
            contentInput.value = '{creative}'
            termInput.value = '{keyword}'
            fastLinkInput.value = 'ck'
            break

        case 'vk':
            sourceInput.value = 'vk'
            mediumInput.value = 'cpc'
            campaignInput.value = '{campaign_id}'
            contentInput.value = '{ad_id}'
            termInput.value = ''
            termInput.classList.add('hidden')
            fastLinkInput.value = 'ck'
            break

        case 'mail':
            sourceInput.value = 'targetmailru'
            mediumInput.value = 'cpc'
            campaignInput.value = '{{campaign_id}}'
            contentInput.value = '{{banner_id}}'
            termInput.value = '{{geo}}.{{gender}}.{{age}}'
            fastLinkInput.value = 'ck'
            break
    }

    fillOutput()
})
