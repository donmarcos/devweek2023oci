import {
  Color3,
  Color4,
  Engine,
  FreeCamera,
  FresnelParameters,
  HemisphericLight,
  MeshBuilder,
  ParticleSystem,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import sand from "../assets/sand.jpg";

const myScene = {
  engine: null,
  scene: null,
  createScene: function (canvas) {
    const engine = new Engine(canvas);
    const scene = new Scene(engine);

    const camera = new FreeCamera("camera1", new Vector3(10, 12, -40), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    new HemisphericLight("light", Vector3.Up(), scene);

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 200, height: 200 },
      scene
    );
    ground.material = new StandardMaterial("groundMaterial", scene);
    ground.material.diffuseColor = new Color3(0.03, 0.48, 0.79, 0.83);
    ground.position.y = -14.1;

    const island = MeshBuilder.CreateSphere(
      "island",
      { diameter: 150, segments: 15 },
      scene
    );
    island.position.y = -75;
    island.position.x = 64;

    const island2 = MeshBuilder.CreateSphere(
      "island",
      { diameter: 100, segments: 15 },
      scene
    );
    island2.position.y = -45;
    island2.position.x = -3;

    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new Texture(sand, scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new Color3(0, 0, 0);
    island.material = groundMaterial;
    island2.material = groundMaterial;

    const ring = MeshBuilder.CreateTorus(
      "ring",
      { diameter: 4, thickness: 0.6 },
      scene
    );

    ring.position = new Vector3(-3, 5.2, -0.7);

    const stickMaterial = new StandardMaterial("stickMaterial", scene);
    stickMaterial.diffuseColor = new Color3(0.42, 0.35, 0.26);

    const stick = MeshBuilder.CreateCylinder(
      "stick",
      { diameter: 0.4, height: 4 },
      scene
    );
    stick.material = stickMaterial;
    stick.position = new Vector3(-3, 6, 0.2);
    stick.rotation.x = Math.PI / 1.3;

    const stick2 = stick.clone("stick2");
    stick2.position = new Vector3(-3, 6, -1);
    stick2.rotation.x = Math.PI / 1.5;
    stick2.rotation.y = Math.PI / 1;

    const stick3 = stick2.clone("stick3");
    stick3.position = new Vector3(-3, 6, -1);
    stick3.rotation.x = Math.PI / 1.4;
    stick3.rotation.y = Math.PI / 1.6;

    const stick4 = stick3.clone("stick4");
    stick4.position = new Vector3(-3, 6, -0.8);
    stick4.rotation.x = Math.PI / 1.4;
    stick4.rotation.y = Math.PI / -3;

    //coals-----------

    const coals = MeshBuilder.CreateBox(
      "coals",
      { height: 0.3, width: 0.3, depth: 0.3 },
      scene
    );
    coals.position = new Vector3(10, 10, 0);

    const coal2 = coals.clone("coal2");
    coal2.position = new Vector3(10, 10, 0.5);

    const coal3 = coals.clone("coal3");
    coal3.position = new Vector3(-10, 10, -0.5);

    const coal4 = coals.clone("coal4");
    coal4.position = new Vector3(0.5, 0.1, -0.5);

    const coal5 = coals.clone("coal5");
    coal5.position = new Vector3(-0.5, 0.1, 0.5);

    const coal6 = coals.clone("coal6");
    coal6.position = new Vector3(-0.2, 0.1, 0.7);

    const coal7 = coals.clone("coal7");
    coal7.position = new Vector3(-0.7, 0.1, 0.2);

    const coal8 = coals.clone("coal8");
    coal8.position = new Vector3(0.4, 0.1, 0.4);

    const coal9 = coals.clone("coal9");
    coal9.position = new Vector3(-0.7, 0.1, 0.8);

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
    fireSystem.maxLifeTime = 40;
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

    // const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    // const skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture("textures/skybox", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skybox.material = skyboxMaterial;

    window.addEventListener("click", function () {
      smokeSystem.start();
      fireSystem.start();
    });

    engine.runRenderLoop(() => {
      scene.render();
    });
  },

  setPosition: function (name, x, y, z) {
    console.log(name);
    const mesh = this.scene.getMeshByName(name);

    if (mesh) {
      mesh.position = new Vector3(x, y, z);
    }
  },
};

export default myScene;
