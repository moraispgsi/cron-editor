import { Radio } from "antd";
import React from "react";
import BaseEditor from "./BaseEditor";
import Between from "./Between";
import CheckBoxEditor from "./CheckBoxEditor";
import LastWeekDay from "./LastWeekDay";
import Reg, { index } from "./Reg";
import WeekDay from "./WeekDay";

const RadioGroup = Radio.Group;

const defaultRadioKeyValue = {};
defaultRadioKeyValue[index.EVERY] = "*";
defaultRadioKeyValue[index.ANY] = "?";
defaultRadioKeyValue[index.BETWEEN] = "1-2";
defaultRadioKeyValue[index.WEEK_DAY] = "1#1";
defaultRadioKeyValue[index.LAST_WEEK_DAY] = "1L";
defaultRadioKeyValue[index.CHECK_BOX] = "*";

class WeekEditor extends BaseEditor {
  state = {
    radio: index.EVERY,
    value: defaultRadioKeyValue
  };

  render() {
    const { radioStyle, value: defaultValue, translate, ...config } = this.props;
    const { radio, value } = this.state;

    return (
      <RadioGroup onChange={this.handleRadioChange} value={radio}>
        <Reg
          translate={translate}
          value={defaultValue}
          currentIndex={radio}
          onChange={this.handleRegChange}
        />
        <Radio style={radioStyle} value={index.EVERY}>
          {translate('weekly')}
        </Radio>
        <Radio style={radioStyle} value={index.ANY}>
          {translate('not_specified')}
        </Radio>
        <Radio style={radioStyle} value={index.BETWEEN}>
          {translate('cycle')}{" "}
          <Between
            translate={translate}
            min={1}
            max={7}
            value={value[index.BETWEEN]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.BETWEEN)}
          />
        </Radio>
        <Radio style={radioStyle} value={index.WEEK_DAY}>
          <WeekDay
            translate={translate}
            onChange={this.handleValueChange.bind(this, index.WEEK_DAY)}
            value={value[index.WEEK_DAY]}
            {...config}
          />
        </Radio>
        <Radio style={radioStyle} value={index.LAST_WEEK_DAY}>
          {translate('last_week_of_the_month')}{" "}
          <LastWeekDay
            translate={translate}
            value={value[index.LAST_WEEK_DAY]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.LAST_WEEK_DAY)}
          />
        </Radio>
        <Radio style={radioStyle} value={index.CHECK_BOX}>
          {translate('specified')}
          <CheckBoxEditor
            translate={translate}
            min={1}
            max={7}
            value={value[index.CHECK_BOX]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.CHECK_BOX)}
          />
        </Radio>
      </RadioGroup>
    );
  }
}

export default WeekEditor;
