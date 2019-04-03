import React from 'react';
import { string, func } from 'prop-types';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { FieldTextInput, Form } from '../../components';

const InputTextFilterPlainForm = props => {
  const { onChange, ...rest } = props;

  const handleChange = formState => {
    if (formState.dirty) {
      onChange(formState.values);
    }
  };

  return (
    <FinalForm
      {...rest}
      onSubmit={() => null}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const { className, id, name, type, inputLabel } = formRenderProps;
        return (
          <Form className={className}>
            <FormSpy onChange={handleChange} subscription={{ values: true, dirty: true }} />
            <div style={{ display: 'flex' }}>
              <label style={{ width: 150, marginTop: 10 }}>{inputLabel}</label>
              <FieldTextInput
                style={{width: 100}}                
                name={name}
                id={`${id}`}
                type={type}
              />
            </div>
          </Form>
        );
      }}
    />
  );
};

InputTextFilterPlainForm.defaultProps = {
  className: null,
  onChange: () => null,
};

InputTextFilterPlainForm.propTypes = {
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  onChange: func,
};

export default InputTextFilterPlainForm;
