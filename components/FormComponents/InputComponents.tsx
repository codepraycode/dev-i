import { Form, Input } from 'antd'
import React from 'react'



interface InputComponentProps {
    label: string,
    placeholder?: string,
    required?: boolean,
    type: string
}


export default function FormInputComponent(props: InputComponentProps) {
    return (
        <Form.Item label={props.label}>
            <Input
                placeholder={props.placeholder || `Input props.label`}
                required={props.required}
                type={props.type}
            />
        </Form.Item>
    )
}
