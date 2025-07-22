import { Spinner } from "react-bootstrap"


function PreLoad() {
      
  return (
    <div className="d-flex justify-content-center align-items-center">
      Loading...
     <Spinner className="mx-2" animation="border" size="sm" /> 
    </div>
  )
}

export default PreLoad
