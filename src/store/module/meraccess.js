/**
 * Created by wolfsheller on 2017/4/25.
 * 同城商家申请模块的信息
 */
export default {
  state: {
    uploadobj: {
      bname: '',
      fcateid: 0,
      scateid: 0,
      fcate: '请选择所属行业',
      scate: '请选择对应行业分类',
      partment: '',
      address: '',
      username: '',
      phone: '',
      map: '',
      // 添加地址数据是否成功
      ifhavasetmap: false
    },
    // 是否有行业分类
    ifhascate: true
  }
}
