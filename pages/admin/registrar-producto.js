import React from 'react'

import Admin from "layouts/Admin.js";
import CardSettings from "components/Cards/CardSettings.js";

export default function registerProduct() {
  return (
    <>
    <div className="flex flex-wrap">
      <div className="w-full mx-auto lg:w-8/12 px-4">
        <CardSettings />
      </div>

    </div>
  </>
  )
}

registerProduct.layout = Admin;


