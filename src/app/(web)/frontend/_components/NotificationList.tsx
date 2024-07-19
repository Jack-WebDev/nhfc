// src/app/(web)/frontend/_components/NotificationList.tsx
import React, { useState } from 'react';

import ViewNotification from './ViewNotification';
import { Eye } from 'lucide-react';
import { Notification } from './types';
import { useNotificationContext } from './NotificationContext';

const NotificationList: React.FC = () => {
  const { notifications, clearNotifications } = useNotificationContext();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg outline-none">
      <div className="p-2">
        <div className="flex justify-between items-center px-4 py-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={clearNotifications} className="text-sm text-blue-500">
            Clear All
          </button>
        </div>
        {notifications.length === 0 ? (
          <p className="p-4 text-gray-500">No notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="p-4 border-b last:border-0 flex items-center justify-between">
              <span>{notification.message}</span>
              <Eye
                className="w-5 h-5 text-blue-500 cursor-pointer"
                onClick={() => handleViewDetails(notification)}
              />
            </div>
          ))
        )}
      </div>
      {selectedNotification && (
        <ViewNotification
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          notification={selectedNotification}
        />
      )}
    </div>
  );
};

export default NotificationList;
