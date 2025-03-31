import type { JSX } from "react";
import If1 from "@/app/components/if/If1";
import If2 from "@/app/components/if/If2";

let content: JSX.Element;
const isLoggedIn: boolean = true;
if (isLoggedIn) {
  content = <If1 />;
} else {
  content = <If2 />;
}
export default function TestPage() {
  return <div>{content}</div>;
}
