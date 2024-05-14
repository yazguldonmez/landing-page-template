//lazyload
$(document).ready(function () {
  $(window).scroll(function () {
    $(".lazy").each(function () {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() + 100) {
        $(this).attr("src", $(this).attr("data-src"));
      }
    });
  });
});

//preloader
window.addEventListener("load", function () {
  var preloader = this.document.querySelector(".preloader");
  preloader.style.display = "none";
});

//Home slider
var fullSlider = new Swiper(".full-slider", {
  loop: true,
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

//Partner slider
var partnerSwiper = new Swiper(".partners-slider", {
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    300: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    loop: true
  },
});

//Smooth scroll
$(document).ready(function () {
  $("nav a").click(function () {
    var address = $(this).attr("href");
    if (address != "") {
      $("html,body").animate(
        {
          scrollTop: $(address).offset().top,
        },
        800
      );
    }
  });

  //Sticky Header
  var headerPosition = $(".header").offset().top;
  $(window).scroll(function () {
    var scrollValue = $(window).scrollTop();
    if (scrollValue > headerPosition) {
      $(".header").addClass("sticky-header");
    } else {
      $(".header").removeClass("sticky-header");
    }
  });

  //Header animate
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").css({ visibility: "visible", opacity: 1 });
    } else {
      $("#back-to-top").css({ visibility: "hidden", opacity: 0 });
    }
    $(".section-header").each(function () {
      var headTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > headTop) {
        $(this).animate({ opacity: "1" }, 1200);
      }
    });
  });

  //back-to-top scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").css({ visibility: "visible", opacity: 1});
    } else {
      $("#back-to-top").css({ visibility: "hidden", opacity: 0 });
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("section#home").offset().top,
      },
      1000
    );
  });
});

//AJAX form
let form = document.querySelector("#contactForm");

function processForm(e) {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;
  if (name == "" || email == "" || message == "") {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Please fill in all empty fields"
    });
  } else {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    function request(method, url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        try {
          onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(xhr.response);
              }
            }
          }
          xhr.open(method, url, true);
          xhr.send(formData);
        } catch (error) {
          reject(error);
        }
      })
    }
    request("POST", "ajax.php")
    .then((res) => Swal.fire({
      icon: "success",
      title: "Success",
      text: res
    }))
    .catch((err) => Swal.fire({
      icon: "error",
      title: "Error",
      text: err
    }));
  }
  e.preventDefault();
}
form.addEventListener("submit", processForm);