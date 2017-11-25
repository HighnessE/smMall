/**
 * Created by wolfsheller on 2017/3/24.
 */
import Mock from 'mockjs'
const Random = Mock.Random

let banneritem = 'static/img/coupon/coupon/banner.jpg'
let packet = {
  money: "10.00",
  imgsrc: "static/img/coupon/coupon/packet.png"
}
let packet_status = ["0", "1"]
let couponnum = "12"
let totalitems = [
  {'type': '0', 'msg': '推荐', 'boolean': true},
  {'type': '1', 'msg': '女装', 'boolean': false},
  {'type': '2', 'msg': '数码家电', 'boolean': false},
  {'type': '3', 'msg': '男装', 'boolean': false},
  {'type': '4', 'msg': '鞋品箱包', 'boolean': false},
  {'type': '5', 'msg': '运动', 'boolean': false},
  {'type': '6', 'msg': '美食', 'boolean': false},
  {'type': '7', 'msg': '居家', 'boolean': false},
  {'type': '8', 'msg': '配饰', 'boolean': false},
  {'type': '9', 'msg': '内衣', 'boolean': false},
  {'type': '10', 'msg': '美妆', 'boolean': false},
  {'type': '11', 'msg': '母婴儿童', 'boolean': false},
  {'type': '12', 'msg': '家纺', 'boolean': false},
  {'type': '13', 'msg': '中老年', 'boolean': false}
]
let couponmodule = [
  {
    "type": "0",
    "number|1-15": 15,
    "condition": "特价优惠",
    "describe": "可累计叠加使用100张",
    "deadline": "有效期至2017年12月31日"
  },
  {
    "type": "1",
    "number|1-15": 15,
    "condition": "限女装使用",
    "describe": "可累计叠加使用100张",
    "deadline": "有效期至2017年12月31日"
  },
  {
    "type": "2",
    "number|1-15": 15,
    "condition": "限数码家电使用",
    "describe": "可累计叠加使用100张",
    "deadline": "有效期至2017年12月31日"
  },
  {
    "type": "3",
    "number|1-15": 15,
    "condition": "限男装使用",
    "describe": "可累计叠加使用100张",
    "deadline": "有效期至2017年12月31日"
  },
  {
    "type": "4",
    "number|1-15": 15,
    "condition": "限鞋品箱包使用",
    "describe": "可累计叠加使用100张",
    "deadline": "有效期至2017年12月31日"
  }
]
export default {
  "totalitems": totalitems,
  "couponmodule|3-5": couponmodule,
  "packet": packet,
  "couponnum": couponnum,
  "banneritem": banneritem,
  "packet_status|1": packet_status
}
