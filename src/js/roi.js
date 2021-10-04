const tables = document.querySelectorAll('table')
const colspaned = document.querySelectorAll('.colspaned')
const calcRows = document.querySelectorAll('.calc')
const addColumnButton = document.querySelector('#add-column-button')
const showCalcButton = document.querySelector('#show-calc-button')
const calcButton = document.querySelector('#calc-button')
let priceInputs = document.querySelectorAll('.price-input')
let conversionInputs = document.querySelectorAll('.conversion-input')
const impressionForecastInput = document.querySelector('#impression-forecast-input')
const clickConversionInput = document.querySelector('#click-conversion-input')
const averageClickPriceInput = document.querySelector('#average-click-price-input')
let rejectInputs = []
const ndsCheckbox = document.querySelector('#nds-checkbox')
const clicksCountOutput = []
let leftOnSiteOutputs = []
let salesCountOutputs = []
let clicksForGoalOutputs = []
const salePriceInput = document.querySelector('#sale-price-input')
const costPriceInput = document.querySelector('#cost-price-input')
let adPriceForClientOutputs = []
let profitForSaleOutputs = []
let incomeForSaleOutputs = []
const businessExpensesInput = document.querySelector('#business-expenses-input')
const taxesInput = document.querySelector('#taxes-input')
let expansesForGoodsPurchaseOutputs = []
const adPriceWithNdsOutput = document.querySelector('#ad-price-with-nds-output')
let taxesSumOutputs = []
let profitPerMonthOutputs = []
let paybackOutputs = []

let isCalcVisible = false
let columnsCount = 2

const createReport = (price, conversion, impressionForecast, clickConversion, clickPrice,
                      reject, useNds, salePrice, costPrice, businessExpenses, taxes) => {

    const clicksCount = impressionForecast * clickConversion / 100
    const leftOnSite = clicksCount * (100 - reject) / 100
    const salesCount = leftOnSite * conversion / 100
    const clicksForGoalCount = Math.round(100 / conversion)
    const adPriceForClient = clickPrice * clicksForGoalCount
    const profitForSale = salePrice - costPrice - adPriceForClient
    const incomeForSale = salesCount * salePrice
    const expansesForGoodsPurchase = salesCount * costPrice
    let adPrice = clicksCount * clickPrice
    if (useNds) adPrice *= 1.2
    const taxesSum = incomeForSale * taxes / 100
    const profitPerMonth = incomeForSale - businessExpenses - taxesSum - expansesForGoodsPurchase - adPrice
    const payback = Math.ceil(price / profitPerMonth * 30)

    return { clicksCount, leftOnSite, salesCount, clicksForGoalCount, adPriceForClient, profitForSale, incomeForSale,
    expansesForGoodsPurchase, adPrice, taxesSum, profitPerMonth, payback}
}

const getInputsAndOutputs = () => {
    priceInputs = document.querySelectorAll('.price-input')
    conversionInputs = document.querySelectorAll('.conversion-input')
    rejectInputs = document.querySelectorAll('.reject-input')
    leftOnSiteOutputs = document.querySelectorAll('.left-on-site-output')
    salesCountOutputs = document.querySelectorAll('.sales-count-output')
    clicksForGoalOutputs = document.querySelectorAll('.clicks-for-goal-output')
    adPriceForClientOutputs = document.querySelectorAll('.ad-price-for-client-output')
    profitForSaleOutputs = document.querySelectorAll('.profit-for-sale-output')
    incomeForSaleOutputs = document.querySelectorAll('.income-for-sales-output')
    expansesForGoodsPurchaseOutputs = document.querySelectorAll('.expenses-for-goods-purchase-output')
    taxesSumOutputs = document.querySelectorAll('.taxes-sum-output')
    profitPerMonthOutputs = document.querySelectorAll('.profit-per-month-output')
    paybackOutputs = document.querySelectorAll('.payback-output')
}

document.addEventListener('DOMContentLoaded', () => {
    getInputsAndOutputs()
})

addColumnButton.addEventListener('click', () => {
    columnsCount++

    const elements = []

    colspaned.forEach(item => {
        item.colSpan += 1
    })

    const removeTd = document.createElement('td')
    const button = document.createElement('button')
    button.innerText = 'Удалить'
    button.addEventListener('click', () => {
        columnsCount--

        elements.map(item => {
            item.remove()
        })

        colspaned.forEach(item => {
            item.colSpan -= 1
        })
    })
    removeTd.appendChild(button)
    tables[0].children[0].children[0].appendChild(removeTd)
    elements.push(removeTd)

    const createInput = (type, table, position) => {
        const td = document.createElement('td')
        td.classList.add('input-cell')
        td.innerHTML = `<input type="text" class="${type}">`
        tables[table].children[0].children[position].appendChild(td)
        elements.push(td)
    }
    const createOutput = (type, table, position) => {
        const td = document.createElement('td')
        td.classList.add('output-cell')
        td.classList.add(type)
        tables[table].children[0].children[position].appendChild(td)
        elements.push(td)
    }

    createInput('price-input', 0, 1)
    createInput('conversion-input', 0, 2)
    createInput('reject-input', 1, 3)
    createOutput('left-on-site-output', 1, 6)
    createOutput('sales-count-output', 1, 7)
    createOutput('clicks-for-goal-output', 1, 8)
    createOutput('ad-price-for-client-output', 2, 2)
    createOutput('profit-for-sale-output', 2, 3)
    createOutput('income-for-sales-output', 3, 0)
    createOutput('expenses-for-goods-purchase-output', 3, 3)
    createOutput('taxes-sum-output', 3, 5)
    createOutput('profit-per-month-output', 3, 6)
    createOutput('payback-output', 3, 7)

    getInputsAndOutputs()
})

showCalcButton.addEventListener('click', () => {
    isCalcVisible = !isCalcVisible

    if (isCalcVisible) {
        showCalcButton.innerText = 'Скрыть рассчеты'
    } else {
        showCalcButton.innerText = 'Показать рассчеты'
    }

    calcRows.forEach(item => {
        item.classList.toggle('hidden')
    })
})

calcButton.addEventListener('click', () => {
    debugger
    for (let i = 0; i < columnsCount; i++) {
        const report = createReport(priceInputs[i].value, conversionInputs[i].value, impressionForecastInput.value,
            clickConversionInput.value, averageClickPriceInput.value, rejectInputs[i].value, ndsCheckbox.checked, salePriceInput.value,
            costPriceInput.value, businessExpensesInput.value, taxesInput.value)

            clicksCountOutput.innerText = report.clicksCount
            leftOnSiteOutputs[i].innerText = report.leftOnSite
            salesCountOutputs[i].innerText = report.salesCount
            clicksForGoalOutputs[i].innerText = report.clicksForGoalCount
            adPriceForClientOutputs[i].innerText = report.adPriceForClient
            profitForSaleOutputs[i].innerText = report.profitForSale
            incomeForSaleOutputs[i].innerText = report.incomeForSale
            expansesForGoodsPurchaseOutputs[i].innerText = report.expansesForGoodsPurchase
            adPriceWithNdsOutput.innerText = report.adPrice
            taxesSumOutputs[i].innerText = report.taxesSum
            profitPerMonthOutputs[i].innerText = report.profitPerMonth
            paybackOutputs[i].innerText = report.payback
    }
})