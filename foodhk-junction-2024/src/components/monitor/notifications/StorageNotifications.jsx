// import Notification from "./Notification";

const StorageNotification = ({ notification, notifications }) => {
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

    // Filter notifications with phase 3
    const phase3Notifications = notifications.filter(notification => notification.phase === 3);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                {/* Check if filtered phase 3 notifications array is empty */}
                {phase3Notifications.length === 0 ? (
                    <div className="ml-4 p-4 h-6 rounded mb-2 text-gray-500">
                        No notifications available for this product
                    </div>
                ) : (
                    phase3Notifications.map((notification, index) => {
                        const message = `${formatIsoTime(notification.createdAt)} | Batch: #${notification.batchId} · ${formatToDayMonth(notification.batchDate)} | Storage weight deviation: ${notification.statistic.toFixed(2) * 100}%`;
                        const color = 'bg-yellow-300';

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

export default StorageNotification;
