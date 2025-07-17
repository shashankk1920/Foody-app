import { useEffect, useMemo, useState } from "react";
import { useRestaurantStore } from "../store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptionsState = {
  id: string;
  label: string;
};

const FilterPage = () => {
  // State for mobile filter visibility
  const [showFilter, setShowFilter] = useState(false);
  const {
    setAppliedFilter,
    appliedFilter,
    resetAppliedFilter,
    searchRestaurant,
    searchedRestaurant,
  } = useRestaurantStore();

  // Dynamically generate filter options from searchedRestaurant data
  const filterOptions: FilterOptionsState[] = useMemo(() => {
    const cuisinesMap = new Map<string, string>();
    if (searchedRestaurant?.data) {
      searchedRestaurant.data.forEach((restaurant: any) => {
        if (Array.isArray(restaurant.cuisines)) {
          restaurant.cuisines.forEach((cuisine: string) => {
            if (cuisine && cuisine.trim()) {
              const lower = cuisine.trim().toLowerCase();
              if (!cuisinesMap.has(lower)) {
                // Capitalize first letter for display
                const display = cuisine.trim().charAt(0).toUpperCase() + cuisine.trim().slice(1);
                cuisinesMap.set(lower, display);
              }
            }
          });
        }
      });
    }
    // Sort alphabetically by display name
    return Array.from(cuisinesMap.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([lower, display]) => ({ id: lower, label: display }));
  }, [searchedRestaurant]);

  // Handler: toggle cuisine in appliedFilter (case-insensitive, use id)
  const appliedFilterHandler = (id: string) => {
    setAppliedFilter(id); // id is always lowercase
  };

  useEffect(() => {
    const searchText = "";
    const searchQuery = "";
    searchRestaurant(searchText, searchQuery, appliedFilter);
  }, [appliedFilter, searchRestaurant]);

  return (
    <>
      {/* Mobile filter toggle button - center */}
      <div className="md:hidden flex justify-center mb-4">
        <Button
          className="bg-orange text-white px-4 py-2 rounded-full shadow-md"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      {/* Filter panel: hidden on mobile unless toggled, always visible on md+ */}
      <div
        className={`md:w-80 p-6 bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 ${showFilter ? "block" : "hidden"} md:block`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-2xl text-gray-900 flex items-center gap-2">
            <span role="img" aria-label="filter">🍽️</span> Filter by cuisines
          </h1>
          <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800" onClick={resetAppliedFilter}>
            Reset
          </Button>
        </div>
        <div className="flex flex-col space-y-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
          {filterOptions.length === 0 ? (
            <p className="text-gray-500 text-sm">No cuisines found.</p>
          ) : (
            filterOptions.map((option) => {
              // Use id (lowercase) for checked state and handler
              const checked = appliedFilter.includes(option.id);
              return (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition ${checked ? "bg-orange/10 border-l-4 border-orange" : "hover:bg-gray-100"}`}
                >
                  <Checkbox
                    id={option.id}
                    checked={checked}
                    onCheckedChange={() => appliedFilterHandler(option.id)}
                    className="cursor-pointer accent-orange"
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-base font-medium leading-none cursor-pointer select-none text-gray-800 flex items-center gap-1"
                  >
                    <span role="img" aria-label={option.label}>🍴</span> {option.label}
                  </Label>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default FilterPage;
