import { Button } from "../../lib/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../lib/shadcn/ui/dialog"

interface IAppModal {
    isOpen: boolean,
    title: string,
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
    handleClose: () => void,
    children: React.ReactNode,
    isLoading: boolean
}

export default function AppModal({
    isOpen,
    title,
    handleClose,
    onSubmit,
    children,
    isLoading
}: IAppModal) {
    return <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur inventore est odio quasi molestias ut dignissimos, debitis dolores error, consequuntur quos voluptates cumque illo enim itaque ea. Ipsum, nemo sapiente.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit}>
                <div className="space-y-4">{children}</div>
                <DialogFooter className="mt-8">
                    <Button type="submit" variant="default" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}