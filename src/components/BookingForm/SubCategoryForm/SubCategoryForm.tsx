import type { SubCategory } from "@/types/booking";

interface SubCategoryFormProps {
  subCategories: SubCategory[];
  onSubCategorySelect: (subCategory: SubCategory) => void;
  selectedSubCategory: SubCategory | null;
}

export default function SubCategoryForm({
  subCategories,
  onSubCategorySelect,
  selectedSubCategory,
}: SubCategoryFormProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <ul>
        {subCategories.map((subCategory, index) => {
          const isSelected = selectedSubCategory?.subCategoryId === subCategory.subCategoryId;

          return (
            <li key={subCategory.subCategoryId}>
              <button
                type="button"
                onClick={() => onSubCategorySelect(subCategory)}
                className={`
                  w-full flex items-center gap-3 py-3.5 px-5 cursor-pointer border-none text-left
                  transition-all duration-150
                  ${index !== subCategories.length - 1 ? `border-b border-[rgba(0,0,0,0.06)]` : ``}
                  ${isSelected
                    ? `bg-[rgba(0,0,0,0.03)]`
                    : `bg-transparent hover:bg-[rgba(0,0,0,0.015)]`
                  }
                `}
              >
                {/* Checkbox icon */}
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isSelected ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="6" fill="black" />
                      <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
                    </svg>
                  )}
                </span>

                <span
                  className={`text-[1rem] tracking-tight ${isSelected ? `font-bold` : `font-medium`}`}
                >
                  {subCategory.subCategoryName}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
