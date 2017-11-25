/**
 * Created by wolfsheller on 2017/3/24.
 */
import Mock from 'mockjs'
const Random = Mock.Random
let searchitem = {
  "imgsrc": "static/img/agent/junior/user1.png",
  "name": Random.ctitle(3, 7),
  "money|1-100.2": 55.55
}

export default {
  "searchitem": searchitem
}
