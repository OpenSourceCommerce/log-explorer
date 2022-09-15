import React, {Component} from 'react';
import {Input, Button, Icon, Link, Select} from '.';
import {Alert, DatabaseActions, GraphActions} from '../actions';
import PropTypes from 'prop-types';
import InputColor from "react-input-color";
import '../../styles/component/_graph-form.scss';

export class GraphForm extends Component {
    constructor(props) {
        super(props);
        const lines = [];
        lines.push(this.getBlankLine());

        this.state = {
            id: '',
            table: '',
            tableId: '',
            title: '',
            maxPoint: '12',
            lines,
            tables: [],
            tableError: false,
            titleError: false,
            maxPointError: false,
            isLoading: false
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onMaxPointChange = this.onMaxPointChange.bind(this);
        this.onLineChange = this.onLineChange.bind(this);
        this.addMoreLine = this.addMoreLine.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    loadTable() {
        const that = this;
        DatabaseActions.getAllTable()
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                that.setState({
                    tables: data
                });
            });
    }

    loadData(id) {
        const that = this;
        GraphActions.loadGraph(id)
            .then(res => {
                const {error, data} = res;
                if (error) {
                    return;
                }

                const {table, title, max_point, lines} = data;
                that.setState({
                    table,
                    title,
                    maxPoint: max_point,
                    lines
                });
            });
    }

    init() {
        const {id = null, table = null, graph = {}} = this.props;
        if (table === null) {
            this.loadTable();
        }

        if (id && $.isEmptyObject(graph)) {
            this.loadData(id);
        }

        if (!$.isEmptyObject(graph)) {
            this.setState(graph);
        }

        this.setState({id, table});
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {id = '', table = '', graph = {}} = this.props;
        const preId = prevProps.id ? prevProps.id : '';
        const preTable = prevProps.table ? prevProps.table : '';
        if (id !== preId || table !== preTable || ($.isEmptyObject(graph) !== $.isEmptyObject(prevProps.graph))) {
            this.init();
        }
    }

    getBlankLine() {
        return {id: '', title: '', color: '', filter: '', error: false};
    }

