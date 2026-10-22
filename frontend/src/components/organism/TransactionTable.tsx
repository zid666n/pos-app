import useDeleteCategory from "../../hooks/category/useDeleteCategory"
import useGetAllTransaction from "../../hooks/transaction/useGetAllTransaction"
import { Button } from "../../lib/shadcn/ui/button"
import { TableCell, TableHead, TableRow } from "../../lib/shadcn/ui/table"
import ActiveBadge from "../atoms/ActiveBadge"
import DeactiveBadge from "../atoms/DeactiveBadge"
import AppDialog from "../molecules/AppDialog"
import AppTable from "../molecules/AppTable"

export default function TransactionTable() {
    const {
        handleCancel: handleDeleteCancel,
        handleOnSubmit: handleDeleteSubmit,
        handleOpen: handleDeleteOpen,
        isOpenDialog: isOpenDelete,
        category: deletedCategory
    } = useDeleteCategory()

    const {data} = useGetAllTransaction()

    return <>
        <AppTable
            headers={[
                <TableHead>#</TableHead>,
                <TableHead>Order Number</TableHead>,
                <TableHead>Payment Method</TableHead>,
                <TableHead align="right" className="text-right">Action</TableHead>
            ]}
        >
            {data && data.data.map((transaction, index) => <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{transaction.order_number}</TableCell>
                <TableCell>{transaction.payment_method > 1 ? "Cash" : "QRIS"}</TableCell>
                <TableCell align="right" className="space-x-2">
                    {/* <Button variant="destructive" onClick={() => handleDeleteOpen(transaction)}>Delete</Button> */}
                </TableCell>
            </TableRow>)}
        </AppTable>
        {/* <FormCategoryModal
            category={category}
            handleChange={handleChange}
            handleClose={handleCancel}
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isOpen={isModalOpen}
            title="Form Edit Category"
        /> */}
        <AppDialog
            isDialogOpen={isOpenDelete}
            title={`Delete category ${deletedCategory?.name}?`}
            handleSubmit={handleDeleteSubmit}
            handleCancel={handleDeleteCancel}
        >

        </AppDialog>
    </>
}