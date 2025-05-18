import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const ReusableUpload = ({
  initialFileList = [],
  maxFiles = 5,
  actionUrl = 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  showCrop = true,
  cropProps = { rotationSlider: true },
  uploadProps = {},
}) => {
  const [fileList, setFileList] = useState(initialFileList);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadComponent = (
    <Upload
      action={actionUrl}
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
      {...uploadProps}
    >
      {fileList.length < maxFiles && '+ Upload'}
    </Upload>
  );

  return showCrop ? (
    <ImgCrop {...cropProps}>{uploadComponent}</ImgCrop>
  ) : (
    uploadComponent
  );
};

export default ReusableUpload;