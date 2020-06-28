import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useApi from 'shared/hooks/api';
import { useDropzone } from 'react-dropzone';
import { ActionButton } from '../ProjectSettings/Styles';

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function Dropzone({ project, fetchReports }) {
  const [{ isCreating }, saveReport] = useApi.post('/reports');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (created && !isCreating) {
      fetchReports();
      setCreated(false);
    }
  }, [isCreating, created, fetchReports]);

  function uploadReport(report) {
    saveReport(report);
    setCreated(true);
  }

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    accept: '.pdf',
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  function save() {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      // const array = new Int8Array(binaryStr);
      uploadReport({
        // file: JSON.stringify(array, null, '  '),
        file: binaryStr.replace(/^data:.+;base64,/, ''),
        name: acceptedFiles[0].name,
        projectId: project.id,
      });
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }

  return (
    <div className="container">
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{files}</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </Container>
      <aside>
        <ActionButton variant="primary" isWorking={isCreating} onClick={save}>
          Добавить отчёт
        </ActionButton>
      </aside>
    </div>
  );
}

export default Dropzone;
