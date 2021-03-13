function bindEvents(p){
p.on('signal',function (data){
debugger
})
}

document.querySelector('#start').addEventListener('click', function (e){
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then((stream) => {
        let p = new SimplePeer({
            initiator: true,
            stream: stream,
            trickle: false
        })
        bindEvents(p)
        let videoEl = document.getElementById('emitter-video');
        videoEl.srcObject = stream;
        videoEl.play();
      })
      .catch((error) => {
        console.log('UHOH!', error);
      });
})
