import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/cn";

interface SpinnerProps {
    loading?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export function Spinner({ loading, children, className }: SpinnerProps) {
    if (loading) {
        return <ReloadIcon className={cn("h-4 w-4 animate-spin", className)} />;
    }
    return children || null;
}