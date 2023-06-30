import React from 'react';
import '../style/App.css';

export default function LoadRetrySpinner() {
    return (
        <div className="lrn-image-load-error-spinner-container">
            <div className="lrn_spinner">
                <div className="lrn_bounce1" />
                <div className="lrn_bounce2" />
                <div className="lrn_bounce3" />
            </div>
        </div>
    );
}

