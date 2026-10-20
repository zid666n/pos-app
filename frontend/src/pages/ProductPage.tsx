import { useState } from "react"
import AppHeader from "../components/molecules/AppHeader"
import { Card, CardContent } from "../lib/shadcn/ui/card"
import ProductTable from "../components/organism/ProductTable"
import FormProductModal from "../components/organism/FormProductModal"
import useCreateProduct from "../hooks/product/useCreateProduct"

export default function ProductPage() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const {
        handleChange: handleChangeCreate,
        handleSubmit: handleSubmitCreate,
        isLoading: isLoadingCreate,
        handleClose: handleCloseCreate,
        handleSelect: handleSelectCreate
    } = useCreateProduct()

    return (
        <>
            <AppHeader
                buttonLabel="Create Product"
                handleOpenModal={() => setOpenCreateModal(true)}
            />
            <Card className="py-2">
                <CardContent>
                    <ProductTable/>
                </CardContent>
            </Card>
            <FormProductModal
                handleSelect={handleSelectCreate}
                handleChange={handleChangeCreate}
                handleClose={() => setOpenCreateModal(false)}
                handleSubmit={(e) => {
                    handleSubmitCreate(e)
                    setOpenCreateModal(false)
                }}
                isLoading={isLoadingCreate}
                isOpen={openCreateModal}
                title="Form Create User"
            />
        </>       
    )
}