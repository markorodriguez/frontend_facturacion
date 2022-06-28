import React from "react";
import DataTable, {Alignment} from 'react-data-table-component'
import { CustomStyleTable } from './CustomStyleTable'

export default function Datatable({filteredItems, title, columns, subHeaderComponentMemo}) {
  return (
    <DataTable
    fixedHeader
    title={title}
    data={filteredItems}
    noHeader={false}
    pagination
    paginationRowsPerPageOptions={[5, 10]}
    subHeader
    subHeaderAlign={Alignment.RIGHT}
    subHeaderComponent={subHeaderComponentMemo}
    highlightOnHover
    pointerOnHover
    responsive
    columns={columns}
    customStyles={CustomStyleTable}
/>
  )
}
