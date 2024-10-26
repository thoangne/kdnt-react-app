import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';



export const openSuccessNotification = (message: string, description: string) => {
    notification.success({
        message,
        description,
        icon: <CheckCircleOutlined style={{ color: '#00952F' }} />,
    });
};

export const openFailNotification = (message: string, description: string) => {
    notification.success({
        message,
        description,
        icon: <CloseCircleOutlined  style={{ color: '#F60002' }} />,
    });
};

