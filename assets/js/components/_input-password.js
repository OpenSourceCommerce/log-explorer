import React from "react";
import { Input } from ".";

export const InputPasswordComponent = ({
    fieldName,
    helpText,
    label,
    className,
    isInvalidField,
    onChange,
    value,
    ...rest
}) => {
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

    return (
        <div className="mb-3">
            <div className={`form-field form-group ${className}`}>
                <label className={`mb-1 required`}>{label}</label>
                <Input
                    className={`${isInvalidField ? "is-invalid" : ""} bg-img-none`}
                    name={fieldName}
                    value={value}
                    type="password"
                    onChange={(e) => {
                        if (onChange) onChange(e);
                    }}
                    {...rest}
                />
                <div className="position-relative">
                    <a className="toggle-password" id="toggle-password" role="button">
                        <div className="eye-icon">
                            <i className="fas fa-eye icon" id="fas-eye-icon"></i>
                        </div>
                    </a>
                </div>
                {isInvalidField && (
                    <span className="error invalid-feedback">
                        {errorMessage || generateErrorMessage(type)}
                    </span>
                )}
            </div>
            {helpText && <div className="form-text text-muted fw-light px-3 m-0">{helpText}</div>}
        </div>
    );
};
