import Notification from "./Notification";

const PreproductionNotification = ({ notification, notifications }) => {
    return (
        <>
            <Notification notification={notification} />
            {notifications.map((notification, index) => {
                let message;
                let color;

                switch (notification.phase) {
                    case "preproduction":
                        message = "Message sent successfully.";
                        color = 'bg-green-300';
                        break;
                    case "cooking":
                        message = "Cooking in progress.";
                        color = 'bg-blue-300';
                        break;
                    case "storage":
                        message = "Stored safely.";
                        color = 'bg-yellow-300';
                        break;
                    case "packing":
                        message = "Packing complete.";
                        color = 'bg-red-300';
                        break;
                    default:
                        message = "Unknown phase.";
                        color = "bg-gray-300";
                }

                return (
                    <div key={index} className={`alert ${color} ml-4 p-4 h-6 rounded mb-2 text-black flex `}>
                        <span>{message}</span>
                    </div>
                );
            })}
        </>
    );
};

export default PreproductionNotification;
