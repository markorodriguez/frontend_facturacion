/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner/Spinner"


export default function Index() {
  const router = useRouter();

  useEffect(()=>{

    setTimeout(()=>{
      router.push("/auth/login")
    }, 2000)
    
  })

  return(
    <div className="w-screen h-screen">
      <Spinner/>
    </div>
  )
}
