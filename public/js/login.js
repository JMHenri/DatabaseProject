$('#loginForm').submit(function(e){
  alert('df')
  e.preventDefault();
  $.ajax({
      url:'/api/login',
      type:'post',
      data:$('#myForm').serialize(),
      success:function(){
          //whatever you wanna do after the form is successfully submitted
      }
  });
});