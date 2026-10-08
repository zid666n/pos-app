import { PlusIcon } from "lucide-react";
import AppTable from "../components/molecules/AppTable";
import { Button } from "../lib/shadcn/ui/button";
import { TableCell, TableRow } from "../lib/shadcn/ui/table";
import { Card, CardContent } from "../lib/shadcn/ui/card";
import FormUserModal from "../components/organism/FormUserModal";
import useCreateUser from "../hooks/useCreateUser";
import { useState } from "react";

type TUserDummy = {
    id: number,
    name: string,
    status: string,
    email: string
}

const userDummy: TUserDummy[] = [
    {
        id: 1,
        name: "Zidan",
        email: "zidan@example.com",
        status: "active"
    },
    {
        id: 2,
        name: "Udin",
        email: "udin@example.com",
        status: "active"
    },
    {
        id: 1,
        name: "Hudi",
        email: "hudi@example.com",
        status: "active"
    }
]

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
            <Card>
                <CardContent>
                    <AppTable>
                        {userDummy.map((user, index) => <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell align="right" className="space-x-2">
                                <Button variant="default" type="button">Edit</Button>
                                <Button variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>)}
                    </AppTable>
                </CardContent>
            </Card>
            <FormUserModal
                handleSelect={handleSelectCreate}
                handleChange={handleChangeCreate}
                handleClose={() => setOpenCreateModal(false)}
                handleSubmit={handleSubmitCreate}
                isLoading={isLoadingCreate}
                isOpen={openCreateModal}
                title="Form Create User"
            />
        </>       
    )
}