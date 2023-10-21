interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <section className='h-screen m-12'>
      <div className='h-full'>
        <div className='g-6 flex h-full flex-wrap items-center justify-center lg:justify-between'>
          <div className='shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12'>
            <img
              src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
              className='w-full'
              alt='Login form illustration'
            />
          </div>
          <div className='mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12'>{children}</div>
        </div>
      </div>
    </section>
  )
}
