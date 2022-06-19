import React, { useState } from "react";
import Axios from "axios"
// components

export default function FacturaForm({ handleChange, products }) {
  const [indexProd, setIndexProd] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [ruc, setRuc] = useState("");
  const [empresa, setEmpresa] = useState({});

  const [listado, setListado] = useState([]);

  const getInfo = () => {
    Axios.post('http://localhost:5000/clientes/consumir-ruc', {
      ruc: ruc
    }).then((res) => {
      //setEmpresa(res.data.data)
      if (res.data.message = "Success") {
        console.log(res.data)
        setEmpresa(res.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    const data = {
      ruc: empresa.ruc,
      razon_social: empresa.nombre_o_razon_social,
      estado: empresa.estado,
      condicion: empresa.condicion,
      direccion: empresa.direccion,
      departamento: empresa.departamento,
      provincia: empresa.provincia,
      distrito: empresa.distrito,
      id_prod: products[indexProd].id,
      nombre_prod: products[indexProd].title,
      precio_prod: products[indexProd].price,
      cantidad: cantidad,
      total: products[indexProd].price * cantidad,
    }
    Axios.post('http://localhost:4000/registrar-factura', data).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
    
    */

  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100  border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Generación de facturas
            </h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {
                handleChange();
              }}
            >
              Cambiar a Boleta
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Información de la empresa
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    RUC
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setRuc(e.target.value)}
                  />
                  <span onClick={() => { getInfo() }} className="bg-none border-b-2 text-blueGray-400 text-sm cursor-pointer">
                    Obtener datos
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Razón social
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="jesse@example.com"
                    value={empresa.nombre != null ? empresa.nombre : ''}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Estado
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.estado != null ? empresa.estado : ''}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Condición
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.condicion != null ? empresa.condicion : ''}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.telefono != null ? empresa.telefono : ''}
                    onChange={(e) => setEmpresa({ ...empresa, telefono: e.target.value })}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Correo
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.correo != null ? empresa.correo : ''}
                    onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Ubicación de la empresa
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.direccion != null ? empresa.direccion : ''}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Departamento
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.departamento != null ? empresa.departamento : ''}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Provincia
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                    value={empresa.provincia != null ? empresa.provincia : ''}
                    disabled
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Distrito
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={empresa.distrito != null ? empresa.distrito : ''}
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Productos
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <select
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={indexProd}
                    onChange={(e) => {
                      setIndexProd(e.target.value);
                    }}
                  >
                    {products.map((producto, index) => (
                      <option value={index} key={index}>
                        {producto.nombreproducto}
                      </option>
                    ))}
                  </select>

                </div>
              </div>
              <div className="relative w-full lg:w-4/12 mb-3 px-4">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="1"
                  onChange={(e) => {
                    setCantidad(e.target.value);
                  }}
                  min="1"
                />
              </div>
              <div className="relative flex items-center w-full lg:w-4/12 ">
                <button
                  type="button"
                  className="bg-blueGray-600 mx-4 active:bg-green-600 text-white font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 py-2 mt-2 ease-linear transition-all duration-150"
                  onClick={() => {
                    setListado((prev) =>{
                      return [...prev, {
                        nombreproducto: products[indexProd].nombreproducto,
                        cantidad: cantidad,
                        precio: products[indexProd].precio,
                      }]
                    })
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Resumen
            </h6>


            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <div className="w-full mt-6 text-right">
              <button
                type="reset"
                className="border-blueGray-700 mx-4 text-blueGray-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              >
                Limpiar
              </button>
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
    </>
  );
}
