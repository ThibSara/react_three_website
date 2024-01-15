import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FarmScene = () => {
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


     // chargement des animaux
     const animalsUrl = require('./gyroid.glb');
     let animals;
 
  // ajout à la scène
  const loader2 = new GLTFLoader();
  loader2.load(
    animalsUrl,
    function (gltf) {
      animals = gltf.scene;
      scene.add(gltf.scene);

      // Création du mixer pour l'animation
      const mixer = new THREE.AnimationMixer(gltf.scene);

      // Parcourir toutes les animations et les lier au mixer
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        if (mixer) {
          mixer.update(0.01); // Mettre à jour l'animation à chaque frame
        }
        renderer.render(scene, camera);
      };

      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

 
    // ajout d'une grille
    //const gridHelper = new THREE.GridHelper( 100, 100 );
    //scene.add( gridHelper );


    // Permet de controler les angles de vue avec la souris
    const orbit = new OrbitControls(camera, renderer.domElement);

    // Positionnement de la caméra
    camera.position.z = 20;
    camera.position.y = 10;

    orbit.update();

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (animals) {
        animals.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      
    };

    animate();
  }, []); // La dépendance vide garantit que useEffect est appelé une seule fois lors du montage

  return <div />;
};

export default FarmScene;
