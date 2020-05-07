
// https://stackoverflow.com/questions/16145522/chrome-showing-error-as-refused-to-execute-inline-script-because-of-content-sec

var title_padding = 200;

window.onload = function () {

    var yt_id = "LQMTClwRCrY";

    console.log("onload:!?!?!?!");
    var vidbox = document.getElementById("vidbox");
    var title_box = document.getElementById("title_box");

    if (vidbox) {
        title_padding = title_box.clientHeight;
        vidbox.src = "https://www.youtube.com/embed/" + yt_id;
        console.log("title padding = " + this.title_padding);

        window.onresize();
    }
    
}


window.onresize = function() {
    var browserWidth = window.innerWidth;
    var browserHeight = window.innerHeight;

    
    var playerWidthToHeightRatio = 9.0 / 16.0;

    var playerMaxWidth = browserWidth * 0.9;
    var playerMaxHeight = (browserHeight * 0.9) - title_padding;
  

    var playerWidth = playerMaxWidth;
    var playerHeight = playerWidth * playerWidthToHeightRatio;

    if (playerHeight > playerMaxHeight) {
        playerHeight = playerMaxHeight;
        playerWidth = playerHeight / playerWidthToHeightRatio;
    }


    var vidbox = document.getElementById("vidbox");

    vidbox.style.height = playerHeight;
    vidbox.style.width = playerWidth;

}
