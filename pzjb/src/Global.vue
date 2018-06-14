<script>  
  // const BASE_URL = 'https://test-pazb.pingan.com.cn:20443/bss'; 
  // const BASE_URL = 'https://test-pazb.pingan.com.cn:20443'; 
  // const BASE_URL = 'http://192.168.0.143:1987';  
//   const BASE_URL = 'http://192.168.0.203:5001';  
  function getBaseUrl() {
    let urlList = [
      {key:'30.4.88.47/web/BSS_Web1',value:'30.4.88.47/bss'},
      {key:'https://test-pazb.pingan.com.cn:20443/web/BSS_Web1',value:'https://test-pazb.pingan.com.cn:20443/bss'}
    ];
    for(let i=0;i<urlList.length;i++){
        if(location.href.indexOf(urlList[i].key)>-1){
            return urlList[i].value
        }
    };
    return 'https://test-pazb.pingan.com.cn:20443/bss'
  }
  let BASE_URL = getBaseUrl();
  export default{  
    BASE_URL  
  }
</script> 