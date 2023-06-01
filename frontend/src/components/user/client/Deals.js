import React, { Component } from "react";
import {
    Nav,
    NavItem,
    TabContent,
    TabPane,
    Row,
    Col,
    NavLink,
} from 'reactstrap';
import Layout from "../../Layout";

class Deals extends Component {
    state = {
        activatedTab: '1'
    }
    setActive = (tab) => {
        this.setState({
            activatedTab: tab
        })
    }
    tabs = () => {
        return (
            <div >
                <Nav tabs style={{ cursor: 'pointer', paddingLeft: '10%' }}>
                    <NavItem>
                        <NavLink
                            className={this.state.activatedTab === '1' ? 'active' : ''}
                            onClick={() => this.setActive('1')}
                        >
                            Ongoing Jobs
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activatedTab === '2' ? 'active' : ''}
                            onClick={() => this.setActive('2')}
                        >
                            Past Job Deals
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activatedTab}>
                    <TabPane tabId="1">
                        <Row style={{ paddingTop: "1%" }}>
                            <Col sm="1"></Col>
                            <Col sm="11">
                                <h4>
                                    Tab 1 Contents
                                </h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row style={{ paddingTop: "1%" }}>
                            <Col sm="1"></Col>
                            <Col sm="11">
                                <h4>Hi,</h4>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div >
        )
    }
    render() {
        return (
            <Layout title="Deals" className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        {this.tabs()}
                    </div>
                </div>
            </Layout>
        )
    }

}

export default Deals;