import React from "react";
import { FormattedMessage } from "react-intl";
import { UserCard, Modal } from "../../components";
import { EnquiryForm } from "../../forms";

import css from "./ListingPage.css";

const SectionHost = props => {
  const {
    title,
    listing,
    authorDisplayName,
    onContactUser,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    sendEnquiryInProgress,
    onSubmitEnquiry,
    currentUser,
    onManageDisableScrolling,
    pdf
  } = props;
  return (
    <div id="host" className={pdf ? css.pdfSectionHost : css.sectionHost}>
      <h2 className={pdf ? css.pdfYourHostHeading : css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2>
      <UserCard
        pdf={pdf}
        user={listing.author}
        currentUser={currentUser}
        onContactUser={onContactUser}
      />
      <Modal
        id="ListingPage.enquiry"
        contentClassName={css.enquiryModalContent}
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <EnquiryForm
          organisation={
            listing.author.attributes.profile.publicData.organisation
          }
          className={css.enquiryForm}
          submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
          listingTitle={title}
          listingContactNumber={listing.attributes.publicData.contactNumber}
          listingContactName={listing.attributes.publicData.contactName}
          authorDisplayName={authorDisplayName}
          sendEnquiryError={sendEnquiryError}
          onSubmit={onSubmitEnquiry}
          inProgress={sendEnquiryInProgress}
        />
      </Modal>
    </div>
  );
};

export default SectionHost;
