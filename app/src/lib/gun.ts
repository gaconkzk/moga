import Gun from 'gun/gun'
import SEA from 'gun/sea.js'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import 'gun/lib/webrtc'
// import 'gun/nts'

let peers

if (process.env.NODE_ENV === 'development') {
  console.log('using local')
  peers = ['http://localhost:8765/gun']
} else {
  console.log('using external peer')
  peers = [
    // Community relay peers: https://github.com/amark/gun/wiki/volunteer.dht
    'https://gun-manhattan.herokuapp.com/gun',
    'https://relay.129.153.59.37.nip.io/gun',
    'https://relay.peer.ooo/gun',
    'https://peer.wallie.io/gun',
    'www-dweb-gun.dev.archive.org/gun',
  ]
}

export const gun = Gun({ peers, localStorage: false })
