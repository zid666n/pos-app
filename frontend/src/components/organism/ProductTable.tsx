import useDeleteProduct from "../../hooks/product/useDeleteProduct"
import useGetProduct from "../../hooks/product/useGetProduct"
import { Button } from "../../lib/shadcn/ui/button"
import { TableCell, TableHead, TableRow } from "../../lib/shadcn/ui/table"
import ActiveBadge from "../atoms/ActiveBadge"
import DeactiveBadge from "../atoms/DeactiveBadge"
import AppDialog from "../molecules/AppDialog"
import AppTable from "../molecules/AppTable"

export default function ProductTable() {
    const {
        handleCancel: handleDeleteCancel,
        handleOnSubmit: handleDeleteSubmit,
        handleOpen: handleDeleteOpen,
        isOpenDialog: isOpenDelete,
        product: deletedProduct
    } = useDeleteProduct()
    
    // const {
    //     handleCancel,
    //     handleChange,
    //     handleOpen,
    //     handleSelect,
    //     handleSubmit,
    //     isLoading,
    //     isModalOpen,
    //     formState: category
    // } = useEditCategory()

    const {data} = useGetProduct()

    return <>
        <AppTable
            headers={[
                <TableHead>#</TableHead>,
                <TableHead>Name</TableHead>,
                <TableHead>Price</TableHead>,
                <TableHead>Quantity</TableHead>,
                <TableHead>Status</TableHead>,
                <TableHead>Category</TableHead>,
                <TableHead align="right" className="text-right">Action</TableHead>
            ]}
        >
            {data && data.data.map((product, index) => <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.is_active ? <ActiveBadge text="Active"/> : <DeactiveBadge text="Deactive"/>}</TableCell>
                <TableCell>{product.category_name}</TableCell>
                <TableCell align="right" className="space-x-2">
                    {/* <Button variant="default" type="button" onClick={() => handleOpen(category)}>Edit</Button> */}
                    <Button variant="destructive" onClick={() => handleDeleteOpen(product)}>Delete</Button>
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
            title={`Delete product ${deletedProduct?.name}?`}
            handleSubmit={handleDeleteSubmit}
            handleCancel={handleDeleteCancel}
        >

        </AppDialog>
    </>
}