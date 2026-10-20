import useDeleteCategory from "../../hooks/category/useDeleteCategory"
import useEditCategory from "../../hooks/category/useEditCategory"
import useGetCategory from "../../hooks/category/useGetCategory"
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
    
    const {
        handleCancel,
        handleChange,
        handleOpen,
        handleSelect,
        handleSubmit,
        isLoading,
        isModalOpen,
        formState: category
    } = useEditCategory()

    const {data} = useGetCategory()

    return <>
        <AppTable
            headers={[
                <TableHead>#</TableHead>,
                <TableHead>Order Number</TableHead>,
                <TableHead>Payment Method</TableHead>,
                <TableHead>Product</TableHead>,
                <TableHead align="right" className="text-right">Action</TableHead>
            ]}
        >
            {data && data.data.map((category, index) => <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.is_active ? <ActiveBadge text="Active"/> : <DeactiveBadge text="Deactive"/>}</TableCell>
                <TableCell align="right" className="space-x-2">
                    <Button variant="default" type="button" onClick={() => handleOpen(category)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteOpen(category)}>Delete</Button>
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