/**
 * Created by wolfsheller on 2017/3/23.
 */
import Mock from 'mockjs'
const Random = Mock.Random
let userstatus = {
  "usernumber|20-30": 1,
  "usernumber2|20-30": 1,
  "usermoney|200-300.2": 1,
  "usermoney2|200-300.2": 1
}
let junioritems = [
  {
    "imgsrc": 'static/img/agent/junior/user1.png',
    "name": Random.ctitle(3, 7),
    "money|1-100.2": 55.55,
    "userid|100000-999999": 666666
  }
]
let junioritems2 = [
  {
    "imgsrc": 'static/img/agent/junior/user1.png',
    "name": Random.ctitle(3, 7),
    "money|1-100.2": 55.55,
    "userid|100000-999999": 666666
  }
]
export default {
  "userstatus": userstatus,
  "junioritems|8-12": junioritems,
  "junioritems2|7-13": junioritems2
}
