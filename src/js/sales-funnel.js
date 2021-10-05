import calcRoi from './roi-algoritm.js'

const averageReceiptInput = document.querySelector('#average-receipt')
const priceInput = document.querySelector('#price')
const ctrInput = document.querySelector('#ctr')
const applicationConversionInput = document.querySelector('#applications-conversion')
const applicationConversionToOrderInput = document.querySelector('#applications-conversion-to-order')
const clickPriceInput = document.querySelector('#click-price')
const rejectsPercentInput = document.querySelector('#rejects-percent')
const queriesCountInput = document.querySelector('#queries-count')
const clicksCountInput = document.querySelector('#clicks-count')
const interestedCountInput = document.querySelector('#interested')
const applicationsCountInput = document.querySelector('#applications-count')
const salesCountInput = document.querySelector('#sales-count')
const addBudgetInput = document.querySelector('#add-budget')
const salesPriceInput = document.querySelector('#sales-price')
const salesSumInput = document.querySelector('#sales-sum')
const netProfitInput = document.querySelector('#net-profit')
const applicationPriceInput = document.querySelector('#application-price')
const clientPriceInput = document.querySelector('#client-price')
const profitabilityInput = document.querySelector('#profitability')
const roiInput = document.querySelector('#roi')

const calcReport = (queriesCount, averageReceipt, price, ctr, applicationConversion, applicationConversionToOrder,
                    clickPrice, rejectsPercent) => {

    const clicksCount = Math.floor(queriesCount * ctr)
    const interestedCount = Math.floor(clicksCount * (1 - rejectsPercent))
    const applicationsCount = Math.floor(interestedCount * applicationConversion)
    const salesCount = Math.floor(applicationsCount * applicationConversionToOrder)

    const addBudget = clicksCount * clickPrice * 1.2
    const salesPrice = salesCount * price
    const salesSum = salesCount * averageReceipt
    const netProfit = salesSum - salesPrice - addBudget
    const applicationPrice = Math.round(addBudget / applicationsCount)
    const clientPrice = Math.round(addBudget / salesCount)
    const profitability = (averageReceipt - price) / averageReceipt
    const roi = calcRoi(salesPrice, applicationConversionToOrder * 100, queriesCount, clickPrice, ctr * 100,
        rejectsPercent * 100, true, price, price, addBudget, 0).profitPerMonth


    return {
        clicksCount, interestedCount, applicationsCount, salesCount, addBudget, salesPrice, salesSum,
        netProfit, applicationPrice, clientPrice, profitability, roi
    }
}

const fillInputs = () => {
    const output = calcReport(+queriesCountInput.value, +averageReceiptInput.value, +priceInput.value,
        +ctrInput.value / 100, +applicationConversionInput.value / 100,
        +applicationConversionToOrderInput.value / 100, +clickPriceInput.value,
        +rejectsPercentInput.value / 100)

    clicksCountInput.value = output.clicksCount
    interestedCountInput.value = output.interestedCount
    applicationsCountInput.value = output.applicationsCount
    salesCountInput.value = output.salesCount
    addBudgetInput.value = output.addBudget
    salesPriceInput.value = output.salesPrice
    salesSumInput.value = output.salesSum
    netProfitInput.value = output.netProfit
    applicationPriceInput.value = output.applicationPrice
    clientPriceInput.value = output.clientPrice
    profitabilityInput.value = output.profitability * 100
    roiInput.value = output.roi
}

queriesCountInput.addEventListener('input', fillInputs)
averageReceiptInput.addEventListener('input', fillInputs)
priceInput.addEventListener('input', fillInputs)
ctrInput.addEventListener('input', fillInputs)
applicationConversionInput.addEventListener('input', fillInputs)
applicationConversionToOrderInput.addEventListener('input', fillInputs)
clickPriceInput.addEventListener('input', fillInputs)
rejectsPercentInput.addEventListener('input', fillInputs)
document.addEventListener('DOMContentLoaded', fillInputs)