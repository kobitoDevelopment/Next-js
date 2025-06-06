/*
 * JSXの条件分岐にifを使う場合(returnの中でifを書くことはできないため、事前に変数で条件分岐を処理)
 */

const sampleIfBoolean: boolean = true;
const sampleIfNumber: number = 1;

export default function JsxmatomeIfSample2() {
  let booleanMessage;
  let numberMessage;

  // sampleIfBooleanの条件分岐
  if (sampleIfBoolean) {
    booleanMessage = <p>sampleBooleanがtrueです</p>;
  } else {
    booleanMessage = <p>sampleBooleanがfalseです</p>;
  }

  // sampleIfNumberの条件分岐
  if (sampleIfNumber >= 0 && sampleIfNumber < 3) {
    numberMessage = <p>sampleNumberが0以上3未満です</p>;
  } else if (sampleIfNumber >= 3) {
    numberMessage = <p>sampleNumberが3以上です</p>;
  } else {
    numberMessage = <p>sampleNumberが3未満です</p>;
  }

  return (
    <div>
      {/* 事前に変数で条件分岐を処理し、JSX内で挿入 */}
      {booleanMessage}
      {numberMessage}
    </div>
  );
}
