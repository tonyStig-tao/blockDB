var Base64 = require('js-base64').Base64;
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;
var WebSocket = require('ws');
var dburl = 'mongodb://127.0.0.1:27017/';
var wsURL = 'ws://172.28.152.101:8002/ws';
var ws = new WebSocket(wsURL);

module.exports = function (){
  MongoClient.connect(dburl, { useNewUrlParser: true }, (err, db) => {
    if (err) {throw err;}
    console.log('数据库连接成功');
    var dbo = db.db('blockDB');
    runws(dbo, db);
  });
};

function runws (dbo, db) {
  ws.onopen = () => {
    console.log('socket open');
    var startMsg = '{"event":"new_tx"}';
    ws.send(startMsg);
    ws.onmessage = (data) =>{
      var indata = JSON.parse(data.data).nodes;
      indata.map((item) => {
        if (item.type === 4){
          item.data = JSON.parse(Base64.decode(item.data));
          item.data.timestamp = item.data.timestamp * 1000;
          item.data.timestamp = moment(item.data.timestamp).format('YYYY-MM-DD HH:mm:ss');
          item.type = item.type.toString();
          item.primaryKey = item.data.primary_key;
          item.op = item.data.data.op;
          item.dbUser = item.data.data.db_user;
          item.db = item.data.data.db;
          item.collection = item.data.data.collection;
          console.log(item);
          insertData(dbo, db, item);
        }
      });
    };
  };
}

function insertData (dbo, db, item) {
  dbo.collection('queryblockdb').insertOne(item, (err, res) => {
    if (err) {
      db.close();
      init();
    }
    console.log('插入成功');
  });
}
