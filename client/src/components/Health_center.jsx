import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import Loading from './loading/loading.jsx';
import GetAllDiseases from '../api/diseases/getAllDiseases';

var sectionStyle = {
  backgroundColor: '#E1CDD6',
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

class Health_center extends Component {
  state = {
    diseases: [],
    user: {},
    barChart: [],
    overAllError: '',
    loading: false,
  };

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({ user: user });

    try {
      this.setState({ loading: true });
      GetAllDiseases()
        .then((response) => {
          this.setState({ diseases: response.data, overAllError: '' });
          this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ overAllError: "Can't able to fetch!" });
          this.setState({ loading: false });
        });
    } catch (err) {
      this.setState({ overAllError: 'Server Error!' });
    }
  }

  render() {
    return (
      <div className='container-fluid p-0' style={sectionStyle}>
        {this.state.loading ? (
          <div
            style={{
              height: '80vh',
            }}
            className='d-flex align-items-center justify-content-center'
          >
            <Loading />
          </div>
        ) : (
          <div className='p-3'>
            {this.state.overAllError !== '' ? (
              <div
                className='p-3 text-center'
                style={{
                  color: '#ec547a',
                  fontWeight: '500',
                }}
              >
                {this.state.overAllError}
              </div>
            ) : null}
            <div className='row'>
              <div
                style={{
                  width: '50%',
                  height: '50%',
                  justifyContent: 'center',
                  paddingLeft: '5%',
                }}
              >
                <Bar
                  data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                      {
                        label: 'People',
                        borderWidth: 2,
                        backgroundColor: [
                          'rgba(0, 0, 255, 0.5)',
                          'rgba(0, 255, 0, 0.5)',
                          'rgba(255, 0, 0, 0.5)',
                        ],
                        hoverBackgroundColor: ['blue', 'green', 'red'],
                        position: 'center',
                        data: [
                          this.state.user.total_affected,
                          this.state.user.total_recovered,
                          this.state.user.total_deaths,
                        ],
                      },
                    ],
                  }}
                  options={{
                    title: {
                      display: true,
                      position: 'top',
                      text: `HEALTH CENTER : ${this.state.user.name} status`,
                      fontSize: '20',
                      fontColor: 'black',
                    },
                    legend: {
                      display: false,
                      position: 'right',
                    },
                  }}
                />
              </div>

              <div
                className='btn-group mr-7'
                role='group'
                aria-label='First group'
                style={{ paddingLeft: '8%', paddingTop: '5%', height: '2%' }}
              >
                <a className='btn btn-large btn-dark' href='/new_humancase'>
                  NEW HUMAN CASE
                </a>
                <a className='btn btn-large btn-dark' href='/new_animalcase'>
                  NEW ANIMAL CASE
                </a>
                <a className='btn btn-large btn-dark' href='/human_case'>
                  HUMAN CASES
                </a>
                <a className='btn btn-large btn-dark' href='/animal_case'>
                  ANIMAL CASES
                </a>
              </div>
            </div>
            <div className='row'>
              {' '}
              {this.state.diseases.map((dise) => {
                return (
                  <div
                    style={{ width: '25%', height: '25%', paddingTop: '3%' }}
                    key={dise._id}
                  >
                    <Doughnut
                      data={{
                        labels: ['Infected', 'Recoverd', 'Deaths'],
                        datasets: [
                          {
                            label: 'Rainfall',
                            backgroundColor: [
                              'rgba(0, 0, 255, 0.7)',
                              'rgba(0, 255, 0, 0.7)',
                              'rgba(255, 0, 0, 0.7)',
                            ],
                            hoverBackgroundColor: ['blue', 'green', 'red'],
                            data: [
                              dise.total_affected,
                              dise.total_recovered,
                              dise.total_deaths,
                            ],
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: true,
                          text: dise.name,
                          fontColor: 'black',
                          fontSize: 15,
                          position: 'top',
                        },
                        legend: {
                          display: true,
                          fontColor: 'black',
                          fontSize: '2',
                          position: 'right',
                        },
                        labels: {
                          fontColor: 'black',
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Health_center;
