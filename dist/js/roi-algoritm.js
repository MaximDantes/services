const roi = (price, conversion, impressionForecast, clickConversion, clickPrice,
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

export default roi