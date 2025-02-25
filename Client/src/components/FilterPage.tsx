import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label"; // Ensure correct import

export type FilterOptionsState = {
  id: string;
  label: string;
}[];

const filterOption = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
];

const FilterPage = () => {
  const appliedFilterHandler = (value: string) => {
    alert(value);
  };

  return (
    <div className="md-w-72 p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-medium text-lg">Filter By Cuisines</h1>
        <Button variant="link">Reset</Button>
      </div>
      {filterOption.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-2">
          <Checkbox
            className="w-4 h-4 border border-gray-300 rounded-sm checked:bg-blue-500"
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-gray-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled opacity-70 ">{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;
