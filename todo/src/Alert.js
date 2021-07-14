import React,{useEffect} from 'react'

function Alert({alert,removeAlert,todos}) {
        useEffect(() => {
          const timeout = setTimeout(() => {
            removeAlert();
          }, 3000);
          return () => clearTimeout(timeout);
        }, []);
    return (
        <div style={{width:'100%'}}>
            <p className={`${alert.type} alert`}>{alert.message}</p>
        </div>
    )
}

export default Alert
