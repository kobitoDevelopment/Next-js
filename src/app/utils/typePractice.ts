// TypeScript型総復習

// 複数の基本的なプリミティブ型をまとめたUnion型
type Primitive = string | number | boolean | null | undefined | symbol | bigint;

// Animal型は3つのリテラル値のみを許すUnion型
type Animal = "cat" | "dog" | "bird";
// MaybeAnimal型はAnimal型またはnull/undefinedを許す
type MaybeAnimal = Animal | null | undefined;

// enum: 複数の決まった値の集合を表す。Color.Red などで使う
export enum Color {
  Red = "red",
  Blue = "blue",
  Green = "green",
}

// タプル型。配列だが要素ごとに型が違う。isCuteは省略可
type CatTuple = [name: string, age: number, isCute?: boolean];

// Optional<T>はTかundefined
type Optional<T> = T | undefined;
// Nullable<T>はTかnull
type Nullable<T> = T | null;
// NotNull<T>はTからnull/undefinedを除いた型
type NotNull<T> = NonNullable<T>;

// InferPromise<T>はPromise型Tから中身の型だけを推論して取り出す
type InferPromise<T> = T extends Promise<infer U> ? U : never;

// 型ガード関数。unknown型のxがstring型の時だけtrue
function isString(x: unknown): x is string {
  return typeof x === "string";
}

// NeverTypeは「絶対に値にならない」型
type NeverType = never;
// UnknownTypeは「どんな型でも入る」型
type UnknownType = unknown;

// 条件付き型。Tがstringなら"YesString"、違えば"NoString"
type IfString<T> = T extends string ? "YesString" : "NoString";

// Mapped Type。引数Tの文字列それぞれにboolean型の値を持つオブジェクト型
type BoolMap<T extends string> = {
  [K in T]: boolean;
};

// User型は一般的なユーザー情報を表す
type User = {
  id: number;
  name: string;
  email?: string; // emailは省略可
  isActive: boolean;
  favoriteColor: Color;
};

// Record<K, V>: キーKに対して値Vを持つオブジェクト型
type UserIdMap = Record<number, User>;
// User型の全プロパティを省略可にした型
type UserPartial = Partial<User>;
// User型の全プロパティが必須の型
type UserRequired = Required<User>;
// User型の全プロパティがreadonly（書き換え不可）な型
type UserReadonly = Readonly<User>;
// User型からidとnameだけを抜き出した型
type UserPick = Pick<User, "id" | "name">;
// User型からemailだけを除いた型
type UserOmit = Omit<User, "email">;

// Exclude<Union型, 除外する型>: Union型から指定した型を除く
type ExcludeCat = Exclude<Animal, "cat">;
// Extract<Union型, 抜き出す型>: Union型から指定した型だけを抽出
type ExtractDog = Extract<Animal, "dog">;

// コールバック関数型。引数a: number, b: booleanを受けてstringを返す
type Callback = (a: number, b: boolean) => string;

// 単なるPromise<string>型
type AsyncString = Promise<string>;

// 複数の型をまとめたUnion型
type Complex = { type: "number"; value: number } | { type: "string"; value: string } | { type: "bool"; value: boolean };

// Admin型はUser型+adminLevelプロパティ
type Admin = User & { adminLevel: number };

// ジェネリクスを使ったレスポンス型。成功・データ・エラーを持つ
type Response<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ---- 合理的に全部使う関数 ----
// TはAnimal型の部分集合（デフォルトは"cat" | "dog"）
// inputは様々な型を受け取るオブジェクト
export async function superMessyTypesFunction<T extends Animal = "cat" | "dog">(input: {
  user: UserPartial; // ユーザー情報（省略可）
  animals: T[]; // 動物名配列
  boolMap: BoolMap<T>; // 動物ごとのbool値
  tuple: CatTuple; // タプル（猫の名前・年齢・可愛さ）
  callback: Callback; // コールバック関数
  color: Color; // 色（enum）
  anyValue: unknown; // 任意の値
  unknownValue: UnknownType; // unknown型の値
  flag: boolean; // boolean
  nullableString: Nullable<string>; // string or null
  optionalNumber?: number; // number（省略可）
  union: Primitive | Complex; // プリミティブ型またはComplex型
  arrayOfNever: NeverType[]; // never型配列（要素は絶対にない）
}): Promise<
  Response<{
    userPick: UserPick; // idとnameだけのユーザー情報
    userRequired: UserRequired; // 全プロパティ必須のユーザー
    userReadonly: UserReadonly; // 全プロパティreadonlyのユーザー
    userOmit: UserOmit; // emailを除いたユーザー
    idMap: UserIdMap; // idをキーにしたユーザーマップ
    admin: Admin; // adminLevelつきユーザー
    catNameEcho: string; // 猫の名前を表示する文字列
    isCuteCat: boolean; // 可愛いかどうか
    allTrue: boolean; // boolMapのすべてがtrueか
    animalBools: BoolMap<T>; // 動物ごとのbool値
    notCats: ExcludeCat[]; // "cat"以外の動物配列
    onlyDogs: ExtractDog[]; // "dog"のみの動物配列
    inferPromiseResult: InferPromise<AsyncString>; // Promiseの中身の型
    conditionalTypeResult: IfString<T>; // Tがstringなら"YesString"
    stringCheck: boolean; // unknownValueがstringか
    optionalId: Optional<number>; // idまたはundefined
    nonNullName: NotNull<string>; // nameからnull/undefined除外
    primitiveUnion: Primitive; // プリミティブ型
    maybeAnimal: MaybeAnimal; // animals[0]かnull/undefined
    neverArrayLength: number; // never型配列の長さ（常に0）
  }>
