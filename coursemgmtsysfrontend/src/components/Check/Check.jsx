import { useState } from "react"
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";

const Check = () => {
    const [file,setFile] = useState(null);
    const [downloadUrlString,setDownloadUrlString] = useState([]);
    
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();
    
    // Create a storage reference from our storage service
    const storageRef = ref(storage,`files/${file.name}`);
    
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (!file) return;
        const uploadTask = uploadBytes(storageRef,file);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadUrlString([...downloadUrlString , downloadURL]);
        });
    }
    return (
        <>
            <div>
                <h2>Course Material Add</h2>
                <form onSubmit={handleFileSubmit}>
                    <label htmlFor="courseMaterialTitle">Select file To Upload</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                    <input type="submit" value="Upload File" />
                </form>
                <div>
                    <h2>{downloadUrlString}</h2>
                </div>
            </div>
        </>
    )
}
export default Check


/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import {Dropdown, Loader, Nav, Sidenav} from "rsuite";
import { faCoffee } from '@fortawesome/free-solid-svg-icons' */
/* div style={{ width: 240 }}>
            <Sidenav>
            <Sidenav.Header>
            <div style={headerStyles}>Custom Sidenav</div>
            </Sidenav.Header>
            <Sidenav.Body>
            <Nav>
            <Nav.Item eventKey="1" active icon={<FontAwesomeIcon icon={faCoffee} />}>
                    Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<FontAwesomeIcon icon={faCoffee} />}>
                    User Group
                </Nav.Item>
                <Dropdown eventKey="3" title="Advanced" icon={<FontAwesomeIcon icon={faCoffee} />}>
                    <Dropdown.Item divider />
                    <Dropdown.Item panel style={panelStyles}>
                    Reports
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                    <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                    <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                    <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                    <Dropdown.Item divider />
                    <Dropdown.Item panel style={panelStyles}>
                    Settings
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                    <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                    <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                    <Dropdown.Menu eventKey="4-5" title="Custom Action">
                    <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                    <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Nav>
            </Sidenav.Body>
            </Sidenav> */

/* const [loading,setLoading] = useState(true);
const instance = <Loader size="lg" className="bg-indigo-500 text-red-600 h-52 w-52" />;
    if(loading){
        return <div>{instance}</div>
    } */
/* const panelStyles = {
    padding: '15px 20px',
    color: '#aaa',
};

const headerStyles = {
    padding: 20,
    fontSize: 16,
    background: '#34c3ff',
    color: ' #fff',
};  */   