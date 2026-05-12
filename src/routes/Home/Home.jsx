import React from 'react'
import SignIn from '../../components/sign-in-form/SignIn'
import SignUp from '../../components/sign-up-form/SignUp'


const Home = () => {
  return (

    <div className='w-full flex justify-center mt-10'>

      <div className='w-[90%] lg:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-20'>

        <SignIn />

        <SignUp />

      </div>

    </div>
  )
}

export default Home