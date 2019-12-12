# useful sql snippets
INSERT INTO people(id, sid, password, name, classification, phone) VALUES ("this is ID","this is SID","this is PWD","this is Name", "seller", "000-1111-2222");

INSERT INTO items(id, name, place, price, status, seller_id, auction_history, auction_expire_time, wished_number, category) VALUES ("this is item ID","item name","placeee",39900, "sell", "idOfSeller", "no history here", NULL, 0);

ALTER TABLE wish ADD FOREIGN KEY(item_id) REFERENCES items(id)
ALTER TABLE wish ADD FOREIGN KEY(wisher_id) REFERENCES people(id)


### POSTMAN 기준 확인해야 하는 URL
- #### http://localhost:3000/items
- #### http://localhost:3000/items?sellerName=idOfSeller
- #### http://localhost:3000/items?sellerName=idOfSeller&search=item
- #### http://localhost:3000/items/buyer1/purchased
- #### http://localhost:3000/items
- #### http://localhost:3000/items