import { Radio } from "antd";
import React from "react";
import BaseEditor from "./BaseEditor";
import Between from "./Between";
import CheckBoxEditor from "./CheckBoxEditor";
import FromEvery from "./FromEvery";
import Reg, { index } from "./Reg";

const RadioGroup = Radio.Group;

const defaultRadioKeyValue = {};
defaultRadioKeyValue[index.EVERY] = "*";
defaultRadioKeyValue[index.BETWEEN] = "1-2";
defaultRadioKeyValue[index.FROM_EVERY] = "1/1";
defaultRadioKeyValue[index.CHECK_BOX] = "*";

class MonthEditor extends BaseEditor {
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
          per month
        </Radio>
        <Radio style={radioStyle} value={index.BETWEEN}>
          cycle{" "}
          <Between
            min={1}
            max={12}
            value={value[index.BETWEEN]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.BETWEEN)}
          />
        </Radio>
        <Radio style={radioStyle} value={index.FROM_EVERY}>
          <FromEvery
            front="From"
            middle="Beginning of the month, every month"
            back="Execute once a month"
            fromMax={12}
            everyMax={12}
            onChange={this.handleValueChange.bind(this, index.FROM_EVERY)}
            value={value[index.FROM_EVERY]}
            {...config}
          />
        </Radio>
        <Radio style={radioStyle} value={index.CHECK_BOX}>
          Specified
          <CheckBoxEditor
            min={1}
            max={12}
            value={value[index.CHECK_BOX]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.CHECK_BOX)}
          />
        </Radio>
      </RadioGroup>
    );
  }
}

export default MonthEditor;
