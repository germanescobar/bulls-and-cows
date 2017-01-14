var game = (function() {
  var generateNumber = function() {
    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    return shuffle( "0123456789".split('') ).slice(0, 4);
  }

  var number;
  var reset = function() {
    number = generateNumber();
    console.log(number.join(""));
  }

  var attempt = function(guess) {
    var result = { number: guess, picas: 0, fijas: 0 };
    var digits = guess.split('');
    digits.forEach(function(digit, index) {
      if (digit == number[index]) {
        result.fijas++;
      } else {
        if (number.includes(digit)) {
          result.picas++;
        }
      }
    });

    return result;
  }

  reset(); // generate first number

  return {
    reset: reset,
    attempt: attempt
  };
})();

$('input#digits').on('keydown', function(e) {
  $('.input').removeClass("error");

  if (e.which === 13) {
    var guess = $(this).val();
    if (!isValidInput(guess)) {
      $('.input').addClass("error");
      return;
    }

    var result = game.attempt(guess);
    $('table tbody').prepend("<tr><td>" + result.number + "</td><td>" + result.picas + "</td><td>" + result.fijas + "</td></tr>");

    if (result.fijas === 4) {
      $('.overlay').fadeIn();
    }

    $(this).val("");
  }
});

$('.close').on("click", function() {
  game.reset();
  $('table tbody').empty();
  $('.overlay').fadeOut();
  $('input#digits').focus();
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidInput(guess) {
  if (guess.length != 4) {
    console.log("La longitud es " + guess.length);
    return false;
  }

  var numbers = {};
  guess.split('').forEach(function(digit) {
    if (!isNumeric(digit) || numbers[digit]) {
      return false;
    }
    numbers[digit] = true;
  });

  return true;
}
