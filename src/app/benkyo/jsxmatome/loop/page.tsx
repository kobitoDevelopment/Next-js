/*
 * JSXでループ文を使う方法
 */

type DataType = {
  id: number;
  name: string;
  role: "admin" | "general";
};

const data: DataType[] = [
  { id: 1, name: "name1", role: "admin" },
  { id: 2, name: "name2", role: "general" },
  { id: 3, name: "name3", role: "general" },
];

export default function Jsxmatome() {
  return (
    <div>
      {/* ただ単にループ表示してみる例 */}
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      {/* ループ表示中に条件を設ける例(roleがadminなら文字色を赤に) */}
      {data.map((item) => (
        <p key={item.id} style={{ color: item.role === "admin" ? "red" : "black" }}>
          {item.name}
        </p>
      ))}
    </div>
  );
}
