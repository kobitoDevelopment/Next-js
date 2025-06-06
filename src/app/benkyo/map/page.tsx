"use client";
import { useState } from "react";

type MapData = {
  id: number;
  name: string;
};

export default function MapPage() {
  const [data, setData] = useState<MapData[]>([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);

  // 配列の最後に新しい要素を追加
  const addItem = () => {
    const newItem: MapData = {
      id: Date.now(),
      name: `Item ${data.length + 1}`,
    };
    setData([...data, newItem]);
  };
  // 配列の特定のインデックスの要素を削除
  const removeByIndex = (index: number) => {
    setData(
      data.filter((_, i) => {
        if (i === index) {
          // 指定されたインデックスと一致する場合はflaseを返すことで配列からこのインデックスの要素を削除する
          return false;
        } else {
          return true;
        }
      })
    );
  };

  // 特定のIDの要素を削除
  const removeById = (id: number) => {
    setData(
      data.filter((item) => {
        if (item.id === id) {
          // 指定されたインデックスと一致する場合はflaseを返すことで配列からこのインデックスの要素を削除する
          return false;
        } else {
          return true;
        }
      })
    );
  };

  // 特定のIDの要素を更新
  const updateById = (id: number, newName: string) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          // 指定されたIDと一致する場合、元のオブジェクトをコピーして、name プロパティを新しい名前に更新する
          const updatedItem = { ...item }; // 既存のオブジェクトをコピー
          updatedItem.name = newName; // name を新しい名前に更新
          return updatedItem; // 更新したアイテムを返す
        } else {
          // 指定されたIDと一致しない場合、そのままのアイテムを返す
          return item;
        }
      })
    );
  };

  // すべての要素をクリア
  const clearItems = () => {
    setData(() => {
      return [];
    });
  };

  return (
    <div>
      <h2>Mapと仲良くなる</h2>
      {/* 
      バインドする関数に引数がある場合は {()=>{ここに書く}}
      バインドする関数に引数がない場合は{関数名}とする
      */}
      <button onClick={addItem}>配列の最後に追加</button>
      <button onClick={() => removeByIndex(1)}>インデックス1を削除</button>
      <button onClick={() => removeById(data[0]?.id)}>最初のIDを削除</button>
      <button onClick={() => updateById(data[0]?.id, "Updated Item")}>最初の要素を更新</button>
      <button onClick={clearItems}>すべての要素をクリア</button>

      <ul>
        {data.map((item, index) => (
          <li key={item.id}>
            {index}: {item.name} (ID: {item.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
