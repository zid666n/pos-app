import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "../../lib/shadcn/ui/table"

interface IAppTable {
    children: React.ReactNode
}

export default function AppTable({children}: IAppTable) {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {children}
        </TableBody>
        <TableFooter>

        </TableFooter>
    </Table>
}