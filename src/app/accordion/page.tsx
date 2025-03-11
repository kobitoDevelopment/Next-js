import Accordion from "@/app/components/accordion/Accordion";

export default function TestPage() {
  return <Accordion buttonName="accordion-button-1" panelName="accordion-panel-1" title={<span>アコーディオンのタイトル</span>} icon={<span>▼</span>} content={<p>ここにアコーディオンの内容が入ります。</p>} />;
}
