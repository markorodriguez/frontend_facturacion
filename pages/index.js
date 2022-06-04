/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import Spinner from "components/Spinner/Spinner";


export default function Index() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const tokenCookie = nookies.get("token");
    if(tokenCookie.token==="auth"){
      setAuth(true);
      router.push("/admin/dashboard");
    } else{
      setAuth(false);
      router.push("/admin/dashboard");
      //router.back()
    }
  }, []);

  return(
    <></>
  )
}
