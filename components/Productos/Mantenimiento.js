import React, { useMemo, useState, useEffect } from "react";
import Search from "components/Table/Search";
import Datatable from "components/Table/Datatable";
import Link from "next/link";
import Axios from "axios"
import backend_url from "config/backend";

const Mantenimiento = ({change }) => {

  const [data, setData] = useState([])
  const [dataProd, setDataProd] = useState([])

  const getInfoTable = async () => {
    const res = await fetch(`${backend_url}/productos/categorias`)
    const data = await res.json()
  
    setData(data)

    const resProd = await fetch(`${backend_url}/productos/obtener`)
    const dataProd = await resProd.json()
  
    setDataProd(dataProd)
  }

  useEffect(()=>{
    getInfoTable()
  }, [])

  const [filterText, setFilterText] = useState("");
  const [resetPagination, setResetPagination] = useState(false);

  const eliminarProducto = (val) => {

    Axios.post(`${backend_url}/productos/borrar-producto`, {id_producto: val}).then(()=>{
      console.log('registro borrado')
      getInfoTable()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row.nombreproducto,
      cell: (row) => <div className="font-semibold text-blueGray-700">{row.nombreproducto} </div>
    },
    {
      name: "CATEGORÍA",
      selector: (row) => row.id_tipoproducto,
      cell: (row) => <div>{
        (data.filter((el) => el.id_tipoproducto == row.id_tipoproducto)[0].nombretipo)
      }</div>
    }
    , {
      name: "PRECIO",
      selector: (row) => row.precio,
      cell: (row) => <div>S/. {row.precio}</div>
    }, {
      name: "STOCK",
      selector: (row) => row.stock,
      cell: (row) => <div>{row.stock}</div>
    }, {
      name: "",
      selector: (row) => row.id_producto,
      cell: (row) => <div className="flex">
        <Link href={`/admin/editar-producto/${row.id_producto}`} >
        <a>
        <button  className="bg-yellow-500 active:bg-yellow-400 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">Editar</button>
        </a>
        </Link>
        
        <button onClick={()=>{
          eliminarProducto(row.id_producto)
        }} className="bg-red-500 active:bg-red-400 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">Eliminar</button>
      </div>
    }
  ]

  const onFilter = (e) => {
    setFilterText(e.target.value)
  }

  const filteredItems = dataProd?.filter((item) => {
    return item.nombreproducto && item.nombreproducto.toLowerCase().includes(filterText.toLowerCase())
  })

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
        setResetPagination(!resetPagination)
      }
    }

    return (
      <div className="mb-4">
        <Search
          filterText={filterText}
          onFilter={onFilter}
          onClear={handleClear}
          placeHolder={"Buscar producto..."}
        />
      </div>
    );

  }, [filterText, resetPagination])

  return (
    <>

    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">Mantenimiento de Productos</h6>
              <button
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  change()
                }}
              >
                Registrar Productos
              </button>
            </div>
          </div>
          <div className="flex-auto pt-0">
            <div className="shadow-lg ">
              <Datatable
                filteredItems={filteredItems}
                columns={columns}
                subHeaderComponentMemo={subHeaderComponent}
              />
            </div>
    
          </div>
        </div>
    </>
   
  )
}

export default Mantenimiento

export async function getServerSideProps() {
  const res = await fetch(`${backend_url}/productos/categorias`)
  const data = await res.json()

  const resProd = await fetch(`${backend_url}/productos/obtener`)
  const dataProd = await resProd.json()

  console.log(data, dataProd) 

  return {
    props: {
      data:data,
      dataProd: dataProd
    }
  }
}

