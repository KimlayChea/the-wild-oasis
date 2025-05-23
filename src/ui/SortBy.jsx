import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // set default value if it does't have a state on url
  const sortBy = searchParams.get("sortBy") || options[0].value;

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type={"white"}
      onChange={handleChange}
    />
  );
}

export default SortBy;
