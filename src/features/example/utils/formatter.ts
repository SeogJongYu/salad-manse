import { ExampleItem } from "@/features/example/model/types";

export function formatExampleItem(item: ExampleItem) {
  return {
    ...item,
    shortDescription: item.description.slice(0, 100),
    createdAtFormatted: new Date(item.createdAt).toLocaleDateString(),
  };
}
