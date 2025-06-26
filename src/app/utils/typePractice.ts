// TypeScript型総復習 合理的バージョン（未使用関数・型エラー完全解消）

// 基本型
type Primitive = string | number | boolean | null | undefined | symbol | bigint;

// リテラル型 & Union
type Animal = "cat" | "dog" | "bird";
type MaybeAnimal = Animal | null | undefined;

// enum
export enum Color {
  Red = "red",
  Blue = "blue",
  Green = "green",
}

// Tuple（optionalの正しい書き方）
type CatTuple = [name: string, age: number, isCute?: boolean];

// Optional, Nullable, NonNullable
type Optional<T> = T | undefined;
type Nullable<T> = T | null;
type NotNull<T> = NonNullable<T>;

// 型推論
type InferPromise<T> = T extends Promise<infer U> ? U : never;

// 型ガード
function isString(x: unknown): x is string {
  return typeof x === "string";
}

// never, unknown
type NeverType = never;
type UnknownType = unknown;

// Conditional Type
type IfString<T> = T extends string ? "YesString" : "NoString";

// Mapped Type
type BoolMap<T extends string> = {
  [K in T]: boolean;
};

// Record, Partial, Required, Pick, Omit, Readonly
type User = {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
  favoriteColor: Color;
};

type UserIdMap = Record<number, User>;
type UserPartial = Partial<User>;
type UserRequired = Required<User>;
type UserReadonly = Readonly<User>;
type UserPick = Pick<User, "id" | "name">;
type UserOmit = Omit<User, "email">;

// Exclude, Extract
type ExcludeCat = Exclude<Animal, "cat">;
type ExtractDog = Extract<Animal, "dog">;

// 関数型
type Callback = (a: number, b: boolean) => string;

// Promise型
type AsyncString = Promise<string>;

// 型の合成と複雑な型
type Complex = { type: "number"; value: number } | { type: "string"; value: string } | { type: "bool"; value: boolean };

// 型のインターセクション
type Admin = User & { adminLevel: number };

// ジェネリクス
type Response<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ---- 合理的に全部使う関数 ----
export async function superMessyTypesFunction<T extends Animal = "cat" | "dog">(input: {
  user: UserPartial;
  animals: T[];
  boolMap: BoolMap<T>;
  tuple: CatTuple;
  callback: Callback;
  color: Color;
  anyValue: unknown;
  unknownValue: UnknownType;
  flag: boolean;
  nullableString: Nullable<string>;
  optionalNumber?: number;
  union: Primitive | Complex;
  arrayOfNever: NeverType[];
}): Promise<
  Response<{
    userPick: UserPick;
    userRequired: UserRequired;
    userReadonly: UserReadonly;
    userOmit: UserOmit;
    idMap: UserIdMap;
    admin: Admin;
    catNameEcho: string;
    isCuteCat: boolean;
    allTrue: boolean;
    animalBools: BoolMap<T>;
    notCats: ExcludeCat[];
    onlyDogs: ExtractDog[];
    inferPromiseResult: InferPromise<AsyncString>;
    conditionalTypeResult: IfString<T>;
    stringCheck: boolean;
    optionalId: Optional<number>;
    nonNullName: NotNull<string>;
    primitiveUnion: Primitive;
    maybeAnimal: MaybeAnimal;
    neverArrayLength: number;
    // emailOmitted: boolean; ←削除（UserOmitにemailは無いので使えません）
  }>
> {
  // 1. UserPick, UserRequired, UserReadonly, UserOmit, Admin型を合理的に生成
  const userPick: UserPick = { id: input.user.id ?? 0, name: input.user.name ?? "unknown" };
  const userRequired: UserRequired = {
    id: input.user.id ?? 1,
    name: input.user.name ?? "required",
    email: input.user.email ?? "none@example.com",
    isActive: input.user.isActive ?? false,
    favoriteColor: input.user.favoriteColor ?? Color.Red,
  };
  const userReadonly: UserReadonly = { ...userRequired };
  // Omitはemail除外型。プロパティアクセスは不可。emailが無いことを返すためのフラグを返却可。
  const userOmit: UserOmit = { ...userRequired };
  // const emailOmitted = !("email" in userOmit); ←これ自体意味はあるが、返却型で利用しないなら削除

  const admin: Admin = { ...userRequired, adminLevel: 10 };

  // 2. Record型: UserIdMap
  const idMap: UserIdMap = { [userPick.id]: { ...userRequired } };

  // 3. Tuple分解
  const [catName, , isCute] = input.tuple;
  const catNameEcho = `Cat's name is ${catName}`;
  const isCuteCat = !!isCute;

  // 4. BoolMap/animals
  const allTrue: boolean = Object.values(input.boolMap).every(Boolean);

  // 5. Exclude/Extract
  const notCats: ExcludeCat[] = input.animals.filter((a) => a !== "cat") as ExcludeCat[];
  const onlyDogs: ExtractDog[] = input.animals.filter((a) => a === "dog") as ExtractDog[];

  // 6. InferPromise
  const inferPromiseResult: InferPromise<AsyncString> = await Promise.resolve("TypeScript is fun!");

  // 7. Conditional Type
  const conditionalTypeResult: IfString<T> = (typeof input.animals[0] === "string" ? "YesString" : "NoString") as IfString<T>;

  // 8. 型ガード+unknown
  const stringCheck = isString(input.unknownValue);

  // 9. Optional, NotNull
  const optionalId: Optional<number> = input.user.id;
  const nonNullName: NotNull<string> = (input.user.name ?? "no_name") as NotNull<string>;

  // 10. Primitive Union, MaybeAnimal
  const primitiveUnion: Primitive = typeof input.union === "object" && input.union !== null && "value" in input.union ? ((input.union as Complex).value as Primitive) : (input.union as Primitive);
  const maybeAnimal: MaybeAnimal = input.animals[0] ?? null;

  // 11. never array→lengthで型利用
  const neverArrayLength = input.arrayOfNever.length;

  return {
    success: true,
    data: {
      userPick,
      userRequired,
      userReadonly,
      userOmit,
      idMap,
      admin,
      catNameEcho,
      isCuteCat,
      allTrue,
      animalBools: input.boolMap,
      notCats,
      onlyDogs,
      inferPromiseResult,
      conditionalTypeResult,
      stringCheck,
      optionalId,
      nonNullName,
      primitiveUnion,
      maybeAnimal,
      neverArrayLength,
    },
  };
}
