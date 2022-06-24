import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function Auth({ children }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get('usuario')
    console.log(cookie)
    if (cookie) {
      const parsedCookie = JSON.parse(cookie)

      const decodedCookie = jwt.verify(parsedCookie.token, 'taller_formación')

      decodedCookie.status == "success" ? setIsAuthenticated(true) : router.push("/auth/login");

    } else {
      router.push('/auth/login')
    }
  }, []);

  return <div>{isAuthenticated ? children : null}</div>;
}
