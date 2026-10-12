import { Badge } from "../../lib/shadcn/ui/badge";
import type { IBadgeProps } from "../../lib/types/components.type";

export default function ActiveBadge({text}: IBadgeProps) {
    return <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        {text}
    </Badge>
}