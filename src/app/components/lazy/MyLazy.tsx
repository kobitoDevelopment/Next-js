export default async function MyLazy() {
  await new Promise(function (resolve) {
    setTimeout(resolve, 3000);
  });

  return (
    <div>
      <div>lazy</div>
    </div>
  );
}
