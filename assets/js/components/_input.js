import React, { Component } from 'react';

export class Input extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        const { className, type = 'text', ...rest } = this.props;
        let classes = className;
        classes += ' form-control';

        return (
            <input
                className={classes}
                type={type}
                {...rest}
          />
        );

    }

}
