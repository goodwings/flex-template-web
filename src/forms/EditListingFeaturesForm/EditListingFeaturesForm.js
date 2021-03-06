import React from 'react';
import { bool, func, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { required, composeValidators } from "../../util/validators";

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, FieldTextInput, Form } from '../../components';

import css from './EditListingFeaturesForm.css';

const EditListingFeaturesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={fieldRenderProps => {
      const {
        disabled,
        rootClassName,
        className,
        name,
        handleSubmit,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress,
        intl,
      } = fieldRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress || invalid;

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
        </p>
      ) : null;

      const impactFocusLabel = intl.formatMessage({
        id: "EditListingFeaturesForm.impactFocusLabel"
      });

      const whyBuyThisLabel = intl.formatMessage({
        id: "EditListingFeaturesForm.whyBuyThisLabel"
      });

      const whyBuyThisPlaceholder = intl.formatMessage({
        id: "EditListingFeaturesForm.whyBuyThisPlaceholder"
      });

      const whyBuyThisRequiredMessage = intl.formatMessage({
        id: "EditListingFeaturesForm.whyBuyThisRequiredMessage"
      });

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <FieldCheckboxGroup
            className={css.features}
            id={name}
            name={name}
            label={impactFocusLabel}
            options={config.custom.goals}
          />

          <FieldTextInput
            className={css.features}
            id='whyBuyThis'
            name='whyBuyThis'
            type="textarea"
            row={3}
            label={whyBuyThisLabel}
            placeholder={whyBuyThisPlaceholder}
            validate={composeValidators(required(whyBuyThisRequiredMessage))}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  updateError: null,
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

export default EditListingFeaturesForm;
