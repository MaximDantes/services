const whoisInput = document.querySelector('#whois-input')
const whoisButton = document.querySelector('#check-whois-button')
const whoisLink = document.querySelector('#whois-link')

const LOCALSTORAGE_KEY = 'services/whois'

document.addEventListener('DOMContentLoaded', () => {
    whoisInput.value = localStorage.getItem(LOCALSTORAGE_KEY)
})

whoisButton.addEventListener('click', () => {
    whoisLink.href = `https://web.archive.org/web/2021*/${whoisInput.value}`
    whoisLink.classList.toggle('hidden')

    localStorage.setItem(LOCALSTORAGE_KEY, whoisInput.value)
})