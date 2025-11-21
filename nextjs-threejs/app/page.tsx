import AppCanvas from '@/app/components/AppCanvas.component'
import Cube from '@/app/components/molecules/Cube.component'

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <h1 className='text-5xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl'>
          Welcome to <span className='text-blue-600'>Three.js</span> with{' '}
          <span className='text-green-600'>Next.js 16</span>
        </h1>
        <AppCanvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Cube meshProps={{ position: [-3.4, 0, 0] }} />
          <Cube
            meshProps={{ position: [0, 0, 0] }}
            direction='down'
          />
          <Cube meshProps={{ position: [3.4, 0, 0] }} />
        </AppCanvas>
      </main>
    </div>
  )
}
