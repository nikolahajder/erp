import React from "react";
import Collapse from "rc-collapse";
import "rc-collapse/assets/index.css";

const CollapseMenu = (props) => {
    const { className, data, handleFunction, active } = props;
    return (
        <div className="collapse-container">
            <Collapse
                accordion={null}
                className={className}
                defaultActiveKey="0"
            >
                {data &&
                    data.map((category, index) => {
                        return (
                            <Collapse.Panel
                                header={category.header}
                                className={category.className}
                                key={index}
                            >
                                <ul>
                                    {category.data.map((item, index) => {
                                        return (
                                            <li
                                                className={
                                                    item.type.type === active
                                                        ? "active"
                                                        : ""
                                                }
                                                key={index}
                                                onClick={() => {
                                                    handleFunction(item.label);
                                                }}
                                            >
                                                <span title={item.title}>
                                                    {item.title}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Collapse.Panel>
                        );
                    })}
            </Collapse>
        </div>
    );
};

export default CollapseMenu;
