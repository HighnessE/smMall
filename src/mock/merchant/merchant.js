/**
 * Created by wolfsheller on 2017/3/22.
 */
import Mock from 'mockjs'
const Random = Mock.Random
let categoryitems = [
  {
    "name": Random.ctitle(3, 5),
    "category|12-15": ['fasf']
  }
]
let optionitems = [
  // {
  //   "imgsrc": "static/img/merchant/merchant/logo5.png",
  //   "title": "超市"
  // },
  {
    "imgsrc": "static/img/merchant/merchant/logo1.png",
    "title": "美食"
  },
  {
    "imgsrc": "static/img/merchant/merchant/logo2.png",
    "title": "娱乐"
  },
  {
    "imgsrc": "static/img/merchant/merchant/logo3.png",
    "title": "KTV"
  },
  {
    "imgsrc": "static/img/merchant/merchant/logo4.png",
    "title": "电影"
  }
]
let merchantitems = [
  {
    "id|2-5": 2,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|5-30.1": 10.9,
    "address": Random.ctitle(18, 20),
  },
  {
    "id|2-5": 2,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|5-30.1": 10.9,
    "address": Random.ctitle(18, 20),
  },
  {
    "id|2-5": 2,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|5-30.1": 10.9,
    "address": Random.ctitle(18, 20),
  },
  {
    "id|2-5": 2,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|5-30.1": 10.9,
    "address": Random.ctitle(18, 20),
  },
  {
    "id|2-5": 2,
    "imgsrc": "static/img/merchant/merchant/merchant1.png",
    "title": Random.ctitle(3, 5),
    "distance|5-30.1": 10.9,
    "address": Random.ctitle(18, 20),
  }
]
export default {
  "categoryitems|12-15": categoryitems,
  "optionitems": optionitems,
  "merchantitems|10": merchantitems
}

