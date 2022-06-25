import React, {useState} from 'react'

import Admin from "layouts/Admin.js";

import Registrar from 'components/Productos/Registrar';
import Mantenimiento from 'components/Productos/Mantenimiento';

export default function registerProduct({ data, dataProd }) {

  const [showRegistro, setShowRegistro ] = useState(true)

  const handleChange = () => {
    setShowRegistro(!showRegistro)
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mx-auto lg:w-8/12 px-4">
            {showRegistro ? <Registrar data={data} change={handleChange} /> : <Mantenimiento data={data} dataProd={dataProd} change={handleChange} />}
        </div>

      </div>
    </>
  )
}

registerProduct.layout = Admin;

export async function getServerSideProps() {
  const res = await fetch('https://backendfacturacion.herokuapp.com/productos/categorias')
  const data = await res.json()

  const resProd = await fetch('https://backendfacturacion.herokuapp.com/productos/obtener')
  const dataProd = await resProd.json()
  return {
    props: {
      data,
      dataProd
    }
  }
}
