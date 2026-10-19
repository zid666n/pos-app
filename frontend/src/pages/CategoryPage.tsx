import { useState } from "react"
import AppHeader from "../components/molecules/AppHeader"
import { Card, CardContent } from "../lib/shadcn/ui/card"
import CategoryTable from "../components/organism/CategoryTable"
import useCreateCategory from "../hooks/category/useCreateCategory"
import FormCategoryModal from "../components/organism/FormCategoryModal"

export default function CategoryPage() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const {
        handleChange: handleChangeCreate,
        handleSubmit: handleSubmitCreate,
        isLoading: isLoadingCreate,
        handleClose: handleCloseCreate,
        handleSelect: handleSelectCreate
    } = useCreateCategory()

    return (
        <>
            <AppHeader
                buttonLabel="Create Category"
                handleOpenModal={() => setOpenCreateModal(true)}
            />
            <Card className="py-2">
                <CardContent>
                    <CategoryTable/>
                </CardContent>
            </Card>
            <FormCategoryModal
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