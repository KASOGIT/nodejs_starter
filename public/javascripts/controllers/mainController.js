
function MainController() {
  var that = this;

  $('.act-logout').click(function() {
    that.attemptLogout();
  });

  this.attemptLogout = function() {
    var that = this;

    $.post("/logout", { logout: true })
    .done(function(data) {
      that.showLockedAlert("Vous êtes maintenant déconnecté.<br>Retour à la page d'acceuil.");
    })
    .fail(function(data) {
    });
  }

  this.showLockedAlert = function(msg){
    $('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
    $('.modal-alert .modal-header h4').text('Succès!');
    $('.modal-alert .modal-body p').html(msg);
    $('.modal-alert').modal('show');
    $('.modal-alert button').click(function(){window.location.href = '/';})
    setTimeout(function(){window.location.href = '/';}, 3000);
  }

}
