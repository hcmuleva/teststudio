import { DeleteButton, EditButton } from '@refinedev/antd';
import { Button, Card } from 'antd';
import React, { useState,useRef } from 'react';
import { DownloadOutlined } from '@ant-design/icons';

const FrameworkItem = ({ item}) => {
  console.log("item",item)
   
  console.log("item.zipfile.url",item.zipfile.url)
  const handleDownloadZip = () => {
    // Create a link element
    const downloadurl= process.env.REACT_APP_DOWNLOAD_URL?process.env.REACT_APP_DOWNLOAD_URL+item.zipfile.url:item.zipfile.url
    const link = document.createElement('a');
    link.href = downloadurl
    link.download = item.zipfile.name; // Set the download attribute with the zipfile name
    document.body.appendChild(link);
    
    // Trigger the click event to start the download
    link.click();

    // Remove the link element from the document
    document.body.removeChild(link);
  };
    return (
        <>   
        <Card
                style={{ width: 400 }}
                title={`Config Name : ${item.name}`}
                actions={[
                    <EditButton key="edit" recordItemId={item.id} />,
                    <DeleteButton key="delete" recordItemId={item.id}  />,
                    <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={handleDownloadZip}
          >
            Download
          </Button>,
                    // <Button type="primary" icon={<PlayCircleOutlined />} loading={loading} onClick={()=>{  setOpen(true)  }}>Run</Button>
                ]}
            >
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          </div>
          </div></Card>
      </>
    );
  };
  
export  {FrameworkItem};