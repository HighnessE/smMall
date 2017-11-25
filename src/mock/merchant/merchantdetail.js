/**
 * Created by wolfsheller on 2017/3/23.
 */
import Mock from 'mockjs'
const Random = Mock.Random
let banneritems = [
  {
    imgsrc: 'static/img/merchant/merchantdetail/detail1.png'
  },
  {
    imgsrc: 'static/img/merchant/merchantdetail/detail1.png'
  },
  {
    imgsrc: 'static/img/merchant/merchantdetail/detail1.png'
  }

]
let detailitems = {
  "title": "淼鑫猪肚鸡（鹭江店）",
  "sale": "2222",
  "address": "海珠区鹭江新港西路152号斯登百货一楼",
  "distance": "10.9"
}
let merchantitems = [
  {
    "id|1-4": 1,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|20-100.1": 10.9,
    "describe": Random.ctitle(13, 15),
    "price|20-1000.2": 128,
    "coupon|1-20": 20,
    "count|1000-2000": 1922
  },
  {
    "id|1-4": 1,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|20-100.1": 10.9,
    "describe": Random.ctitle(13, 15),
    "price|20-1000.2": 128,
    "coupon|1-20": 20,
    "count|1000-2000": 1922
  },
  {
    "id|1-4": 1,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|20-100.1": 10.9,
    "describe": Random.ctitle(13, 15),
    "price|20-1000.2": 128,
    "coupon|1-20": 20,
    "count|1000-2000": 1922
  },
  {
    "id|1-4": 1,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|20-100.1": 10.9,
    "describe": Random.ctitle(13, 15),
    "price|20-1000.2": 128,
    "coupon|1-20": 20,
    "count|1000-2000": 1922
  }
]
let data = {
  "detailitems": detailitems,
  "banneritems": banneritems,
  "merchantitems": merchantitems
}
export default data
