import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs } from 'shared/components';
import useApi from 'shared/hooks/api';
import Header from './Header';
import Dropzone from './dropzone';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { SearchSpinner } from '../IssueSearch/Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
};

function ReportPage({ project }) {
  const [deleted, setDeleted] = useState(false);
  const [{ data, isLoading }, fetchReports] = useApi.get('/reports');
  const [{ isLoading: isRemoving }, deleteReport] = useApi.delete('/reports');

  useEffect(() => {
    if (deleted && !isRemoving) {
      fetchReports();
      setDeleted(false);
    }
  }, [deleted, fetchReports, isRemoving]);

  function removeReport(id) {
    deleteReport({ id });
    setDeleted(true);
  }

  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function downloadReport(base64, name) {
    const blob = new Blob([base64ToArrayBuffer(base64)], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
  }

  return (
    <Fragment>
      <Breadcrumbs items={['Отчеты', project.name, 'Отчеты']} />
      <Header title="Отчеты" />

      {isLoading && <SearchSpinner />}
      {!isLoading && (
        <div className="col-12 mt-5">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col-5" className="w-50">
                  Название проекта
                </th>
                <th scope="col-1" className="w-25">
                  Дата
                </th>
                <th scope="col-2" className="w-25">
                  Документ
                </th>
                <th scope="col-1" className="text-right">
                  Редактировать
                </th>
              </tr>
            </thead>
            <tbody>
              {data.reports.map((report, index) => (
                <tr key={index}>
                  <td className="pl-3">{report.name}</td>
                  <td>{new Date(`${report.createdAt}`).toDateString()}</td>
                  <td>
                    <i
                      style={{ fontSize: 22, color: '#ffc107', cursor: 'pointer' }}
                      className="fa fa-file-pdf-o "
                      aria-hidden="true"
                      onClick={() => downloadReport(report.file, report.name)}
                    />
                  </td>
                  <td className="">
                    <i
                      style={{ fontSize: 22, color: '#dc3545', cursor: 'pointer' }}
                      className="fa fa-times "
                      aria-hidden="true"
                      onClick={() => removeReport(report.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dropzone project={project} fetchReports={fetchReports} />
    </Fragment>
  );
}

ReportPage.propTypes = propTypes;

export default ReportPage;
