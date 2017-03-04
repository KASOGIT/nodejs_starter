
function ResetPasswordValidator()
{
// modal window to allow users to reset their password //
	this.setPassword = $('#set-password');
	this.setPassword.modal({ show : false, keyboard : false, backdrop : 'static' });
	this.setPasswordAlert = $('#set-password .alert');
}

ResetPasswordValidator.prototype.validatePassword = function(p1, p2)
{
	if (p1.length >= 6){
    if (p1 == p2) {
      return true;
    } else {
      this.showAlert('Les deux mots de passe ne sont pas identiques');
  		return false;
    }
	}	else{
		this.showAlert('Le mot de passe doit au moins faire 6 caractères');
		return false;
	}
}

ResetPasswordValidator.prototype.showAlert = function(m)
{
	this.setPasswordAlert.attr('class', 'alert alert-danger');
	this.setPasswordAlert.html(m);
	this.setPasswordAlert.show();
}

ResetPasswordValidator.prototype.hideAlert = function()
{
	this.setPasswordAlert.hide();
}

ResetPasswordValidator.prototype.showSuccess = function(m)
{
	this.setPasswordAlert.attr('class', 'alert alert-success');
	this.setPasswordAlert.html(m);
	this.setPasswordAlert.fadeIn(500);
}
