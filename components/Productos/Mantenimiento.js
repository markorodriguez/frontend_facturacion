import React from "react";
import Search from "components/Table/Search";

const Mantenimiento = ({data, dataProd, change}) => {

    const [filterText, setFilterText] = useState("");
    const [resetPagination, setResetPagination] = useState(false);

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
                    data.filter((el)=>el.id_tipoproducto == row.id_tipoproducto).nombreTipo
                }</div>
        }
        ,{
            name: "PRECIO",
            selector: (row) => row.precio,
            cell: (row) => <div>S/. {row.precio}</div>
        }, {
            name: "STOCK",
            selector: (row) => row.stock,
            cell: (row) => <div>{row.stock}</div>
        },{
            name: "",
            selector: (row)=> row.id_producto,
            cell: (row) => <div>
                <button>Editar</button>
                <button>Eliminar</button>
            </div>
        }
    ]

    const onFilter = (e) => {
        setFilterTe
    }

    return(
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mantenimiento de Productos</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>{
                change()
              }}
            >
              Registrar Productos
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">


        </div>
      </div>
    )
}

export default Mantenimiento