# API Specification

# 멤버(Members)
## 관리자 기능(Manager's function)
### get member list for management (except manager's information)
- ### GET /members : response로 [{buyer|seller}, ...] get
### modify member
- ### PUT /members/:member_id : body로 {[sid[, password[, name[, classification]]]]} put 가능 (update)
### delete member
- ### DELETE /members/:member_id :해당 member_id의 member를 삭제한다. 
## 로그인/회원가입(Sign up/Sign in)
### register
- ### POST /members : body로 {id:아이디, sid:학번, password:비밀번호, name:이름, classification:("manager"|"seller"|"buyer"), phone:전화번호} post
### login
- ### POST /login : body로 {id:아이디, sid:학번, password:비밀번호} post하면, response로 user정보를 받아온다

# 상품(Items)
## 구매자 기능(Buyer's function)
### search items
- ### GET /items/?sellerName=판매자이름&search=검색어&minPrice=최소금액&maxPrice=최대금액 : response로 전체 상품 중 검색 조건에 맞는 목록 [{item}, ...] 을 받아온다.
### shopping list
- ### GET /items/:buyer_id/purchased : response로 buyer_id에 해당하는 구매자가 구매, 입찰한 상품 목록 [{item}, ...] 을 받아온다.
### wish list
- ### GET /items/:buyer_id/wished : response로 buyer_id에 해당하는 구매자가 장바구니에 담은 상품 목록 [{item}, ...] 을 받아온다.
### purchase
- ### POST /items/:buyer_id/purchased/:item_id : 구매자의 구매목록에 해당 상품이 저장된다.
### add to wish list
- ### POST /items/:buyer_id/wished/:item_id : 구매자의 장바구니에 해당 상품이 저장된다.
### cancel purchase
- ### DELETE /items/:buyer_id/purchased/:item_id : 구매자의 구매목록에서 해당 상품이 삭제된다. (frontend rule: 입찰 상태인 상품은 자신이 최신 입찰자일 때, 삭제가 불가능하다.)
- ### DELETE /items/:buyer_id/wished/:item_id : 구매자의 장바구니에서 해당 상품이 삭제된다.

## 판매자 기능(Seller's Function)
### selling item list
- ### GET /items/:seller_id/registered : response로 seller_id에 해당하는 판매자가 등록한 상품 목록 [{item}, ...] 을 받아온다. (item에는 wished_number에서 장바구니에 담긴 횟수, auction_history에서 경매 기록을 확인할 수 있다 "buyer_id,price|buyer_id,price|..."가 반복되는 형식이고 늦게 입찰한 사람이 뒤에 있는 순서를 갖고 있다.)
### item modification
- ### PUT /items/:seller_id/registered/:item_id : body로 {[name:상품이름[, status:상태[, place:교환장소[, price:가격[, image:사진[, category:카테고리]]]]]]} put 가능 (경매에서 낙찰시 status만 바꾸면 됨)
### item register
- ### POST /items/:seller_id/registered : body로 {name:상품이름, place:교환장소[, price:가격], image:사진, category:카테고리} post 가능 (price가 없을 시엔 0으로 기본 설정되고, status가 경매중으로 설정된다.)
### item delete
- ### DELETE /items/:seller_id/registered/item_id : 판매자가 등록한 해당 item을 삭제한다. 

# Data Structure Specification


## PEOPLE : 
    id:아이디:VARCHAR(45), 
    sid:학번:VARCHAR(45), 
    password:비밀번호:VARCHAR(256), 
    name:이름:VARCHAR(45), 
    classification:("manager"|"seller"|"buyer"):VARCHAR(45), phone:전화번호:VARCHAR(45)

    PRIMARYKEY(id)

## ITEMS : 
    id: 아이디:VARCHAR(45) : 현재 아이디와 상품 이름은 같게 설정되어 있다.
    name:상품이름:VARCHAR(45), 
    place:교환장소:VARCHAR(45), 
    price:가격:INT, 
    status:상태:("sell"|"auction"|"closed"):VARCHAR(45),
    image:사진:BLOB,
    seller_id:판매자아이디:VARCHAR(45),
    buyer_id:구매자아이디:VARCHAR(45)
    cur_bidder_id:현재입찰자아이디:VARCHAR(45),
    auction_history:입찰기록:VARCHAR(1024)
    auction_expire_time:경매종료시각:DATETIME
    wished_number:INT = 장바구니 담긴 수
    category:VARCHAR(45): 상품의 카테고리
    (auction_time_last:INT = 시간 단위, 서버에서 계산)

    PRIMARYKEY(id)
    seller_id REFERENCES PEOPLE(id)
    buyer_id REFERENCES PEOPLE(id)
    cur_bidder_id REFERENCES PEOPLE(id)

## WISH :
    wisher_id:VARCHAR(45)
    item_id:VARCHAR(45)

    PRIMARYKEY(wisher_id,item_id)
    wisher_id REFERENCES PEOPLE(id)
    item_id REFERENCES ITEM(id)
    