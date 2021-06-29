import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Modal, Button, Colors, Size} from '.';
import {LogViewActions} from '../actions';
import GridLayout from 'react-grid-layout';

export class LogViewTableSettingModal extends Component {
    constructor(props) {
        super(props);

        const layout = this.generateLayout()

        this.state = {
            selectedTable: null,
            tableColumnList: [],
            layout,
            width: 300,
            height: 38,
        };

        this.onShow = this.onShow.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onHidden = this.onHidden.bind(this);
        this.generateLayout = this.generateLayout.bind(this);
        this.generateWidth = this.generateWidth.bind(this);
        this.generateHeight = this.generateHeight.bind(this);
    }

    componentDidMount() {
        this.setState({tableColumnList: []})

        $(window).resize(() => {
            this.generateWidth()
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevShow = prevProps.show;
        const {show} = this.props;

        if (show && show !== prevShow) {
            this.setState({tableColumnList: []})
            this.onShow();
        }
    }

    onShow() {
        const {selectedTable} = this.props;
        const that = this;

        return LogViewActions.getColumnSetting(selectedTable.uuid).then(response => {
            const {data, error} = response;

            if (error) {
                return;
            }

            that.setState({tableColumnList: data}, () => {
                that.generateWidth()
            });
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

    onHidden() {
        const {onHidden} = this.props;

        this.setState({tableColumnList: []})

        if (typeof onHidden === 'function') {
            onHidden();
        }
    }

    generateLayout() {
        if (typeof this.state === 'undefined') {
            return [];
        }

        const {tableColumnList} = this.state;

        if (typeof tableColumnList === 'undefined') {
            return [];
        }

        return tableColumnList.map((column) => {
            const x = column.visible ? 0 : 1;
            let y = parseInt(column.index) + 1

            return {
                x: x,
                y: y,
                w: 1,
                h: 1,
                isResizable: false,
                i: column.name
            }
        })
    }

    generateWidth() {
        const $this = this

        $(() => {
            let width = $('#table-setting').find('.modal-body').width();
            setTimeout(() => {
                width = $('#table-setting').find('.modal-body').width();

                $this.setState({width}, () => {
                    $this.generateHeight()
                })
            }, 200)
        })
    }

    generateHeight() {
        const $this = this
        const {tableColumnList} = this.state

        $(() => {
            setTimeout(() => {
                let defaultHeight = 38;
                let line = 1;
                let modalWidth = $('#table-setting').find('.modal-body').width();
                let columnWidth = (parseInt(modalWidth) - 40) / 2

                tableColumnList.map((column) => {
                    const itemWidth = (column.name.length * 10) + 20

                    if (itemWidth > columnWidth) {
                        line = (itemWidth / columnWidth) + (itemWidth % columnWidth > 0 ? 1 : 0);
                        defaultHeight = 30
                    }
                })
                const height = line * defaultHeight;
                $this.setState({height})

            }, 500)
        })
    }

    render() {
        const {show, onHidden, onSave} = this.props;
        const {tableColumnList, layout, width, height} = this.state;

        return (
            <Modal title={'Table Setting'}
                   id={'table-setting'}
                   size={Size.large}
                   saveButtonTitle={'Save'}
                   show={show}
                   saveButtonAction={onSave}
                   showSaveButton={false}
                   onHidden={onHidden}>
                <div className={'row'}>
                    {tableColumnList && tableColumnList.length > 0 &&
                    <GridLayout className="col-12 grid-layout-el" layout={layout}
                                onDragStop={(layout) => {
                                    layout.map((item, index) => {
                                        if (item.y > 0) {
                                            this.onChange(item.i, item.x !== 1, item.y, index === (layout.length - 1))
                                        }
                                    })
                                }}
                                useCSSTransforms={true}
                                width={width}
                                cols={2}
                                rowHeight={height}
                    >
                        <div key='viewable' className="viewable text-center"
                             data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>
                            Viewable Columns
                        </div>
                        <div key='available' className="available text-center"
                             data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>
                            Available Columns
                        </div>
                        {tableColumnList.map((item) => {
                            const x = item.visible ? 0 : 1;
                            let y = parseInt(item.index) + 1
                            return <div key={item.name}
                                        className="btn btn-default"
                                        style={{wordBreak: 'break-all'}}
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
