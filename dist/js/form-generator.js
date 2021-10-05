const addFieldButton = document.querySelector('#add-field-button')
const fieldsList = document.querySelector('#fields')
const labelInput = document.querySelector('#label-input')
const nameInput = document.querySelector('#name-input')
const typeSelect = document.querySelector('#type-select')
const valueInput = document.querySelector('#value-input')
const requiredCheckbox = document.querySelector('#required-checkbox')
const selectOptions = document.querySelector('#select-options')
const selectOptionsInput = document.querySelector('#select-options-input')
const options = document.querySelector('#options')
const addOptionButton = document.querySelector('#add-option-button')
const clearOptionsButton = document.querySelector('#clear-options')
const valueBlock = document.querySelector('#value-block')
const checkboxCheckedInput = document.querySelector('#checkbox-checked-input')
const checkboxOptions = document.querySelector('#checkbox-options')
const htmlTextarea = document.querySelector('#html-textarea')
const jsTextarea = document.querySelector('#js-textarea')
const phpTextarea = document.querySelector('#php-textarea')
const requiredBlock = document.querySelector('#required-block')

const fieldsGenerator = {
    fields: [],
    names: [],

    removeField(index) {
        this.fields.splice(index, 1)
    },

    createTextField(label, name, value, required) {
        const field = `\n\t<div class="field">\n\t\t<label for="${name}">${label}</label>\n\t\t<input type="text" name="${name}" id="${name}" value="${value}"${required ? ' required' : ''}>\n\t</div>\n`

        this.fields.push(field)
        this.names.push(name)
    },

    createTextarea(label, name, value, required) {
        const field = `\n\t<div class="field">\n\t\t<label for="${name}">${label}</label>\n\t\t<textarea id="${name}" name="${name}"${required ? ' required' : ''}>${value}</textarea>\n\t</div>\n`

        this.fields.push(field)
        this.names.push(name)
    },

    createSelect(label, name, value, selectOptions) {
        let field = `\n\t<div class="field">\n\t\t<label for="${name}">${label}</label>\n\t\t<select name="${name}" id="${name}">`

        selectOptions.map(item => {
            field += `\n\t\t\t<option value="${item}"${(item === value) ? ' selected' : ''}>${item}</option>`
        })

        field += '\n\t\t</select>\n\t</div>\n'

        this.fields.push(field)
        this.names.push(name)
    },

    createCheckbox(label, name, checked) {
        const field = `\n\t<div class="field">\n\t\t<input type="checkbox" id="${name}" name="${name}"${checked ? ' checked' : ''}>\n\t\t<label for="${name}">${label}</label>\n\t</div>\n`

        this.fields.push(field)
        this.names.push(name)
    },

    createPasswordField(label, name, value, required) {
        const field = `\n\t<div class="field">\n\t\t<label for="${name}">${label}</label>\n\t\t<input type="password" id="${name}" name="${name}" value="${value}"${required ? ' required' : ''}>\n\t</div>\n`

        this.fields.push(field)
        this.names.push(name)
    }
}

const removeField = (index) => {
    fieldsGenerator.removeField(index)

    fillFieldsOutput()
}

const fillFieldsOutput = () => {
    fieldsList.innerHTML = ''

    fieldsGenerator.fields.map((item, index) => {
        const i = index

        fieldsList.innerHTML += `<div>
            <div class="field-with-delete">
                ${item}
                <img src="img/delete.svg" onclick="removeField(${i})"/>
            </div>
        </div>`
    })

    let html = `<form method="post" id="feedback-from">`
    fieldsGenerator.fields.map(item => html += item)
    html += '\n\t<button type="submit">Отправить</button>\n</form>'

    let js = 'const feedbackForm = document.querySelector("#feedback-from") \n\nfeedbackForm.addEventListener("submit", async (e) => {\n\te.preventDefault()\n\n\tawait fetch("http://activebox/mail.php", {\n\t\tbody: new FormData(feedbackForm), \n\t\tmethod: "post"\n\t})\n})'

    let php = '<?php\n\n'
    fieldsGenerator.names.map(item => {
        php += `$${item} = $_POST["${item}"];\n`
    })

    htmlTextarea.value = html
    jsTextarea.value = js
    phpTextarea.value = php
}


const removeOption = (index) => {
    const option = document.querySelector(`#option-item${index}`)
    option.remove()
}

addFieldButton.addEventListener('click', () => {
    if (labelInput.value && nameInput.value) {

        switch (typeSelect.value) {
            case 'text':
                fieldsGenerator.createTextField(labelInput.value, nameInput.value,
                    valueInput.value, requiredCheckbox.checked)
                break

            case 'textarea':
                fieldsGenerator.createTextarea(labelInput.value, nameInput.value,
                    valueInput.value, requiredCheckbox.checked)
                break

            case 'select':
                const selectOptions = []

                for (let item of options.children) {
                    selectOptions.push(item.children[0].value)
                }

                fieldsGenerator.createSelect(labelInput.value, nameInput.value,
                    valueInput.value, selectOptions)
                break

            case 'checkbox':
                fieldsGenerator.createCheckbox(labelInput.value, nameInput.value,
                    checkboxCheckedInput.checked)
                break

            case 'password':
                fieldsGenerator.createPasswordField(labelInput.value, nameInput.value,
                    valueInput.value, requiredCheckbox.checked)
                break
        }

        fillFieldsOutput()
    }
})

typeSelect.addEventListener('change', () => {
    switch (typeSelect.value) {
        case 'select':
            selectOptions.classList.remove('hidden')
            valueBlock.classList.remove('hidden')
            checkboxOptions.classList.add('hidden')
            requiredBlock.classList.add('hidden')
            break

        case 'checkbox':
            selectOptions.classList.add('hidden')
            valueBlock.classList.add('hidden')
            checkboxOptions.classList.remove('hidden')
            requiredBlock.classList.add('hidden')
            break

        default:
            selectOptions.classList.add('hidden')
            valueBlock.classList.remove('hidden')
            checkboxOptions.classList.add('hidden')
            requiredBlock.classList.remove('hidden')
    }
})

addOptionButton.addEventListener('click', () => {
    if (selectOptionsInput.value) {
        options.innerHTML += `<div class="options-item" id="option-item${options.children.length + 2}">
            <input type="text" value="${selectOptionsInput.value}"/>
            <img src="img/delete.svg" alt="remove" onclick="removeOption(${options.children.length + 2})">
        </div>`

        selectOptionsInput.value = ''
    }
})

clearOptionsButton.addEventListener('click', () => {
    options.innerHTML = ''
})
