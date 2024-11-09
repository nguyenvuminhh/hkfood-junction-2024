import { toast } from 'react-hot-toast';

const PreproductionNotification = ({ notification }) => {
    const getBackgroundColor = () => {
        switch (notification.type) {
            case "success":
                return "bg-green-300";
            case "warning":
                return "bg-yellow-300";
            case "error":
                return "bg-red-300";
            case "info":
                return "bg-blue-300";
            default:
                return "bg-gray-300";
        }
    };

    return (
        toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full ${getBackgroundColor()} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                        {notification.description}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {notification.time}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
    );
};

export default PreproductionNotification;
