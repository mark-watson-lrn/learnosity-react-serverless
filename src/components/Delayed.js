import {useState, useEffect} from 'react';

export default function Delayed(props) {

    const [delayOff, setDelayOff] = useState(true);

    useEffect( () => {

        setTimeout(() => {
            setDelayOff(false);
        },
        props.waitBeforeShow ? props.waitBeforeShow : 500
        )}
    )

    return (
        delayOff ? '' : props.children
    );
}
