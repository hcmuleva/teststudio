import React from 'react';
import { useState, useEffect } from "react";
import {
    useGetLocale,
    useSetLocale,
    useGetIdentity,
    useTranslate,
    useList,
} from "@refinedev/core";
import { Link } from "react-router-dom";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import {
    Dropdown,
    Input,
    Avatar,
    Typography,
    Space,
    Grid,
    Row,
    Col,
    AutoComplete,
    Layout as AntdLayout,
    Button,
    theme,
    MenuProps,
} from "antd";

const { Header: AntdHeader } = AntdLayout;
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const Header = () => {
    const { token } = useToken();
    const { data: user } = useGetIdentity();
    const screens = useBreakpoint();
    // const {photo: { url }} = user
    const photoobj=user?.photo?.url||""
    
    const [myphoto,setMyphoto]= useState(photoobj?`http://localhost:1337${photoobj}`:"")

    
    return (
        <AntdHeader
        style={{
            backgroundColor: token.colorBgElevated,
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 1,
        }}
    >
          <Row
                align="middle"
                style={{
                    justifyContent: screens.sm ? "space-between" : "end",
                }}
            >
                 <Col xs={0} sm={12}>

                 </Col>

<Col>
                    <Space size="middle" align="center">
                        {/* <Button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            type="default"
                            icon={mode === "light" ? <IconMoon /> : <IconSun />}
                            onClick={() => {
                                setMode(mode === "light" ? "dark" : "light");
                            }}
                        /> */}
                        {/* <Dropdown
                            menu={{
                                items: menuItems,
                                selectedKeys: currentLocale
                                    ? [currentLocale]
                                    : [],
                            }}
                        >
                            <a
                                style={{ color: "inherit" }}
                                onClick={(e) => e.preventDefault()}
                            >
                                <Space>
                                    <Avatar
                                        size={16}
                                        src={`/images/flags/${currentLocale}.svg`}
                                    />
                                    <div
                                        style={{
                                            display: screens.lg
                                                ? "block"
                                                : "none",
                                        }}
                                    >
                                        {currentLocale === "en"
                                            ? "English"
                                            : "German"}
                                        <DownOutlined
                                            style={{
                                                fontSize: "12px",
                                                marginLeft: "6px",
                                            }}
                                        />
                                    </div>
                                </Space>
                            </a>
                        </Dropdown> */}

                        <Text
                            ellipsis
                            strong
                            style={{
                                display: "flex",
                            }} 
                        >
                            {user?.email}
                        </Text>
                        <Avatar
                            size="large"
                            src={myphoto}
                            alt={user?.email}
                        />
                    </Space>
                </Col>
            </Row>
       </AntdHeader>
    );
};

export default Header;