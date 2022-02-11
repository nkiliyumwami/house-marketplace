import {useState} from'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
// Authentication
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'

//Add user to the database
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'


function SignUp() {
  //States
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  //To use form data we have to destructure:
  const {name, email, password} = formData

  //Init navigate hook
  const navigate = useNavigate()
  
  //Update the form data state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
      
    }))
  }

  //Create a user by submitting/sending data in the form
  const onSubmit = async (e) => {
    e.preventDefault()

    //Since we are not using the .then as in the documentation(we must use try catch here)
    try {
      const auth = getAuth()

      //Registering a user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      //Get the user infos
      const user = userCredential.user

      //Updating the display name
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      //Add user to the database
      //1.Create a copy of state(formData): never modify a state!!
      const formDataCopy = {...formData}

      //2.Remove the password: Never send a password to the server
      delete formDataCopy.password

      //3.Add a timestamp(date when the entry it has been added)
      formDataCopy.timestamp = serverTimestamp()

      //4.Update the db by adding the user to the collection(users: the name of the collection in our db)
      await setDoc(doc(db, 'users', user.uid), formDataCopy)




      //Redirecting to the route/home page('/')
      navigate('/')

    } catch (error) {
      toast.error(`Something went wrong with registration`)
    }
  }

    return (
      <>
       <div className="pageContainer">
         <header>
           <p className="pageHeader">
             Welcome Back!
           </p>
         </header>
         <main>
           <form onSubmit={onSubmit}>
           <input 
             type="text" 
             className="nameInput"
              placeholder='Name'
              id='name' 
              value={name}
              onChange={onChange}
              />

             <input 
             type="email" 
             className="emailInput"
              placeholder='Email'
              id='email' 
              value={email}
              onChange={onChange}
              />

              <div className="passwordInputDiv">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className='passwordInput'
                  placeholder='Password'
                  id='password'
                  value={password}
                  onChange={onChange}
                  />

                  <img 
                    src={visibilityIcon} 
                    alt="show password"
                    className='showPassword'
                    onClick={() =>setShowPassword((prevState)=> !prevState)}
                    />
              </div>
              <Link 
              to='/forgot-password'
              className='forgotPasswordLink'>
                Forgot Password
              </Link>

              <div className="signUpBar">
                <p className="signUpText">
                  Sign Up
                </p>
                <button className="signUpButton">
                  <ArrowRightIcon 
                    fill='#ffffff'
                    width='34px'
                    height='34px' />
                </button>
              </div>
           </form>

           {/* Google OAuth component */}

           <Link to='/sign-in' className="registerLink">
             Sign In Instead
           </Link>
         </main>
        </div> 
      </>);
  }
  
  export default SignUp;
  
  
  
  