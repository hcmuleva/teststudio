import { useTable, useNavigation } from "@refinedev/core";
import { List,useSimpleList ,useDrawerForm } from "@refinedev/antd";

import { List as AntdList } from "antd";
import { FrameworkItem } from "./FrameworkItem";
import React from 'react';

export const FrameworkList= () => {
    const { tableQueryResult } = useTable({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });
    const { listProps } = useSimpleList({
        resource: "Frameworks",
        metaData: { populate: ["configs", 'frameworkfile', 'zipfile'] },
    });
    console.log("listProps",listProps)
    return (
        <div>
            <List>
                <AntdList
                    grid={{ gutter: 16, xs: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => {
                        return <AntdList.Item>
                           <FrameworkItem item={item}  />
                        </AntdList.Item>
                    }}
                />
            </List>
        </div>
    );
};