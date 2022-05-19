import React, {Component} from 'react';
import {Input, Checkbox} from "./index";
import {WidgetTable} from "./widget/_widget-table";
import {Select2} from "./_select2";
import {Select} from "./_select";
import '../../styles/component/_form-field.scss';

const COMPONENT_TYPE = {
    SELECT: 'select',
    SELECT_TYPE_AHEAD: 'selectTypeAhead',
    CHECKBOX: 'checkbox',
    NUMBER: 'number'
}


const FormFieldComponent = ({...props}) => {
    let component;
    const {type, children, checkboxlabel } = {...props};
    switch (type) {
        case COMPONENT_TYPE.SELECT:
            component = <Select {...props} > {children} </Select>
            break;
        case COMPONENT_TYPE.SELECT_TYPE_AHEAD:
            component = <Select2 {...props} > {children} </Select2>
            break;
        case COMPONENT_TYPE.CHECKBOX:
            component = <Checkbox {...props} label={checkboxlabel} />;
            break;
        default:
            component = <Input type={type} {...props} />;
            break;
    }
    return component;
}

const generateErrorMessage = (componentType) => {
    let errorMessage = '';
    switch (componentType) {
        case COMPONENT_TYPE.SELECT:
            errorMessage = 'Please select a valid value.';
            break;
        case COMPONENT_TYPE.SELECT_TYPE_AHEAD:
            errorMessage = 'Please select at least one option.';
            break;
        case COMPONENT_TYPE.CHECKBOX:
            errorMessage = 'Please check to this checkbox.';
            break;
        default:
            errorMessage = 'Please fill out this field.';
            break;
    }
    return errorMessage;
}

export class FormField extends Component {
    render() {
        const {
            label,
            className = '',
            defaultValue,
            fieldName,
            value,
            onChange,
            onBlur,
            isMandatory = false,
            isHiddenLabel = false,
            children,
            errorMessage,
            errors,
            type,
            ...rest
        } = this.props;

        let isInvalidField = false;

        if (Array.isArray(errors)) {
            isInvalidField = errors.includes(fieldName);
        } else if (typeof errors === 'object') {
            isInvalidField = errors[fieldName];
        }

        return (
            <div key={isInvalidField} className={`form-field form-group ${className}`}>
                {!isHiddenLabel && <label className={isMandatory ? 'required' : ''}>{label}</label>}
                <FormFieldComponent
                    className={isInvalidField ? 'is-invalid' : ''}
                    name={fieldName}
                    value={value}
                    type={type}
                    onChange={(e) => {
                        if (onChange) onChange(e);
                    }}
                    onBlur={(e) => {
                        if (onBlur) onBlur(e);
                    }}
                    {...rest}
                >
                    {children}
                </FormFieldComponent>
                {isInvalidField && <span className="error invalid-feedback">{errorMessage || generateErrorMessage(type)}</span>}
            </div>
        );
    }
}
