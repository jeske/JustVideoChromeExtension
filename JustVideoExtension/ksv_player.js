// https://stackoverflow.com/questions/16145522/chrome-showing-error-as-refused-to-execute-inline-script-because-of-content-sec

// youtube api
// https://developers.google.com/youtube/iframe_api_reference

window.onload = function () {
    console.log("JustVideo:ksv_player.js:onload !");

    // hardcoded yt id for testing
    // var yt_id = "LQMTClwRCrY";

    // get the yt_id out of our URL
    const urlparse = new URL(window.location.href);
    const yt_id = urlparse.searchParams.get('yt_id');

    if (yt_id) {
        const vidbox = document.getElementById("vidbox");
        const title_box = document.getElementById("title_box");

        if (vidbox) {
            // readability only. fine to convert to string once correct combo figured out.
            const params = {
                playsinline: 1,
                autoplay: 1,
                controls: 1,
                allowfullscreen: 1,
                modestbranding: 1,
                enablejsapi: 1,
                playlist: '',
            };
            const paramstr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
            vidbox.src = `https://www.youtube.com/embed/${yt_id}?${paramstr}`;
        }
    }
};
