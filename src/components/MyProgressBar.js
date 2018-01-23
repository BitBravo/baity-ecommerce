import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import { Modal, ProgressBar } from 'react-bootstrap'

const MyProgressBar = ({progressBars, title}) => 
  <Modal
          show={!(Object.keys(progressBars).length === 0 && progressBars.constructor === Object)}
          style={{top: 300}}
        >
        <Modal.Header >
            <Modal.Title id="contained-modal-title2">  {title} </Modal.Title>
            {
              _.map(progressBars, (progressBar, name) => 
              <div key={name}>
                <p>{name}</p>
                <ProgressBar  now={progressBar.percentage} label={`${progressBar.percentage}%`} />
              </div>
              )
            }
        </Modal.Header>        
  </Modal>

export default MyProgressBar;