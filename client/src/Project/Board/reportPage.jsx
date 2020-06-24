import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {useRouteMatch, useHistory} from 'react-router-dom';

import useMergeState from 'shared/hooks/mergeState';
import {Breadcrumbs} from 'shared/components';

import jquery from 'jquery'
import Header from './Header';
import Filters from './Filters';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import {reportData} from '../../database/reportdata'

const propTypes = {
    project: PropTypes.object.isRequired,
    fetchProject: PropTypes.func.isRequired,
    updateLocalProjectIssues: PropTypes.func.isRequired,
};

const defaultFilters = {
    searchTerm: '',
    userIds: [],
    myOnly: false,
    recent: false,
};


class ReportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {

        const {project} = this.props
        return (
            <Fragment>
                <Breadcrumbs items={['Отчеты', project.name, 'Отчеты']}/>
                <Header title="Отчеты"/>

                <div className="col-12 mt-5">
                    <table className="table table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col-5" className="w-50">Название проекта</th>
                            <th scope="col-1" className="w-25">Дата</th>
                            <th scope="col-2" className="w-25">Документ</th>
                            <th scope="col-1" className="text-right">Редактировать</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            reportData.map((report, index) =>

                                <tr key={index}>
                                    <td scope="row" className="pl-3">{report.name}</td>
                                    <td>{report.date}</td>
                                    <td><a href={report.link} className="text-warning">
                                        <i style={{fontSize: 22}} className="fa fa-file-pdf-o " aria-hidden="true"/>
                                    </a></td>
                                    <td className=""><a href="/document/ashgdjahsdj.doc" className="text-success mr-3">
                                        <i style={{fontSize: 22}} className="fa fa-pencil " aria-hidden="true"/>
                                    </a>
                                        <a href="/document/ashgdjahsdj.doc" className="text-danger">
                                            <i style={{fontSize: 22}} className="fa fa-times " aria-hidden="true"/>
                                        </a>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </Fragment>
        )
    }
};

ReportPage.propTypes = propTypes;

export default ReportPage;
