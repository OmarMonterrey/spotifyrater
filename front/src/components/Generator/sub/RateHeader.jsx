import React from 'react';
import Single from './Single';
import { withTranslation } from 'react-i18next';
class RateHeader extends React.Component{
    render(){
        let item = this.props.item;
        return <div id="generator-inner-rate">
            <button className="back" onClick={this.props.back} data-html2canvas-ignore>{this.props.t('back')}</button>
            <Single {...item} />
        </div>
    }
}
export default withTranslation()(RateHeader);