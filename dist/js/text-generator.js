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
const strictCheckbox = document.querySelector('#strict-checkbox')

const randomValueFrom = (array) => array[~~(array.length * Math.random())]

const createRuSentence = () => {
    const sentenceParts = {
        'first': [
            'С другой стороны',
            'Равным образом',
            'Не следует, однако, забывать, что',
            'Таким образом',
            'Повседневная практика показывает, что',
            'Значимость этих проблем настолько очевидна, что',
            'Разнообразный и богатый опыт',
            'Задача организации, в особенности же',
            'Идейные соображения высшего порядка, а также',
            'Не вызывает сомнений, что',
            'Для современного мира',
            'Прежде всего',
            'Следует отметить, что'
        ],
        'second': [
            'реализация намеченных плановых заданий',
            'рамки и место обучения кадров',
            'постоянный количественный рост и сфера нашей активности',
            'сложившаяся структура организации',
            'новая модель организационной деятельности',
            'дальнейшее развитие различных форм деятельности',
            'постоянное информационно-пропогандистское обеспечение нашей деятельности',
            'управление и развитие структуры',
            'консультация с широким активом',
            'начало повседневной работы по формированию позиции',
            'социально-экономическое развитие',
            'выбранный нами инновационный путь',
            'повышение уровня гражданского сознания',
            'высокотехнологичная концепция общественной системы',
            'курс на социально-ориентированный национальный проект',
            'понимание сущности ресурсосберегающих технологий'
        ],
        'third': [
            'играет важную роль в формировании',
            'требует от нас анализа',
            'требует определения и уточнения',
            'способствует подготовке и реализации',
            'обеспечивает широкому кругу специалистов',
            'позволяет выполнять важные задания по разработке',
            'в значительной степени обуславливает создание',
            'позволяет оценить значение представляет собой интересный эксперимент',
            'проверки влечёт за собой интересный процесс внедрения модернизации',
            'способствует повышению качества',
            'обеспечивает актуальность',
            'требует анализа',
            'напрямую зависит от',
            'создаёт предпосылки качественно новых шагов для',
            'играет важную роль в формировании'
        ],
        'fourth': [
            'существующий финансовых и административных условий.',
            'дальнейших направлений развития.',
            'системы массового участия.',
            'позиции, занимаемых участниками в отношении поставленных задач.',
            'новых предложений.',
            'направлений прогрессивного развития.',
            'системы обучения кадров, соответствующей насущным потребностям.',
            'соответствующих условий активизации.',
            'модели развития.',
            'форм воздействия.',
            'поставленных обществом и правительством задач.',
            'укрепления демократической системы.',
            'новых принципов формирования материально-технической и кадровой базы.',
            'прогресса профессионального общества.',
            'поэтапного и последовательного развития общества.',
            'экономической целесообразности принимаемых изменений.'
        ]
    }

    const result = [
        randomValueFrom(sentenceParts.first),
        randomValueFrom(sentenceParts.second),
        randomValueFrom(sentenceParts.third),
        randomValueFrom(sentenceParts.fourth),
    ]

    if (result[0].endsWith('!') || result[0].endsWith('.')) {
        result[1] = result[1].replace(/^./, result[1].slice(0, 1).toUpperCase())
    }

    return result.join(' ')
}

const createEngSentence = () => {
    const words = [
        'ad',
        'adipisicing',
        'aliqua',
        'aliquip',
        'amet',
        'anim',
        'aute',
        'cillum',
        'commodo',
        'consectetur',
        'consequat',
        'culpa',
        'cupidatat',
        'deserunt',
        'do',
        'dolor',
        'dolore',
        'duis',
        'ea',
        'eiusmod',
        'elit',
        'enim',
        'esse',
        'est',
        'et',
        'eu',
        'ex',
        'excepteur',
        'exercitation',
        'fugiat',
        'id',
        'in',
        'incididunt',
        'ipsum',
        'irure',
        'labore',
        'laboris',
        'laborum',
        'Lorem',
        'magna',
        'minim',
        'mollit',
        'nisi',
        'non',
        'nostrud',
        'nulla',
        'occaecat',
        'officia',
        'pariatur',
        'proident',
        'qui',
        'quis',
        'reprehenderit',
        'sint',
        'sit',
        'sunt',
        'tempor',
        'ullamco',
        'ut',
        'velit',
        'veniam',
        'voluptate',
    ]

    let sentence = ''

    const length = Math.floor(Math.random() * 5 + 10)

    for (let i = 0; i < length; i++) {
        let word = randomValueFrom(words)

        if (i === 0) {
            word = word.slice(0, 1).toUpperCase() + word.slice(1)
        } else {
            word = ' ' + word
        }

        sentence += word
    }

    sentence += '.'

    return sentence
}

const createParagraph = (language, min, max, strict) => {
    let createSentence

    if (language === 'ru') createSentence = createRuSentence
    if (language === 'eng') createSentence = createEngSentence

    if (!strict && max <= 100) max = 300
    if (strict && max < 1) max = 1

    if (min > max || min < 1) min = 1

    let paragraph = ''

    if (strict) {
        while (paragraph.length < min) {
            paragraph += createSentence() + ' '
        }

        return paragraph.slice(0, max)
    }

    while (!(paragraph.length >= min && paragraph.length <= max)) {
        if (paragraph.length > max) paragraph = ''

        paragraph += createSentence() + ' '
    }

    return paragraph.trim()
}

const createText = (language, paragraphCount, minSymbolsCount,
                    maxSymbolsCount, beforeSymbol, afterSymbol, useCase, strict) => {
    let text = ''

    for (let i = 0; i < paragraphCount; i++) {
        let paragraph = createParagraph(language, minSymbolsCount, maxSymbolsCount, strict)

        if (useCase === 'lower') paragraph = paragraph.toLowerCase()
        if (useCase === 'upper') paragraph = paragraph.toUpperCase()

        text = text + beforeSymbol + paragraph + afterSymbol + '\n'
    }

    return text
}

getTextButton.addEventListener('click', async () => {
    let useCase = 'default'
    if (lowercaseRadio.checked) useCase = 'lower'
    if (uppercaseRadio.checked) useCase = 'upper'

    output.value = createText(languageSelect.value, +paragraphCountInput.value, +minSymbolsCountInput.value,
        +maxSymbolsCountInput.value, beforeSymbolInput.value, afterSymbolInput.value, useCase, strictCheckbox.checked)
})