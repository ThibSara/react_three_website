import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ThreeScene = () => {
  useEffect(() => {
    // Création de la scène, de la caméra et du rendu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Exemple d'ajout de lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Ajout d'une lumière directionnelle
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);


    // chargement du sapin
    const sapinUrl = require('./sapin.glb');
    let sapin;

    // ajout à la scène
    const loader = new GLTFLoader();
    loader.load(
      sapinUrl,
      function (gltf) {
        sapin = gltf.scene;
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );



     // chargement du sapin
     const animalsUrl = require('./farm_animals.glb');
     let animals;
 
     // ajout à la scène
     const loader2 = new GLTFLoader();
     loader2.load(
       animalsUrl,
       function (gltf) {
         animals = gltf.scene;
         scene.add(gltf.scene);
       },
       undefined,
       function (error) {
         console.error(error);
       }
     );
 

    // ajout des étoiles
    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const color = Math.random() < 0.5 ? 0x00ff00 : 0xff0000;
      const material = new THREE.MeshBasicMaterial({color});
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(200).fill().forEach(addStar);

    // ajout d'une grille
    //const gridHelper = new THREE.GridHelper( 100, 100 );
    //scene.add( gridHelper );

    const bgTexture = new THREE.TextureLoader().load('./background.jpg', () => {
      renderer.render(scene, camera);
    }, undefined, (error) => {
      console.error('Error loading background texture:', error);
    });
    scene.background = bgTexture;
    


    
    // Permet de controler les angles de vue avec la souris
    const orbit = new OrbitControls(camera, renderer.domElement);

    // Positionnement de la caméra
    camera.position.z = 20;
    camera.position.y = 10;

    orbit.update();

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (sapin) {
        sapin.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      
    };

    animate();
  }, []); // La dépendance vide garantit que useEffect est appelé une seule fois lors du montage

  return <div />;
};

export default ThreeScene;
