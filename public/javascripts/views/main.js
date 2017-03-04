
$(document).ready(function() {

  var hc = new MainController();

  initComponents();

});

function initComponents() {
  navbar_init();
}

function navbar_init() {
  // SideNav init
  $(".button-collapse").sideNav();

  // Custom scrollbar init
  var el = document.querySelector('.custom-scrollbar');
  Ps.initialize(el);
}
