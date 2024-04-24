export default function ScenarioSkeleton() {
  return Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="flex flex-col gap-4 w-96">
      <div className="skeleton h-60 w-full bg-gray-300 animate-pulse"></div>
      <div className="skeleton h-4 w-28 bg-gray-300 animate-pulse"></div>
      <div className="skeleton h-4 w-full bg-gray-300 animate-pulse"></div>
      <div className="skeleton h-4 w-full bg-gray-300 animate-pulse"></div>
    </div>
  ));
}
