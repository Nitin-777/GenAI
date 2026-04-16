import axios from "axios"


const api=axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

export async function register({username, email, password}){
    
    try{
    const response= await api.post('/auth/register', {
        username,email,password
    })
    return response.data;
  } 
  catch(err){
    console.log("Error", err)
  }
}

export async function login({email , password}){
    try{
    const response= await api.post('/api/auth/login', {
       email,password

    })

    return response.data;
}

    catch(err){
        console.log("Error cannot Login", err);
    }
}

export async function logout(){
    try{
         const response= await api.post('/api/auth/logout')

         return response.data
    }
    catch(err){
         console.log("Cannot logout", err);
    }
}

export async function getMe(){
    try{
           const response=await api.get('/api/auth/get-me')

           return response.data
    }
    catch(err){
        console.log("Cannot fetch user data", err);
    }
}