    onTableChange(e) {
        this.setState({
            table: e.target.value,
            tableError: false
        });
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value,
            titleError: false
        });
    }

    onMaxPointChange(e) {
        this.setState({
            maxPoint: e.target.value,
            maxPointError: false
        });
    }

    onLineChange(key, name, value) {
        const {lines} = this.state;
        lines[key][name] = value;
        this.setState({
            lines
        });
    }

    deleteLine(key) {
        const {lines} = this.state;
        lines.splice(key, 1);
        if (lines.length === 0) {
            lines.push(this.getBlankLine());
        }

        this.setState({
            lines
        });
    }

    addMoreLine() {
        const {lines} = this.state;
        lines.push(this.getBlankLine());
        this.setState({
            lines
        });
    }

    onSubmit() {
        let {id, table, title, maxPoint, lines} = this.state;
        let hasError = false;
        if (table === '') {
            this.setState({
                tableError: true
            });
            hasError = true;
        }

        title = $.trim(title);
        maxPoint = parseInt(maxPoint);

        if (title === '') {
            this.setState({
                titleError: true
            });
            hasError = true;
        }

        if (isNaN(maxPoint) || maxPoint < 2 || maxPoint > 128) {
            this.setState({
                maxPointError: true
            });
            hasError = true;
        }

        let lineChange = false;
        for (const line of lines) {
            if (line.error) {
                lineChange = true;
                line.error = false;
            }

            if ($.trim(line.title) === '' || $.trim(line.color) === '') {
                line.error = true;
                lineChange = true;
                hasError = true;
            }
        }

        if (lineChange) {
            this.setState({
                lines
            });
        }

        if (!hasError) {
            const that = this;
            that.setState({
                isLoading: true
            });
            GraphActions.createOrUpdate(id, {
                table,
                title,
                maxPoint,
                lines
            }).then(res => {
                const {error, redirect} = res;
                if (error) {
                    return;
                }

                if (redirect) {
                    window.location.href = redirect;
                } else {
                    Alert.success('Update successful');
                    that.loadData(id);
                }
            }).finally(() => {
                that.setState({
                    isLoading: false
                });
            });
        }
    }

    render() {
        const {className} = this.props;
        const {id, table, tables, title, maxPoint, lines, tableError, titleError, maxPointError, isLoading} = this.state;

        const _lines = lines.map((item, key) => {
            return <div key={key} className="form-group">
                <div className={'row'}>
                    <div className="col-12 col-md-3 row m-md-0">
                        <span className="d-block d-md-none col-2">Name</span>
                        <Input
                            className={`${item.error && item.title === '' ? 'is-invalid' : ''} col-10 col-md-12 line_name`}
                            value={item.title}
                            onChange={e => this.onLineChange(key, 'title', e.target.value)}
                            placeholder={'Line title'}/>
                    </div>
                    <div className="col-12 col-md-2 mt-2 mt-md-0 row m-md-0">
                        <span className="d-block d-md-none col-2">Color</span>
                        <div className="col-10 col-md-12 d-flex p-0">
                            <Input
                                className={`${item.error && item.title === '' ? 'is-invalid' : ''} line_color`}
                                value={item.color}
                                onChange={e => this.onLineChange(key, 'color', e.target.value)}
                                placeholder={'Line color'}/>
                            <div className="color-picker">
                                <InputColor
                                    initialValue={item.color || '#000000'}
                                    onChange={(e) => {
                                        if (e && e.hex) {
                                            this.onLineChange(key, 'color', e.hex);
                                        }
                                    }}
                                    placement="right"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 d-flex mt-2 mt-md-0 row">
                        <span className="d-block d-md-none col-2">Filter</span>
                        <div className="col-10 col-md-12 d-flex p-0">
                            <Input className="me-2 line_filter" value={item.filter ? item.filter : ''}
                                   onChange={e => this.onLineChange(key, 'filter', e.target.value)}
                                   placeholder={'status = 200'}/>
                            <Button onClick={() => this.deleteLine(key)} color={'danger'} className="line_delete"><Icon
                                name={'trash'}/></Button>
                        </div>
                    </div>
                </div>
            </div>;
        });

        return (
            <div className={`${className} graph-form`}>
                <div className="form-group">
                    <label>Table</label>
                    {table && <Link className={'ms-3'} href={'/table/' + table} >{table}</Link>}
                    {tables.length > 0 && <Select value={table} className={tableError ? 'is-invalid' : ''} onChange={this.onTableChange}>
                        <option value="">Select table</option>
                        {tables.map((item, key) => {
                            return <option key={key} value={item}>{item}</option>;
                        })}
                    </Select>}
                </div>
                <div className="form-group">
                    <label>Graph title</label>
                    <Input name="graph_title" className={titleError ? 'is-invalid' : ''} placeholder="Title" value={title} onChange={this.onTitleChange}/>
                </div>
                <div className="form-group">
                    <label>Max point</label>
                    <Input name="graph_point" className={maxPointError ? 'is-invalid' : ''} placeholder="Max point" value={maxPoint} onChange={this.onMaxPointChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1 mb-0 mb-md-2">Lines</label>
                    <div className="row d-none d-md-flex">
                        <div className="col-3">
                            Name
                        </div>
                        <div className="col-2">
                            Color
                        </div>
                        <div className="col-7">
                            Filter
                        </div>
                    </div>
                    {_lines}
                </div>

                <div className="box-footer">
                    <Button color={'success'} onClick={this.onSubmit}
                            isLoading={isLoading}>{id ? 'Update graph' : 'Create graph'}</Button>
                    <Button color={'primary'} className={'ms-3'} onClick={this.addMoreLine}>Add more
                        line</Button>
                </div>
            </div>
        );
    }
}

GraphForm.propTypes = {
    id: PropTypes.string,
    table: PropTypes.string,
    graph: PropTypes.object,
    className: PropTypes.string
};
