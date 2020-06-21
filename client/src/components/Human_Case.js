import React, { Component } from 'react';
import data from '../ConstantDB/Human_case.json';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import Search from './Search';
import editImage from '../images/edit.png';
const filtereddata = data.humanCaseSchema.filter((temp) => {
  return temp.healthCenter.email === 'suraksha@yahoo.com';
});
var k = 0;

class Example2 extends Component {
  state = {
    modal: false,
    name: '',
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newIt = {
      name: this.state.name,
    };

    // Add Item via AddItem
    this.props.addItems(newIt);
    //close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <table class='table table-striped table-active'>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Id</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filtereddata.map((experience, i) => {
              k = k + 1;
              return (
                <tr>
                  <th scope='row'>{k}</th>
                  <td>{experience.patientName}</td>
                  <td>{experience.id}</td>
                  <td>{experience.status}</td>
                  <td>
                    <img
                      width='10%'
                      height='50%'
                      src={editImage}
                      role='button'
                      color='dark'
                      style={{ marginBottom: '2rem' }}
                      onClick={this.toggle}
                    />
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>
                        Update the status of the patient
                      </ModalHeader>
                      <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                          <FormGroup>
                            <div onChange={this.onChangeValue}>
                              <div>
                                <input
                                  type='radio'
                                  value='Male'
                                  name='gender'
                                />{' '}
                                Infected
                              </div>
                              <div>
                                <input
                                  type='radio'
                                  value='Male'
                                  name='gender'
                                />{' '}
                                Deceased
                              </div>
                              <div>
                                <input
                                  type='radio'
                                  value='Male'
                                  name='gender'
                                />{' '}
                                Recovered
                              </div>

                              <div>
                                <input
                                  type='radio'
                                  value='Male'
                                  name='gender'
                                />{' '}
                                Delete
                              </div>
                            </div>

                            <Button
                              color='dark'
                              style={{ marginTop: '2rem' }}
                              block
                            >
                              {' '}
                              Update
                            </Button>
                          </FormGroup>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Example2;
