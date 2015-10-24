var path = require('path')
var libs = require('../../libs/libs')
var api = require('../../apis/javaapi');
var config = require('../../config')
// var rct = require('../../modules/parseReact');

function *demoIndexData(oridata){
    libs.wlog('pages/weixin/userlist')
    var dataSet = {};
    var infoCat =[];
    var mtd = this.method;
    if(mtd==='GET'){

        //请求信息数据
        // for (var i = 0; i < catId.length; i++) {
        // var catData = [];
        // var boothData = [];
        //     catData = yield api.pullApiData('index_cat',{
        //         'catId': catId[i],
        //         'listNum': 20
        //     });
        //
        //     boothData = yield api.pullApiData('index_booth',{
        //         'boothNo': boothNo[i]
        //     });
        //
        //
        //     catData = JSON.parse(catData[1]);
        //     boothData = JSON.parse(boothData[1]);
        //     if(catData.success){
        //             //成功获取数据
        //         var catHtml = rct('index_info_list',{
        //             data: catData.data,  //数组
        //             booth:boothData.data.booth
        //         });
        //         infoCat.push(catHtml);
        //     }
        //
        // };

    // oridata = libs.$extend(true,oridata,dataSet);
    return oridata;
    }

    if(mtd === 'POST'){

        var postdata = {}

        var body = yield libs.$parse(this);
        if(body){
            if(body.code)
                postdata = body
                var web_token = yield api.pullWxData.call(this, 'wx_web_token', postdata)

                postdata={
                    access_token: this.sess.wwx.token,
                    openid: this.sess.wwx.openid,
                    lang: 'zh_CN'
                }
                var web_userinfo = yield api.pullWxData.call(this, 'userinfo_web', postdata)
                web_userinfo = web_userinfo[0].body
                libs.clog('从微信拉取用户信息')
                console.log(web_userinfo);
                return web_userinfo;
        }else{
            return {code: 1, message: '微信号没有绑定'}
        }


        // var qd = qcjcdata[1].results[0];
        // var serviceData = yield api.pullApiData('service', postdata, 'post')
        // // serviceData[1].results.push(qd);
        // console.log(serviceData[1]);


        // return serviceData[1];
    }



}

module.exports = {
    getData : demoIndexData
}