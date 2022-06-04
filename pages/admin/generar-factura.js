import React, { useState } from 'react'

import Admin from "layouts/Admin.js";
import FacturaForm from "components/Cards/FacturaForm.js";
import BoletaForm from "components/Cards/BoletaForm.js";

export default function generarFactura({ data }) {
  const [isFactura, setRecibo] = useState(true)
  
  const handleChange = () => {
    setRecibo(!isFactura)
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mx-auto lg:w-8/12 px-4">
          {isFactura ? <FacturaForm handleChange={handleChange} products={data} /> : <BoletaForm handleChange={handleChange} products={data} />}
        </div>

      </div>
    </>
  )
}

generarFactura.layout = Admin;


export async function getServerSideProps() {

  const res = await fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price');
  const data = await res.json();

  await console.log(data.products)
  return {
    props: {
      data: data.products
    },
  }
}

