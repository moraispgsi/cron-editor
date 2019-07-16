import { Tabs } from "antd";
import React from "react";
import DayEditor from "./components/DayEditor";
import HourEditor from "./components/HourEditor";
import MinuteEditor from "./components/MinuteEditor";
import MonthEditor from "./components/MonthEditor";
import WeekEditor from "./components/WeekEditor";

const TabPane = Tabs.TabPane;

const radioStyle = {
  display: "block",
  lineHeight: "30px",
  padding: "5px"
};

const containerStyle = {
  padding: "12px 12px"
};

class CronEditor extends React.Component {
  state = {
    cron: ["*", "*", "*", "?", "*", "?"]
  };

  constructor(props) {
    super(props);
    const { defaultValue } = props;
    this.updateCron(defaultValue, false);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.updateCron(value);
  }

  updateCron = (cronText, isSet = true) => {
    cronText = cronText && cronText.trim();
    if (cronText) {
      const { cron } = this.state;
      const cronArr = cronText.split(" ");
      for (let i = 0; i < cronArr.length; i += 1) {
        cron[i] = cronArr[i];
      }
      if (cron[3] === "?") {
        if (cron[5] === "?") cron[5] = "*";
      } else {
        cron[5] = "?";
      }
      isSet ? this.setState({ cron }) : (this.state.cron = cron);
    }
  };

  cronChange = (value, index) => {
    const { onChange } = this.props;
    const { cron } = this.state;
    cron[index] = value;
    if (index === 3) {
      if (value === "?") {
        if (cron[5] === "?") cron[5] = "*";
      } else {
        cron[5] = "?";
      }
    } else if (index === 5) {
      if (value === "?") {
        if (cron[3] === "?") cron[3] = "*";
      } else {
        cron[3] = "?";
      }
    }
    this.setState({ cron });
    const cronText = cron.join(" ");
    onChange && onChange(cronText);
  };

  minuteChange = value => {
    this.cronChange(value, 0);
  };

  hourChange = value => {
    this.cronChange(value, 1);
  };

  dayChange = value => {
    this.cronChange(value, 2);
  };

  monthChange = value => {
    this.cronChange(value, 3);
  };

  weekChange = value => {
    this.cronChange(value, 4);
  };

  translate = (id) => {
    const { translate } = this.props;
    if(!translate) {
      return id;
    }
    return translate(id);
  };

  render() {
    const {
      style = containerStyle,
      second,
      minute,
      hour,
      day,
      month,
      week,
      year,
      defaultValue,
      value,
      onChange,
      ...config
    } = this.props;
    const { cron } = this.state;
    return (
      <Tabs defaultActiveKey="minute" style={style}>
        <TabPane tab={this.translate('minute')} key="minute">
          <MinuteEditor
            translate={this.translate}
            onChange={this.minuteChange}
            value={cron[0]}
            radioStyle={radioStyle}
            {...config}
            {...minute}
          />
        </TabPane>
        <TabPane tab={this.translate('hour')} key="hour">
          <HourEditor
            translate={this.translate}
            onChange={this.hourChange}
            value={cron[1]}
            radioStyle={radioStyle}
            {...config}
            {...hour}
          />
        </TabPane>
        <TabPane tab={this.translate('day')} key="day">
          <DayEditor
            translate={this.translate}
            onChange={this.dayChange}
            value={cron[2]}
            radioStyle={radioStyle}
            {...config}
            {...day}
          />
        </TabPane>
        <TabPane tab={this.translate('month')} key="month">
          <MonthEditor
            translate={this.translate}
            onChange={this.monthChange}
            value={cron[3]}
            radioStyle={radioStyle}
            {...config}
            {...month}
          />
        </TabPane>
        <TabPane tab={this.translate('week')} key="week">
          <WeekEditor
            translate={this.translate}
            onChange={this.weekChange}
            value={cron[4]}
            radioStyle={radioStyle}
            {...config}
            {...week}
          />
        </TabPane>
      </Tabs>
    );
  }
}

export default CronEditor;
