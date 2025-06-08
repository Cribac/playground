'use client'

import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    if (emblaApi) {
      console.log('emblaapi init', emblaApi)
      emblaApi.reInit()
    }
  }, [emblaApi])

  return (
    <div
      className='overflow-hidden'
      ref={emblaRef}
    >
      <div className='flex'>
        <div className='flex-none min-w-0 w-full'>1</div>
        <div className='flex-none min-w-0 w-full'>2</div>
        <div className='flex-none min-w-0 w-full'>3</div>
      </div>
    </div>
  )
}
