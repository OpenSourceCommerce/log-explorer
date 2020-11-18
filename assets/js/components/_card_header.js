import React, { Component } from "react";
import { Button, Icon } from "./index";

export class CardHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { showCollapseButton = true, showRemoveButton = true, title = "" } = this.props;

        return (
            <div className="card-header">
                <h3 className="card-title">{title}</h3>

                {(showCollapseButton || showRemoveButton) && <div className="card-tools">
                    {showCollapseButton && <Button color="tool"
                                                   data-card-widget="collapse"
                                                   data-toggle="tooltip" title="Collapse">
                        <Icon className="" name={"minus"}/>
                    </Button>}
                    {showRemoveButton && <Button color="tool"
                                                 data-card-widget="remove"
                                                 data-toggle="tooltip" title="Remove">
                        <Icon name={"times"}/>
                    </Button>}
                </div>}
            </div>
        );
    }
}
