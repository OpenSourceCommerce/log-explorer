import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Modal, Button, Colors, Size} from '.';
import {LogViewActions} from '../actions';
import GridLayout, {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export class LogViewTableSettingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTable: null,
            tableColumnList: [],
            mounted: false
        };

        this.onShow = this.onShow.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onHidden = this.onHidden.bind(this);
    }

    componentDidMount() {
        this.setState({mounted: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevShow = prevProps.show;
        const {show} = this.props;

        if (show && show !== prevShow) {
            this.onShow();
        }
    }

    onShow() {
        const {selectedTable} = this.props;
        const that = this;
        that.setState({tableColumnList: []});

        return LogViewActions.getColumnSetting(selectedTable.uuid).then(response => {
            const {data, error} = response;

            if (error) {
                return;
            }

            that.setState({tableColumnList: data});
        });
    }

    onChange(name, visible, index, update = false) {
        if (!name) {
            return;
        }

        const that = this;
        const {onSave, selectedTable} = this.props;

        LogViewActions.updateColumnSetting(selectedTable.uuid, name, visible, index).then(response => {
            const {data, error} = response;

            if (error) {
                return;
            }

            if (update) {
                that.onShow().then(() => {
                    if (typeof onSave === 'function') {
                        onSave(data);
                    }
                });
            }
        });
    }

    onHidden(){
        const {onHidden} = this.props;

        this.setState({tableColumnList: []})

        if(typeof onHidden === 'function'){
            onHidden();
        }
    }

    render() {
        const layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 1},
            {i: 'b', x: 1, y: 0, w: 1, h: 1},
        ];
        const {show, onHidden, onSave, showSaveButton = true} = this.props;
        const {tableColumnList, mounted} = this.state;

        return (
            <Modal title={'Table Setting'}
                   id={'table-setting'}
                   size={Size.medium}
                   saveButtonTitle={'Save'}
                   show={show}
                   saveButtonAction={onSave}
                   showSaveButton={false}
                   onHidden={onHidden}>
                <div className={'row'}>
                    {tableColumnList && tableColumnList.length > 0 &&
                    <GridLayout className="col-12" layout={layout}
                                onDragStop={(layout) => {
                                    layout.map((item, index) => {
                                        if (item.y > 0) {
                                            this.onChange(item.i, item.x !== 1, item.y, index === (layout.length - 1))
                                        }
                                    })
                                }}
                                useCSSTransforms={true}
                                width={300}
                                cols={2} rowHeight={38}>
                        <div key='viewable' className="viewable text-center"
                        data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>
                            Viewable Columns
                        </div>
                        <div key='available' className="available text-center"
                        data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>
                            Available Columns
                        </div>
                        {tableColumnList.map((item, row) => {
                            const x = item.visible ? 0 : 1;
                            let y = parseInt(item.index) + 1
                            return <div key={item.name}
                                        className="btn btn-default"
                                        data-grid={{
                                            x: x,
                                            y: y,
                                            w: 1,
                                            h: 1,
                                            isResizable: false
                                        }}>
                                {item.title}
                            </div>;
                        })}
                    </GridLayout>}
                </div>
            </Modal>
        );
    }
}

LogViewTableSettingModal.propTypes = {
    show: PropTypes.bool,
    selectedTable: PropTypes.object,
    onHidden: PropTypes.func,
    onSave: PropTypes.func,
    showSaveButton: PropTypes.bool
};
