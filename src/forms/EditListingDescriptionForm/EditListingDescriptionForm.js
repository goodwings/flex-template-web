import React from "react";
import { bool, func, string, arrayOf, shape } from "prop-types";
import { compose } from "redux";
import { Form as FinalForm } from "react-final-form";
import { intlShape, injectIntl, FormattedMessage } from "react-intl";
import classNames from "classnames";
import { propTypes } from "../../util/types";
import { maxLength, required, composeValidators } from "../../util/validators";
import { Form, Button, FieldTextInput, FieldSelect } from "../../components";
import CustomCategorySelectFieldMaybe from "./CustomCategorySelectFieldMaybe";
import config from "../../config";

import css from "./EditListingDescriptionForm.css";

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        group_size_brackets,
        categories,
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress
      } = fieldRenderProps;

      const titleMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.title"
      });
      const titlePlaceholderMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.titlePlaceholder"
      });
      const titleRequiredMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.titleRequired"
      });
      const maxLengthMessage = intl.formatMessage(
        { id: "EditListingDescriptionForm.maxLength" },
        {
          maxLength: TITLE_MAX_LENGTH
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.description"
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.descriptionPlaceholder"
      });
      const includedMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.included"
      });
      const includedPlaceholderMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.includedPlaceholder"
      });
      const includedRequiredMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.includedRequired"
      });
      const contactMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.contact"
      });
      const contactPlaceholderMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.contactPlaceholder"
      });
      const durationPlaceholderMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.durationPlaceholder"
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: "EditListingDescriptionForm.descriptionRequired"
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(
              required(titleRequiredMessage),
              maxLength60Message
            )}
            autoFocus
          />

          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          <FieldTextInput
            id="included"
            name="included"
            className={css.description}
            type="textarea"
            label={includedMessage}
            placeholder={includedPlaceholderMessage}
            validate={composeValidators(required(includedRequiredMessage))}
          />

          <CustomCategorySelectFieldMaybe
            id="group_size"
            name="group_size"
            categories={group_size_brackets}
            intl={intl}
          />

          <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          />

          <FieldTextInput
            id="contact"
            name="contact"
            className={css.description}
            type="textarea"
            label={contactMessage}
            placeholder={contactPlaceholderMessage}
          />
          <FieldSelect
            name="duration"
            id="duration"
            label="Duration"
            className={css.category}
            validate={required("Required")}
          >
            <option disabled selected value="">
              {durationPlaceholderMessage}
            </option>
            {config.custom.duration_options.map(option => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </FieldSelect>
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

EditListingDescriptionFormComponent.defaultProps = {
  className: null,
  updateError: null
};

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired
    })
  )
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
