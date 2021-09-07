<template>
  <el-container>
    <el-header>
      <h4>Demo</h4>
    </el-header>
    <el-main style="height:100%;">
      <canvas id="renderCanvas"></canvas>
    </el-main>
  </el-container>
</template>
<script>
import * as BABYLON from 'babylonjs'

export default {
  name: 'demo',
  data: () => {
    return {}
  },
  mounted: function () {
    
    var canvas = document.getElementById('renderCanvas')
    var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true})
    var createScene = function () {
      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
      camera.attachControl(canvas, true);

      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

      const box = BABYLON.MeshBuilder.CreateBox("box", {});
      box.position.y = 0.5

      const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
      roof.scaling.x = 0.75;
      roof.rotation.z = Math.PI / 2;
      roof.position.y = 1.22;

      // Ground
      const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);
      const groundMat = new BABYLON.StandardMaterial("groundMat");
      groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
      ground.material = groundMat; //Place the material property of the ground

      return scene
    }
    var scene = createScene()
    engine.runRenderLoop(function () {
      scene.render()
    })
  },
  methods: {
  }
}
</script>
<style scoped>
  #renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>