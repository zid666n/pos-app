import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../lib/shadcn/ui/alert-dialog";

interface IAppDialogProps {
    isDialogOpen: boolean,
    title: string,
    handleSubmit: () => void,
    handleCancel: () => void
}

export default function AppDialog({isDialogOpen, title, handleSubmit, handleCancel}: IAppDialogProps) {
    return <AlertDialog open={isDialogOpen}>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {/* <AlertDialogDescription> */}
                This action cannot be undone. This will permanently delete your account
                from our servers.
            {/* </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel variant='outline' size='sm' onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
}