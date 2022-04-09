import React from 'react';
import html2canvas from 'html2canvas';
import { withTranslation } from 'react-i18next';

import app from '../../../config/firebase';
import { getAnalytics, logEvent } from 'firebase/analytics';
const analytics = getAnalytics(app);

class RateOptions extends React.Component{
    constructor(props){
        super(props);
        this.saveImage = this.saveImage.bind(this);
    }
    render(){
        return <div id="generator-inner-rate-options" data-html2canvas-ignore>
            {!this.props.isEditingValorations &&
                <button className="save-image" onClick={this.saveImage}>{this.props.t('save.image')}</button>
            }
            <button className="edit-valorations" onClick={this.props.editValorations}>{this.props.isEditingValorations ? this.props.t('save.changes') : this.props.t('criteria.edit')}</button>
        </div>
    }
    async saveImage(){
        logEvent(analytics, 'save_image');
        let el = this.props.generatorRef.current;
        el.classList.add('loading');
        let canvas = await html2canvas(el, {
            onclone: function(document){
                document.querySelector('#generator-inner-rate-container').style.margin = 'auto';
                document.querySelector('#generator-inner-rate-container').style.padding = '12px 64px';
                document.querySelector('#generator-inner-rate-container').style.width = '448px';
                document.querySelector('#generator-inner-rate-container').style.background = '#181818';;
                document.querySelector('#generator-inner-rate-container').classList.remove('loading');
            },
            backgroundColor:'#181818',
            imageTimeout: 0,
            useCORS: true
        });
        el.classList.remove('loading');
        let data = canvas.toDataURL('image/jpg');
        let anchor = document.createElement('a');
        anchor.download = 'spotify_rater.jpg';
        anchor.href = data;
        document.body.appendChild(anchor);
        anchor.click()
        document.body.removeChild(anchor);
    }
}


export default withTranslation()(RateOptions);