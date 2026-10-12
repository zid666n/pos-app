import useGetUser from "../../hooks/useGetUser";
import { Button } from "../../lib/shadcn/ui/button";
import { TableCell, TableHead, TableRow } from "../../lib/shadcn/ui/table";
import ActiveBadge from "../atoms/ActiveBadge";
import DeactiveBadge from "../atoms/DeactiveBadge";
import AppDialog from "../molecules/AppDialog";
import AppTable from "../molecules/AppTable";
import useDeleteUser from "../../hooks/useDeleteUser";
import useEditUser from "../../hooks/useEditUser";
import FormUserModal from "./FormUserModal";

export default function UserTable() {
    const {
        handleCancel: handleDeleteCancel,
        handleOnSubmit: handleDeleteSubmit,
        handleOpen: handleDeleteOpen,
        isOpenDialog: isOpenDelete,
        user: deletedUser
    } = useDeleteUser()
    
    const {
        handleCancel,
        handleChange,
        handleOpen,
        handleSelect,
        handleSubmit,
        isLoading,
        isModalOpen,
        formState: user
    } = useEditUser()

    const {data} = useGetUser()

    return <>
        <AppTable
            headers={[
                <TableHead>#</TableHead>,
                <TableHead>Name</TableHead>,
                <TableHead>Email</TableHead>,
                <TableHead>Status</TableHead>,
                <TableHead align="right" className="text-right">Action</TableHead>
            ]}
        >
            {data && data.data.map((user, index) => <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.is_active ? <ActiveBadge text="Active"/> : <DeactiveBadge text="Deactive"/>}</TableCell>
                <TableCell align="right" className="space-x-2">
                    <Button variant="default" type="button" onClick={() => handleOpen(user)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteOpen(user)}>Delete</Button>
                </TableCell>
            </TableRow>)}
        </AppTable>
        <FormUserModal
            user={user}
            handleChange={handleChange}
            handleClose={handleCancel}
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            isOpen={isModalOpen}
            title="Form Edit User"
        />
        <AppDialog
            isDialogOpen={isOpenDelete}
            title={`Delete user ${deletedUser?.name}?`}
            handleSubmit={handleDeleteSubmit}
            handleCancel={handleDeleteCancel}
        >

        </AppDialog>
    </>
}