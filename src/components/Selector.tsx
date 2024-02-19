export default function Selector() {
  return (
    <>
      <p className="text-xl text-center mb-3">🤓 I want to learn..</p>
      <div
        role="tablist"
        className="tabs bg-[#FAFAFA] tabs-boxed max-w-sm m-auto mb-6"
      >
        <a role="tab" className="tab tab-active">
          All
        </a>
        <a role="tab" className="tab">
          English
        </a>
        <a role="tab" className="tab">
          Chinese
        </a>
        <a role="tab" className="tab">
          Korean
        </a>
        <a role="tab" className="tab ">
          Japanese
        </a>
      </div>
    </>
  );
}
