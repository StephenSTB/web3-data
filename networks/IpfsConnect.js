import ipfsConnect from './IpfsConnect.json' assert { "type": "json" };
import { create } from 'ipfs';
import { webSockets } from '@libp2p/websockets';
import * as filters from '@libp2p/websockets/filters';
//import { createLibp2p } from 'libp2p'
//import { noise } from '@chainsafe/libp2p-noise'
//import { yamux } from '@chainsafe/libp2p-yamux'
//import { MemoryDatastore } from 'datastore-core'
import { MemoryBlockstore } from 'blockstore-core';
//import { kadDHT } from '@libp2p/kad-dht'
//import { bootstrap } from '@libp2p/bootstrap'
import { createHelia } from 'helia';
export const IpfsWebRTC = async (webrtc_star) => {
    console.time('IPFS Started');
    let ipfs = await create({
        repo: "ipfs-browser-" + Math.random(),
        config: {
            Addresses: {
                Swarm: [
                    '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                    '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                    webrtc_star
                ]
            },
        },
        start: true,
        libp2p: {
            transports: [
                webSockets({
                    filter: filters.dnsWss
                })
            ]
        }
    });
    console.timeEnd('IPFS Started');
    return ipfs;
};
const blockstore = new MemoryBlockstore();
export const createHeliaIPFS = async (test) => {
    console.log(test);
    //const libp2p = await createLibp2p(test ? config_test : config_production )
    const node = await createHelia({ blockstore });
    //const fs = unixfs(node);
    return { node };
};
export { ipfsConnect };
