import Filters from "@/components/destination/Filters";
import Main from "@/components/destination/Main";
export default function HomePage() {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <Filters />

      {/* Main Content */}
     
      <Main />
    </div>
  );
}
