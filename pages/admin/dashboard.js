import React, { useState } from "react";

// components

import CardLineChart from "../../components/Cards/CardLineChart";
import CardBarChart from "../../components/Cards/CardBarChart.js";
import CardPageVisits from "../../components/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";
import CardBarChartEfectividad from "components/Cards/CardBarChartEfectividad";

// layout for page

import Admin from "layouts/Admin.js";
import backend_url from "config/backend";

export default function Dashboard({labels,dataSetsTiempo,dataSetEfectividadMes, dataSetPrecioAnual, dataSetEfectividadValoresCorrectos,
  dataSetEfectividadValoresCancelados}) {
  
  const [labels2, setLabels] = useState(labels)
  const [dataSetsTiempo2, setDataSetsTiempo] = useState(dataSetsTiempo)
  const [dataSetPrecioAnual2, setDataSetPrecioAnual] = useState(dataSetPrecioAnual)
  const [correctosMes, setCorrectosMes] = useState(dataSetEfectividadValoresCorrectos)
  const [canceladosMes, setCanceladosMes] = useState(dataSetEfectividadValoresCancelados)

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart labels={labels2} data={dataSetsTiempo2} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart labels={labels2} dataset={dataSetPrecioAnual2} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
          <CardBarChartEfectividad labels={labels2} dataset1={correctosMes} dataset2={canceladosMes} />
        </div>
        {/* 
        <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
        
        */}
        
      </div>
    </>
  );
}

export async function getServerSideProps (){
  const res = await fetch(`${backend_url}/reportes/`)
  const data = await res.json()


 
  const arrayLabels = []
  data.map((el)=>{
    arrayLabels.push(el.mes)
  })

  const dataSetsTiempo = []
  data.map((el)=>{
    dataSetsTiempo.push((el.promedio/1000).toFixed(2))
  })

  const dataSetEfectividadMes = []
  data.map((el)=>{
    dataSetEfectividadMes.push((el.efectividad.correctas)/(el.efectividad.correctas + el.efectividad.canceladas))
  })

  const dataSetEfectividadValoresCorrectos = []
  data.map((el)=>{
    dataSetEfectividadValoresCorrectos.push(el.efectividad.correctas)
  })

  const dataSetEfectividadValoresCancelados = []
  data.map((el)=>{
    dataSetEfectividadValoresCancelados.push(el.efectividad.canceladas)
  })


  const dataSetPrecioAnual = []
  data.map((el)=>{
    dataSetPrecioAnual.push(el.ventas)
  })

  return{
    props: {
      labels: arrayLabels,
      dataSetsTiempo,
      dataSetEfectividadMes,
      dataSetPrecioAnual,
      dataSetEfectividadValoresCorrectos,
      dataSetEfectividadValoresCancelados
    }
  }
}

Dashboard.layout = Admin;
