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
            closeButtonAction,
            displayField
        } = this.props;

        const isShow = indexSelected || indexSelected === 0;

        return (
            <Modal
                id={`delete-${objectName}`}
                title='Confirm Delete'
                children={`Are you sure you want to delete ${objectName} ${data[indexSelected]?.[displayField]} ?`}
                saveButtonTitle='Delete'
                closeButtonTitle='Cancel'
                show={!!isShow}
                saveButtonColor={Colors.red}
                size={Size.medium}
                showSaveButton={true}
                closeButtonAction={closeButtonAction}
                saveButtonAction={saveButtonAction}
                onHidden={closeButtonAction}
            />
        )
    }

}
