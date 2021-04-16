import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

export const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation();

    const onClick = (e) => {
        console.log(e);
    }

    return (
        <header className='header'>
            {/* <h1 style={{color: 'red', backgroundColor: 'black'}}>Task Tracker {title}</h1> */}
            {/* <h1 style={headingStyle}>Task Tracker {title}</h1> */}
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={showAdd ? 'orange' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headingStyle = {
    color: 'green', 
    backgroundColor: 'black'
}