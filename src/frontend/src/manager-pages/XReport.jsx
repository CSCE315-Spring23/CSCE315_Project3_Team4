import React, { Component } from 'react';
import './style.css';
import NavBar from '../components/managerNavBar';

class XReport extends Component {
    state = {}
    render() {
        return (<body class="body">
            <NavBar />
            <div class="section-employee-name wf-section">
                <div class="employee-text">
                    <strong class="bold-text">Employee: <br></br></strong>
                </div>
            </div>
            <div class="section-pos-body wf-section">
                <div class="pos-border"></div>
            </div>
            <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=642d93cc43ed639de72c5d51" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
            <script src="https://uploads-ssl.webflow.com/642d93cc43ed639de72c5d51/js/webflow.7809510fd.js" type="text/javascript"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script>
        </body>);
    }
}

export default XReport;