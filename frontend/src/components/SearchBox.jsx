import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form
      style={{ display: "flex", width: "100%" }}
      onSubmit={handleSearch}
      inline
    >
      <Form.Control
        value={keyword}
        className="mr-sm-2 ml-sm-5"
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
      />
      <Button type="submit" variant="outline-success" className="px-2 mx-3">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
