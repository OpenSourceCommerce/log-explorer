import React, { Component } from "react";
import { Button, Icon, Input } from "./index";

export class NavSearch extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (
            <form className="form-inline ml-3">
                <div className="input-group input-group-sm">
                    <Input
                        className="form-control-navbar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <div className="input-group-append">
                        <Button color="">
                            <Icon name="search"/>
                        </Button>
                    </div>
                </div>
            </form>
        );

    }

}
