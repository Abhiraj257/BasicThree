import React, { useRef, useState } from 'react'

import { Canvas, useFrame } from 'react-three-fiber'

import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei'

import { useSpring, a } from 'react-spring/three'

// import { Box } from 'drei'

import './App.scss'

softShadows()

const RotatingBox = ({ position, args, color, speed }) => {
  const mesh = useRef(null)

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  const [expand, setExpand] = useState(false)

  const styles = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1]
  })

  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={styles.scale}
      castShadow
      ref={mesh}
      position={position}>
      <boxBufferGeometry attach='geometry' args={args} />
      {/* <meshStandardMaterial attach='material' color={color} /> */}
      <MeshWobbleMaterial
        attach='material'
        color={color}
        speed={speed}
        factor={0.6}
      />
      {/*
        THIS IS FROM 'drei'
        <Box>
          <meshStandardMaterial attach='material' />
        </Box> */}
    </a.mesh>
  )
}

function App() {
  return (
    <>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight intensity={0.5} position={[-10, 0, -20]} />
        <pointLight intensity={0.9} position={[0, -10, 0]} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100, 100]} />
            {/* <meshStandardMaterial attach='material' color='yellow' /> */}
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
        </group>
        <RotatingBox
          position={[0, 1, 0]}
          args={[3, 2, 1]}
          color={'lightblue'}
          speed={2}
        />
        <RotatingBox position={[-2, 1, -5]} color='pink' speed={4} />
        <RotatingBox position={[5, 1, -2]} color='pink' speed={4} />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
