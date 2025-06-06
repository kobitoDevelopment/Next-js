export default async function MySuspense() {
  await new Promise(function (resolve) {
    setTimeout(resolve, 3000);
  });

  return (
    <div>
      <div>suspense</div>
    </div>
  );
}
