(function($) {
  $.fn.fakechatbot = function(options) {
    var settings = $.extend({ durationPerWord: 200 }, options);
    var typingStart = function(elt) {
      elt.addClass("fakechatbot-typing-active");
    };
    var typingStop = function(elt) {
      elt.removeClass("fakechatbot-typing-active");
    };
    var currentDuration = 0;
    var countElements = $(this).children(".fakechatbot-message").length;
    var countElement = 0;
    typingStart($(this).children(".fakechatbot-typing"));
    $(this).children(".fakechatbot-message").each(function(index, value) {
      countElement++;
      var message = $(this).html();
      var messageWords = message.split(" ").length;
      var currentElement = $(this);
      currentDuration =
        currentDuration + messageWords * settings.durationPerWord;
      setTimeout(function() {
        currentElement.addClass("fakechatbot-message-display");
      }, currentDuration);
      if ($(this).attr("data-pause")) {
        setTimeout(function() {
          typingStop($(".fakechatbot-typing"));
        }, currentDuration);
        currentDuration =
          currentDuration + parseInt($(this).attr("data-pause"));
        setTimeout(function() {
          typingStart($(".fakechatbot-typing"));
        }, currentDuration);
      }
      if (countElement == countElements) {
        setTimeout(function() {
          typingStop($(".fakechatbot-typing"));
        }, currentDuration);
      }
    });
  };
})(jQuery);

 $("#chatbot").fakechatbot({
      durationPerWord: 100
    });

// jQuery FakeChatBot plugin used in this demo
// http://bit.ly/2rS1Gkw