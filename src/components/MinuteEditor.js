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
defaultRadioKeyValue[index.BETWEEN] = "0-59";
defaultRadioKeyValue[index.FROM_EVERY] = "0/1";
defaultRadioKeyValue[index.CHECK_BOX] = "*";

class MinuteEditor extends BaseEditor {
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
          Per minute
        </Radio>
        <Radio style={radioStyle} value={index.BETWEEN}>
          cycle
          <Between
            max={59}
            value={value[index.BETWEEN]}
            {...config}
            fix={radio === index.BETWEEN}
            onChange={this.handleValueChange.bind(this, index.BETWEEN)}
          />
        </Radio>
        <Radio style={radioStyle} value={index.FROM_EVERY}>
          <FromEvery
            front="From"
            middle="Start, every"
            back="Perform once"
            onChange={this.handleValueChange.bind(this, index.FROM_EVERY)}
            value={value[index.FROM_EVERY]}
            {...config}
          />
        </Radio>
        <Radio style={radioStyle} value={index.CHECK_BOX}>
          Specified
          <CheckBoxEditor
            max={59}
            value={value[index.CHECK_BOX]}
            {...config}
            onChange={this.handleValueChange.bind(this, index.CHECK_BOX)}
          />
        </Radio>
      </RadioGroup>
    );
  }
}

export default MinuteEditor;
