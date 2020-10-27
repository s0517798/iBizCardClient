import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt  } from '@fortawesome/free-solid-svg-icons'
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  
} from "react-share";
import './cards.css'

const ShareCardModal = () => {
  return ( 
    <div id='share-card-modal'>
      <FontAwesomeIcon data-toggle="modal" data-target=".bd-example-modal-sm" style={{cursor: 'pointer'}} size="lg" icon={faShareAlt}/>
      <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div>
              <EmailShareButton url={window.location.href}>
                <EmailIcon size={32} round/>
              </EmailShareButton>
            </div>
            <div>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={32} round/>
              </WhatsappShareButton>
            </div>
            <div>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round/>
              </FacebookShareButton>
            </div>
            <div>
              <TwitterShareButton url={window.location.href}>
                <TwitterIcon size={32} round/>
              </TwitterShareButton>
            </div>
            <div>
              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon size={32} round/>
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareCardModal;