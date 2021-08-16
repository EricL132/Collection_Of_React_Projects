import React from 'react'
import './Project1.css'
import keyPic from '../../images/electronPics/keyImage.png'
import taskPage from '../../images/electronPics/taskPage.png'
import profilePage from '../../images/electronPics/profilePage.png'
import proxiesPage from '../../images/electronPics/proxiesPage.png'
class Project1 extends React.Component {
    render() {
        return (
            <div className="project1-Container">
                <div className="projects-con">
                <div className="project1-Picture">
                    <img src={keyPic} alt="first" className="project-Image" style={{minHeight:"10rem",imageRendering: '-webkit-optimize-contrast', borderRadius: "5px",justifySelf:"center"}}></img>
                    <div className="overlay" >
                        <div className="overlay-Text" style={{ top: "20%" }}>
                            Authentication page of app
         
                                <ul>
                                    <li>Uses Express with MongoDB for Authentication</li>
                                    <li>Express sends request to website to check MongoDB for key</li>
                                    <li>If key is binded returns key binded (Checks hwid of device) (will need to reset)</li>
                                    <li>If key is invalid returns key invalid</li>
                                    <li>Else Logs into app</li>
                                </ul>

                        </div>
                    </div>

                </div>

                <div className="project1-Picture" >
                    <img src={taskPage} className="project-Image"alt="second" style={{ imageRendering: '-webkit-optimize-contrast', borderRadius: "5px" }}></img>
                    <div className="overlay" >
                        <div className="overlay-Text" style={{ top: "10%" }}>
                            Tasks page of app
           
                                <ul>
                                    <li>Create button opens the create task menu</li>
                                    <li>Fill in info to create task (will give error if required info is incorrect or unfilled)</li>
                                    <li>Saves the tasks to json file in applications installed folder</li>
                                    <li>Start button starts the selected tasks (supports single and multiple)</li>
                                    <li>Adds pid of task to an array so we know what tasks are ongoing</li>
                                    <li>Updates the status depending on returned status message (communicates through ipcMain)</li>
                                    <li>Stop button searches array for selected tasks to stop and stops the task</li>
                                    <li>Edit Task button opens the create task menu fills it with the task details for editting</li>
                                    <li>Delete button will delete the selected tasks</li>
                                </ul>
            
                        </div>
                    </div>
                </div>


                <div className="project1-Picture">
                    <img src={profilePage} className="project-Image"alt="third" style={{ imageRendering: '-webkit-optimize-contrast', borderRadius: "5px" }}></img>
                    <div className="overlay" >
                        <div className="overlay-Text" style={{ top: "10%" }}>
                            Profiles page of app
                
                                <ul>
                                    <li>This page is used to create profiles to be used with tasks</li>
                                    <li>Add profiles button opens the create profiles menu</li>
                                    <li>All required info needs to be filled in or will give an error</li>
                                    <li>Different billing button (checkbox) will show the different billing menu</li>
                                    <li>Profiles are saved to a profiles.json file which is saved to where the app is installed</li>
                                    <li>Edit profiles button grabs the info of selected profile and fills in all fields to edit</li>
                                    <li>If new profile name is changed will add a new profile as well as edit</li>
                                    <li>Delete button deletes the selected profile</li>
                                </ul>
                       
                        </div>
                    </div>
                </div>
                <div className="project1-Picture">
                    <img src={proxiesPage} className="project-Image" alt="fourth"style={{ imageRendering: '-webkit-optimize-contrast', borderRadius: "5px" }}></img>
                    <div className="overlay"style={{}} >
                        <div className="overlay-Text" style={{ top: "10%" }}>
                            Proxies page of app
              
                                <ul>
                                    <li>Proxies page deals with adding/deleting/testing proxies</li>
                                    <li>Proxies are placed into groups (Default group is alway empty, will run on local)</li>
                                    <li>Everything is saved to proxies.json file which is saved to where the app is installed</li>
                                    <li>+ button opens the add group menu to add a new group</li>
                                    <li>Add proxies button opens the add proxies menu which allows input of proxies to be added to the current group</li>
                                    <li>Format = ip:port:username:password (if username and password is not entered will only save ip and port (ip authentication)</li>
                                    <li>Delete proxies button will delete all selected proxies</li>
                                    <li>Remove all button will remove all proxies in the current group</li>
                                    <li>Delete group button will delete the current group and return to default</li>
                                </ul>
                     
                        </div>
                    </div>
                </div>




                </div>
            </div>
        )
    }
}

export default Project1;