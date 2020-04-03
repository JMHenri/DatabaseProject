$(()=>{
  $('#loginForm').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'/api/login',
        type:'post',
        data:$('#loginForm').serialize(),
        success:function(res){
          if(res == true) {
            document.location = "/dashboard.html";
          }
        }
    });
  });
})
