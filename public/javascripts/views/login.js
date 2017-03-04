
$(document).ready(function() {

  var lc = new LoginController();
  var ev = new EmailValidator();

  $('#login-form').ajaxForm({
    beforeSubmit : function(formData, jqForm, options) {
      return lc.validateForm();
    },
    success : function(responseText, status, xhr, $form) {
      window.location.href = '/';
      return true;
    },
    error : function(e) {
      console.log(e.responseText);
      if (e.responseText == "wrong-cred") {
        lc.alertError("Mauvais email ou/et mauvais mot de passe");
      } else if (e.responseText == "not-valid-account") {
        lc.showModalInvalidAccount();
      }
    }
  });

  $('#modal-reset-pass').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-reset').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b>Erreur!</b> Entrez un email valide s'il vous plais");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#cancel-reset-pass').html('Ok');
			$('#submit-reset-pass').hide();
			ev.showEmailSuccess("Aller sur votre email pour réinitialiser votre mot de passe.");
		},
		error : function(e){
			if (e.responseText == 'email-not-found'){
				ev.showEmailAlert("L'email entré n'est pas repertorié êtes vous sûr d'avoir entré le bon ?");
			}	else{
				$('#cancel-reset-pass-reset-pass').html('Ok');
				$('#submit-reset-pass').hide();
				ev.showEmailAlert("Désolé, un problème est survenu veuillez essayé à nouveau plus tard.");
			}
		}
	});

});
