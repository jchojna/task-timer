import React from 'react';

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

  return (
    <fieldset
      className={`${block}__inputs ${block}__inputs--${modifier}
      ${isEditMode ? `${block}__inputs--visible` : ""}
      ${isValid ? "" : `${block}__inputs--incorrect`}`}
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