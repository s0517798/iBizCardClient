import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt  } from '@fortawesome/free-solid-svg-icons'
import './cards.scss'

const ShareCardModal = () => {
  return ( 
    <div id='share-card-modal'>
      <FontAwesomeIcon data-toggle="modal" data-target=".bd-example-modal-sm" style={{cursor: 'pointer'}} size="lg" icon={faShareAlt}/>
      <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div>email</div>
            <div>linkedin</div>
            <div>facebook</div>
            <div>twiter</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareCardModal;