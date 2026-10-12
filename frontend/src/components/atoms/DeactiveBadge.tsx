import { Badge } from "../../lib/shadcn/ui/badge";
import type { IBadgeProps } from "../../lib/types/components.type";

export default function DeactiveBadge({text}: IBadgeProps) {
    return <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
        {text}
    </Badge>
}