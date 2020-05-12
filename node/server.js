const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const router = express.Router()

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By',' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next();
})

app.use(bodyParser.json()); //解析json数据
app.use(bodyParser.urlencoded({ extended: true })); //解析form表单提交上来的数据
app.use('/mock', router)

var fs = require('fs');

router.post('/getJson', function (req, res) {
  readJson(req, res)
})

router.post('/saveJson', function (req, res) {
  writeJson(req, res)
})

//读json 获取最新的数据
function readJson(req, res) {
  fs.readFile('./mock/page.json', function (err, data) {
    if (err) {
      res.json({
        "result": false,
        "msg": '数据读取失败',
        "data": err.toString()
      })
    } else {
      var json = data.toString()
      json = JSON.parse(json)
      var schema = json.page.schema[json.page.schema.length - 1]
      res.json({
        "result": true,
        "msg": '数据读取成功',
        "data": schema
      })
    }
  })
}

// 写json 每次保存数组在数据添加
function writeJson(req, res) {
  fs.readFile('./mock/page.json', function (err, data) {
    if (err) {
      res.json({
        "result": false,
        "msg": '数据读取失败',
        'errorDetail': err.toString()
      })
    } else {
      var json = data.toString()
      json = JSON.parse(json)
      let schema = json.page.schema
      let param = req.body
      schema.push(param.schema)
      var newJson = JSON.stringify(json)
      fs.writeFile('./mock/page.json', newJson,  function(err) {
        if (err) {
          res.json({
            "result": false,
            "msg": '保存失败',
            "data": err.toString()
          })
        }else{
          res.json({
            "result": true,
            "msg": '保存成功'
          });
        } 
      })
    }
  })
}


var server = app.listen(3000, function() {

	var host = server.address().address
	var port = server.address().port

	console.log('http://%s:%s', host, port)
})