// import Notification from "./Notification";

const CookingNotification = ({ notification, notifications }) => {
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

    // Filter notifications with phase 2
    const phase2Notifications = !notifications ? null : notifications.filter(notification => notification.phase === 2);

    return (
        <div className="flex flex-col justify-center items-center">
            {/* Check if filtered phase 2 notifications array is empty */}
            {!phase2Notifications || phase2Notifications.length === 0 ? (
                <div className="ml-4 p-4 h-6 rounded mb-2 text-gray-500">
                    No notifications available for this product
                </div>
            ) : (
                phase2Notifications.map((notification, index) => {
                    const message = `${formatIsoTime(notification.createdAt)} | Batch: #${notification.batchId} · ${formatToDayMonth(notification.batchDate)} | Cooking weight loss: ${notification.statistic.toFixed(2)}kg`;
                    const color = 'bg-blue-300';

                    return (
                        <div key={index} className={`alert ${color} ml-4 p-4 h-6 rounded mb-2 text-black flex`}>
                            <span>{message}</span>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CookingNotification;
