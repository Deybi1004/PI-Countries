import React  from "react";
import './Page.css';

function Page({countriesPerPage, allCountries, page}) {
    const pageNum = Array.from({length: Math.ceil(allCountries/countriesPerPage)}, (_, i) => i + 1);

    //console.log(pageNum)
    //const [currentPage, setCurrentPage] = useState(1);

    return (
        <nav className="container-page">
            <ul className="paginated-ul">
                {
                pageNum?.map(n => (
                    <li key={n} className="paginated-li">
                        <button className="botton-li" onClick={() => page(n)}>{n}</button>
                    </li>
                ))
                }
            </ul>
        </nav>
    ) 
}

export default Page;