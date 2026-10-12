import { PlusIcon } from "lucide-react";
import AppTable from "../components/molecules/AppTable";
import { Button } from "../lib/shadcn/ui/button";
import { TableCell, TableHead, TableRow } from "../lib/shadcn/ui/table";
import { Card, CardContent } from "../lib/shadcn/ui/card";
import FormUserModal from "../components/organism/FormUserModal";
import useCreateUser from "../hooks/useCreateUser";
import { useState } from "react";
import UserTable from "../components/organism/UserTable";

type TUserDummy = {
    id: number,
    name: string,
    status: string,
    email: string
}

export default function UserPage() {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const {
        handleChange: handleChangeCreate,
        handleSubmit: handleSubmitCreate,
        isLoading: isLoadingCreate,
        handleClose: handleCloseCreate,
        handleSelect: handleSelectCreate
    } = useCreateUser()

    return (
        <>
            <div className="flex items-center justify-between">
                <p>
                    Lorem ipsum dolor sit amet
                </p>
                <Button variant="default" size="lg" onClick={() => setOpenCreateModal(true)}>
                    <span><PlusIcon/></span>
                    Create User
                </Button>
            </div>
            <Card className="py-2">
                <CardContent>
                    <UserTable/>
                </CardContent>
            </Card>
            <FormUserModal
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