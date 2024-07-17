import { Link } from "react-router-dom";

export const PageNotFound=()=>{
    return(
        <div className="container">
                <div className="column1">
                    <h1>
                        404: Page Not Found
                    </h1>
                    <p>
                        The requested URL doesn't exist on our servers.
                    </p>
                    <Link to="/">
                        <button type="button" className="btn">
                            Click here to go back to the main page
                        </button>
                    </Link>
                </div>
                <div className="column2">
                    <img src="https://i.ytimg.com/vi/Z_Wpkd-wrxQ/hqdefault.jpg"></img>
                </div>          
        </div>
    )

}