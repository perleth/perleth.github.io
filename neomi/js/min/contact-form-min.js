$(document).ready(function () {
  
  //For Header Subscribe Form
  var mailchimp = $('.subscribe-form'),
      $subscribeButton = $(".subscribe-submit");
  if (mailchimp.length) {
    for (var i = 0; i < mailchimp.length; i++) {
      var $mailchimpItem = $(mailchimp[i]),
          $email = $mailchimpItem.find('input[type="email"]');
      
      // Required by MailChimp
      $mailchimpItem.attr('novalidate', 'true');
      $email.attr('name', 'EMAIL');
      
      $mailchimpItem.on('submit', $.proxy(function ($email, event) {
        event.preventDefault();
        var $this = this;
        var data = {},
            url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
            dataArray = $this.serializeArray(),
            $output = $("." + $this.attr("data-form-output"));
        //While loading
        $subscribeButton.html('<span style="opacity: 0">Subscribe</span><i class="fa fa-spinner fa-spin"></i>');
        for (i = 0; i < dataArray.length; i++) {
          data[dataArray[i].name] = dataArray[i].value;
        }
        
        $.ajax({
          data: data,
          url: url,
          dataType: 'jsonp',
          //if response is error
          error: function (resp, text) {
            $output.html('<i class="red-text fa-lg fa fa-times-circle"></i> ' + 'Error: ' + text + ' - Check your internet connection');
            $subscribeButton.html('<span>Subscribe</span><i class="fa fa-heart"></i>');
          },
          //If response is success
          success: function (resp) {
            if (resp.msg.indexOf('0') > -1) {
              //If not subscribed
              var newMsg = resp.msg.replace('0', '').replace('-', '');
              $output.html('<i class="red-text fa-lg fa fa-times-circle"></i> ' + newMsg);
              //If subscribed
            } else {
              $output.html('<i class="green-text fa-lg fa fa-check-circle-o"></i> ' + resp.msg);
            }
            var $label = $('[for="' + $email.attr('id') + '"]');
            if ($label.length) $label.removeClass('focus not-empty');
            $subscribeButton.html('<span>Subscribe</span><i class="fa fa-heart"></i>');
          },
          beforeSend: function (data) {
            var isValidated = (function () {
              var results, errors = 0;
              var elements = $this.find('[data-constraints]');
              var captcha = null;
              if (elements.length) {
                for (var j = 0; j < elements.length; j++) {
                  var $input = $(elements[j]);
                  if ((results = $input.regula('validate')).length) {
                    for (var k = 0; k < results.length; k++) {
                      errors++;
                      $input.siblings(".form-validation").text(results[k].message);
                    }
                  } else {
                    $input.siblings(".form-validation").text("")
                  }
                }
                if (captcha) {
                  if (captcha.length) {
                    return validateReCaptcha(captcha) && errors === 0
                  }
                }
                return errors === 0;
              }
              return true;
            })();
            // Stop request if inputs are invalid
            if (!isValidated)
              return false;
            $output.html('<i class="fa fa-spinner fa-lg fa-spin green-text"></i> Submitting...')
          }
        });
        return false;
      }, $mailchimpItem, $email));
    }
  }
  
  //For Contact Form
  var contactButton = $("#contact-submit");
  contactButton.on('click', function (e) {
    e.preventDefault();
    
    // Get input field values of the contact form
    var contactFormInputs = $('#contact-form :input'),
        contactChecking = $('#contact-check-spam').val(),
        contactName = $('#contact-name').val(),
        contactEmail = $('#contact-email').val(),
        contactMessage = $('#contact-message').val(),
        contactAlertMessage = $('#contact-alert-message');
    
    // Disable Inputs and display a loading message
    contactAlertMessage.html('<p><i class="fa fa-spinner fa-spin"></i> Sending Message..</p>');
    contactFormInputs.prop("disabled", true);
    
    // Data to be sent to server
    var post_data = {
      'form': 'contactForm',
      'contactSpamChecking': contactChecking,
      'contactName': contactName,
      'contactEmail': contactEmail,
      'contactMessage': contactMessage
    };
    
    // Ajax post data to server
    $.post('./php/contact.php', post_data, function (response) {
      
      
      // Load jsn data from server and output message
      if (response.type === 'error') {
        
        contactAlertMessage.html('<p><i class="fa fa-times-circle"></i> ' + response.text + '</p>');
        contactFormInputs.prop("disabled", false);
        
      } else {
        
        contactAlertMessage.html('<p><i class="fa fa-check-circle-o"></i> ' + response.text + '</p>');
        
        // After, all the fields are reset and enabled
        contactFormInputs.prop("disabled", false);
        $('#contact-name').val('');
        $('#contact-email').val('');
        $('#contact-message').val('');
        
      }
      
    }, 'json');
    
  });
  
});

