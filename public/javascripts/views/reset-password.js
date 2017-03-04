
$(document).ready(function(){

  var rv = new ResetPasswordValidator();

  rv.hideAlert();
  $('#set-password-form').ajaxForm({
    url: '/reset-password',
    beforeSubmit : function(formData, jqForm, options){;
      rv.hideAlert();
      if (rv.validatePassword($('#password1').val(), $('#password2').val()) == false){
        return false;
      } 	else{
        return true;
      }
    },
    success	: function(responseText, status, xhr, $form){
      rv.showSuccess("Votre mot de passe à été changé avec succès.");
      setTimeout(function(){ window.location.href = '/login'; }, 3000);
    },
    error : function(){
      rv.showAlert("Erreur, veuillez essayer à nouveau plus tard");
    }
  });

  $('#set-password').modal('show');

});
