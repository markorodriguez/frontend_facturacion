import React, {useState} from "react"

const useForm = () => {
    
    const [datos, setDatos] = useState({})
    
    const handleInput = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    return [datos, handleInput]

}

export default useForm