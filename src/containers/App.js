import React, { Component } from 'react';
import './App.css';
import Menu from "../components/Menu";
import AnswersContainer from "./AnswersContainer";
import { connect } from 'react-redux'
import {pageActionFetch} from "../actions/gameActions";

class App extends Component
{
    componentDidMount()
    {
        this.props.dispatch(pageActionFetch(this.props.character, this.props.page, 0));
    }

    answerSelect(selected)
    {
        this.props.dispatch(pageActionFetch(this.props.character, this.props.page, selected));
    }

    render() {
        return (
          <div className='container-fluid' style={{height: 'inherit'}}>
              <div style={{height: 'inherit'}}>
                  <Menu style={{ marginBottom: '10px' }}>
                      <div style={{padding: '10px', textAlign: 'center'}}>
                          <h3 className="text-light">Персонаж</h3>
                          <hr className="bg-light" />
                          <div style={{padding: '15px'}}>
                              <h5>Умения</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {this.props.character.skills.map((skill, index) => (
                                  <li key={index}>{skill}</li>
                              ))}
                              </ul>
                          </div>
                          <div style={{padding: '15px'}}>
                              <h5>Инвентарь</h5>
                              <hr className="bg-light" />
                              <ul className='list-unstyled'>
                              {this.props.character.inventory.map((item, index) => (
                                  <li key={index}>{item}</li>
                              ))}
                              </ul>
                          </div>
                      </div>
                  </Menu>
                  <div className="row game-viewport">
                      <div className="col" dangerouslySetInnerHTML={{__html: this.props.body}}>
                      </div>
                  </div>
                  <hr className='separator-h' />
                  <div className='row'>
                      <div className='col'>
                          <AnswersContainer answers={this.props.answers} onSelect={this.answerSelect.bind(this)} />
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

export default connect((state) => {
    return {
        character: state.character,
        answers: state.answers,
        body: state.body,
        page: state.page,
    };
})(App);
