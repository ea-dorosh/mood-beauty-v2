import Image from "next/image";
import type { Category } from "@/types/booking";

interface CategoryFormProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category | null;
}

export default function CategoryForm({
  categories,
  onCategorySelect,
  selectedCategory,
}: CategoryFormProps) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(260px, 1fr))` }}>
      {categories.map((category) => {
        return (
          <button
            key={category.categoryId}
            type="button"
            onClick={() => onCategorySelect(category)}
            className={`
              group relative block w-full overflow-hidden rounded-[20px] border-2 cursor-pointer text-left
              transition-all duration-200 border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.14)]
              }
            `}
          >
            {category.categoryImage ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={category.categoryImage}
                  alt={category.categoryName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="aspect-video"
                style={{
                  background: `linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)`,
                }}
              />
            )}

            {/* Overlay label */}
            <div
              className="absolute left-0 right-0 bottom-0 px-6 py-3 flex items-center"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)`,
              }}
            >
              <h3 className="font-extrabold tracking-wide text-white text-2xl md:text-2xl drop-shadow-md">
                {category.categoryName}
              </h3>
            </div>
          </button>
        );
      })}
    </div>
  );
}
