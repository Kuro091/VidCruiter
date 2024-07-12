import { ComponentPropsWithoutRef } from "react";
import { ArrowDown, Check } from "lucide-react";
import {
  ListboxButton,
  Listbox as BaseListbox,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { cn } from "@/utils/cn";

interface ListboxProps<T> {
  items: T[];
  idSelector: (item: T) => number | string;
  renderLabel: (item: T[]) => string;
  selectedItems: T[] | null;
  onSelectionChange?: (item: T[]) => void;
  ListboxButtonComponent?: (
    props: ComponentPropsWithoutRef<"button">,
  ) => JSX.Element;
}

export function Listbox<T>({
  items,
  idSelector,
  renderLabel,
  selectedItems,
  onSelectionChange,
  ListboxButtonComponent = ListboxButton,
}: ListboxProps<T>) {
  return (
    <BaseListbox value={selectedItems} onChange={onSelectionChange} multiple>
      <ListboxButtonComponent
        className={cn(
          "relative flex items-center w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          "hover:bg-white/10",
        )}
      >
        {renderLabel(selectedItems || [])}
        <ArrowDown className="group pointer-events-none absolute top-4.5 right-2.5 size-6 fill-white/60" />
      </ListboxButtonComponent>

      <ListboxOptions
        anchor="bottom"
        className={cn(
          "w-[var(--button-width)] rounded-xl border border-white/5 bg-slate-800 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
        )}
      >
        {items.map((item) => (
          <ListboxOption
            key={idSelector(item)}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10 text-white"
          >
            {({ selected }) => (
              <>
                <Check
                  className={cn("invisible size-5", {
                    visible: selected,
                  })}
                />
                <span>{renderLabel([item])}</span>
              </>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </BaseListbox>
  );
}
