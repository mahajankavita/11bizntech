

$(document).ready( function() {
$('input[placeholder], textarea[placeholder]').placeholder();
	$('#submit').removeAttr('disabled');
	
	$.validator.addMethod('captcha',
		function(value) {
			$result = ( parseInt($('#num1').val()) + parseInt($('#num2').val()) == parseInt($('#captcha').val()) ) ;
			$('#spambot').fadeOut('fast');
			return $result;
		},
		'Incorrect value, please try again.'
	);
	
	$('#contact').validate({
		debug: true,
		//submitHandler: ajaxSubmit
                rules: {
                    message: {
                        required: true,
                        minlength: 10,
                        maxlength: 255
                    },
					captcha: {
						required: true,
						captcha: true
					}
                },
                messages: {
                    full_name: "Please enter your full name.",
                    
                    email: {
                        required: "Email address required",
                        email: "Email address must be in the format name@domain.com."                        
                    },
                    message: {
                        required: "Message field required",
                        minlength: "Message must contain at least 10 characters.",
                        maxlength: "Message must not contain more than 255 characters."
                    },
					chkCaptcha: {
						required: "* Required"
					}
                    
                }
                
	});
	
	$('#submit').click( function() {
		if( $('#contact').valid() ) {
				ajaxSubmit();
		}
		else {
			$('label.error').hide().fadeIn('slow');
		}
	});
	
});

function ajaxSubmit() {
	$('#loading').show();
	$('#submit').attr('disabled', 'disabled');
	var country = $('#country').val();
	var state = $('#state').val();
	var city = $('#city').val();
	var latitude = $('#latitude').val();
	var longitude = $('#longitude').val();
	var ip = $('#ip').val();
	var full_name = $('#full_name').val();
	var email = $('#email').val();
	var country_code = $('#country_code').val();
	var contact = $('#contact').val();
	var whatsapp = $('#whatsapp').val();
	var shy = $('#shy').val();
	var addr = $('#addr').val();
	var budget = $('#budget').val();
	var message = $('#message').val();
	var url = $('#url').val();
	
	var data = 'country=' +country+ '&state=' +state+ '&city=' +city+ '&latitude=' +latitude+ '&longitude='
	 +longitude+ '&ip=' +ip+ '&full_name=' +full_name+ '&email=' +email+ '&country_code=' +country_code+ '&contact='
	  +contact+ '&whatsapp=' +whatsapp+ '&shy=' +shy+ '&addr=' +addr+ '&budget='
	 +budget+ '&message=' +message+ '&url=' +url;
		
	$.ajax({
		url: 'ContactSendEmail/free_quote_form',
		type: 'get',
		dataType: 'json',
		data: data,
		cache: false,
		success: function(response) {
			if( response.error != 'true' ) {
				$('#loading, #contact, .message').fadeOut('slow');
				$('#response').html('<h3>Message sent successfully!</h3>').fadeIn('slow');
            }
			else {
				$('#loading').fadeOut('slow');
				$('#submit').attr('disabled', 'disabled');
				$('#response').html('<h3>There was a problem sending mail!</h3>').fadeIn('slow');
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
                $('#loading').fadeOut('slow');
				$('#submit').removeAttr('disabled');
				//$('#response').text('Error Thrown: ' +errorThrown+ '<br>jqXHR: ' +jqXHR+ '<br>textStatus: ' +textStatus ).show();
		}
	});
	return false;
}
