import React from 'react'
import Chart from "chart.js";

export default function DiarioChart({total, tiempoPromedio, ganancias, correctas, canceladas, cambioFecha}) {
   
    React.useEffect(()=>{
        
        if(window.doughnut)window.doughnut.destroy()

        let config = {
            type: "doughnut",
            data:{
                labels: [
                    'Canceladas',
                    'Facturadas',
                  ],
                  datasets: [{
                    label: 'My First Dataset',
                    data: [ canceladas,  correctas],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                    ],
                  }]
            },
            options: {
                repostive: true,
                manteinAspectRatio: true
            }
        }
        
        let ctx = document.getElementById("bar-chart-reportediario").getContext("2d");

        //window.myBar.destroy()
        window.doughnut = new Chart(ctx, config);

    },[canceladas,correctas])

 

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            FACTURAS
          </h6>
          <h2 className="text-blueGray-700 text-xl font-semibold">
            Reporte diario
          </h2>
        </div>
        <input type="date" onChange={(e)=>{cambioFecha(e.target.value)}} />
      </div>
    </div>
    <div className="p-4 w-full bg-green-500 flex flex-auto justify-between">
      {/* Chart */}
      <div>
        <div className='flex flex-col justify-center h-full'>
            <div className='bg-blueGray-700 text-white px-4 py-2 shadow-lg rounded-md my-4'><span className='font-semibold'>Total Ventas: </span> {total != null ? total : 0} </div>
            <div className='bg-blueGray-700 text-white px-4 py-2 shadow-lg rounded-md my-4'><span className='font-semibold'>Total Ganancias: </span>{ganancias != null ? 'S/. '+ganancias : 0} </div>
            <div className='bg-blueGray-700 text-white px-4 py-2 shadow-lg rounded-md my-4'><span className='font-semibold'>Tiempo Promedio: </span> {tiempoPromedio != null ? (tiempoPromedio/1000).toFixed(2) + ' seg' : 0} <br/></div>
            

        </div>
      </div>
      <div className="relative h-350-px">
        <canvas height="300" id="bar-chart-reportediario"></canvas>
      </div>
    </div>
  </div>
  )
}
