import { Scene, PerspectiveCamera, WebGLRenderer } from "three"

import "./style.css"
console.log("this is 3d portfolio")

const scene = new Scene()

const cameraRation = window.innerWidth / window.innerHeight
const camera = new PerspectiveCamera(75, cameraRation, 0.0, 1000)
camera.position.setZ(30)

const canvas = document.querySelector("#bg")
if (canvas) {
  const renderer = new WebGLRenderer({
    canvas,
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.render(scene, camera)
}
