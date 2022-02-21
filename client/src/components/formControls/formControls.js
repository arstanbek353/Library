import React from 'react'
import { Link } from 'react-router-dom';
import Permission from '../../Permission';


export const Select = ({
    register,
    options,
    name,
    errors = {},
    validate,
    zeroOpt,
    placeholder = 'Choose',
    errorText = 'This field is required',
    ...rest }) => {
    return (
        <>
            <select
                {...register(name, validate)}
                {...rest}
                className={"form-control mb-2"}
                id={name}
                type={"select"}
                placeholder={placeholder}
                name={name}
            >
                {zeroOpt ?
                    <option key={'default'} value={'default'}>
                        {placeholder}
                    </option> : null}

                {options.map(value => (
                    <option
                        key={value.id}
                        value={value.id}
                    >
                        {value.value}
                    </option>
                ))}
            </select>
            {errors[name] && <div className={"alert alert-danger"}>
                {errors[name].message ? errors[name].message : errorText}
            </div>}
        </>
    );
}


export const Checkboxes = ({ checkboxes, name }) => {
    return (
        <div className="checkboxes">
            {checkboxes.map(checkbox => (
                <label
                    htmlFor={checkbox.id}
                    key={checkbox.id}
                    className={'form-check-label me-2 mb-2 d-inline-flex align-items-center'}>
                    <input
                        className="form-check-input me-2"
                        checked={checkbox.checked}
                        type="checkbox"
                        id={checkbox.id}
                        value={checkbox.id}
                        {...checkbox.register(name)}
                        {...checkbox.rest}
                    />
                    <span>{checkbox.label}</span>
                </label>
            ))}
        </div>
    );
}



export const Checkbox = ({
    id,
    name,
    label,
    register,
    errors,
    checked,
    errorText = 'This field is required',
    validate }) => {
    return (
        <label htmlFor={id} className="me-2">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                className="form-check-input"
                {...register(name, validate)}
            />
            <span>{label}</span>
            {errors[name] && <div className={"alert alert-danger"}>{errorText}</div>}
        </label>
    );
}

export const Input = ({
    register,
    name,
    id,
    placeholder = '',
    errors = null,
    label = '',
    required = false,
    validate,
    type = 'text',
    errorText = 'This field is required',
    className,
    ...rest }) => {
    return (
        <div className={`form-group mb-2 ${className}`}>
            <label htmlFor={id} className={'mb-1'}>{label}</label>
            <input
                {...register(
                    name, validate
                )}
                {...rest}
                required={validate.required}
                className="form-control"
                placeholder={placeholder}
                id={id}
                type={type}
            />
            {errors[name] && <div className={"alert alert-danger"}>
                {errors[name].message ? errors[name].message : errorText}
            </div>}
        </div>
    )
}

export const Textarea = ({
    register,
    name,
    id,
    placeholder,
    errors,
    label,
    required = false,
    validate,
    errorText = 'This field is required',
    ...rest }) => {
    return (
        <div className="form-group mb-2">
            <label htmlFor={id}>{label}</label>
            <textarea
                {...register(
                    name, validate
                )}
                {...rest}
                className="form-control"
                placeholder={placeholder}
                id={id}
            ></textarea>
            {errors[name] && <div className={"alert alert-danger"}>{errorText}</div>}
        </div>
    )
}

export const ControlButtons = ({ deleteHendler, isDeleted, name, to, children }) => {
    return (
        <>
            {!isDeleted ?
                <div className="control">
                    <Permission>
                        <button
                            type="button"
                            className="btn btn-danger me-2"
                            onClick={deleteHendler}
                        >Delete</button>
                    </Permission>
                    <Link
                        className="btn btn-secondary me-2"
                        to={`${to}`}
                    >Edit</Link>
                    {children}
                </div>
                : ''
            }
            {isDeleted ?
                <div className="alert alert-success" role="alert">
                    <strong>
                        {name}
                    </strong> was deleted
                </div>
                : ''
            }
        </>
    )
}