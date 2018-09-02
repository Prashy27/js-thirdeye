$(function() {

    // Check for browser support for sessionStorage
    if (typeof(Storage) === 'undefined') {
      render('#unsupportedbrowser');
      return;
    }
  
    // Check for browser support for crypto.getRandomValues
    var cryptObj = window.crypto || window.msCrypto; // For IE11
    if (cryptObj === undefined || cryptObj.getRandomValues === 'undefined') {
      render('#unsupportedbrowser');
      return;
    }
  
    render(window.location.hash);
  
    $(window).on('hashchange', function() {
      render(window.location.hash);
    });
  
    function render(hash) {
  
      var action = hash.split('=')[0];
  
      // Hide everything
      $('.main-container .page').hide();
  
      var isAuthenticated = false;
  
      var pagemap = {
  
        // Welcome page
        '': function() {
          renderWelcome(isAuthenticated);
        },
  
        // Receive access token
  
        // Signout
  
        // Error display
  
        // Display inbox
  
        // Shown if browser doesn't support session storage
        '#unsupportedbrowser': function () {
          $('#unsupported').show();
        }
      }
  
      if (pagemap[action]){
        pagemap[action]();
      } else {
        // Redirect to home page
        window.location.hash = '#';
      }
    }
  
    function setActiveNav(navId) {
      $('#navbar').find('li').removeClass('active');
      $(navId).addClass('active');
    }
  
    function renderWelcome(isAuthed) {
      if (isAuthed) {
        $('#username').text(sessionStorage.userDisplayName);
        $('#logged-in-welcome').show();
        setActiveNav('#home-nav');
      } else {
        $('#connect-button').attr('href', buildAuthUrl());
        $('#signin-prompt').show();
      }
    }
  
    // OAUTH FUNCTIONS =============================
  
    // OUTLOOK API FUNCTIONS =======================
  
    // HELPER FUNCTIONS ============================
  
  });