# useful sql snippets
INSERT INTO people(id, sid, password, name, classification, phone) VALUES ("this is ID","this is SID","this is PWD","this is Name", "seller", "000-1111-2222");

INSERT INTO items(id, name, place, price, status, seller_id, auction_history, auction_expire_time, wished_number, category) VALUES ("this is item ID","item name","placeee",39900, "sell", "idOfSeller", "no history here", NULL, 0, "category1");

INSERT INTO wish(wisher_id, item_id) VALUES("this is ID", "this is item ID");

ALTER TABLE wish ADD FOREIGN KEY(item_id) REFERENCES items(id)
ALTER TABLE wish ADD FOREIGN KEY(wisher_id) REFERENCES people(id)


### POSTMAN 기준 확인한 REQUEST (MYSQL workbench로 중간에 값들을 확인하고 setup 하면서 진행했음)
- #### GET http://localhost:3000/items
- #### GET http://localhost:3000/items?sellerName=idOfSeller
- #### GET http://localhost:3000/items?sellerName=idOfSeller&search=item
- #### GET http://localhost:3000/items/this is ID/purchased
- #### GET http://localhost:3000/items/this is ID/wished
- #### POST http://localhost:3000/items/this is ID2/purchased/this is item ID5/?mode=purchase
- #### POST http://localhost:3000/items/this is ID/purchased/this is item ID2/?mode=auction
```
{
	"price":999999
}
```
- #### POST http://localhost:3000/items/this is ID/wished/this is item ID2
- #### DELETE http://localhost:3000/items/this is ID/wished/this is item ID2
- #### DELETE http://localhost:3000/items/this is ID/purchased/this is item ID1
- #### GET http://localhost:3000/items/idOfSeller/registered
- #### POST http://localhost:3000/items/idOfSeller/registered  
```
{
    "name": "newname",
    "place": "my home",
    "price": 39900,
    "status": "sell",
    "category": "electronics"
}
```
- #### DELETE http://localhost:3000/items/idOfSeller/registered/newname
- #### GET http://localhost:3000/members
- #### PUT http://localhost:3000/members/this is ID3
```
{
	"sid":"2017314380",
	"password":"mypwd"
}
```
- #### DELETE http://localhost:3000/members/this is ID3
- #### POST http://localhost:3000/members
```
{
    "id": "this is ID3",
    "sid": "1123456",
    "password": "pwdd",
    "name": "ysk",
    "classification": "seller",
    "phone": "010-1111-2222"
}
```
- #### POST http://localhost:3000/members/login
```
{
    "id": "this is ID3",
    "password": "pwdd"
}
```
- #### PUT http://localhost:3000/members/logout



- #### http://localhost:3000/items
- #### http://localhost:3000/items