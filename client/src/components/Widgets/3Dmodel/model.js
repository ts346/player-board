import React, {useState, useRef, useEffect, Suspense} from 'react';
import * as THREE from 'three';
import UIfx from 'uifx';
import Web3 from 'web3';
import axios from 'axios';
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Modal from '@material-ui/core/Modal';
import './model.css';

import Coin from './coin.gif';
import CoinSound from './coin.mp3';

const coinClick = new UIfx(CoinSound,
    {
      volume: 0.4, // number between 0.0 ~ 1.0
      throttleMs: 100
    });

const APIaddress = "https://adventure-eth-api.herokuapp.com/transfer-token";

function Box(props) {
    const mesh = useRef();
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    
    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
    <mesh
        {...props}
        ref={mesh}
        scale={[1, 1, 1]}
        onClick={e => setActive(!active)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}>
        <boxGeometry attach="geometry" args={[3, 3, 3]} />
        <meshStandardMaterial attach="material" color={hovered ? 'blue' : 'orange'} />
        
    </mesh>

    
    )
}

function Car(props){
    const ref = useRef();
    
    console.log(window.location.pathname.split('/'));
    const { scene } = useLoader(GLTFLoader, '/Users/abdi/Desktop/player-board/client/public/scene.gltf');
    
    return(
        <group ref={ref} position={[0, -5, 0]}>
            <primitive scale={[.03, .03, .03]} object={scene} dispose={null}>
            
            </primitive>
            
        </group>
        
    )
}

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(() => {
        const controls = new OrbitControls(camera, gl.domElement);

        controls.enableZoom = false;
        controls.autoRotate = true;
        return () => {
            controls.dispose();
            
        }
    },[camera, gl]);
    return null;
}

class Model extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            account: null,
            network: null,
            transactionStatus: "",
            openModel: false
        }
        
    }

    componentDidMount(){
        this.loadMetaMask();
    }

    

    handleClick = () => {
        
        coinClick.setVolume(.5);
        coinClick.play();
        
        axios.post(APIaddress, {
            ticker: "BEAR",
            amount: 100, 
            to: this.state.account,
            hookUrl: "test"
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        this.setState({openModel: true});

    }

    async loadMetaMask() {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
        const userNetworks = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();

        this.setState({account: accounts[0]});
        this.setState({network: userNetworks});
    }

    render() {

        

        return(
            <div style={{position: 'relative', height: '100%', textAlign: 'center', width: '100%'}}>
                <Canvas style={{height: '60%', background: 'white',}} colorManagement>
                    <CameraController/>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={<Box/>}>
                        <Car/>
                    </Suspense>
                    
                </Canvas>

                <div style={{textAlign: 'center'}}>
                    <img style={{width: '20%'}} src={Coin} />
                    
                </div>
                {
                    !this.state.openModel ? 
                    <div style={{textAlign: 'center'}}>
                        <button onClick={this.handleClick}>100 Bear Tokens</button>
                    </div>
                    :
                    <div style={{textAlign: 'center', color: 'red'}}>
                        <p>You have recieved 100 Bear Tokens!</p>
                    </div>

                }
                
                
            </div>
        )
    }
}

export default Model;