function getNameBrowser(){

    var ua = navigator.userAgent;

    if (ua.search(/Chrome/) > 0) return 'chrome';
    if (ua.search(/Firefox/) > 0) return 'firefox';
    if (ua.search(/Opera/) > 0) return 'opera';
    if (ua.search(/Safari/) > 0) return 'safari';
    if (ua.search(/Trident/) > 0) return 'ie';
    return 'notFound';
}

var nameBrowser = getNameBrowser();
var html = document.documentElement;
html.classList.add(nameBrowser);
