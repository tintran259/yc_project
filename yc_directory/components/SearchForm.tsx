import Form from "next/form";
import FormResetSearch from "./FormResetSearch";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query ? <FormResetSearch /> : ""}

        <button className="search-btn" type="submit">
          <Search className="size-5 text-white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
