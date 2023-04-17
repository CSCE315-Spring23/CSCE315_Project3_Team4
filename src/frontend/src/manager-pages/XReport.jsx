import React, { Component } from 'react';
import './style.css';
import logo from "../components/revsLogo.png"

class XReport extends Component {
    state = {  } 
    render() { 
        return (<body class="body">
                    <div id="Navigation-Bar" class="section-navbar wf-section">
                        <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
                            <div class="container-navbar w-container">
                                <img src={logo} loading="lazy" width="240" height="200" alt="" class="store-image"></img>
                                <a href="Sales" class="sales w-button">Sales</a>
                                <a href="XReport" class="entrees w-button">X Report</a>
                                <a href="ZReport" class="drinks w-button">Z Report</a>
                                <a href="Excess" class="sweets w-button">Excess</a>
                                <a href="Restock" class="sides w-button">Restock</a>
                                <a href="Inventory" class="currentorder w-button">Inventory</a>
                                <a href="#" class="currentorder w-button">Menu</a>
                                <a href="../server-pages/Combos" class="currentorder w-button">POS</a>
                                <a href="#" class="logout w-button">Logout</a>
                            </div>
                            <div class="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
                        </div>
                    </div>
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