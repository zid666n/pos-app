import { useState } from "react"
import useCreateCategory from "../hooks/category/useCreateCategory"
import AppHeader from "../components/molecules/AppHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../lib/shadcn/ui/card"
import { Button } from "../lib/shadcn/ui/button"
import TransactionTable from "../components/organism/TransactionTable"
import { useNavigate } from "react-router-dom"

export default function TransactionPage() {
    const navigate = useNavigate()
    return (
        <>
            <AppHeader
                buttonLabel="Create Transaction"
                handleOpenModal={() => navigate('/transactions/create')}
            />
             <Card className="py-2">
                 <CardContent>
                     <TransactionTable/>
                 </CardContent>
             </Card>
            {/* <Card className="py-2">
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
            /> */}
        </>       
    )
}