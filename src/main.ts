import {
  Mesh,
  Scene,
  MathUtils,
  PointLight,
  BoxGeometry,
  AmbientLight,
  WebGLRenderer,
  TorusGeometry,
  TextureLoader,
  SphereGeometry,
  PointLightHelper,
  MeshBasicMaterial,
  PerspectiveCamera,
  MeshStandardMaterial,
} from "three"

import "./style.css"
import { OrbitControls } from "three/examples/jsm/Addons.js"

// scene
const scene = new Scene()

// camera
const cameraRation = window.innerWidth / window.innerHeight
const camera = new PerspectiveCamera(75, cameraRation, 0.1, 1000)
camera.position.setZ(30)

// canvas
const canvas = document.querySelector("#bg")

if (canvas) {
  // renderer
  const renderer = new WebGLRenderer({ canvas })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  // geometry & material
  const torus = new Mesh(
    new TorusGeometry(10, 2, 16, 100),
    new MeshStandardMaterial({ color: 0xff6347 })
  )
  // scene.add(torus)

  // light
  const pointLight = new PointLight(0xffffff)
  pointLight.position.set(5, 5, 5)

  const ambientLight = new AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)

  // helper
  const lightHelper = new PointLightHelper(pointLight)
  const orbitControl = new OrbitControls(camera, renderer.domElement)
  scene.add(lightHelper)

  // add start
  const addStart = () => {
    const star = new Mesh(
      new SphereGeometry(0.1, 34, 34),
      new MeshStandardMaterial({ color: 0xffffff })
    )

    const [x, y, z] = Array(3)
      .fill(0)
      .map(() => MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
  }

  for (let i = 0; i < 200; i++) addStart()

  // space texture
  const spaceTexture = new TextureLoader().load("./space.jpg")
  scene.background = spaceTexture

  // logo
  const logo = new Mesh(
    new BoxGeometry(3, 3, 3),
    new MeshBasicMaterial({ map: new TextureLoader().load("/logo.svg") })
  )
  scene.add(logo)
  logo.position.z = -5

  // moon
  const moon = new Mesh(
    new SphereGeometry(3, 32, 32),
    new MeshStandardMaterial({
      map: new TextureLoader().load("./moon.jpg"),
      normalMap: new TextureLoader().load("./moon-normal-map.jpg"),
    })
  )
  scene.add(moon)
  moon.position.z = 30
  moon.position.x = -10

  const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top
    moon.rotation.x = 0.05
    moon.rotation.y = 0.05
    moon.rotation.z = 0.05

    logo.rotation.x = 0.05
    logo.rotation.y = 0.05
    logo.rotation.z = 0.05

    camera.position.x = t * -0.002
    camera.position.y = t * -0.002
    camera.position.z = t * -0.05

    console.log(camera.position)
  }
  document.body.onscroll = moveCamera

  const aniimate = () => {
    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    requestAnimationFrame(aniimate)
    renderer.render(scene, camera)
  }

  aniimate()
}
