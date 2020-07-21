function printReceipt(barcodes) {
    let itemsNum = getItemsNum(barcodes)
    let itemsDetail = getItemDetails(itemsNum)
    let itemWithTotalPrice = getItemWithTotalPrice(itemsDetail)
    let totalPrice = getTotalPrice(itemWithTotalPrice)
    console.log(generateReceipt(itemWithTotalPrice, totalPrice))
}
const data = require('./database');

function getItemsNum(barcodes) {
    var itemsNum = {};
    for (var i = 0; i < barcodes.length; i++) {
        var key = barcodes[i];
        if(itemsNum[key]){
            itemsNum[key]++;
        }else{
            itemsNum[key] = 1;
        }
    }
    return itemsNum
}

function getItemDetails(itemsNum) {
    let itemDetails = []
    for(let key in itemsNum) {
        for(let i of data) {
            if(key === i.barcode){
                itemDetails.push({
                    barcode: key,
                    name: i.name,
                    unitPrice: i.price,
                    quantity: itemsNum[key]
                }
                )
            }
        }
    }
    return itemDetails
}

function getItemWithTotalPrice(itemsDetail) {
    for(let indexOfItem of itemsDetail){
        indexOfItem.subtotalPrice = indexOfItem.unitPrice * indexOfItem.quantity
    }
    return itemsDetail
}

function getTotalPrice(itemWithTotalPrice) {
    let totalPrice = 0
    for(let indexOfItem of itemWithTotalPrice){
        totalPrice += indexOfItem.subtotalPrice
    }
    return totalPrice
}
function generateReceipt(itemWithTotalPrice, totalPrice) {
    let receipt = ''
    receipt += '\n***<store earning no money>Receipt ***\n'
    for (let indexOfReceiptItems = 0; indexOfReceiptItems < itemWithTotalPrice.length; indexOfReceiptItems++) {
      receipt += `Name: ${itemWithTotalPrice[indexOfReceiptItems].name}, Quantity: ${itemWithTotalPrice[indexOfReceiptItems].quantity}, Unit price: ${itemWithTotalPrice[indexOfReceiptItems].unitPrice} (yuan), Subtotal: ${itemWithTotalPrice[indexOfReceiptItems].subtotalPrice} (yuan)\n`
    }
    receipt += `----------------------\nTotal: ${totalPrice} (yuan)\n**********************`
    return receipt
  }
module.exports = {
    printReceipt
};