import {Link} from "react-router-dom"

function Appbar() {
    return (
        <div className='shadow h-14 flex justify-between'>
            <div className="flex flex-col font-sans font-semibold justify-center h-full ml-4">
                <Link to="/dashboard">
                PaytmApp    
                </Link>
                
            </div>
            <div className="flex">
                <div className="flex flex-col font-sans justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center mt-1 mr-2">
                    <div className="text-xl">
                        U
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Appbar