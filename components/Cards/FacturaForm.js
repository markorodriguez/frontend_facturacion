import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie"
import backend_url from 'config/backend';
import "react-toastify/dist/ReactToastify.css";
// components

export default function FacturaForm({ handleChange, products }) {
  const [indexProd, setIndexProd] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [ruc, setRuc] = useState("");
  const [empresa, setEmpresa] = useState({});

  const [timeStapInicio, setTimeStapInicio] = useState();

  const [listado, setListado] = useState([]);

  const getInfo = () => {
    Axios.post(`${backend_url}/clientes/consumir-ruc`, {
      ruc: ruc,
    })
      .then((res) => {
        //setEmpresa(res.data.data)
        if ((res.data.message = "Success")) {
          console.log(res.data);
          setEmpresa(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(listado.length>0){
      const data = {
        empresa: empresa,
        listado: listado,
        currentUser: JSON.parse(Cookies.get('usuario')).usuario.id_usuario,
        tiempo: Date.now()-timeStapInicio
      }

      Axios.post(`${backend_url}/facturas/generar-factura`, data).then((r)=>{
        if(r.data.message = "success"){
          setEmpresa({})
          setListado([])
          e.target.reset()
          toast.success("Factura generada")
        }else{
          toast.warn('Ha ocurrido un error')
        }
      })
    }else{
      toast.warning('No hay productos seleccionados')
    }

    
  };

  const quitarListado = (value) => {
    const elementoRemover = listado.splice(value, 1);
    const newListado = listado.filter((item) => item !== elementoRemover);
    setListado(newListado);
  };

  return (
    <>
      <ToastContainer />
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
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={(e) => setRuc(e.target.value)}
                  />
                  <span
                    onClick={() => {
                      getInfo();
                      setTimeStapInicio(new Date());
                    }}
                    className="bg-none border-b-2 text-blueGray-400 text-sm cursor-pointer"
                  >
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
                    value={empresa.nombre != null ? empresa.nombre : ""}
                    readOnly
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
                    value={empresa.estado != null ? empresa.estado : ""}
                    readOnly
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
                    value={empresa.condicion != null ? empresa.condicion : ""}
                    readOnly
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
                    value={empresa.telefono != null ? empresa.telefono : ""}
                    onChange={(e) =>
                      setEmpresa({ ...empresa, telefono: e.target.value })
                    }
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
                    value={empresa.correo != null ? empresa.correo : ""}
                    onChange={(e) =>
                      setEmpresa({ ...empresa, correo: e.target.value })
                    }
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
                    value={empresa.direccion != null ? empresa.direccion : ""}
                    readOnly
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
                    value={
                      empresa.departamento != null ? empresa.departamento : ""
                    }
                    readOnly
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
                    value={empresa.provincia != null ? empresa.provincia : ""}
                    readOnly
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
                    value={empresa.distrito != null ? empresa.distrito : ""}
                    readOnly
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
                      setCantidad(0)
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
                  value={cantidad}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    if (products[indexProd].stock >= e.target.value) {
                      setCantidad(e.target.value);
                    } else {
                      e.target.value = Number.parseInt(products[indexProd].stock);
                      setCantidad(e.target.value);
                      toast.warning(
                        `El stock de ${products[indexProd].nombreproducto} es ${products[indexProd].stock}`
                      );
                    }
                  }}
                  min="0"
                />
              </div>
              <div className="relative flex items-center w-full lg:w-4/12 ">
                <button
                  type="button"
                  className="bg-blueGray-600 mx-4 active:bg-green-600 text-white font-bold uppercase text-xs px-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 py-2 mt-2 ease-linear transition-all duration-150"
                  onClick={() => {
                    products[indexProd].stock -= cantidad;
                    setListado((prev) => {
                      return [
                        ...prev,
                        {
                          id_producto: products[indexProd].id_producto,
                          nombreproducto: products[indexProd].nombreproducto,
                          cantidad: cantidad,
                          precio: products[indexProd].precio,
                        },
                      ];
                    });
                  }}
                  readOnly={products[indexProd].stock === 0 ? true : false}
                >
                  Agregar
                </button>
              </div>
            </div>

            {listado.length > 0 ? (
              <>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Resumen
                </h6>
                <div className="relative overflow-x-auto px-4 ">
                  <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Producto
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Cantidad
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Precio
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Importe
                        </th>
                        <th scope="col" className="px-6 py-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listado.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >
                              {item.nombreproducto}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {item.cantidad}
                            </td>
                            <td className="px-6 py-4 text-center">{item.precio}</td>
                            <td className="px-6 py-4 text-center">
                              {"S/ " + item.cantidad * item.precio}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span
                                className="cursor-pointer hover:underline font-medium text-blue-600 dark:text-blue-500 "
                                onClick={() => {
                                  quitarListado(index);
                                  products[indexProd].stock = Number.parseInt(products[indexProd].stock) + Number.parseInt(item.cantidad);
                                }}
                              >
                                Eliminar
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="text-center font-bold">
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td>
                          {"S/ " +
                            listado
                              .reduce((total, item) => {
                                return total + item.cantidad * item.precio;
                              }, 0)
                              .toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                      <tr className="text-center font-bold">
                        <td></td>
                        <td></td>
                        <td>Total + IGV </td>
                        <td>
                          {"S/ " +
                            (
                              listado.reduce((total, item) => {
                                return total + item.cantidad * item.precio;
                              }, 0) +
                              listado.reduce((total, item) => {
                                return total + item.cantidad * item.precio;
                              }, 0) *
                                0.18
                            ).toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            ) : null}

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
