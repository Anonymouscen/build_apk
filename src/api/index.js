import request from '@/axios'

let url = "http://fj.fungee.cn";

// 获取模型viewtoken
export function getViewtoken(data) {
  return request({
    url: url+"/api/Cmsdata/getViewtoken",
    method: "post",
    data
  })
}
