$(function () {

  var player1 = null;

  loadPlayer();
  initializeEvents();
  initializeDB();

  function loadPlayer() {
    if (typeof (YT) == 'undefined' || typeof (YT.Player) == 'undefined') {

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubePlayerAPIReady = function () {
        onYouTubePlayer();
      };
    } else {
      onYouTubePlayer();
    }
  }

  function onYouTubePlayer() {
    player1 = new YT.Player('player');
    console.log('4nto')
  }

  function initializeEvents() {
    $('#btn-add-newsletters').on('click', function () {
      saveEmail();
    });

    $('.launch-modal').on('click', function (e) {
      e.preventDefault();
      $('#' + $(this).data('modal-id')).modal();
    });

    $('#modal-video').on('hidden.bs.modal', function () {
      // do something
      player1.stopVideo();
    });

    $('#terms-and-conditions-link').on('click', function (e) {
      e.preventDefault();
      $('#' + $(this).data('modal-id')).modal();
    });

    $('#legal-advice-link').on('click', function (e) {
      e.preventDefault();
      $('#' + $(this).data('modal-id')).modal();
    });

    $('#email-success-alert').on('close.bs.alert', toggleSuccessAlert);
    $('#email-error-alert').on('close.bs.alert', toggleErrorAlert);
    $('#email-validation-alert').on('close.bs.alert', toggleValidationAlert);

    $('a[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  }

  function initializeDB() {
    var config = {
      apiKey: "AIzaSyCbcviz8HO15gTWlQpuQcVyW6ZYFTl2mmE",
      authDomain: "matmapco-92c2d.firebaseapp.com",
      databaseURL: "https://matmapco-92c2d.firebaseio.com",
      projectId: "matmapco-92c2d",
      storageBucket: "",
      messagingSenderId: "728505959890"
    };
    firebase.initializeApp(config);
  }

  function saveEmail() {
    hideAlerts();
    try {
      var inputEmail = $('#input-email').val();
      if (inputEmail && validateEmail(inputEmail)) {
        var database = firebase.database().ref();
        database.child('emails').push(inputEmail);
        $('#input-email').val('');
        toggleSuccessAlert();
      } else {
        toggleValidationAlert();
      }
    } catch (error) {
      toggleErrorAlert();
    }

    setTimeout(hideAlerts, 5000);
  }

  function validateEmail(email) {
    var re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }

  function hideAlerts() {
    $('.alert').removeClass('in show');
    $('.alert').addClass('hide out');
  }

  function toggleSuccessAlert() {
    $('#email-success-alert').toggleClass('show hide');
    $('#email-success-alert').toggleClass('in out');
    return false; // Keep close.bs.alert event from removing from DOM
  }

  function toggleErrorAlert() {
    $('#email-error-alert').toggleClass('show hide');
    $('#email-error-alert').toggleClass('in out');
    return false; // Keep close.bs.alert event from removing from DOM
  }

  function toggleValidationAlert() {
    $('#email-validation-alert').toggleClass('show hide');
    $('#email-validation-alert').toggleClass('in out');
    return false; // Keep close.bs.alert event from removing from DOM
  }
});