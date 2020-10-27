

//------------------ gallery------------------
// Gallery image hover
$( ".img-wrapper" ).hover(
	function() {
	  $(this).find(".img-overlay").animate({opacity: 1}, 300);
	}, function() {
	  $(this).find(".img-overlay").animate({opacity: 0}, 300);
	}
  );
  
  // Lightbox
  var $overlay = $('<div id="overlay"></div>');
  var $image = $("<img>");
  var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
  var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
  var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');
  
  // Add overlay
  $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
  $("#gallery").append($overlay);
  
  // Hide overlay on default
  $overlay.hide();
  
  // When an image is clicked
  $(".img-overlay").click(function(event) {
	// Prevents default behavior
	event.preventDefault();
	// Adds href attribute to variable
	var imageLocation = $(this).prev().attr("href");
	// Add the image src to $image
	$image.attr("src", imageLocation);
	// Fade in the overlay
	$overlay.fadeIn("slow");
  });
  
  // When the overlay is clicked
  $overlay.click(function() {
	// Fade out the overlay
	$(this).fadeOut("slow");
  });
  
  // When next button is clicked
  $nextButton.click(function(event) {
	// Hide the current image
	$("#overlay img").hide();
	// Overlay image location
	var $currentImgSrc = $("#overlay img").attr("src");
	// Image with matching location of the overlay image
	var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
	// Finds the next image
	var $nextImg = $($currentImg.closest(".image").next().find("img"));
	// All of the images in the gallery
	var $images = $("#image-gallery img");
	// If there is a next image
	if ($nextImg.length > 0) { 
	  // Fade in the next image
	  $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(500);
	} else {
	  // Otherwise fade in the first image
	  $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(500);
	}
	// Prevents overlay from being hidden
	event.stopPropagation();
  });
  
  // When previous button is clicked
  $prevButton.click(function(event) {
	// Hide the current image
	$("#overlay img").hide();
	// Overlay image location
	var $currentImgSrc = $("#overlay img").attr("src");
	// Image with matching location of the overlay image
	var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
	// Finds the next image
	var $nextImg = $($currentImg.closest(".image").prev().find("img"));
	// Fade in the next image
	$("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(500);
	// Prevents overlay from being hidden
	event.stopPropagation();
  });
  
  // When the exit button is clicked
  $exitButton.click(function() {
	// Fade out the overlay
	$("#overlay").fadeOut("normal");
  });
//------------------ /gallery------------------
// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights
