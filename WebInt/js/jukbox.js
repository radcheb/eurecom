var videos = ['http://html5demos.com/assets/dizzy.mp4',
    'http://upload.wikimedia.org/wikipedia/commons/transcoded/f/fe/Ocho_de_Bastos_Short_Video.ogv/Ocho_de_Bastos_Short_Video.ogv.480p.webm',
    'http://upload.wikimedia.org/wikipedia/commons/transcoded/e/e0/FireFlies_short_video.webm/FireFlies_short_video.webm.360p.webm',
    'https://ia600502.us.archive.org/4/items/superman_1941/superman_1941_512kb.mp4'];
var i = 0;

function onEnded() {
    i++;
    $('#jukbox').attr('src', videos[i % 4]);
    $('#jukbox').load();
    $('#jukbox_message').html('playing video ' + (i % 4 + 1) + '/4');
}
