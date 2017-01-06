(function () {
    var hamb = document.getElementById('hamb');
    var nav = document.getElementsByTagName('nav')[0];
    hamb.addEventListener('click',function () {
        hamb.classList.toggle('hamb-open');
        nav.classList.toggle('main-nav-open');
    })
})();
