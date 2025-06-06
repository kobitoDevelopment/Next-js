const number = 0;

export default function JsxmatomeIfSample3() {
  return (
    <>
      {(() => {
        if (number < 1) {
          return <p>1未満です</p>;
        } else {
          return <p>1以上です</p>;
        }
      })()}
    </>
  );
}
