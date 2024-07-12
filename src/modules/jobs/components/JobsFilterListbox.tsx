import { Listbox } from "@/components/ui/ListBox";
import { JobFilterAndAll } from "../types";

interface JobsFilterListBoxProps {
  filterKeys?: JobFilterAndAll[];
  selectedFilters: JobFilterAndAll[];
  onSelectionChange?: (job: JobFilterAndAll[]) => void;
}

export const JobsListBox = ({
  filterKeys = [],
  selectedFilters,
  onSelectionChange,
}: JobsFilterListBoxProps) => {
  return (
    <Listbox<JobFilterAndAll>
      idSelector={(filter) => filter}
      renderLabel={(filters) => {
        if (filters.length === 0) {
          return "No filters selected";
        }

        if (filters.length === filterKeys.length) {
          return "All filters selected";
        }

        return filters.map((filter) => filter).join(", ");
      }}
      items={filterKeys}
      selectedItems={selectedFilters}
      onSelectionChange={onSelectionChange}
    />
  );
};
