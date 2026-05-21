import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex flex-col items-center mb-6'>
      <div className='flex items-center gap-4'>
        <p className='w-12 h-[1px] bg-saarthi-terracotta'></p>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-display text-saarthi-brown tracking-wide'>
          <span className='text-saarthi-dark font-light italic'>{text1}</span> {text2}
        </h2>
        <p className='w-12 h-[1px] bg-saarthi-terracotta'></p>
      </div>
      <div className='mt-2 flex gap-1 justify-center opacity-70'>
        <span className='w-2 h-2 rounded-full bg-saarthi-gold'></span>
        <span className='w-2 h-2 rounded-full bg-saarthi-terracotta'></span>
        <span className='w-2 h-2 rounded-full bg-saarthi-brown'></span>
      </div>
    </div>
  )
}

export default Title
