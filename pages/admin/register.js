import React, { useState } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"
import backend_url from 'config/backend';
import Admin from "layouts/Admin";

export default function Register() {

  const [dni, setDni] = useState("");
  const [persona, setPersona] = useState({});

  const getInfo = () => {
    Axios.post(`${backend_url}/usuarios/info-usuario`, {
      dni: dni,
    })
      .then((res) => {
        setPersona(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      dni: dni,
      persona: persona,
      currentUser: JSON.parse(Cookies.get('usuario')).usuario.id_usuario
    }

    Axios.post(`${backend_url}/usuarios/registrar-usuario`, data).then((r) => {
      console.log(r)
      if (r.data.message = "success") {
        setPersona({})
        e.target.reset()
        toast.success("Usuario registrado")
      } else {
        toast.warn('Ha ocurrido un error')
      }
    }).catch((err) => {
      console.log(err, 'error')
    })
  };

  return (
    <>
  <ToastContainer/>
      <div className="flex flex-wrap">
        <div className="w-full mx-auto lg:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100  border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Registro de usuarios
                </h6>

              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit} action="#">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Información de la persona
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        DNI
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Ingrese su DNI"
                        value={dni}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => setDni(e.target.value)}
                      />
                      <span
                        onClick={() => {
                          getInfo();
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
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Ingrese su nombre"
                        value={persona.nombre !== null ? persona.nombre : ""}
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
                        Apellido Paterno
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Ingrese su apellido paterno"
                        value={
                          persona.apPaterno !== null
                            ? persona.apPaterno
                            : ""
                        }
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
                        Apellido Materno
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Ingrese su apellido materno"
                        value={
                          persona.apMaterno !== null
                            ? persona.apMaterno
                            : ""
                        }
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
                        value={persona.telefono != null ? persona.telefono : ""}
                        onChange={(e) =>
                          setPersona({ ...persona, telefono: e.target.value })
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
                        value={persona.correo != null ? persona.correo : ""}
                        onChange={(e) =>
                          setPersona({ ...persona, correo: e.target.value })
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
                      Rol
                    </label>
                    <select
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={persona.id_tipousuario != null ? persona.id_tipousuario : ""}
                      onChange={(e) =>
                        setPersona({ ...persona, id_tipousuario: e.target.value })
                      }
                    >
                      <option value={1}>Administrador</option>
                      <option value={2}>Cajero</option>
                    </select>
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
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
                      value={persona.contraseña != null ? persona.contraseña : ""}
                      onChange={(e) =>
                        setPersona({ ...persona, contraseña: e.target.value })
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
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={persona.direccion != null ? persona.direccion : ""}
                      onChange={(e) =>
                        setPersona({ ...persona, direccion: e.target.value })
                      }
                    />
                  </div>
                </div>

                </div>


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
        </div>
      </div>


    </>
  );
}

Register.layout = Admin;
