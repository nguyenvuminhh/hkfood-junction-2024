// import Notification from "./Notification";

const PreproductionNotification = ({ notification, notifications }) => {
    function formatIsoTime(isoString) {
        const date = new Date(isoString);
        
        // Get hours and minutes with zero padding if needed
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        // Get day and month with zero padding if needed
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
        
        return `${hours}:${minutes} · ${day}/${month}`;
    }
    
    function formatToDayMonth(isoString) {
        const date = new Date(isoString);

        // Get day and month with zero padding if needed
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript

        return `${day}/${month}`;
    }

    return (
        <>
            {/* Check if notifications array is empty */}
            <div className = "flex flex-col justify-center items-center">
            {!notifications || notifications.length === 0 ? (
                <div className="ml-4 p-4 h-6 rounded mb-2 text-gray-500">
                    No notifications available for this product
                </div>
            ) : (
                notifications.map((notification, index) => {
                    let message;
                    let color;
                    console.log('nottiiiii', notification)
                    console.log(notification.phase)
                    switch (Number(notification.phase)) {
                        case 2:
                            message = `${formatIsoTime(notification.createdAt)} | Batch: #${notification.batchId} · ${formatToDayMonth(notification.batchDate)} | Cooking weight loss: ${notification.statistic.toFixed(2)}kg`;
                            color = 'bg-blue-300';
                            break;
                        case 3:
                            message = `${formatIsoTime(notification.createdAt)} | Batch: #${notification.batchId} · ${formatToDayMonth(notification.batchDate)} | Storage weight deviation: ${notification.statistic.toFixed(2) * 100}%`;
                            color = 'bg-yellow-300';
                            break;
                        case 4:
                            message = `${formatIsoTime(notification.createdAt)} | Product: #${notification.prodId} | Final product weight deviation: ${notification.statistic.toFixed(2) * 100}%`;
                            color = 'bg-red-300';
                            break;
                        default:

                            console.log(Number(notification.phase))
                            message = "Status update unavailable.";
                            color = "bg-gray-300";
                    }

                    return (
                        <div key={index} className={`alert ${color} ml-4 p-4 h-6 rounded mb-2 text-black flex`}>
                            <span>{message}</span>
                        </div>
                    );
                })
            )}
            </div>
        </>
    );
};

export default PreproductionNotification;
