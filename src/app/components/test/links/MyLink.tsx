/* NuxtでいうところのNuxtLinkと同様の処理を行うため、Next用のLinkコンポーネントをimport */
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/test2">Test Page2へ移動</Link>
    </div>
  );
}
