
popUpClose();
quickListCurrentScroll();
collutionSlide();
serviceSlide();

var windowTop;
$(window).scroll(function(){
  windowTop = $(window).scrollTop();
  scrollArea (windowTop);
});

if($(window).width() > 1300 ) {
  wheelEvent();
}

//팝업창닫기
function popUpClose() {
  $("div.popup_box").click(
    function(){
      $("div.popup").hide("");
      return false;
  });
}

var page;
var posTop;
var now_page;
var sec_length = $("section").length;

function wheelEvent() {
  var $html = $("html");
  now_page = 0;
  $html.css({"overflow": "hidden"});
  $html.animate({scrollTop : 0},10);

  $(window).on("wheel", function(e) {
    if($html.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if(now_page == sec_length - 1) {
          $html.animate({scrollTop : $(window).height() * sec_length }, 500);
          return;
        } 
        now_page++;
    } else if(e.originalEvent.deltaY < 0) {
        if(now_page == 0) return;
        now_page--;
    }
    posTop = now_page * $(window).height();
    $html.animate({scrollTop : posTop}, 500);
    console.log('wheel now_page:'+now_page);
  });
}


//퀵메뉴 클릭시 섹션영역 스크롤링
var headerH = $("header").outerHeight();
var complaints = $("#complaints");
var architecture = $("#architecture");
var collution = $("#collution");
var service = $("#service");
var section = [complaints, architecture, collution, service];
var sectionTop;

function quickListCurrentScroll(){
  $("#quick ul.qlist1 li").first().addClass("active");
  $("#quick ul.qlist1 li").click(
  function(){
    now_page = $(this).index();
    sectionTop = Math.floor(section[now_page].offset().top) - headerH;
    $("body,html").animate({scrollTop: sectionTop}, 500);
    console.log('sectionTop:'+ sectionTop)
    console.log('now_page:'+now_page)
  });
}

// function quickListCurrentScroll(){
//   $("#quick ul.qlist1 li").first().addClass("active");
//   $("#quick ul.qlist1 li").click(
//   function(){
//     sectionTop = Math.floor(section[currentPage].offset().top) - headerH;
//     $("body,html").animate({scrollTop: sectionTop}, 500);
//     console.log('currentPage:'+currentPage)
//   });
// }

function scrollArea (winTop) {
  if(winTop >= section[0].offset().top - headerH){
    $("#quick ul.qlist1 li:eq(0)").addClass("active");
    $("#quick ul.qlist1 li").not("#quick ul.qlist1 li:eq(0)").removeClass("active");
  }
  if(winTop >= section[1].offset().top - headerH){
    $("#quick ul.qlist1 li:eq(1)").addClass("active");
    $("#quick ul.qlist1 li").not("#quick ul.qlist1 li:eq(1)").removeClass("active");
  }
  if(winTop >= section[2].offset().top - headerH){
    $("#quick ul.qlist1 li:eq(2)").addClass("active");
    $("#quick ul.qlist1 li").not("#quick ul.qlist1 li:eq(2)").removeClass("active");
  }
  if(winTop >= section[3].offset().top - headerH){
    $("#quick ul.qlist1 li:eq(3)").addClass("active");
    $("#quick ul.qlist1 li").not("#quick ul.qlist1 li:eq(3)").removeClass("active");
  }
}


//top btn 
$(".top_btn").click(function(){
  $("html,body").animate({scrollTop: 0},500);
});

//collution 슬라이드
function collutionSlide() {
  var slide_width = 0;
  var now_num = 0;
  var slide_length = 0;
  var auto = null;
  var $indecater = $("#collution div ul li");
  var $slide = $("#collution .slide");
  var $nextBtn = $("#collution .next");
  var $prevBtn = $("#collution .prev");
  var scrollBar = $(window).outerWidth() - $(window).innerWidth();

  function init () {
    if( $(window).width() > 1300){
      slide_width = $("#collution .slide .slide_item").width() + scrollBar;
    }
    else if ($(window).width() < 1300) {
      slide_width = $("#collution .slide .slide_item").width();
    }
    now_num = $("#collution div ul li.active").index();
    slide_length = $indecater.length;
  }

  function slideEvent () {
    $indecater.click(function () {
      now_num = $(this).index();
      slideMove();
    });
  }

  $prevBtn.click(function () {
    prevPlay();
  });

  $nextBtn.click(function () {
    nextPlay();
  });

  autoPlay();

  autoPlayStop();

  autoPlayRestart();

  resize();

  function autoPlay() {
    auto = setInterval(function() {
      nextPlay();
    }, 3000);
  }

  function autoPlayStop() {
    $indecater.mouseenter(function(){
      clearInterval(auto);
    });
  }

  function autoPlayRestart() {
    $indecater.mouseleave(function(){
      auto = setInterval(function() {
        nextPlay();
      }, 4000);
    });
  }

  function prevPlay() {
    if (now_num == 0) {
      now_num = slide_length - 1;
    } else {
      now_num--;
    }
    slideMove();
  }

  function nextPlay() {
    if (now_num == slide_length - 1) {
      now_num = 0;
    } else {
      now_num++;
    }
    slideMove();
  }

  function slideMove () {
    $slide.stop().animate({
      'margin-left': -slide_width * now_num
    });
    $indecater.removeClass("active");
    $indecater.eq(now_num).addClass("active");
  }

  function resize() {
    $(window).resize(function() {
      init();
      $slide.css({'margin-left': -slide_width * now_num});
    });
  }

  init();
  slideEvent();
}


//service 슬라이드

function serviceSlide() {
  //var slide_index = $("#service .sevice_slide .number li.active").index();
  var $indecater = $("#service .sevice_slide .number li");
  var $slide = $("#service .sevice_slide .slide");
  var slide_length = $("#service .sevice_slide .slide").length;
  var auto = 0; 
  var now_num = 0;

  autoPlay();
  autoPlayRestart();
  autoStop();

  $indecater.click(function() {
    now_num = $(this).index();
    showSlide();
  });

  function showSlide() {
    //slide_index == coun;
    $indecater.removeClass("active");
    $indecater.eq(now_num).addClass("active");
    $slide.stop(true, true).fadeOut();
    $slide.eq(now_num).stop(true, true).fadeIn();
  }

  function autoPlay() {
    auto = setInterval(function(){
      nextSlide();
    },3000);
  }

  function autoStop() {
    $indecater.mouseenter(function() {
      clearInterval(auto);
    });
  }

  function autoPlayRestart() {
    $indecater.mouseleave(function(){
      auto = setInterval(function() {
        nextSlide();
      }, 3000);
    });
  }

  function nextSlide() {
    if(now_num == slide_length - 1 ) {
      now_num = 0;
    } else {
      now_num++;
    }
    showSlide();
  }

}