import React from "react";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  FormattedDate
} from "react-intl";
import moment from "moment";
import { LINE_ITEM_NIGHT, propTypes } from "../../util/types";
import { daysBetween, dateFromAPIToLocalNoon } from "../../util/dates";

import css from "./BookingBreakdown.css";

const timeOption = {
  hour: '2-digit',
  hour12: true,
  minute: '2-digit'
};
const timeFormatter = new Intl.DateTimeFormat('default', timeOption);


const BookingPeriod = props => {
  const { isSingleDay, startDate, endDate } = props;
  const dateFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  if (isSingleDay) {
    return <div>
      <FormattedDate value={startDate} {...dateFormatOptions} />
      {", "}
      {
        timeFormatter.format(startDate)
      }
    </div>;
  }

  return (
    <FormattedMessage
      id="BookingBreakdown.bookingPeriod"
      values={{
        bookingStart: (
          <span className={css.nowrap}>
            <FormattedDate value={startDate} {...dateFormatOptions} />
          </span>
        ),
        bookingEnd: (
          <span className={css.nowrap}>
            <FormattedDate value={endDate} {...dateFormatOptions} />
          </span>
        )
      }}
    />
  );
};

const LineItemBookingPeriod = props => {
  const { transaction, booking, unitType, hourly } = props;
  const { start: startDate, end: endDateRaw, displayStart, displayEnd } = booking.attributes;
  const localStartDate = dateFromAPIToLocalNoon(startDate);
  const localEndDateRaw = dateFromAPIToLocalNoon(endDateRaw);
  const isNightly = unitType === LINE_ITEM_NIGHT;

  const dayCount = daysBetween(localStartDate, localEndDateRaw) - 1;
  const isSingleDay = !isNightly && dayCount <= 1;
  const endDay = isNightly
    ? localEndDateRaw
    : moment(localEndDateRaw)
        .subtract(1, "days")
        .toDate();

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  // console.log(transaction, unitPurchase)

  if (!unitPurchase) {
    return null;
    throw new Error(`LineItemBookingPeriod: lineItem (${unitType}) missing`);
  }

  const count = dayCount;

  const unitCountMessage = (
    <FormattedHTMLMessage id={"BookingBreakdown.dayCount"} values={{ count }} />
  );

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <BookingPeriod
          isSingleDay={isSingleDay}
          startDate={displayStart || startDate}
          endDate={displayEnd || endDateRaw}
        />
      </span>
      {!hourly && <span className={css.itemValue}>{unitCountMessage}</span>}
    </div>
  );
};

LineItemBookingPeriod.propTypes = {
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired
};

export default LineItemBookingPeriod;
