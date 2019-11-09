import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const SearchBar = props => {

    return (
        <Form inline onSubmit={props.handleFormSubmit}>
            <FormGroup>
                <Label for="searchTerm" hidden>Search by Location</Label>
                <Input
                    type="text"
                    name="searchTerm"
                    id="searchTerm"
                    placeholder="Address or zip"
                    value={props.searchTerm}
                    onChange={props.handleInputChange}
                />
            </FormGroup>
            <Button onClick={props.handleFormSubmit}>Submit</Button>
        </Form>
    )
}

export default SearchBar;