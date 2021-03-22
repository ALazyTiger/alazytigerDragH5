import axios from 'axios'
import router from '../router'
// import {Message} from 'element-ui' //引入element的消息框，用于post修改请求时的消息提示，可选
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
require("promise.prototype.finally").shim();
// import store from '@/store/store.js' //引入vuex中的状态，引用名和路径根据项目实际情况，可选
var domain = ''; //api域名 
var FileHost = ''; //图片上传域名
var config = {
    headers: {
        'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
    }
}
var baseParams = { //基础参数
    // token: "",
    // userid: 0
    //......
};


//封装get方法
function dataGet(apiName, params, callback) {
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]); //init方法实现见后
    var nparams = obj.nparams;
    callback = obj.callback;
    Loading.open('加载中...');
    axios.get(url, { params: nparams }).then((response) => {
        var all = response; //返回所有数据
        var data = response.data; //根据后端实际返回修改
        //根据后端实际返回修改
        if (all.status == 200) { //成功
            if (callback) callback(data, all);
        } else if (all.status == 401) { //未登陆
            eventBus.$emit('loginData')
        } else { //失败
            Toast({ mes: all.msg, icon: 'error' });
            console.log(all.status, all.msg);
        }
    }).catch((error) => {
        console.log(error);
    }).finally(() => { //单独处理loading
        Loading.close();
    });
}
//封装delete方法
function dataDelete(apiName, params, callback) {
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]); //init方法实现见后
    var nparams = obj.nparams;
    callback = obj.callback;
    Loading.open('删除中请稍后...');
    axios.delete(url, { params: nparams }).then((response) => {
        var all = response; //返回所有数据
        var data = response.data; //根据后端实际返回修改
        //根据后端实际返回修改
        if (all.status == 200) { //成功
            if (callback) callback(data, all);
        } else { //失败
            Toast({ mes: all.msg, icon: 'error' });
            console.log(all.status, all.msg);
        }
    }).catch((error) => {
        console.log("--------------------");
        console.log(error);
    }).finally(() => { //单独处理loading
        Loading.close();
    });
}
//封装post方法
function dataPost(apiName, params, callback) {
    var url = domain + apiName;
    var obj = initFn(params, callback, arguments[1]);
    var nparams = obj.nparams;
    callback = obj.callback;
    Loading.open('提交中请稍后...');
    axios.post(url, nparams).then((response) => {
        var all = response;
        var data = response.data; //根据后端实际返回修改
        //根据后端实际返回修改
        console.log(all)
        if (all.status == 200) { //成功
            if (callback) callback(data, all);
        } else { //失败
            console.log(all.status, all.message);
        }
    }).catch((error) => {
        console.log(error);
    }).finally(() => { //单独处理loading
        Loading.close();
    });
}
//封装带消息提示的post方法
function dataPostXD(apiName, params, callback) {
    var url = FileHost + apiName;
    Loading.open('文件上传中请稍后...');

    axios.post(url, params, config).then((response) => {
        var all = response;
        var data = response.data; //根据后端实际返回修改
        //根据后端实际返回修改
        if (all.status == 200) { //成功
            if (callback) callback(data, all);
        } else { //失败
            Toast({ mes: all.msg, icon: 'error' });
            console.log(all.status, all.msg);
        }

    }).catch((error) => {
        console.log(error);
        Loading.close();
        Toast({ mes: '操作失败！', icon: 'error' });
    }).finally(() => { //单独处理loading
        Loading.close();
    });
}
//initFn方法
function initFn(params, callback, argument) {
    //如果没有参数
    if (typeof argument == "function") {
        callback = argument;
        params = {};
    }
    //对象合并,确定最终参数
    return {
        // nparams: $.extend({}, params, baseParams), // 此处为jquery的对象合并的方法，可由 Object.assign() 代替
        nparams: Object.assign({}, params, baseParams),
        callback: callback
    }
}



export {
    dataGet,
    dataPost,
    dataDelete,
    dataPostXD
}