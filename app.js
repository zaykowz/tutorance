let p = null

function bindEvents(p){
   p.on('error', function (err){
       console.log('error', err )
   })

p.on('signal',function (data){
document.querySelector('#offer').textContent = JSON.stringify(data)
})

/*p.on('stream', function(stream){
let video = document.getElementById('#receiver-video')
video.srcObject= stream;
video.play()*/

//})

}

document.querySelector('#start').addEventListener('click', function (e){
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then((stream) => {
      let  p = new SimplePeer({
            initiator: true,
            stream: stream,
            trickle: false
        })
        bindEvents(p)
        let emitterVideo = document.getElementById('#emitter-video')
        emitterVideo.srcObject = stream;
        emitterVideo.play()
      })
      .catch((error) => {
        console.log('UHOH!', error)
      })
})

document.querySelector('#incoming').addEventListener('submit', function(e){
   e.preventDefault()
   if (p == null) {
     p = new SimplePeer({
        initiator: false,
        trickle : false 

    })
    bindEvents(p)
  }
  p.signal(JSON.parse(e.target.querySelector('textarea').value))

})
