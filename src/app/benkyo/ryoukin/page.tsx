"use client";
import { useState } from "react";

// メニューアイテムの型
type MenuItem = {
  name: string;
  price: number;
};

// 注文内容の型
type Order = {
  price: number;
  quantity: number;
};

// 注文の状態を保持する型 (Record ... キーと値のペアを保持する型のこと)
type Orders = Record<string, Order>;

// 価格情報の型
const menuPrices: Record<string, MenuItem> = {
  course_a_xxx123: { name: "コースA", price: 1000 },
  course_b_yyy456: { name: "コースB", price: 2000 },
  course_c_zzz789: { name: "コースC", price: 3000 },
  food_1_abc111: { name: "フード1", price: 200 },
  food_2_def222: { name: "フード2", price: 300 },
  food_3_ghi333: { name: "フード3", price: 400 },
};

export default function Ryoukin() {
  // 状態管理
  const [orders, setOrders] = useState<Orders>({});
  const [coupon, setCoupon] = useState<boolean>(false);

  // 合計金額を計算する関数
  const calculateTotal = (): number => {
    let total: number = 0;
    Object.values(orders).forEach((item) => {
      total += item.price * item.quantity;
    });

    if (coupon) {
      total = Math.floor(total * 0.9); // クーポンがある場合、10%割引
    }

    return total;
  };

  // 入力変更時の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const quantity = parseInt(value, 10) || 0;

    const menuItem = menuPrices[name];
    if (menuItem) {
      setOrders((prevOrders) => {
        const newOrders = { ...prevOrders };
        if (quantity > 0) {
          newOrders[menuItem.name] = { price: menuItem.price, quantity };
        } else {
          delete newOrders[menuItem.name];
        }
        return newOrders;
      });
    }
  };

  // クーポン変更時の処理
  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCoupon(e.target.checked);
  };

  // 送信ボタンの処理
  const handleSubmit = (): void => {
    const totalPrice = calculateTotal();
    const orderData = {
      orders,
      totalPrice: `${totalPrice}円`,
      coupon: coupon ? "あり" : "なし",
    };
    console.log("注文内容:", orderData);
  };

  return (
    <div>
      <section>
        <h3>コース</h3>
        <div>
          コースA (1000円) <input className="amount" type="number" name="course_a_xxx123" min="0" value={orders["コースA"]?.quantity || 0} onChange={handleInputChange} />
        </div>
        <div>
          コースB (2000円) <input className="amount" type="number" name="course_b_yyy456" min="0" value={orders["コースB"]?.quantity || 0} onChange={handleInputChange} />
        </div>
        <div>
          コースC (3000円) <input className="amount" type="number" name="course_c_zzz789" min="0" value={orders["コースC"]?.quantity || 0} onChange={handleInputChange} />
        </div>
      </section>

      <section>
        <h3>単品</h3>
        <div>
          フード1 (200円) <input className="amount" type="number" name="food_1_abc111" min="0" value={orders["フード1"]?.quantity || 0} onChange={handleInputChange} />
        </div>
        <div>
          フード2 (300円) <input className="amount" type="number" name="food_2_def222" min="0" value={orders["フード2"]?.quantity || 0} onChange={handleInputChange} />
        </div>
        <div>
          フード3 (400円) <input className="amount" type="number" name="food_3_ghi333" min="0" value={orders["フード3"]?.quantity || 0} onChange={handleInputChange} />
        </div>
      </section>

      <section>
        <h3>割引</h3>
        <label>
          <input type="checkbox" className="coupon" checked={coupon} onChange={handleCouponChange} />
          クーポンあり
        </label>
      </section>

      <section>
        <h3>合計金額</h3>
        <p>
          <span className="total">{calculateTotal()}</span>
          <span>円</span>
        </p>
      </section>

      <button className="submit" type="button" onClick={handleSubmit}>
        注文を送信
      </button>
    </div>
  );
}
