"use client";
import React, { useState, useEffect } from "react";

type FilteredListProps = {
  items: string[];
  query: string;
};

export default function Effect2({ items, query }: FilteredListProps) {
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  useEffect(() => {
    console.log("query", query); // 無駄に実行されていることを確認するために console.log にクエリを表示
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
  }, [query, items]); // query と items に変更があった時のみ実行

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
