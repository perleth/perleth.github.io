$(document).ready(function(){var a=$("#contact-submit");a.on("click",function(t){t.preventDefault();var c=$("#contact-form :input"),e=$("#contact-check-spam").val(),n=$("#contact-name").val(),s=$("#contact-email").val(),l=$("#contact-message").val(),o=$("#contact-alert-message");o.html('<p style="opacity: 1"><i class="fa fa-spinner fa-spin text-success"></i> Sending Message..</p>'),a.html('<i class="fas fa-spinner fa-spin"></i>'),c.prop("disabled",!0);var i={form:"contactForm",contactSpamChecking:e,contactName:n,contactEmail:s,contactMessage:l};$.post("./php/bat/contact-form-gmail.php",i,function(t){"error"===t.type?(o.html('<p><i class="fa-lg far fa-times-circle text-danger"></i> '+t.text+"</p>"),a.html("Send"),c.prop("disabled",!1)):(o.html('<p><i class="fa-lg far fa-check-circle text-success"></i> '+t.text+"</p>"),a.html("Send"),c.prop("disabled",!1),$("#contact-name").val(""),$("#contact-email").val(""),$("#contact-message").val(""))},"json")})});