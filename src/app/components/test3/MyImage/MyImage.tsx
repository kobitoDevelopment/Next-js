import Image from "next/image";
export default function MyImage() {
  return (
    <div>
      {/* 最適化された画像を表示する作法としてImageコンポーネントを使用する */}
      <Image src="/next.svg" alt="" width={200} height={200} quality={75} />
    </div>
  );
}
