let express = require('express');
let router = express.Router();

// mysql connection init start
const { sqlConfig } = require('../secrets/sqlconfig')


const mysql = require('mysql');
let pool = mysql.createPool(sqlConfig);
// mysql connection init end

// // Get Connection in Pool
// pool.getConnection(function (err, connection) {
//     if (!err) {
//         //connected!
//     }

//     connection.query('SELECT * from users', function (err, rows, fields) {
//         if (!err)
//             console.log('The solution is: ', rows);
//         else
//             console.log('Error while performing Query.', err);
//     });

//     // 커넥션을 풀에 반환
//     connection.release();
// });

// Buyer Functions

router.get('/', function (req, res, next) {// GET /items/?sellerName=판매자이름&search=검색어&minPrice=최소금액&maxPrice=최대금액 : response로 전체 상품 중 검색 조건에 맞는 목록 [{item}, ...] 을 받아온다.
    let sellerName = req.query.sellerName
    let search = req.query.search
    let minPrice = Number(req.query.minPrice)
    let maxPrice = Number(req.query.maxPrice)

});

router.get('/:buyer_id/purchased', function (req, res, next) {// GET /items/:buyer_id/purchased : response로 buyer_id에 해당하는 구매자가 구매, 입찰한 상품 목록 [{item}, ...] 을 받아온다.
    let buyerId = req.params.buyerId
});

router.get('/:buyer_id/wished', function (req, res, next) {// GET /items/:buyer_id/wished : response로 buyer_id에 해당하는 구매자가 장바구니에 담은 상품 목록 [{item}, ...] 을 받아온다.
    let buyer_id = req.params.buyer_id
});

router.post('/:buyer_id/purchased/:item_id', function (req, res, next) {// POST /items/:buyer_id/purchased/:item_id : 구매자의 구매목록에 해당 상품이 저장된다.
    let buyer_id = req.params.buyer_id
    let item_id = req.params.item_id
});

router.post('/:buyer_id/wished/:item_id', function (req, res, next) {// POST /items/:buyer_id/wished/:item_id : 구매자의 장바구니에 해당 상품이 저장된다.
    let buyer_id = req.params.buyer_id
    let item_id = req.params.item_id
});

router.delete('/:buyer_id/purchased/:item_id', function (req, res, next) {// DELETE /items/:buyer_id/purchased/:item_id : 구매자의 구매목록에서 해당 상품이 삭제된다. (frontend rule: 입찰 상태인 상품은 자신이 최신 입찰자일 때, 삭제가 불가능하다.)
    let buyer_id = req.params.buyer_id
    let item_id = req.params.item_id
});

router.delete('/:buyer_id/wished/:item_id', function (req, res, next) {// DELETE /items/:buyer_id/wished/:item_id : 구매자의 장바구니에서 해당 상품이 삭제된다.
    let buyer_id = req.params.buyer_id
    let item_id = req.params.item_id
});



// Seller Functions

router.get('/:seller_id/registered', function(req, res, next) {// GET /items/:seller_id/registered : response로 seller_id에 해당하는 판매자가 등록한 상품 목록 [{item}, ...] 을 받아온다. (item에는 wished_number에서 장바구니에 담긴 횟수, auction_history에서 경매 기록을 확인할 수 있다 "buyer_id,price|buyer_id,price|..."가 반복되는 형식이고 늦게 입찰한 사람이 뒤에 있는 순서를 갖고 있다.)
    let seller_id = req.params.seller_id
});

router.put('/:seller_id/registered/:item_id', function(req, res, next) {// PUT /items/:seller_id/registered/:item_id : body로 {[name:상품이름[, status:상태[, place:교환장소[, price:가격[, image:사진]]]]]} put 가능 (경매에서 낙찰시 status만 바꾸면 됨)
    let seller_id = req.params.seller_id
    let item_id = req.params.item_id
});

router.post('/:seller_id/registered', function(req, res, next) {// POST /items/:seller_id/registered : body로 {name:상품이름, place:교환장소[, price:가격], image:사진} post 가능 (price가 없을 시엔 0으로 기본 설정되고, status가 경매중으로 설정된다.)
    let seller_id = req.params.seller_id
});

router.delete('/:seller_id/registered/item_id', function(req, res, next) {// DELETE /items/:seller_id/registered/item_id : 판매자가 등록한 해당 item을 삭제한다. 
    let seller_id = req.params.seller_id
    let item_id = req.params.item_id
});












module.exports = router;