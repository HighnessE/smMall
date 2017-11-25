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
  "distance": "10.9km"
}
let categoryitems = [
  {
    "id": 1,
    "imgsrc": 'static/img/mall/mallfoods/classes1.png'
  },
]
let data = {
  "detailitems": detailitems,
  "banneritems": banneritems,
  "categoryitems|8": categoryitems
}
export default data
