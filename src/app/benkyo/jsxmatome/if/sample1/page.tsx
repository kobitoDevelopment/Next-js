/*
 * JSXの条件分岐に三項演算子を使う場合
 */

const sampleIfBoolean: boolean = true;
const sampleIfNumber: number = 1;
export default function JsxmatomeIfSample1() {
  return (
    <div>
      {/* 条件分岐 */}
      {sampleIfBoolean && <p>sampleBooleanがtrueです</p>}
      {!sampleIfBoolean && <p>sampleBooleanがfalseです</p>}
      {/* sampleIfBooleanが0以上3未満なら */}
      {sampleIfNumber >= 0 && sampleIfNumber < 3 && <p>sampleNumberが0以上3未満です</p>}
      {/* sampleIfNumberが3以上なら */}
      {sampleIfNumber >= 3 ? <p>sampleNumberが3以上です</p> : <p>sampleNumberが3未満です</p>}
    </div>
  );
}
