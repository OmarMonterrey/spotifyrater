import React from 'react';
import { withTranslation } from 'react-i18next';
class Footer extends React.Component{
    render(){
        return ( <footer>
            <div id="footer-inner">
                <p>This web APP was made with presentation purposes for <a href="https://omarmonterrey.com/" target="_blank" rel="noreferrer">Omar Monterrey</a> portfolio.</p>
                <p>I am not related to Spotify AB or any of it´s partners in any way.</p>
            </div>
        </footer> );
    }
}
export default withTranslation()(Footer);