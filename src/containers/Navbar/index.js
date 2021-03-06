import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Modal, ModalBody, ModalFooter, Button } from '@bootstrap-styled/v4';

import Cart from '../../components/Cart';
import {WebCol, MobileCol} from "../../commonStyles";

const StyledContainer = styled.div`
    background: #1EA4CE;
    height: 76px;
    display: block;
    z-index: 12;
    margin-bottom: 40px;

    @media(max-width: 1199px) {
        margin-bottom: 10px;
    }
`;

const Total = styled.div`
    background: #147594;
    color: #fff;
    padding: 30px;
    min-width: 120px;
    width: auto;
    height: 76px;
    float: right;
    text-align: center;

    @media(max-width: 1199px) {
        padding: 30px 0;
    }
`;

const RowWithMargin = styled(Row)`
    margin: 0 120px !important;

    @media(max-width: 1199px) {
        margin: 0 !important;
    }
`;

const Market = styled.div`
    text-align: center;
    line-height: 76px;
    font-size: 50px;
    color: #fff;

    @media(max-width: 1199px) {
        text-align: center;
        line-height: 75px;
        font-size: 50px;
        color: #fff;
        width: 50%;
        display: inline-block;
    }
`;

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleClose = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        return (
            <StyledContainer>
                <RowWithMargin>
                    <WebCol md="3"></WebCol>
                    <WebCol md="5">
                        <Market>Market</Market>
                    </WebCol>
                    <WebCol md="4">
                        <Total>{this.props.total ? `₺ ${Math.round(this.props.total * 100)/100}` : "₺ 0,00"}</Total>
                    </WebCol>
                    <MobileCol sm="12" style={{padding: 0}}>
                        <Market>Market</Market>
                        <Total onClick={() => this.handleClose()}>{this.props.total ? `₺ ${Math.round(this.props.total * 100)/100}` : "₺ 0,00"}</Total>
                        <Modal isOpen={this.state.isOpen} toggle={() => this.handleClose()}>
                            <ModalBody>
                                <Cart />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="info" size="lg" block onClick={() => this.handleClose()}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </MobileCol>
                </RowWithMargin>
            </StyledContainer>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        total: state.total
    }
}
export default connect(mapStateToProps)(Navbar);
