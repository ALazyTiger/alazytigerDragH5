var convertPx  = (value) =>{
  console.log(value)
  if (value == 0 || value == "" || value === null || value == undefined){
    return ""
  }else{
    return (value.substr(0, value.indexOf('rem'))*100)/2
  }
 }
var convertRem = (value) => {
  if (value == 0 || value == "" || value === null || value == undefined) {
    return ""
  } else {
    return (value.substr(0, value.indexOf('px')) * 2) / 100
  }
}

var timestampToTime = (value) => {
    if(value == 0 || value == "" || value ===null || value == undefined){
      return ' ';
    }else{
      var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      // var h = date.getHours() + ':';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      // var m = date.getMinutes()
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) ;
      // var s = date.getSeconds();
      var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
      return Y+M+D+h+m+s;
      // return Y+M+D+h+m;
    }
}

export { 
  convertPx ,
  convertRem,
  timestampToTime,
}