> {
  // --- 1. User型のユーティリティ型を実際に生成 ---
  // idとnameだけ抜き出す
  const userPick: UserPick = { id: input.user.id ?? 0, name: input.user.name ?? "unknown" };
  // 全プロパティ必須のUser型を作る
  const userRequired: UserRequired = {
    id: input.user.id ?? 1,
    name: input.user.name ?? "required",
    email: input.user.email ?? "none@example.com",
    isActive: input.user.isActive ?? false,
    favoriteColor: input.user.favoriteColor ?? Color.Red,
  };
  // Readonly型（全プロパティ書き換え不可）に変換
  const userReadonly: UserReadonly = { ...userRequired };
  // Omit型（emailだけ除外）
  const userOmit: UserOmit = { ...userRequired };
  // Admin型（User型＋adminLevel）を作成
  const admin: Admin = { ...userRequired, adminLevel: 10 };

  // --- 2. Record型 ---
  // idをキーにUser型の値を持つオブジェクトを作成
  const idMap: UserIdMap = { [userPick.id]: { ...userRequired } };

  // --- 3. タプルから分解 ---
  // タプルから猫の名前と可愛さを取り出す
  const [catName, , isCute] = input.tuple;
  // 名前を文字列として整形
  const catNameEcho = `Cat's name is ${catName}`;
  // isCuteがfalsyならfalse
  const isCuteCat = !!isCute;

  // --- 4. Mapped Typeの利用 ---
  // boolMapのすべての値がtrueか判定
  const allTrue: boolean = Object.values(input.boolMap).every(Boolean);

  // --- 5. Exclude/Extractの利用 ---
  // animalsから"cat"以外を抽出
  const notCats: ExcludeCat[] = input.animals.filter((a) => a !== "cat") as ExcludeCat[];
  // animalsから"dog"のみを抽出
  const onlyDogs: ExtractDog[] = input.animals.filter((a) => a === "dog") as ExtractDog[];

  // --- 6. 型推論（Promiseの中身）---
  // Promise<string>型の中身をInferPromise<T>で型抽出
  const inferPromiseResult: InferPromise<AsyncString> = await Promise.resolve("TypeScript is fun!");

  // --- 7. 条件付き型の利用 ---
  // Tがstringなら"YesString"、違えば"NoString"（TはAnimalなので"YesString"）
  const conditionalTypeResult: IfString<T> = (typeof input.animals[0] === "string" ? "YesString" : "NoString") as IfString<T>;

  // --- 8. 型ガードとunknown型の利用 ---
  // unknownValueがstring型かどうかを判定
  const stringCheck = isString(input.unknownValue);

  // --- 9. Optional/NotNull型の利用 ---
  // idが存在しない場合undefined
  const optionalId: Optional<number> = input.user.id;
  // nameがnull/undefinedなら"no_name"をセット
  const nonNullName: NotNull<string> = (input.user.name ?? "no_name") as NotNull<string>;

  // --- 10. プリミティブ型Union, MaybeAnimal型の利用 ---
  // unionがComplex型ならvalue部分を抽出、違えばそのまま
  const primitiveUnion: Primitive = typeof input.union === "object" && input.union !== null && "value" in input.union ? ((input.union as Complex).value as Primitive) : (input.union as Primitive);
  // animals配列の最初の要素かnull
  const maybeAnimal: MaybeAnimal = input.animals[0] ?? null;

  // --- 11. never型配列の利用 ---
  // never型配列は要素が絶対に存在しないのでlengthは常に0
  const neverArrayLength = input.arrayOfNever.length;

  // --- 戻り値（型を活かした複合データ）---
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
