import React, {Component} from 'react';
 import PropTypes from 'prop-types';

 export class Table extends Component {
     render() {
         let {children, className = '', ...rest} = this.props;
         className += ' table table-hover text-nowrap';

         return (
             <div className={'table-responsive'}>
                 <table {...rest} className={className}>
                     {children}
                 </table>
             </div>
         );
     }
 }

 Table.propTypes = {
     className: PropTypes.string,
     children: PropTypes.any
 };