import { Engine, Scene, ArcRotateCamera, Vector3, PointLight, Texture, MeshBuilder, StandardMaterial, Animation, AnimationLoopMode } from 'babylonjs';

const canvas = document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

const camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

const light = new PointLight('PointLight', new Vector3(0, 1, 0), scene);

const diceTexture = new Texture('dice_texture.png', scene);
const dice = MeshBuilder.CreateBox('dice', {size: 1}, scene);
const diceMaterial = new StandardMaterial('diceMaterial', scene);
diceMaterial.diffuseTexture = diceTexture;
dice.material = diceMaterial;

const rollButton = document.getElementById('roll-button');
rollButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const targetRotation = Math.PI * 2 * randomNumber / 6;
    const animation = new Animation('diceAnimation', 'rotation.y', 30, Animation.ANIMATIONTYPE_FLOAT, AnimationLoopMode.CYCLE);
    const keys = [{frame: 0, value: dice.rotation.y}, {frame: 30, value: dice.rotation.y + targetRotation}];
    animation.setKeys(keys);
    scene.beginDirectAnimation(dice, [animation], 0, 30, false, 1);
});

engine.runRenderLoop(() => {
    scene.render();
});
