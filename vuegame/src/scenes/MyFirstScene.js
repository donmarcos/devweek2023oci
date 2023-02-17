import {
  Color3,
  Color4,
  CubeTexture,
  Engine,
  FreeCamera,
  FresnelParameters,
  HemisphericLight,
  MeshBuilder,
  ParticleSystem,
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import Rock from "../assets/Rock2.jpg";
import sand from "../assets/sand.jpg";

const myScene = {
  engine: null,
  scene: null,
  createScene: function (canvas) {
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    myScene.engine = engine;
    myScene.scene = scene;

    const camera = new FreeCamera("camera1", new Vector3(-10, 5, -40), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    new HemisphericLight("light", Vector3.Up(), scene);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 1000, height: 1000 },
      scene
    );
    ground.material = new StandardMaterial("groundMaterial", scene);
    ground.material.diffuseColor = new Color3(0.03, 0.48, 0.79, 0.83);
    ground.position.y = -14.1;

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    scene.environmentTexture = envTex;

    scene.createDefaultSkybox(envTex, true);

    const island = MeshBuilder.CreateSphere(
      "island",
      { diameter: 150, segments: 15 },
      scene
    );
    island.position.y = -76;
    island.position.x = 64;

    const island2 = MeshBuilder.CreateSphere(
      "island",
      { diameter: 100, segments: 15 },
      scene
    );
    island2.position.y = -55;
    island2.position.x = -2;

    const island3 = MeshBuilder.CreateSphere(
      "island",
      { diameter: 500, segments: 15 },
      scene
    );
    island3.position.y = -245;
    island3.position.x = -15;
    island3.position.z = 100;

    const island4 = island3.clone("island4");
    island4.position.y = -245;
    island4.position.x = 150;
    island4.position.z = 65;

    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new Texture(sand, scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new Color3(0, 0, 0);
    island.material = groundMaterial;
    island2.material = groundMaterial;
    island3.material = groundMaterial;
    island4.material = groundMaterial;

    const ring = MeshBuilder.CreateTorus(
      "ring",
      { diameter: 4.5, thickness: 0.6 },
      scene
    );

    ring.position = new Vector3(-2.5, -5, -1);

    const stickMaterial = new StandardMaterial("stickMaterial", scene);
    stickMaterial.diffuseColor = new Color3(0.42, 0.35, 0.26);

    const stick = MeshBuilder.CreateCylinder(
      "stick",
      { diameter: 0.4, height: 4 },
      scene
    );
    stick.material = stickMaterial;
    stick.position = new Vector3(-2, -4, -1);
    stick.rotation.x = Math.PI / 1.3;

    const stick2 = stick.clone("stick2");
    stick2.position = new Vector3(-3, -4, -1);
    stick2.rotation.x = Math.PI / 1.5;
    stick2.rotation.y = Math.PI / 1;

    const stick3 = stick2.clone("stick3");
    stick3.position = new Vector3(-2.6, -4, -1);
    stick3.rotation.x = Math.PI / 1.4;
    stick3.rotation.y = Math.PI / 1.6;

    const stick4 = stick3.clone("stick4");
    stick4.position = new Vector3(-2.4, -4, -0.8);
    stick4.rotation.x = Math.PI / 1.4;
    stick4.rotation.y = Math.PI / -3;

    const coals = MeshBuilder.CreateBox(
      "coals",
      { height: 0.3, width: 0.3, depth: 0.3 },
      scene
    );
    coals.position = new Vector3(0, -5, 0);

    const coal2 = coals.clone("coal2");
    coal2.position = new Vector3(-2.7, -5, 0.6);

    const coal3 = coals.clone("coal3");
    coal3.position = new Vector3(-2.5, -5, -0.7);

    const coal4 = coals.clone("coal4");
    coal4.position = new Vector3(-2.1, -5, -0.9);

    const coal5 = coals.clone("coal5");
    coal5.position = new Vector3(-2.5, -5, 0.5);

    const coal6 = coals.clone("coal6");
    coal6.position = new Vector3(-2.5, -5, 0.7);

    const coal7 = coals.clone("coal7");
    coal7.position = new Vector3(-2.5, -5, 0.2);

    const coal8 = coals.clone("coal8");
    coal8.position = new Vector3(-2.5, -5, 0.4);

    const coal9 = coals.clone("coal9");
    coal9.position = new Vector3(-2.5, -5, 0.8);

    const emissiveMaterial = new StandardMaterial("emissiveMaterial", scene);

    emissiveMaterial.emissiveColor = new Color3(1, 0.6, 0.3);
    emissiveMaterial.emissiveFresnelParameters = new FresnelParameters();
    emissiveMaterial.emissiveFresnelParameters.power = 4;
    emissiveMaterial.emissiveFresnelParameters.leftColor = Color3.White();
    emissiveMaterial.emissiveFresnelParameters.rightColor = Color3.Black();
    coals.material = emissiveMaterial;
    coal2.material = emissiveMaterial;
    coal4.material = emissiveMaterial;
    coal6.material = emissiveMaterial;
    coal8.material = emissiveMaterial;

    const fireSystem = new ParticleSystem("fire", 2000, scene);
    fireSystem.particleTexture = new Texture(
      "https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/ParticleSystems/Fire/Fire_SpriteSheet1_8x8.png",
      scene
    );
    fireSystem.emitter = ring;
    fireSystem.minEmitBox = new Vector3(-0.1, 1, -0.1);
    fireSystem.maxEmitBox = new Vector3(0.1, 1, 0.1);
    fireSystem.color1 = new Color4(1, 0.5, 0, 1);
    fireSystem.color2 = new Color4(1, 0, 0, 1);
    fireSystem.colorDead = new Color4(0, 0, 0, 0.0);
    fireSystem.minSize = 1;
    fireSystem.maxSize = 2;
    fireSystem.minLifeTime = 1;
    fireSystem.maxLifeTime = 10;
    fireSystem.emitRate = 300;
    fireSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    fireSystem.gravity = new Vector3(0, 0, 0);
    fireSystem.direction1 = new Vector3(0, 10, 0);
    fireSystem.direction2 = new Vector3(0, 1, 0);
    fireSystem.minAngularSpeed = 0;
    fireSystem.maxAngularSpeed = Math.PI;
    fireSystem.targetStopDuration = 0.1;
    fireSystem.disposeOnStop = true;
    fireSystem.start();

    const smokeSystem = new ParticleSystem("smoke", 10000, scene);
    smokeSystem.particleTexture = new Texture(
      "https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png",
      scene
    );
    smokeSystem.emitter = ring;
    smokeSystem.minEmitBox = new Vector3(-1, 0, -1);
    smokeSystem.maxEmitBox = new Vector3(1, 0, 1);
    smokeSystem.color1 = new Color4(0.1, 0.1, 0.1, 0.84);
    smokeSystem.color2 = new Color4(0.1, 0.1, 0.1, 0.83);
    smokeSystem.colorDead = new Color4(0, 0, 0, 0.0);
    smokeSystem.minSize = 0.1;
    smokeSystem.maxSize = 0.8;
    smokeSystem.minLifeTime = 10;
    smokeSystem.maxLifeTime = 100;
    smokeSystem.emitRate = 500;
    smokeSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
    smokeSystem.gravity = new Vector3(0, 5, 0);
    smokeSystem.direction1 = new Vector3(-1, 0, -1);
    smokeSystem.direction2 = new Vector3(1, 1, 1);
    smokeSystem.minAngularSpeed = 0;
    smokeSystem.maxAngularSpeed = Math.PI;
    smokeSystem.targetStopDuration = 0.1;
    smokeSystem.disposeOnStop = true;
    smokeSystem.start();

    // Create a rock texture
    var rockTexture = new Texture(Rock, scene);

    // Create a Standard Material with the rock texture
    var rockMaterial = new StandardMaterial("rockMaterial", scene);
    rockMaterial.diffuseTexture = rockTexture;
    // Create a sphere as a template for new elements
    const sphereTemplate = MeshBuilder.CreateSphere(
      "sphereTemplate",
      { diameter: 0.5 },
      scene
    );
    sphereTemplate.isVisible = false;
    sphereTemplate.position = new Vector3(-10, -6, 1);
    sphereTemplate.material = rockMaterial;

    const stickTemplate = MeshBuilder.CreateCylinder(
      "stickTemplate",
      { diameter: 0.5 },
      scene
    );
    stickTemplate.position = new Vector3(1, -5, 1);
    stickTemplate.rotation.x = Math.PI / 1.4;
    stickTemplate.rotation.y = Math.PI / 1.9;
    stickTemplate.isVisible = false;
    stickTemplate.material = stickMaterial;

    this.createTree();

    window.addEventListener("click", function () {
      smokeSystem.start();
      fireSystem.start();
    });

    engine.runRenderLoop(() => {
      scene.render();

      // boxGreen.rotation.y += 0.01;
    });
  },

  setPosition: function (name, x, y, z) {
    const mesh = this.scene.getMeshByName(name);
    if (mesh) {
      mesh.position = new Vector3(x, y, z);
    }
  },

  createTree: function () {
    SceneLoader.ImportMesh(
      "",
      "./models/",
      "coconut-tree.babylon",
      this.scene,
      (meshes) => {
        console.log(meshes);
        meshes[1].scaling.z = 0.1;
        meshes[1].scaling.y = 0.1;
        meshes[1].scaling.x = 0.2;
        meshes[1].position.x = 80;
        meshes[1].position.y = 5;
        meshes[1].position.z = -1;

        const tree2 = meshes[1].clone("tree2");
        tree2.position.x = 20;
        tree2.position.z = 40;
        tree2.rotation.x = 2;
      }
    );
  },
  setStick: function (name) {
    const mesh = this.scene.getMeshByName(name);
    if (mesh) {
      mesh.isVisible = true;
      var newStick = mesh.clone("stickClone");

      // Set a random position for the new sphere
      newStick.position = new Vector3(
        Math.random() * 3 + 1,
        -5,
        Math.random() * 2 - 1
      );
      newStick.rotation._x = 1.5;

      // Make the new sphere visible
      newStick.isVisible = true;
    }
  },

  setStone: function (name) {
    const mesh = this.scene.getMeshByName(name);
    if (mesh) {
      mesh.isVisible = true;
      var newStone = mesh.clone("stoneClone");

      // Set a random position for the new sphere
      newStone.position = new Vector3(
        Math.random() * 4 + 1,
        -5.2,
        Math.random() * -2 - 1
      );

      // Make the new sphere visible
      newStone.isVisible = true;
    }
  },
};
export default myScene;
