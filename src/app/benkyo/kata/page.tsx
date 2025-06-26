import { superMessyTypesFunction, Color } from "@/app/utils/typePractice";

export default async function Page() {
  const result = await superMessyTypesFunction({
    user: { id: 1, name: "Alice", isActive: true, favoriteColor: Color.Red },
    animals: ["cat", "dog"],
    boolMap: { cat: true, dog: false },
    tuple: ["Tama", 2, true],
    callback: (a, b) => `${a}-${b}`,
    color: Color.Red, // ← ここもColor.Red
    anyValue: "なんでも",
    unknownValue: "test",
    flag: true,
    nullableString: null,
    optionalNumber: 42,
    union: { type: "number", value: 10 },
    arrayOfNever: [],
  });

  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
