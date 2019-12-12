let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let session = require('express-session');

// mysql connection init start
const { sqlConfig } = require('../secrets/sqlconfig')


const mysql = require('mysql');
let pool = mysql.createPool(sqlConfig);
// mysql connection init end




router.get('/', function (req, res, next) { // GET /members : response로 [{buyer|seller}, ...] get

    let sqlQuery = `SELECT * FROM people where classification <> "manager" `
    // Get Connection in Pool
    pool.getConnection(function (err, connection) {
        if (!err) {
            //connected!
        }

        connection.query(sqlQuery, function (err, rows, fields) {
            if (!err) {
                console.log('The solution is: ', rows);
                res.status(200).send(rows)
            }
            else
                console.log('Error while performing Query.', err);
        });

        // 커넥션을 풀에 반환
        connection.release();
    });
});

router.put('/:member_id', function (req, res, next) { // PUT /members/:member_id : body로 {[sid[, password[, name[, classification]]]]} put 가능 (update)
    let member_id = req.params.member_id
    let {sid, password, name, classification} = req.body
    let setArr = []// set Query list
    if(sid!==undefined) setArr.push(`sid='${sid}'`)
    if(password!==undefined) setArr.push(`password='${password}'`)
    if(name!==undefined) setArr.push(`name='${name}'`)
    if(classification!==undefined) setArr.push(`classification='${classification}'`)
    if(setArr.length === 0) {
        res.status(400).send('there is no value to update')
        return
    }
    let sqlQuery = `UPDATE people SET ${setArr.join(',')} WHERE id='${member_id}'`
    // Get Connection in Pool
    pool.getConnection(function (err, connection) {
        if (!err) {
            //connected!
        }

        connection.query(sqlQuery, function (err, rows, fields) {
            if (!err) {
                console.log('The solution is: ', rows);
                res.status(204).send()
            }
            else
                console.log('Error while performing Query.', err);
        });

        // 커넥션을 풀에 반환
        connection.release();
    });
});

router.delete('/:member_id', function (req, res, next) { // DELETE /members/:member_id :해당 member_id의 member를 삭제한다.  
    let member_id = req.params.member_id
    let sqlQuery = `DELETE from people where id='${member_id}'`
    // Get Connection in Pool
    pool.getConnection(function (err, connection) {
        if (!err) {
            //connected!
        }

        connection.query(sqlQuery, function (err, rows, fields) {
            if (!err) {
                console.log('The solution is: ', rows);
                res.status(204).send()
            }
            else
                console.log('Error while performing Query.', err);
        });

        // 커넥션을 풀에 반환
        connection.release();
    });
});

router.post('/', function (req, res, next) { // POST /members : body로 {id:아이디, sid:학번, password:비밀번호, name:이름, classification:("manager"|"seller"|"buyer"), 
    let {id, sid, password, name, classification} = req.body
    password = crypto.createHash('sha512').update(password).digest('base64'); // hash the password
    // Get Connection in Pool
    pool.getConnection(function (err, connection) {
        if (!err) {
            //connected!
        }
        let sqlQuery = `GET * from people where id=${member_id}` // first check if any duplicate of id
        
        connection.query(sqlQuery, function (err, rows, fields) {
            if (!err) {
                console.log('The solution is: ', rows);
                // 중복이 없다면
                sqlQuery = `INSERT INTO people(id, sid, password, name, classification) VALUES('${id}', '${sid}', '${password}', '${name}', '${classification}')`
                connection.query(sqlQuery, function (err, rows, fields) {
                    if (!err) {
                        console.log('The solution is: ', rows);
                        res.status(201).send()
                    }
                    else
                        console.log('Error while performing Query.', err);
                });
            }
            else
                console.log('Error while performing Query.', err);
        });

        // 커넥션을 풀에 반환
        connection.release();
    });
});

router.post('/login', function (req, res, next) { // POST /members/login : body로 {id:아이디, password:비밀번호} post하면, response로 user정보를 받아온다
    let {id, password} = req.body
    password = crypto.createHash('sha512').update(password).digest('base64'); // hash the password
    pool.getConnection(function (err, connection) {
        if (!err) {
            //connected!
        }
        let sqlQuery = `GET * from people where id=${id}` // id에 맞는 user 정보를 받아온다.
        
        connection.query(sqlQuery, function (err, rows, fields) {
            if (!err) {
                console.log('The solution is: ', rows);
                if(password === rows.password) {
                    session = req.session
                    // session.userId
                    // session.userName
                    res.status(200).send() // 세션을 만들어서 유저에게 세션 id를 보낸다.
                }
                else { // 비밀번호가 다른 경우
                    
                }
            }
            else // 아이디가 존재하지 않는 경우
                console.log('Error while performing Query.', err);
        });

        // 커넥션을 풀에 반환
        connection.release();
    });
});

router.put('/logout', function (req, res, next) { // PUT /members/logout : 로그아웃한다. 현재 세션을 종료한다.
    req.session.destory();  // 세션 삭제
    res.clearCookie('sid'); // 세션 쿠키 삭제
    res.send.status(200).send()
});


module.exports = router;