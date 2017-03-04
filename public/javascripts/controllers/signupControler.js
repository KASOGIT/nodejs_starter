
function SignupControler() {
  this.lastName = $("#lastName");
  this.firstName = $("#firstName");
  this.email = $("#email");
  this.password1 = $("#password1");
  this.password2 = $("#password2");

  $('.modal-alert #ok').click(function(){ window.location.href = '/login' });

  this.showErrors = function(e) {
    for (var i=0; i < e.length; i++) {
      toastr["error"](e[i]);
    }
  }

  this.validatePassword = function(pass1, pass2) {
    if (pass1.length >= 6 && pass1 == pass2) {
      return (true);
    } else {
      return (false);
    }
  }

  this.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
  }

  SignupControler.prototype.showInvalidEmail = function() {
    this.showErrors(['Cet email est déjà utilisé']);
  }

  SignupControler.prototype.validateForm = function() {
    var e = [];

    if (this.lastName.val().length < 2 || this.firstName.val().length < 2) {
      e.push('Votre nom est votre prénom sont obligatoires');
    }
    if (!this.validatePassword(this.password1.val(), this.password2.val())) {
      e.push('Vos mots de passe doivent être identique et faire au minimum 6 caractères');
    }
    if (!this.validateEmail(this.email.val())) {
      e.push('Votre email n\'est pas au bon format');
    }
    if (e.length) this.showErrors(e);
    return (e.length === 0);
  }
}
