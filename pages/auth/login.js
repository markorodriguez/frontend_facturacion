import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {setCookie, destroyCookie} from "nookies";
import Link from "next/link";
import useForm from "hooks/useForm";
import axios from "axios";
import backend_url from "config/backend";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie"

// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {


  const [datos, handleInput] = useForm()
  const [checked, setChecked] = useState(false)

  const router = useRouter()

  useEffect(()=>{
   Cookies.remove('usuario', {path: '/'})
   Cookies.remove('usuario', {path: '/admin'})
   Cookies.remove('usuario', {path: ''})
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${backend_url}/usuarios/login`, {dni: datos.usuario, contraseña: datos.contrasena, checked: checked}).then((response) => {
      if(response.data.message === 'Login exitoso'){
        setCookie(null, 'usuario',JSON.stringify({token: response.data.token, usuario: response.data.data}))
        toast.success(response.data.message, {autoClose: 1500})
        setTimeout(() => {
          router.push('/admin/generar-factura')
        }, 1500)
      }else{
        toast.error(response.data.message)
      }
    })
  }



  return (
    <>
    <ToastContainer/>
 <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <h3 className="mt-8">Iniciar Sesión</h3>
              </div>
              <form action="/#" method="POST" onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Usuario"
                    name="usuario"
                    onChange = {(e)=>{handleInput(e)}}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    name="contrasena"
                    onChange =  {(e)=>{handleInput(e)}}
                  />
                </div>
                
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      name="check"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      value={!checked}
                      onChange={(e)=>{
                        setChecked(!checked)
                        handleInput(e)
                      }}
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      Recordar usuario
                    </span>
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

Login.layout = Auth;
