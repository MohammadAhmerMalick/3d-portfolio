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
  // PointLightHelper,
  MeshBasicMaterial,
  PerspectiveCamera,
  MeshStandardMaterial,
  SRGBColorSpace,
} from "three"

import "./style.css"

// scene
const scene = new Scene()

// camera
const cameraRation = window.innerWidth / window.innerHeight
const camera = new PerspectiveCamera(75, cameraRation, 0.1, 1000)
camera.position.setX(0)
camera.position.setY(0)
camera.position.setZ(0)

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
  // const lightHelper = new PointLightHelper(pointLight)
  // const orbitControl = new OrbitControls(camera, renderer.domElement)
  // scene.add(lightHelper)

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
  spaceTexture.colorSpace = SRGBColorSpace
  scene.background = spaceTexture

  // logo
  const logo = new Mesh(
    new BoxGeometry(3, 3, 3),
    new MeshBasicMaterial({ map: new TextureLoader().load("/logo.svg") })
  )
  scene.add(logo)
  logo.position.z = -5

  // moon

  const moonTexture = new TextureLoader().load("./moon.jpg")
  moonTexture.colorSpace = SRGBColorSpace
  const moonNormalTexture = new TextureLoader().load("./moon-normal-map.jpg")
  moonNormalTexture.colorSpace = SRGBColorSpace

  const moon = new Mesh(
    new SphereGeometry(3, 32, 32),
    new MeshStandardMaterial({
      map: moonTexture,
      normalMap: moonNormalTexture,
    })
  )
  scene.add(moon)
  moon.position.z = 20
  moon.position.x = -5

  // camera movement
  const moveCamera = () => {
    const t = document.body.getBoundingClientRect().top
    moon.rotation.x = t * 0.001
    moon.rotation.z = t * 0.005

    logo.rotation.x = t * 0.005
    logo.rotation.y = t * 0.005
    logo.rotation.z = t * 0.005

    camera.position.z = t * -0.01
  }
  document.body.onscroll = moveCamera

  // animate loop
  const aniimate = () => {
    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    requestAnimationFrame(aniimate)
    renderer.render(scene, camera)
  }

  aniimate()
}
