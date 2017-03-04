
$(document).ready(function() {

  var sc = new SignupControler();

  $('#account-form').ajaxForm({
    beforeSubmit : function(formData, jqForm, options){
      return sc.validateForm();
    },
    success	: function(responseText, status, xhr, $form){
      $('.modal-alert').modal('show');
      return;
    },
    error : function(e){
      if (e.responseText == 'email-taken'){
        sc.showInvalidEmail();
      }
    }
  });

  $('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
  $('.modal-alert .modal-header h4').text('Compte créé !');
  $('.modal-alert .modal-body p').html('Votre compte à été créé avec succès veuillez le valider grâce au mail que vous venez de recevoir</br>Cliquez sur ok pour retourner à la page de connexion.');

});
