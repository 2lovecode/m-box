<template>
  <el-container>
    <el-header>
      <h4>Demo</h4>
    </el-header>
    <el-main>
      <el-row>
        <el-col>
          <canvas id="renderCanvas"></canvas>
        </el-col>
      </el-row>
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
      var scene = new BABYLON.Scene(engine)
      var camera = new BABYLON.FollowCamera('FollowCam', new BABYLON.Vector3(0, 100, -100), scene)
	    camera.radius = 150
	    camera.heightOffset = 80
	    camera.rotationOffset = 1
	    camera.cameraAcceleration = 0.05
	    camera.maxCameraSpeed = 10
      camera.attachControl(canvas, true)
      camera.actionManager = new BABYLON.ActionManager(scene)
      scene.clearColor = new BABYLON.Color3(0, 0, 0)

      var light1 = new BABYLON.PointLight('omni', new BABYLON.Vector3(0, 50, 0), scene)
      var light2 = new BABYLON.PointLight('omni', new BABYLON.Vector3(0, 50, 0), scene)
      var light3 = new BABYLON.PointLight('omni', new BABYLON.Vector3(0, 50, 0), scene)

      light1.diffuse = BABYLON.Color3.Red()
      light2.diffuse = BABYLON.Color3.Green()
      light3.diffuse = BABYLON.Color3.Blue()

      // Define states
      light1.state = 'on'
      light2.state = 'on'
      light3.state = 'on'

      // Ground
      var ground = BABYLON.Mesh.CreateGround('ground', 1000, 1000, 1, scene, false)
      var groundMaterial = new BABYLON.StandardMaterial('ground', scene)
      groundMaterial.specularColor = BABYLON.Color3.Black()
      ground.material = groundMaterial

      // Boxes
      var redBox = BABYLON.Mesh.CreateBox('red', 20, scene)
      var redMat = new BABYLON.StandardMaterial('ground', scene)
      redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      redMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      redMat.emissiveColor = BABYLON.Color3.Red()
      redBox.material = redMat
      redBox.position.x -= 100

      var greenBox = BABYLON.Mesh.CreateBox('green', 20, scene)
      var greenMat = new BABYLON.StandardMaterial('ground', scene)
      greenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      greenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      greenMat.emissiveColor = BABYLON.Color3.Green()
      greenBox.material = greenMat
      greenBox.position.z -= 100
      camera.lockedTarget = greenBox // version 2.5 onwards

      var blueBox = BABYLON.Mesh.CreateBox('blue', 20, scene)
      var blueMat = new BABYLON.StandardMaterial('ground', scene)
      blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      blueMat.emissiveColor = BABYLON.Color3.Blue()
      blueBox.material = blueMat
      blueBox.position.x += 100

      // Sphere
      var sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 20, scene)
      var sphereMat = new BABYLON.StandardMaterial('ground', scene)
      sphereMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      sphereMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)
      sphereMat.emissiveColor = BABYLON.Color3.Purple()
      sphere.material = sphereMat
      sphere.position.z += 100

      // Rotating donut
      var donut = BABYLON.Mesh.CreateTorus('donut', 20, 8, 16, scene)

      // On pick interpolations
      var prepareButton = function (mesh, color, light) {
        mesh.actionManager = new BABYLON.ActionManager(scene)
        mesh.actionManager.registerAction(new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
          new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light, 'intensity', 1.3, 1000),
          new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, light, 'diffuse', BABYLON.Color3.Black(), 1000),
          new BABYLON.SetValueAction(BABYLON.ActionManager.NothingTrigger, mesh.material, 'wireframe', true),
          new BABYLON.SetStateAction(BABYLON.ActionManager.NothingTrigger, light, 'off')
        ])).then(new BABYLON.CombineAction(BABYLON.ActionManager.NothingTrigger, [ // Then is used to add a child action used alternatively with the root action.
          new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light, 'diffuse', color, 1000, null, true), // First click: root action. Second click: child action. Third click: going back to root action and so on...
          new BABYLON.SetValueAction(BABYLON.ActionManager.NothingTrigger, mesh.material, 'wireframe', false),
          new BABYLON.SetStateAction(BABYLON.ActionManager.NothingTrigger, light, 'on')
        ]))
      }

      prepareButton(redBox, BABYLON.Color3.Red(), light1)
      prepareButton(greenBox, BABYLON.Color3.Green(), light2)
      prepareButton(blueBox, BABYLON.Color3.Blue(), light3)

      // Conditions
      sphere.actionManager = new BABYLON.ActionManager(scene)
      var condition1 = new BABYLON.StateCondition(sphere.actionManager, light1, 'off')
      var condition2 = new BABYLON.StateCondition(sphere.actionManager, light1, 'on')

      sphere.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnLeftPickTrigger, camera, 'alpha', 0, 500, condition1))
      sphere.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnLeftPickTrigger, camera, 'alpha', Math.PI, 500, condition2))

      // Over/Out
      var makeOverOut = function (mesh) {
        mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh.material, 'emissiveColor', mesh.material.emissiveColor))
        mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh.material, 'emissiveColor', BABYLON.Color3.White()))
        mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh, 'scaling', new BABYLON.Vector3(1, 1, 1), 150))
        mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPointerOverTrigger, mesh, 'scaling', new BABYLON.Vector3(1.1, 1.1, 1.1), 150))
      }

      makeOverOut(redBox)
      makeOverOut(greenBox)
      makeOverOut(blueBox)
      makeOverOut(sphere)

      // scene's actions
      scene.actionManager = new BABYLON.ActionManager(scene)

      var rotate = function (mesh) {
        scene.actionManager.registerAction(new BABYLON.IncrementValueAction(BABYLON.ActionManager.OnEveryFrameTrigger, mesh, 'rotation.y', 0.01))
      }

      // rotate(redBox);
      // rotate(greenBox);
      // rotate(blueBox);

      // Intersections
      donut.actionManager = new BABYLON.ActionManager(scene)

      donut.actionManager.registerAction(new BABYLON.SetValueAction(
        { trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: sphere },
        donut, 'scaling', new BABYLON.Vector3(1.2, 1.2, 1.2)))

      donut.actionManager.registerAction(new BABYLON.SetValueAction(
        { trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, parameter: sphere }
        , donut, 'scaling', new BABYLON.Vector3(1, 1, 1)))

      var map = {}
      scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        map[evt.sourceEvent.key.toLowerCase()] = evt.sourceEvent.type == 'keydown'
      }))
      scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        map[evt.sourceEvent.key.toLowerCase()] = evt.sourceEvent.type == 'keydown'
      }))

      function keypress () {
        if (map['w']) {
          // greenBox.position.z -= 1;
        }
        if (map['a']) {
          // greenBox.position.x += 1;
          var localPos = greenBox.getPositionExpressedInLocalSpace()
          greenBox.locallyTranslate(new BABYLON.Vector3(0, 0.1, 0))
          greenBox.rotation.x += 1
        }
        if (map['d']) {
          // greenBox.position.x -= 1;
        }
        if (map['s']) {
          // greenBox.position.z += 1;
        }
      }

      // Animations
      var alpha = 0
      scene.registerBeforeRender(function () {
        keypress()
        alpha += 0.01
      })
      return scene
    }
    var scene = createScene()
    engine.runRenderLoop(function () {
      scene.render()
    })
    window.addEventListener('resize', function () {
      engine.resize()
    })
  },
  methods: {
  }
}
</script>