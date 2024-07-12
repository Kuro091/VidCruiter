import { Button, ButtonProps } from "@headlessui/react";
import { PropsWithChildren } from "react";

export const JobsButton = ({
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      {...rest}
      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
    >
      {children}
    </Button>
  );
};
