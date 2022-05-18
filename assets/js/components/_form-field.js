import React, {Component} from 'react';
import {Input, Checkbox} from "./index";
import {WidgetTable} from "./widget/_widget-table";
import {Select2} from "./_select2";
import {Select} from "./_select";
import '../../styles/component/_form-field.scss';

const FormFieldComponent = ({...props}) => {
    let component;
    const {type, children, checkboxlabel } = {...props};
    switch (type) {
        case 'select':
            component = <Select {...props} > {children} </Select>
            break;
        case 'selectTypeAhead':
            component = <Select2 {...props} > {children} </Select2>
            break;
        case 'checkbox':
            component = <Checkbox {...props} label={checkboxlabel} />;
            break;
        default:
            component = <Input {...props} />;
            break;
    }
    return component;
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
            errors,
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
                {isInvalidField && <span className="error invalid-feedback">Please fill out this field</span>}
            </div>
        );
    }
}
