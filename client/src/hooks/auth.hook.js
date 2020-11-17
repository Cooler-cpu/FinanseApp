import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData' //name local-storage

export const useAuth = () => {

    const [token, setToken] = useState(null)
    //const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback( (jwtToken, id) => { // get with back-end
        setToken(jwtToken)
        setUserId(id)

            localStorage.setItem(storageName, JSON.stringify({  //write data to local-storage
                userId: id, token: jwtToken
            }))
    }, [])


    const logout = useCallback( () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect ( () => {
        // data string to the object
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){     //use login if user data exist in local-storage
            login(data.token, data.userId)
        }

    }, [login])  //use the local login method  

    //If we get the jwt token, we store it in local storage
    // return form hook two methods, token and userId
    return {login, logout, token, userId}
}