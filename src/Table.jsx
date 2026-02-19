
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Nav } from './App';
const Table = () => {
  function print(size = 10) {
      for (let i = 0; i < size; i++) {
          console.log(' * '.repeat(size))
      }
  }
  print();

  const [showHidePassword, setShowHidePassword] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    Confirmpassword: "",
    profilePicture: ""
  })
  const [error, setErrors] = useState(false)

  const clickHandler = (e) => {
    e.preventDefault()
    setErrors(true)
  }
  const handleFileChange = (value) => {
    const file = value[0]
    const image = URL.createObjectURL(file)
    setFormDetails({
      ...formDetails,
      profilePicture: image
    })
  }
  const form = () => {
    console.log(formDetails)
  }
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center '>
      <Nav/>
      <div className='border p-3 rounded-2xl h-auto'>
        <form action="" onSubmit={(e) => clickHandler(e)}>
          <div>
            <input type="text" placeholder='Enter your first name' onChange={(e) => setFormDetails({
              ...formDetails,
              firstName: e.target.value
            })} className='border py-1 px-2 rounded-sm w-90' />
            {error && formDetails.firstName === "" ? <p className='text-red-500 text-[10px] ml-2'> First name is required</p> : ""}
          </div>
          <div>
            <input type="text" placeholder='Enter your last name' onChange={(e) => setFormDetails({
              ...formDetails,
              lastName: e.target.value
            })} className='border py-1 px-2 rounded-sm mt-2 w-90 ' />
            {error && formDetails.lastName === "" ? <p className='text-red-500 text-[10px] ml-2'> Last name is required</p> : ""}
          </div>
          <div>
            <input type="email" placeholder='Enter your email ' onChange={(e) => setFormDetails({
              ...formDetails,
              email: e.target.value
            })} className='border py-1 px-2 rounded-sm  mt-2 w-90' />
            {error && formDetails.email === "" ? <p className='text-red-500 text-[10px] ml-2'> Email is required</p> : ""}
          </div>
          <div >
            <input type={showHidePassword ? "text" : "password"} placeholder='Enter your password ' onChange={(e) => setFormDetails({
              ...formDetails,
              password: e.target.value
            })} className='border py-1 px-2 rounded-sm mt-2 w-90'
            />
            {error && formDetails.password === "" ? <p className='text-red-500 text-[10px] ml-2'> Password is required</p> : ""}
          </div>
          <div  >
            <div>
              <input type={showHidePassword ? "text" : "password"} placeholder='Enter your Confirm password ' onChange={(e) => setFormDetails({
                ...formDetails,
                Confirmpassword: e.target.value
              })} className='border py-1 px-2 rounded-sm mt-2 w-90' />
              <button onClick={() => setShowHidePassword(!showHidePassword)} className=" -ml-12 mt-3 absolute  ">
                {showHidePassword ? "Hide" : "Show"}
              </button>
            </div>
            {error && formDetails.Confirmpassword === "" && (
              <p className='text-red-500 text-[10px] ml-2'>
                Confirm Password is required
              </p>
            )}

            {error &&
              formDetails.Confirmpassword !== "" &&
              formDetails.Confirmpassword !== formDetails.password && (
                <p className='text-red-500 text-[10px] ml-2'>
                  Passwords do not match
                </p>

              )}
          </div>
          <div className='border py-1 px-2 rounded-sm  mt-2'>
            <input type="file" onChange={(e) => handleFileChange(e.target.files)} />
          </div>
          <div className='w-90 p-1 border mt-2 rounded-sm h-45' >
            {
              formDetails.profilePicture && <img src={formDetails.profilePicture} alt="" className='w-88  rounded-sm' />
            }
          </div>
          <button type='Submit' onClick={() => form()} className='border py-1 px-2 rounded-sm mt-2 w-90 '>Submit</button>
        </form>
      </div>
    </div>
  )


}

export default Table