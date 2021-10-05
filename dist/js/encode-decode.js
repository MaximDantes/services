import {encode, decode} from './windows-1251.mjs'

const input = document.querySelector('#input')
const utfOutput = document.querySelector('#utf-output')
const winOutput = document.querySelector('#win-output')
const escapeOutput = document.querySelector('#escape-output')


input.addEventListener('keyup', () => {
    utfOutput.value = encodeURIComponent(input.value)

    winOutput.value = encode(input.value)

    escapeOutput.value = escape(input.value)
})

utfOutput.addEventListener('keyup', () => {
    input.value = decodeURI(utfOutput.value)

    winOutput.value = encode(input.value)

    escapeOutput.value = escape(input.value)
})

winOutput.addEventListener('keyup', () => {
    input.value = decode(winOutput.value)

    utfOutput.value = encodeURI(input.value)

    escapeOutput.value = escape(input.value)
})

escapeOutput.addEventListener('keyup', () => {
    input.value = unescape(escapeOutput.value)

    utfOutput.value = encodeURI(input.value)

    winOutput.value = encode(input.value)
})