const combineButton = document.querySelector('#combine-button')
const outputTextarea = document.querySelector('#output-textarea')
const combinesCount = document.querySelector('#combines-count')
const moveLeftButtons = document.querySelectorAll('.move-left-button')
const moveRightButtons = document.querySelectorAll('.move-right-button')
const removeButtons = document.querySelectorAll('.remove-button')
const addListButtons = document.querySelectorAll('.add-list-button')
const lists = document.querySelectorAll('.list')

const createList = () => {
    const list = document.createElement('div')
    list.classList.add('list')
    list.innerHTML = '<div class="list-title">\n' +
        '                    <div>\n' +
        '                        <span>Фразы:</span>\n' +
        '                    </div>\n' +
        '                    <div>\n' +
        '                        <input type="checkbox" title="Использовать в генерации" class="use-checkbox" checked>\n' +
        '                        <button title="Переместить левее" class="move-left-button"><</button>\n' +
        '                        <button title="Переместить правее" class="move-right-button">></button>\n' +
        '                        <button title="Удалить список" class="remove-button">-</button>\n' +
        '                        <button title="Добавить список" class="add-list-button">+</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div>\n' +
        '                    <textarea></textarea>\n' +
        '                </div>'


    const left = list.children[0].children[1].children[1]
    const right = list.children[0].children[1].children[2]
    const remove = list.children[0].children[1].children[3]
    const addList = list.children[0].children[1].children[4]

    left.addEventListener('click', moveLeft)
    right.addEventListener('click', moveRight)
    remove.addEventListener('click', removeList)
    addList.addEventListener('click', addNextList)

    return list
}

const createListCopy = (list) => {
    const newList = createList()

    newList.children[1].children[0].value = list.children[1].children[0].value
    newList.children[0].children[1].children[0].checked = list.children[0].children[1].children[0].checked

    return newList
}


const moveLeft = (e) => {
    const list = e.currentTarget.parentElement.parentElement.parentElement
    const lists = e.currentTarget.parentElement.parentElement.parentElement.parentElement
    const sibling = list.previousElementSibling
    const listCopy = createListCopy(list)

    list.remove()

    lists.insertBefore(listCopy, sibling)
}

const moveRight = (e) => {
    const list = e.currentTarget.parentElement.parentElement.parentElement
    const lists = e.currentTarget.parentElement.parentElement.parentElement.parentElement
    const sibling = list.nextElementSibling?.nextElementSibling
    const listCopy = createListCopy(list)

    list.remove()

    sibling ? lists.insertBefore(listCopy, sibling) : lists.insertBefore(listCopy, lists.firstElementChild)
}

const removeList = (e) => {
    e.currentTarget.parentElement.parentElement.parentElement.remove()
}

const addNextList = (e) => {
    const list = e.currentTarget.parentElement.parentElement.parentElement
    const lists = e.currentTarget.parentElement.parentElement.parentElement.parentElement

    lists.insertBefore(createList(), list.nextSibling)
}


moveLeftButtons.forEach(item => {
    item.addEventListener('click', moveLeft)
})

moveRightButtons.forEach(item => {
    item.addEventListener('click', moveRight)
})

removeButtons.forEach(item => {
    item.addEventListener('click', removeList)
})

addListButtons.forEach((item, index) => {
    item.addEventListener('click', addNextList)
})

combineButton.addEventListener('click', () => {
    const phrases = []

    lists.forEach(item => {
        if (item.children[0].children[1].children[0].checked)
            phrases.push(item.children[1].children[0].value.split('\n'))
    })

    const result = []

    let resultCount = 1

    phrases.map(item => {
        resultCount *= item.length
    })

    for (let i = 0; i < phrases.length - 1; i++) {
        let count = 1

        for (let j = 0; j <= i; j++) {
            count *= phrases[j].length
        }

        resultCount += count
    }

    console.log(resultCount)

    while (result.length < resultCount) {
        //TODO without random

        let phrase = ''

        phrases.map(item => {
            const index = Math.floor(Math.random() * (item.length + 1))

            if (index === item.length) return

            phrase += ` ${item[index]}`
        })

        if (!result.includes(phrase)) {
            result.push(phrase)
        }
    }

    outputTextarea.value = ''
    result.map(item => {
        outputTextarea.value += `${item}\n`
    })

    combinesCount.innerText = `Всего возможных комбинаций: ${result.length}`
})