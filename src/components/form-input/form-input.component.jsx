import './form-input.styles.jsx'
import { FormInputLabel, Group, Input } from './form-input.styles.jsx'

const FormInput = ({label, shrink, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps}/>
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>

    )
}

export default FormInput