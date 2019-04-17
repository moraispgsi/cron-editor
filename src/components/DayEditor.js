import { Radio } from "antd";
import React from "react";
import BaseEditor from "./BaseEditor";
import Between from "./Between";
import CheckBoxEditor from "./CheckBoxEditor";
import FromEvery from "./FromEvery";
import LastWorkDay from "./LastWorkDay";
import Reg, { index } from "./Reg";

const RadioGroup = Radio.Group;

const defaultRadioKeyValue = {};
defaultRadioKeyValue[index.EVERY] = "*";
defaultRadioKeyValue[index.ANY] = "?";
defaultRadioKeyValue[index.BETWEEN] = "1-2";
defaultRadioKeyValue[index.FROM_EVERY] = "1/1";
defaultRadioKeyValue[index.LAST_WORK_DAY] = "1W";
defaultRadioKeyValue[index.LAST_MONTH_DAY] = "L";
defaultRadioKeyValue[index.CHECK_BOX] = "*";

class DayEditor extends BaseEditor {
  state = {
    radio: index.EVERY,
    value: defaultRadioKeyValue
  };

  render() {
    const { radioStyle, value: defaultValue, ...config } = this.props;
    const { radio, value } = this.state;

    return (
      <RadioGroup onChange={this.handleRadioChange} value={radio}>
        <Reg
          value={defaultValue}
          currentIndex={radio}
          onChange={this.handleRegChange}
        />
        <Radio style={radioStyle} value={index.EVERY}>
          daily
        </Radio>
        <Radio style={radioStyle} value={index.ANY}>
          Not specify
        </Radio>
        <Radio style={radioStyle} value={index.BETWEEN}>
          cycle{" "}
          <Between
            min={1}
            max={31}
            value={value[index.BETWEEN]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.BETWEEN)}
          />
        </Radio>
        <Radio style={radioStyle} value={index.FROM_EVERY}>
          <FromEvery
            front="From"
            middle="Starting day, every day"
            back="Execute once a day"
            onChange={this.handleValueChange.bind(this, index.FROM_EVERY)}
            value={value[index.FROM_EVERY]}
            {...config}
          />
        </Radio>
        <Radio style={radioStyle} value={index.LAST_WORK_DAY}>
          per month{" "}
          <LastWorkDay
            value={value[index.LAST_WORK_DAY]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.LAST_WORK_DAY)}
          />{" "}
          The closest working day
        </Radio>
        <Radio style={radioStyle} value={index.LAST_MONTH_DAY}>
          The last day of the month
        </Radio>
        <Radio style={radioStyle} value={index.CHECK_BOX}>
          Specified
          <CheckBoxEditor
            min={1}
            max={31}
            value={value[index.CHECK_BOX]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.CHECK_BOX)}
          />
        </Radio>
      </RadioGroup>
    );
  }
}

export default DayEditor;
