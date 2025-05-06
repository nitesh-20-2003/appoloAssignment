import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="search"
      placeholder="Search Doctors, Specialities, or Conditions etc ..."
      className="max-w-3xl dark:bg-muted  "
    />
  );
}
export default NavSearch;
