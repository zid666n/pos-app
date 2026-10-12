import React from "react"
import { Table, TableBody, TableFooter, TableHeader, TableRow } from "../../lib/shadcn/ui/table"

interface IAppTable {
    headers: React.ReactNode[]
    children: React.ReactNode
}

export default function AppTable({children, headers}: IAppTable) {
    return <Table>
        <TableHeader>
            <TableRow>
                {headers.map((tbHead, index) =>
                    <React.Fragment key={index}>
                        {tbHead}
                    </React.Fragment>
                )}
            </TableRow>
        </TableHeader>
        <TableBody>
            {children}
        </TableBody>
        <TableFooter>

        </TableFooter>
    </Table>
}