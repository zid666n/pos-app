import { PlusIcon } from "lucide-react";
import { Button } from "../../lib/shadcn/ui/button";

interface IAppHeader {
    buttonLabel: string,
    handleOpenModal: () => void
}

export default function AppHeader({buttonLabel, handleOpenModal}: IAppHeader) {
    return <div className="flex items-center justify-between">
        <p>
            Lorem ipsum dolor sit amet
        </p>
        <Button variant="default" size="lg" onClick={handleOpenModal}>
            <span><PlusIcon/></span>
            {buttonLabel}
        </Button>
    </div>
}