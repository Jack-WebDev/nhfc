import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface NotificationDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    referenceNo: string;
    fullName: string;
    queryType: string;
    queryDate: string;
    queryStatus: string;
    description: string;
    attachments?: string;
  };
}

const ViewNotification: React.FC<NotificationDetailsProps> = ({
  isOpen,
  onClose,
  notification,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Notification Details
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <strong>Reference No:</strong> {notification.referenceNo}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Full Name:</strong> {notification.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Query Type:</strong> {notification.queryType}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Query Date:</strong> {notification.queryDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Query Status:</strong> {notification.queryStatus}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Description:</strong> {notification.description}
                        </p>
                        {notification.attachments && (
                          <p className="text-sm text-gray-500">
                            <strong>Attachments:</strong>{" "}
                            <a
                              href={notification.attachments}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Attachment
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewNotification;
