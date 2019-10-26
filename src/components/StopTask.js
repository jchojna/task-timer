import React from 'react';
import '../scss/StopTask.scss';

const StopTask = (props) => {
  return (
    <section className={props.compClassName}>
      <div className="StopTask__container">
        <h2 className="StopTask__heading">
          Are you sure you want to quit?
        </h2>
        <button className="StopTask__button StopTask__button--stop">
          Yes
        </button>
        <button className="StopTask__button StopTask__button--cancel">
          Cancel
        </button>
      </div>
    </section>
  );
}
export default StopTask;