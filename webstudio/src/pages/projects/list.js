import { useTable, useNavigation } from "@refinedev/core";
import { List,useSimpleList ,useDrawerForm } from "@refinedev/antd";

import { List as AntdList } from "antd";
import { ProjectItem } from "./ProjectItem";


export const ProjectList= () => {
    const { tableQueryResult } = useTable({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });
    const { edit, create,show } = useNavigation();
    const { listProps } = useSimpleList({
        resource: "projects",
        metaData: { populate: ["configs"] },
    });
    const {
        drawerProps: createDrawerProps,
        formProps: createFormProps,
        saveButtonProps: createSaveButtonProps,
        show: createShow,
    } = useDrawerForm({
        action: "create",
        resource: "projects",
        redirect: true,
    });
    return (
        <div>
                    <List
           
           >
               <AntdList
                   grid={{ gutter: 16, xs: 1 }}
                   style={{
                       justifyContent: "center",
                   }}
                   {...listProps}
                   renderItem={(item) => {
                     
                       return <AntdList.Item>
                           <ProjectItem item={item}  />
                       </AntdList.Item>
                   }}
               />
           </List>
   
            {/* <button onClick={() => create("projects")}>Create Project</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>
                                <button onClick={() => edit("projects", project.id)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => show("projects", project.id)}>
                                    Show
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
           
        </div>
    );
};