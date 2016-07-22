'use strict';
let tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
];
let promotionItems = loadPromations();
let items = loadAllItems();
let barcodes = formatTags(tags);
let cartItemAmounts = mergeItemAmount(barcodes);
let cartItems = getCartItems(items);
let cartItemsType = getCartItemsType(cartItems,promotionItems);
let promotedItems = mergePromotion(cartItemsType);
let subTotals = calculateSubTotal(promotedItems);
let total = calculateTotal(subTotals);
let proMoney = calculateProMoney(subTotals);

    function formatTags(tags) {
        return tags.map(function (tag) {
            let exist = tag.split('-');
            return {
                barcode: exist[0],
                amount: parseFloat(exist[1]) || 1
            };
        });
    }
    console.log(formatTags(tags))

    function mergeItemAmount(barcodes) {
        return barcodes.reduce(function (cartItemAmounts, barcod) {
            let exist = cartItemAmounts.find(function (item) {
                return item.barcode === barcod.barcode;
            })
            if (exist) {
                exist.amount += barcod.amount;
            } else {
                cartItemAmounts.push(barcod);
            }
            return cartItemAmounts;
        }, []);
    }

    console.log(cartItemAmounts)

    function getCartItems(items) {
        let cartItems = [];
        for (let i = 0; i < cartItemAmounts.length; i++) {
            for (let j = 0; j < items.length; j++) {
                if (cartItemAmounts[i].barcode === items[j].barcode) {
                    cartItems.push(Object.assign({}, items[j], {amount: cartItemAmounts[i].amount}))
                }
            }
        }
        return cartItems;
    }

    console.log(cartItems)

    function getCartItemsType(cartItems,promotionItems) {
        //let cartItems = getCartItems(items);
        let cartItemsType = [];
        for (let m = 0; m < cartItems.length; m++) {
            cartItemsType.push(Object.assign({}, cartItems[m], {type: "none"}));
        }
        for (let i = 0; i < promotionItems.length; i++) {
            let exist = promotionItems[i].barcodes;
            for (let j = 0; j < cartItemsType.length; j++) {
                for (let n=0; n<exist.length ; n++) {
                    if (cartItemsType[j].barcode === exist[n]) {
                        cartItemsType[j].type = promotionItems[i].type;
                    }
                }
            }
        }

        return cartItemsType;
    }

    console.log(cartItemsType)

    function mergePromotion(cartItemsType) {
        let money = 0;
        let proAmount = 0;
        let promotedItems = [];
        for (let i = 0; i < cartItemsType.length; i++) {
            if (cartItemsType[i].type === 'BUY_TWO_GET_ONE_FREE') {
                let exist = parseInt(cartItemsType[i].amount / 3);
                money = cartItemsType[i].price * exist;
                proAmount = cartItemsType[i].amount - exist;
            } else {
                money = 0;
                proAmount = cartItemsType[i].amount;
            }
            promotedItems.push(Object.assign({}, cartItemsType[i], {promotedMoney: money, promotedAmounts: proAmount}))
        }
        return promotedItems;
    }

    console.log(promotedItems)

    function calculateSubTotal(promotedItems) {
        let subTotals = [];
        for (let i = 0; i < promotedItems.length; i++) {
            let subMoney = promotedItems[i].promotedAmounts * promotedItems[i].price;
            subTotals.push(Object.assign({}, promotedItems[i], {subTotal: subMoney}))
        }
        return subTotals;
    }

    console.log(subTotals)

    function calculateTotal(subTotals) {
        let total = 0;
        for (let i = 0; i < subTotals.length; i++) {
            total += subTotals[i].subTotal;
        }
        return total;
    }

    console.log(total)

    function calculateProMoney(subTotals) {
        let proMoneys = 0;
        for (let i = 0; i < subTotals.length; i++) {
            proMoneys += subTotals[i].promotedMoney;
        }
        return proMoneys;
    }
    console.log(proMoney)

function printPreceipt(tags) {
    for(let subTotal of subTotals) {
        console.log( '名称：' + subTotal.name + '，数量：' + subTotal.amount + '瓶，单价：' +
            subTotal.price + '（元），小计：' + subTotal.subTotal + '（元）'
    )
    }
    console.log( '总计：' + total + '（元），节省：' + proMoney + '（元）')
}
