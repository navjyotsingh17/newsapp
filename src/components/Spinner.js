import React  from 'react'
import loading from './loading.gif'

 const Spinner=()=> {
        return (
            <div className="text-center">
                {/* showing the loading gif in this spinner component */}
                <img className="my-3" src={loading} alt="loading" />
            </div>
        )
}

export default Spinner
