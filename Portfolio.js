//changes the color of nav bar on scroll down
function checkScroll(){
    var startY = $('#nav').height() * 2; //The point where the navbar changes in px

    if($(window).scrollTop() > startY){
        $('#nav').addClass("scrolled");
        $('#text-color').addClass('scrolled');
        $('#t-color').addClass('scrolled');
        $('#t-color-1').addClass('scrolled');
        $('#t-color-2').addClass('scrolled');
        $('#t-color-3').addClass('scrolled');
        $('.icon-bar').addClass('scrolled');
        $('.navbar-toggle').addClass('scrolled');
    }//changes nav bar color back to normal when page is scrolled to top of the page
    else{
        $('#nav').removeClass("scrolled");
        $('#text-color').removeClass('scrolled');
        $('#t-color').removeClass('scrolled');
        $('#t-color-1').removeClass('scrolled');
        $('#t-color-2').removeClass('scrolled');
        $('#t-color-3').removeClass('scrolled');
        $('.icon-bar').removeClass('scrolled');
        $('.navbar-toggle').removeClass('scrolled');
    }
}

if($('#nav').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

//SMOOTH SCROLL
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

///////////////////////////typewriter code!/////////////////////////////////
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

function typeContent() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
        	new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

function fadeContent() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.fade-in').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},700);
            }
            
        }); 
    
    });
    
};

window.onload = typeContent(), fadeContent();