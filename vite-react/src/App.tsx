import './global.css'
import glaze from 'glazejs'
import gsap from 'gsap';
//import CursorContainer from './components/CursorContainer'

console.log('fuuuuuuuuuu', gsap)

glaze({
  lib: {
    gsap: {
      core: gsap,
    },
  },
})

function App() {
  return (
    <main className='bg-slate-500 h-screen flex justify-center items-center text-base text-white'>
      <h1 data-animate="@lg:[&>span>span]:to:y-0|stagger-0.025" className="text-black">
        {"Utility-based animations for the web.".split(" ").map((w, i, arr) => (
          <span className="relative inline-block overflow-hidden" key={i}>
            <span className="inline-block translate-y-full">{w}</span>
          </span>
        ))}
      </h1>
      {/* <CursorContainer /> */}
    </main>
  )
}

export default App
