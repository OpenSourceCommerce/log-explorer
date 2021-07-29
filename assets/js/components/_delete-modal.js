import React, {Component} from 'react';
import {Colors, Modal, Size} from "./index";

export class DeleteModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            data,
            indexSelected,
            objectName,
            saveButtonAction,
            closeButtonAction
        } = this.props;

        return (
            <Modal
                id={`delete-${objectName}`}
                title='Confirm Delete'
                children={`Are you sure you want to delete ${objectName} ${data[indexSelected]?.title} ?`}
                saveButtonTitle='Delete'
                closeButtonTitle='Cancel'
                show={indexSelected || indexSelected === 0}
                saveButtonColor={Colors.red}
                size={Size.medium}
                showSaveButton={true}
                closeButtonAction={closeButtonAction}
                saveButtonAction={saveButtonAction}
            />
        )
    }

}
