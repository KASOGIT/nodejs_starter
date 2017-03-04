
function LoginController()
{

	this.email = $('#email');
	this.password = $('#password');

	this.showErrors = function(e) {
    for (var i=0; i < e.length; i++) {
			toastr["error"](e[i]);
    }
  }

  this.validatePassword = function(pass) {
    if (pass.length >= 6) {
      return (true);
    } else {
      return (false);
    }
  }

  this.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
  }

	LoginController.prototype.alertError = function(text) {
		toastr["error"](text);
	}

	LoginController.prototype.showModalInvalidAccount = function() {
		$(".modal-alert:eq(0)").modal('show');
	}

	LoginController.prototype.validateForm = function() {
		var e = [];

		if (!this.validateEmail(this.email.val())) {
			e.push("Votre email n'est pas valide");
		}
		if (!this.validatePassword(this.password.val())) {
			e.push('Votre mot de passe doit faire au moins 6 caractères');
		}
		if (e.length != 0) this.showErrors(e);
		return (e.length == 0);
	}

	// setup modal alert
	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Compte invalide !');
	$('.modal-alert .modal-body p').html("Vous n'avez pas encore validé votre compte grace à l'email.<br>Veuillez le faire puis essayer à nouveau");

	// bind event listeners to button clicks //
	$('#submit-reset-pass').click(function(){ $('#reset-password-form').submit();});
	$('#act-forgot-pass').click(function(){
		$('#cancel-reset-pass').html('Annuler');
		$('#submit-reset-pass').show();
		$('#modal-reset-pass').modal('show');
	});

// automatically toggle focus between the email modal window and the login form //
	$('#modal-reset-pass').on('shown.bs.modal', function(){ $('#email-reset').focus(); });
}
