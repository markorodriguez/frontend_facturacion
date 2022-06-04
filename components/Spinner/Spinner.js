import React from "react";

export default function Spinner(){
    return (
        <div className="w-full h-full flex  items-center justify-center bg-red-500">
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div> 
    );
};
