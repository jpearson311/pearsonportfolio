// JavaScript Document
window.onload = function(){
	
	// Sticky header
	var header = document.getElementById("header");
	
	window.onscroll = function(){
		if(window.pageYOffset > header.offsetHeight){
			header.classList.add("sticky");	
		}
		if(window.pageYOffset <= header.offsetHeight && header.classList.contains("sticky")){
			header.classList.remove("sticky");	
		}
	}
	// End sticky header
	
	// Mobile nav
	if(window.innerWidth < 1024){
		var nav = document.getElementById("navMenu"),
			thumb = document.getElementById("thumb"),
			a = document.getElementById("navMenu").getElementsByTagName("a");
			
		function animateNav(elm) {
			nav.classList.toggle("active");
			elm.classList.toggle("active");
		}
	
		thumb.onclick = function(){
			animateNav(this);
		};
		
		for(var i=0; i<a.length; i++){
			a[i].onclick = function(){
				nav.classList.remove("active");
				thumb.classList.remove("active");
			}
		}
	}
	// End mobile nav
};

// JQuery
$(document).ready(function(e) {
	
	// Code for the read more buttons
	// I had to used JQuery to get the previous elements and to slideToggle the appropriate divs
	
	// Buttons
	var readMoreBtn    = $(".read-more-btn"),
		readMoreBioBtn = $(".read-more-bio-btn");
		
	// Click event for all buttons that slideToggle
	readMoreBtn.on("click", function(e){
		var dots = $(this).prev(".description").find(".dots"),
		readMore = $(this).prev(".description").find(".read-more");
		
		dots.toggle();
		readMore.slideToggle();
		
		toggleText(this);
	});
	
	// Click event for Bio section show/hide
	readMoreBioBtn.on("click", function(e){
		var dots = $(this).prev(".description").find(".dots"),
		readMore = $(this).prev(".description").find(".read-more");
		
		dots.toggle();
		readMore.toggle();
		
		toggleText(this);
	});
	
	// Toggle button text
	function toggleText(el){
		$(el).text(function(i, text){
			return text === "Read More..." ? "...Read Less" : "Read More...";
		});
	}
	
	// Contact form
	
	$("#contactForm").on("submit", function(e){
		e.preventDefault();
		$("#sendBtn").addClass("active");
		
		var data = $(this).serialize();
		
		$.ajax({
			url : "contact.php",
			method : "POST",
			dataType : "json",
			data : data,
			success : function(data, textStatus){
				if(data.status == "error"){
					error(data.message);	
				}
				if(data.status == "success"){
					success(data.message);	
				}
			},
			error : function(textStatus, errorThrown){
				error(errorThrown);
			}
		});
	});
	
	var notifications = $("#notifications"),
		notice		  = $("#notice");
	
	function success(msg){
		
		if(notifications.hasClass("hidden")){
			notifications.removeClass("hidden");	
		}
		if(!notifications.hasClass("visible")){
			notifications.addClass("visible");
		}
		if(notifications.hasClass("error")){
			notifications.removeClass("error");	
		}
		if(!notifications.hasClass("success")){
			notifications.addClass("success");	
		}
		
		notice.text(msg);
		$("#sendBtn").removeClass("active");
	}
	
	function error(error){
		
		if(notifications.hasClass("hidden")){
			notifications.removeClass("hidden");	
		}
		if(!notifications.hasClass("visible")){
			notifications.addClass("visible");
		}
		if(notifications.hasClass("success")){
			notifications.removeClass("success");	
		}
		if(!notifications.hasClass("error")){
			notifications.addClass("error");	
		}
		
		notice.text(error);
		$("#sendBtn").removeClass("active");
	}
	
	var closer = $("#closer");
	
	closer.on("click", function(){
		notifications.removeClass("visible").addClass("hidden");
	});
	
	// End contact form
});