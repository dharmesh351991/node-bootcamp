const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceProductData = require('./modules/replaceTemplate');
const slugify = require('slugify');
///////////////////////////
// SERVER
const tempHome = fs.readFileSync(`${__dirname}/templates/farm-products/home.html`, 'utf-8');
const productCard = fs.readFileSync(`${__dirname}/templates/farm-products/product-card.html`, 'utf-8');
const myProduct = fs.readFileSync(`${__dirname}/templates/farm-products/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8');
const dataObject = JSON.parse(data);
//slug example
const slugs = dataObject.map((pData) => slugify(pData.productName, {'lower': true}) );
console.log('slugs', slugs);
const server = http.createServer((request, response) => {
    const {query, pathname} = url.parse(request.url, true);
    if( pathname === '/' || pathname === '/home' ){
        response.writeHead(200, {
            'Content-Type' : 'text/html'
        });
        const cardsHtml = dataObject.map(productData => replaceProductData(productCard, productData)).join('');
        const homeContent = tempHome.replace(/{%PRODUCTS%}/g, cardsHtml)
        response.end(homeContent);
    }else if(pathname === '/product'){
        response.writeHead(200,{
            'Content-Type' : 'text/html'
        });
        const productInfo = dataObject[query.id];
        const productDetail = replaceProductData(myProduct, productInfo);
        response.end(productDetail);
    }else if( pathname === '/api' ){
        response.writeHead(200,{'Content-Type': 'application/json'});
        response.end(data);
    }else{
        response.writeHead(404, {
            'Content-Type' : 'text/html'
        });
        response.end('<h2>This page is not found!!!</h2>');
    }
});
server.listen(8183, '127.0.0.1', ()=>{
    console.log(`Node.js Bootcamp server is running and ready to accept incomping request :)....`)
});
