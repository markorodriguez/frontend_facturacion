import React, {useState} from 'react'
import Admin from "layouts/Admin.js";
import axios from 'axios';

import backend_url from 'config/backend';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

function editarproducto({data}) {

  const [newProducto, setNewProd] = useState(data.producto)
  const router = useRouter()

  const editar = (e)=>{
    e.preventDefault()
    axios.post(`${backend_url}/productos/editar`, newProducto).then((r)=>{
      if(r.data.message =="success"){
        toast.success('Producto editado')
        router.push("/admin/registrar-producto")
      }else{
        toast.error('Ha ocurrido un error')
      }
    })
  }

  return (
    <div className="flex flex-wrap">
      <ToastContainer/>
    <div className="w-full mx-auto lg:w-8/12 px-4">
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
      <div className="text-center flex justify-between">
        <h6 className="text-blueGray-700 text-xl font-bold">Registrar Producto</h6>
        <button
          className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"

        >
          Mantenimiento de Productos
        </button>
      </div>
    </div>
    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form method='POST' action='#' onSubmit={(e)=>editar(e)} >
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Datos del producto
        </h6>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Tipo Producto
              </label>
              <select
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="lucky.jesse"
                value={newProducto.id_tipoproducto}
                onChange={(e) => setNewProd({...newProducto, id_tipoproducto: Number.parseInt(e.target.value)}) }
                required
              >
                {data.tipos.map((tipo,key)=>{
                  return <option value={tipo.id_tipoproducto} key={key}>
                    {tipo.nombretipo}
                  </option>
                })}
              </select>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Nombre producto
              </label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Producto"
                required
                onChange={(e) => setNewProd({...newProducto, id_nombreproducto: e.target.value}) }
                value={newProducto?.nombreproducto}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Precio
              </label>
              <input
                type="number"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="0.00"
                min="1"
                required
                onChange={(e) => setNewProd({...newProducto, precio: Number.parseFloat(e.target.value)}) }
                value={newProducto?.precio}
              />
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Stock
              </label>
              <input
                type="number"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="0"
                min="1"
                value={newProducto?.stock}
                required
                onChange={(e)=>{setNewProd({...newProducto, stock: Number.parseInt(e.target.value)})}}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-12/12 px-4">
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Descripción
            </label>
            <textarea
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              rows="4"
              placeholder='Breve descripción del producto'
              required
              onChange={(e)=>{setNewProd({...newProducto, descripcion	: e.target.value })}}
              value={newProducto?.descripcion}
            ></textarea>
          </div>
        </div>

        <div className="w-full mt-6 text-right">
        
          <button
            type="submit"
            className="bg-blueGray-700 mx-4 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          >
            Procesar
          </button>
        </div>
      </form>
    </div>
  </div>
    </div>

  </div>
  )
}

export async function getServerSideProps(context) {
  const {params} = context
  const {producto} = params

  try{
    const res = await fetch(`${backend_url}/productos/especifico/${producto}`)
    const data = await res.json()
    
    if(data == null){
      return {
        redirect: {
          permanent: false,
          destination: "/admin/registrar-producto"
        }
      }
    }else{
      return{
        props:{
          data: data
        }
      }
    }

    

  }catch{
    console.log('error')
  }
  
  
}


export default editarproducto

editarproducto.layout = Admin;