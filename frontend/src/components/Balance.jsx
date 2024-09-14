

// eslint-disable-next-line react/prop-types
function Balance({ value }) {
    return (
        <div className="flex ">
            <div className="flex flex-col justify-center text-xl font-semibold ml-4">
                Your Balance :
            </div>
            <div className="flex flex-col justify-center text-xl ml-2 font-semibold">
               Rs {value}
            </div>
        </div>

    )
}

export default Balance