import React, { useEffect, useState, useMemo } from "react";
// components
import Datatable from "components/Table/Datatable";
import Search from "components/Table/Search.js";
import backend_url from 'config/backend';

// layout for page

import Admin from "layouts/Admin.js";
import axios from "axios";


export default function Tables({ data, boletas, todo }) {

  const [filterText, setFilterText] = useState("");
  const [filterTextBoletas, setFilterTextBoletas] = useState("")

  const [resetPagination, setResetPagination] = useState(false);
  const [resetPaginationBoletas, setResetPaginationBoletas] = useState(false);

  const handleAnular = (val) => {

    const uno = todo.facturas.findIndex((el)=>el.id_factura == val)
    const dos = todo.boletas.findIndex((el)=>el.id_factura == val)

    if (uno >= 0){
      todo.facturas[uno].estado = 'cancelado'
      setFilterText(todo.facturas[uno].ruc)
    } else {
      todo.boletas[dos].estado = 'cancelado'
      setFilterTextBoletas(todo.boletas[dos].dni)
    }
    
    
  }

  const updateEstado = (val) => {
    axios.post(`${backend_url}/facturas/anular`, {id: val}).then(()=>{
      console.log('actualizado')
    }).catch((err)=>{
      console.log(err)
    })
  }

  const onFilter = (e) => {
    setFilterText(e.target.value);
  }

  const onFilterBoletas = (e) => {
    setFilterTextBoletas(e.target.value);
  }

  const columns = [
    {
      name: "FACTURA",
      selector: (row) => row.numerofactura,
      cell: (row) => <div className="font-semibold text-blueGray-700">{row.numerofactura}</div>
    },
    {
      name: "IMPORTE",
      selector: (row) => row.importetotal,
      cell: (row) => <div>S/. {row.importetotal + row.igv}</div>
    },
    {
      name: "ESTADO",
      selector: (row) => row.estado,
      cell: (row) => <div>{row.estado == 'FACTURADO' ? <span className="bg-emerald-200 text-emerald-500 px-2 text-xs font-semibold py-1 rounded">{row.estado.toLowerCase()}</span> : <span className="bg-red-200 text-red-500 px-2 text-xs font-semibold py-1 rounded">{row.estado.toLowerCase()}</span> }</div>
    },
    {
      name: "CLIENTE",
      selector: (row) => row.ruc != null ? row.ruc : row.dni,
      cell: (row) => <div>{row.ruc != null ? row.ruc : row.dni}</div>
    },
    {
      name: "FECHA",
      selector: (row) => row.fecha,
      cell: (row) => <div>{row.fecha}</div>
    }, {
      name: '',
      selector: (row) => row.id_factura,
      cell: (row) => <div>
        <button
          type="button"
          className="bg-blueGray-700 mx-4 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          onClick={()=>{
            handleAnular(row.id_factura)
            updateEstado(row.id_detallefactura)
          }}
        >
          Anular
        </button>

      </div>
    }
  ]

  const filteredItems = todo.facturas.filter((item) => {
      return item.ruc && item.ruc.toString().includes(filterText);
  });

  const filteredItemsBoletas = todo.boletas.filter((item) => {
    return item.dni && item.dni.toString().includes(filterTextBoletas);
});

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
        setResetPagination(!resetPagination);
      }
    };

    return (
      <div className="mb-4">
        <Search
          filterText={filterText}
          onFilter={onFilter}
          onClear={handleClear}
          placeHolder={"Buscar cliente..."}
        />
      </div>

    );
  }, [filterText, resetPagination]);

  const subHeaderComponentBoletas = useMemo(() => {
    const handleClear = () => {
      if (filterTextBoletas) {
        setFilterTextBoletas("");
        setResetPagination(!resetPagination);
      }
    };

    return (
      <div className="mb-4">
        <Search
          filterText={filterTextBoletas}
          onFilter={onFilterBoletas}
          onClear={handleClear}
          placeHolder={"Buscar cliente..."}
        />
      </div>

    );
  }, [filterTextBoletas, resetPaginationBoletas]);


  return (
    <>

      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="shadow-lg ">
            <Datatable
              filteredItems={filteredItems}
              columns={columns}
              subHeaderComponentMemo={subHeaderComponent}
              title={'Facturas'} />
          </div>

        </div>
        <div className="w-full mb-12 px-4">
        <div className="shadow-lg ">
            <Datatable
              filteredItems={filteredItemsBoletas}
              columns={columns}
              subHeaderComponentMemo={subHeaderComponentBoletas}
              title={'Boletas'} />
          </div>
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;

export async function getServerSideProps() {
  const res = await fetch(`${backend_url}/facturas/obtener-facturas`)
  const data = await res.json()
  console.log(data.facturas)
  return {
    props: {
      data: data.facturas,
      boletas: data.boletas,
      todo: data
    }
  }
}