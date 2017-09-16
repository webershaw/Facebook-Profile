$(document).ready(function(){


	$("li").on("click", function(){
		// hiding the welcome content, setting background of content section and loader  after 'a' elements are clicked
		$("#welcome").hide();
		$("#content").css("background", "#fff");
    	$(".spinner").children().css("backgroundColor", "#3B5998");
		//end
		//functionality for medium and large devices
		if($(window).width() > 768){
			$("li").css("borderLeft", "none");
			$("a").css("color", "rgb(133, 138, 147)");
			$(this).css("borderLeft", ".5vw solid #3B5998");
			$("a", this).css("color", "black");
			
		}//functionality end
	});// end of 'on click' function



	var facebookToken = "EAACEdEose0cBAAO7mLBgfWb7Qiz5n8FUnGipEogitkNQqq9jmGUZCGvH1m2t9R3JpOm8tKSZAiFftm2gyPLWoseWa2Nu7lCTfqKZC8tZAMTKifIrPsZChVa9VsEbbVhD8ru2VnKN3PH1NfZARZB9YKxrkcmFfXJG9QyfKHHZAUqZC8ZBALUsdAR4H4zBBHgogjyZC5taVoqfmLVfgZDZD";

// ---------------------------------------------------------------------------------------------------	
	
	//getting data for welcome section
	$.ajax({
		type: "GET",
		url: "https://graph.facebook.com/v2.10/me?fields=name&access_token="+facebookToken,
		success : function(response){
			//for medium and large devices
			$("#welcome").html('<h2>Hello, '+response.name+'!</h2><h2>This Page is All About You</h2>');
			// for small devices
			$(".wel-come").html('<h3>Hello, '+response.name+'!</h3><h3>This Page is All About You</h3>');
		},
		error: function(response){
            	alert("Error validating access token: Session has expired");
        },
        beforeSend : function(){
           	$(".spinner").show();
        },

        complete : function(){
           	$(".spinner").hide();
        }
	});
	// end

// ---------------------------------------------------------------------------------------------------	

	// getting data for about me section
	$("#about").on("click", function(){
		$(".about-me").remove();
		$(".basic-info").remove();
		$(".education-info").remove();
		$(".location-info").remove();
		$.ajax({
			type: "GET",
			url: "https://graph.facebook.com/v2.10/me?fields=about&access_token="+facebookToken,
			success: function(response){
				if(response.about != null){
					//for medium and large devices
					$("#info").html('<div class= "about-me"><center><h5>About Me</h5></center><center><p>'+response.about+'</p></center</div>');
					//end
					//for small devices
					$("#about-me").text(response.about);
					//end
				}
				else{
					//for medium and large devices	
					$("#info").html('<div class= "about-me"><center><h5>About Me</h5></center><center><p>No data found</p></center</div>');
					//end
					//for small devices
					$("#about-me").text('No data found');
					}
					if($(window).width() < 768){
					$("#get-about").slideToggle("slow");
				}//end
			},

			error: function(response){
            	alert("Error validating access token: Session has expired");
            },

			beforeSend : function(){
                $(".spinner").show();
            },

            complete : function(){
               $(".spinner").hide();
            }
        });
	}); //end

// ---------------------------------------------------------------------------------------------------	
	
	// getting data for basic info section
	$("#contact").on("click", function(){
		$(".about-me").remove();
		$(".basic-info").remove();
		$(".education-info").remove();
		$(".location-info").remove();
		$.ajax({
			type: "GET",
			url: "https://graph.facebook.com/v2.10/me?fields=id,birthday,gender,email&access_token="+facebookToken,
			success : function(response){
				//for medium and large devices
				$("#info").html('<div class= "basic-info"><h5>contact information</h5><ul><li>Email <span>'+response.email+'</span></li><li>Facebook <span><a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a></span></li></ul><h5>basic information</h5><ul><li>Birthday <span>'+response.birthday+'</span></li><li>Gender <span>'+response.gender+'</span></li></ul></div>');
				//end
				// for small devices
				if ($(window).width() < 768){
				$("#get-contact").slideToggle("slow");
				}
				$("#myEmail").text(response.email);
				$("#myProfile").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
				$('#birthday').text(response.birthday);
				$('#gender').text(response.gender);
				//end
			},

			error: function(response){
            	alert("Error validating access token: Session has expired");
            },

			beforeSend : function(){
                $(".spinner").show();
            },

            complete : function(){
               $(".spinner").hide();
            }
		});
	}); //end 

// ---------------------------------------------------------------------------------------------------	

	
	//getting data for education section
	$("#education").on("click", function(){
		$(".about-me").remove();
		$(".basic-info").remove();
		$(".education-info").remove();
		$(".location-info").remove();
		$(".get-education-info").remove();
		$.ajax({
			type: "GET",
			url: "https://graph.facebook.com/v2.10/me?fields=education&access_token="+facebookToken,
			success : function(response){
				$.each(response.education, function(i, val){
					if((val.school).name != null){
						//for medium and large devices
						$("#info").append('<div class = "education-info"><h5>'+val.type+'</h5><p>'+(val.school).name+'</p></div>');
						//end
						// for small devices
						$("#get-education").append('<p class = "get-education-info">'+(val.school).name+'<br/>'+ val.type+'</p>');
						//end
					}
					else{
						//for medium and large devices
						$("#info").html('<div class = "education-info"><h5>No data found</h5></div>');
						//end
						// for small devices
						$("#get-education").html('<p class = "get-education-info">No data found</p>');
						//end
					} 
				});
				if($(window).width() <768){
					$("#get-education").slideToggle("slow");
				}
			},
			error: function(response){
                	alert("Error validating access token: Session has expired");
            },

			beforeSend : function(){
                $(".spinner").show();
            },

            complete : function(){
                   $(".spinner").hide();
            }
		});
	});// end 

// ---------------------------------------------------------------------------------------------------	

	// getting data for places section
	$("#places").on("click", function(){
		$(".about-me").remove();
		$(".basic-info").remove();
		$(".education-info").remove();
		$(".location-info").remove();
		$.ajax({
			type: "GET",
			url: "https://graph.facebook.com/v2.10/me?fields=hometown,location&access_token="+facebookToken,
			success : function(response){
				//for medium and large devices
				$("#info").html('<div class= "location-info"><h5>hometown</h5><p>'+response.hometown.name+'</p><h5>current city</h5><p>'+response.location.name+'</p></div>');
				//end
				// for small devices
				$('#hometown').text(response.hometown.name);
				$('#current').text(response.location.name);
				
				if ($(window).width() < 768){
				$("#get-places").slideToggle("slow");
				}
				//end
			},

			error: function(response){
            	alert("Error validating access token: Session has expired");
            },

			beforeSend : function(){
                $(".spinner").show();
            },

            complete : function(){
               $(".spinner").hide();
            }
		}); 
	});// end 

// ---------------------------------------------------------------------------------------------------	
});
