import React from "react";
import { Checkbox, Popover, Button, Row, Col } from "antd";
import { FilterOutlined } from "@ant-design/icons"; // Import icon thay thế

// Định nghĩa kiểu cho props của CheckboxMenu
interface CheckboxMenuProps {
    label: string,
    value?: any[]; // Giá trị mặc định cho selectedItems
    options: any[]; // Danh sách các tùy chọn checkbox
    onChange: (selection: string[]) => void; // Hàm onChange để xử lý sự thay đổi
}

// Định nghĩa kiểu cho state của CheckboxMenu
interface CheckboxMenuState {
    label: string;
  icon: { theme?: string };
  selectedItems: string[];
}

class CheckboxMenu extends React.Component<CheckboxMenuProps, CheckboxMenuState> {
  state: CheckboxMenuState = {
    icon: {},
    selectedItems: this.props.value ? [...this.props.value] : []
  };

  componentDidMount = () => {
    if (this.props.value && this.props.value.length) {
      this.setState(
        {
          selectedItems: [...this.props.value]
        },
        () => this.checkIconFilled()
      );
    }
  };

  onChange = (selection: any) => {
    this.setState({ selectedItems: [...selection] }, () => {
      this.checkIconFilled();
    });

    return this.props.onChange(selection);
  };

  checkIconFilled = () => {
    this.setState({ icon: this.state.selectedItems.length ? { theme: "filled" } : {} });
  };

  checkboxRender = () => {
    const groups = this.props.options
      .map((_, i) => (i % 10 === 0 ? this.props.options.slice(i, i + 10) : null))
      .filter((e) => e);

    return (
      <Checkbox.Group onChange={this.onChange} value={this.state.selectedItems}>
        <Row>
          {groups.map((group, i) => (
            <Col key={"checkbox-group-" + i} span={Math.floor(24 / groups.length)}>
              {group.map((label) => (
                <Checkbox key={label} value={label} style={{ display: "flex", margin: "0" }}>
                  {label}
                </Checkbox>
              ))}
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    );
  };

  render() {
    const { label } = this.props;
    return (
      <Popover content={this.checkboxRender()} trigger="click" placement="bottomLeft">
        <Button>
          {label}
        </Button>
      </Popover>
    );
  }
}

export default CheckboxMenu;    
