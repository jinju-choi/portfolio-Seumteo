
$(document).ready(
  function(){
    $("button.zoom").click(
      function(){
        $("html").toggleClass("font_big");
      }
    );
    $("#introduce .introduce01 ul.list_box li:nth-child(1) a").addClass("list_bg");
    $("#introduce .introduce01 ul.list_box li a").click(
      function(){
        $("#introduce .introduce01 ul.list_box li a").addClass("list_bg");
        $("#introduce .introduce01 ul.list_box li a").not(this).removeClass("list_bg");
        return false;
      }
    );
  }
);