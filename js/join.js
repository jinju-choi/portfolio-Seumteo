$(document).ready(
  function(){
    $("button.dark").click(
      function(){
        $("body").toggleClass("dark");
      }
    );//클릭하면 실행하시오
    $("body").css("background-color","white");
  }
);