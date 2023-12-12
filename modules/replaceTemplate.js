module.exports = (pCard, pData) => {
    var output = pCard.replace(/{%PRODUCTNAME%}/g, pData.productName);
    output = output.replace(/{%FROM%}/g, pData.from);
    output = output.replace(/{%IMAGE%}/g, pData.image);
    output = output.replace(/{%PRICE%}/g, pData.price);
    output = output.replace(/{%QTY%}/g, pData.quantity);
    output = output.replace(/{%ID%}/g, pData.id);
    output = output.replace(/{%DESC%}/g, pData.description);
    return output;
}