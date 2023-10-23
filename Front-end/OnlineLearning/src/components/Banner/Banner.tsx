import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <div
      className='bg-cover bg-center ml-10 mr-10 h-auto text-white py-24 px-10 object-fill'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)'
      }}
    >
      <div className='md:w-1/2'>
        <p className='font-bold text-sm uppercase'>Services</p>
        <p className='text-3xl font-bold'>Multimedia products</p>
        <p className='text-2xl mb-10 leading-none'>Atractive designs for your brand</p>
        <Link
          to='#'
          className='bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800'
        >
          Contact us
        </Link>
      </div>
    </div>
  )
}
