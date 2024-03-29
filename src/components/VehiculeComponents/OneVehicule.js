import { Button ,Modal } from 'react-bootstrap';
import { useState } from 'react';
import EditVehicule from "./EditVehicule"
import { TableCell ,TableRow } from '@material-ui/core';
const OneVehicule = ({theVehicule,aide,id}) => {


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    const SupprimerVehicule =(e)=>{
        e.preventDefault()
        if(theVehicule.lot.nombre_vehicules==1)
        {
            const confirmBox = window.confirm("Si vous supprimez ce vehicule \n le lot devient vide \n cela implique la supprission de lot "+ theVehicule.lot.num_lot)
            if(confirmBox==false)
            {
               setShow2(false)
               return;
            }
            else
            {
                fetch("http://localhost:9090/Usine/deletevehicule/"+theVehicule.num_Chassis,{
                    method:"DELETE",
                    headers:{"Content-Type":"application/json"}
                    }).then(()=>{
                        console.log(" vehicule deleted")
                        window.location.assign('/AllLot?m='+id);
                    })
            }
        }
        else{
            fetch("http://localhost:9090/Usine/deletevehicule/"+theVehicule.num_Chassis,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"}
                }).then(()=>{
                    console.log(" vehicule deleted")
                    window.location.assign('http://localhost:3000/VehiculesofLot?lot='+theVehicule.lot.num_lot+'&m='+id);
                })
        
        }
       

    }
    return (
        <>
        <TableRow >
            
        </TableRow>
        <TableCell>{theVehicule.ordre}</TableCell>
        <TableCell>{theVehicule.num_Chassis}</TableCell>
        <TableCell>{theVehicule.numengine}</TableCell>
        <TableCell>{theVehicule.couleur}</TableCell>
        <TableCell>{theVehicule.modele.designation}</TableCell>
        <TableCell>{theVehicule.modele.marque.designation}</TableCell>
        
        <TableCell>
        <div >
                    
                   <Button variant="outline-primary"  data-toggle="modal"onClick={handleShow}>
                       <i class="bi bi-pen"></i>
                    </Button>&nbsp;
        {aide ? (<Button  variant="outline-danger" data-toggle="modal" onClick={handleShow2}>
                        <i class="bi bi-trash3-fill"></i>
                    </Button>)
                    :(<></>)}
                    
                 
        </div>
       
        </TableCell>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ background: 'rgb(224 224 224 / 57%)' }} >
                    <Modal.Title>
                        Modifier Vehicule
                    </Modal.Title>
               </Modal.Header>
                <Modal.Body>
                  <EditVehicule theVehicule={theVehicule} ></EditVehicule>        
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            fermer 
                        </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Body class="alert alert-danger" role="alert">
                   Vous voulez vraimenet supprimee ce vehicule de Num {theVehicule.num_Chassis}
                   <br></br>
                   <Button variant="danger" onClick={SupprimerVehicule}>    oui   </Button>
                   &nbsp;
                   <Button variant="secondary" onClick={handleClose2} >  Non  </Button>
                </Modal.Body>
            </Modal>
    </>
    )
}

export default OneVehicule;