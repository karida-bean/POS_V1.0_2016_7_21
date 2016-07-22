'use strict';

describe("formatTags",function(){
    it("should return barcode and amount",function(){
        let tags = ["ITEM3-2"];
        let barcodes = [{
            barcode:"ITEM3",
            amount:2
        }];
        expect(formatTags(tags)).toEqual(barcodes)
    });
});

describe("mergeItemAmount",function(){
    it("should merge equal barcode",function(){
        let barcodes = [{
            barcode:"ITEM000003",
            amount:2
        },{
            barcode:"ITEM000003",
            amount:1
        }];
        let result = mergeItemAmount(barcodes);
        let cartItemAmounts = [{
            barcode:"ITEM000003",
            amount:3
        }];
            expect(result).toEqual(cartItemAmounts)
    });
})

 describe("getCartItems",function(){
    it("should find cartItems ",function(){
        let items = [{
            barcode:"ITEM000003",
            unit:"斤",
            name:"荔枝",
            price:15
        }];
        let result = getCartItems(items)
        let cartItems = [{
            amount:2.5,
            barcode:"ITEM000003",
            name:"荔枝",
            price:15,
            unit:"斤"
        }];
        expect(result).toEqual(cartItems)
    });
})


describe("getCartItemsType",function(){
    it("find cartItem promotion type",function(){
        let promotionItems = [{
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001'
            ]
        }];
        let cartItems = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount:3
        }];
        let result = getCartItemsType(cartItems,promotionItems)
        let cartItemsType = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3
        }];
        expect(result).toEqual(cartItemsType)
    });
})

describe("mergePromotion",function(){
    it("should merge promotion",function(){
        let cartItemsType = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3
        }];
        let result = mergePromotion(cartItemsType);
        let promotedItems = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2
        }];
        expect(result).toEqual(promotedItems)
    });
})

describe("calculateSubTotal",function(){
    it("should calculate subTotal",function(){
        let promotedItems = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2
        }];
        let result = calculateSubTotal(promotedItems);
        let subTotals = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2,
            subTotal:6
        }];
        expect(result).toEqual(subTotals)
    });
})

describe("calculateTotal",function(){
    it("should calculate total",function(){
        let subTotals = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2,
            subTotal:6
        },{barcode: 'ITEM000001',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2,
            subTotal:6}];
        let result = calculateTotal(subTotals);
        let total = 12;
        expect(result).toEqual(total)
    });
})


describe("calculateProMoney",function(){
    it("should calculate proMoneys",function(){
        let subTotals = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2,
            subTotal:6
        },{barcode: 'ITEM000001',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            type: 'BUY_TWO_GET_ONE_FREE',
            amount:3,
            promotedMoney: 3,
            promotedAmounts: 2,
            subTotal:6}];
        let result = calculateProMoney(subTotals);
        let proMoneys = 6;
        expect(result).toEqual(proMoneys)
    });
})

describe("printPreceipt",function(){
    it("should print receipt",function(){
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
        let result = printPreceipt(tags);
        let returnString = "名称：雪碧，数量：5瓶，单价：3（元），小计：12（元）名称：荔枝，数量：2.5瓶，单价：15（元），小计：37.5（元）名称：方便面，数量：3瓶，单价：4.5（元），小计：13.5（元），总计：63（元），节省：3（元）"
        expect(result).toEqual(returnString)
    });
})


