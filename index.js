const track = document.getElementsByClassName("track")[0]
const car = document.getElementsByClassName("car")[0]
const trackPart1 = document.getElementsByClassName("track-part__1")[0]
const trackPart2 = document.getElementsByClassName("track-part__2")[0]
const trackPart3 = document.getElementsByClassName("track-part__3")[0]
const trackPart4 = document.getElementsByClassName("track-part__4")[0]
const trackPart5 = document.getElementsByClassName("track-part__5")[0]
const trackPart6 = document.getElementsByClassName("track-part__6")[0]
const trackPart7 = document.getElementsByClassName("track-part__7")[0]
const trackPart8 = document.getElementsByClassName("track-part__8")[0]
const trackPart9 = document.getElementsByClassName("track-part__9")[0]

document.addEventListener('keydown', event => keysPressed[event.code] = event)
document.addEventListener('keyup', event => delete keysPressed[event.code])

let loopIntervalRef = null
const startLoop = (cb, intervalMs = 20) => {
  if (loopIntervalRef) {
    clearInterval(loopIntervalRef)
  }

  let lastTime = Date.now()
  let currentTime = lastTime
  let timeSinceStart = 0
  let lastTimeDiff = 0

  //Counting the times
  const cbWrapper = () => {
    lastTime = currentTime
    currentTime = Date.now()
    lastTimeDiff = currentTime - lastTime
    timeSinceStart += lastTimeDiff

    cb({
      lastTime,
      currentTime,
      lastTimeDiff,
      timeSinceStart
    })
  }

  loopIntervalRef = setInterval(cbWrapper, intervalMs)
  cb({
    lastTime,
    currentTime,
    lastTimeDiff,
    timeSinceStart
  })
}

const keysPressed = {}
let rotation = 0
let speed = 0
let trackLeft = 0 
let trackTop = 0
startLoop(function () {
  if (keysPressed['ArrowRight'] || keysPressed['KeyD']) rotation += Math.PI * 0.02
  if (keysPressed['ArrowLeft'] || keysPressed['KeyA']) rotation -= Math.PI * 0.02
  if (keysPressed['ArrowDown'] || keysPressed['KeyS']) speed = speed - 1 
  if (keysPressed['ArrowUp'] || keysPressed['KeyW']) speed = speed + 1

  speed = Math.max(Math.min(speed, 10), 0)

  const xChange = -speed * Math.sin(rotation)
  const yChange = speed * Math.cos(rotation)

  trackLeft += xChange
  trackTop += yChange

  trackLeft = Math.min(Math.max(trackLeft, -720), 720)
  trackTop = Math.min(Math.max(trackTop, -720), 720)

  car.style.transform = `rotate(${rotation}rad)`
  track.style.top = `${trackTop}px`
  track.style.left = `${trackLeft}px`
})
