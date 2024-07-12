import { cn } from "@/utils/cn";
import { Input } from "@headlessui/react";

interface JobsInputProps {
  onChange?: (value: string) => void;
}

export const JobsInput = ({ onChange }: JobsInputProps) => {
  return (
    <Input
      className={cn(
        "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3  text-white",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
        "hover:bg-white/10",
      )}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Search for jobs..."
    ></Input>
  );
};
