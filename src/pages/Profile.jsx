import {useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth'


function Profile() {
  //To tell if we are logged in or not(that's why we use useState here)
  const[user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(()=> {
    setUser(auth.currentUser)
  }, [])

    return user ? <h1>{user.displayName}</h1> : `Not Logged In`
    
  }
  
  export default Profile;
  
  
  