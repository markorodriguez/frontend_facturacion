import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export default function Search ({ filterText, onFilter, onClear, placeHolder }) {
  return(
    <div className="flex w-full justify-between">
      <div className="border-2 flex items-center border-blueGray-700  rounded-lg overflow-hidden">
        <FontAwesomeIcon className="mx-4" icon={faMagnifyingGlass} />
        <input
          value={filterText}
          onChange={onFilter}
          className="focus:outline-none py-2"
          placeholder={placeHolder}
          name={placeHolder.toLowerCase()}
          id="search_input"
        />
        <button
          className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          onClick={onClear}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  )

}