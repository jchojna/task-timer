import React from 'react';
import classNames from 'classnames';

const TimeInputs = (props) => {
  const {
    block,
    modifier,
    id,
    minutes,
    seconds,
    isValid,
    isEditMode,
    onMinutesChange,
    onSecondsChange
  } = props;

  const fieldsetClass = classNames({
    [`${block}__inputs`]: true,
    [`${block}__inputs--${modifier}`]: true,
    [`${block}__inputs--visible`]: isEditMode,
    [`${block}__inputs--incorrect`]: !isValid 
  })

  return (
    <fieldset
      className={fieldsetClass}
    >
      <input
        id={`${modifier}-${id}`}
        name={`${modifier}Minutes`}
        className={`${block}__input ${block}__input--minutes`}
        placeholder="min"
        maxLength="2"
        value={minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
      <span className={`${block}__separator`}>{` : `}</span>
      <input
        name={`${modifier}Seconds`}
        className={`${block}__input ${block}__input--seconds`}
        placeholder="sec"
        maxLength="2"
        value={seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      />
    </fieldset>
  );
}
export default TimeInputs;