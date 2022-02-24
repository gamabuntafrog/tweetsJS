import {BrowserRouter as Router, NavLink} from "react-router-dom";


const Navigation = () => {



    return <header>
        <nav>
            <ul className={'nav-ul'}>
                <li className={'nav-li'}>
                    <NavLink to={'/Tweets'}>Tweets</NavLink>
                </li>
                <li className={'nav-li'}>
                    <NavLink to={'/Sentiment'}>Sentiment</NavLink>
                </li>
                <li className={'nav-li'}>
                    <NavLink to={'/Reasons'}>Reasons</NavLink>
                </li>
            </ul>
        </nav>
    </header>
}

export default Navigation;