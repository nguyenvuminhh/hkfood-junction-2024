import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import batchService from '../../services/batchService';

function Stage3() {
  const [batchId, setBatchId] = useState('');
  const [batchDate, setBatchDate] = useState('');
  const [storageEnd, setStorageEnd] = useState('');
  const [weightAfterStorage, setWeightAfterStorage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleInputErrors() {
    if (!batchId || !batchDate || !storageEnd || !weightAfterStorage) {
      toast.error('Please fill in all fields');
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const check = handleInputErrors();
    if (!check) return;
  
    setLoading(true);
    try {      
      const response = await batchService.postCooking(batchId, batchDate, weightAfterStorage, storageEnd);
  
      if (response.error) {
        toast.error(response.error);
      } else {
        setBatchId('');
        setBatchDate('');
        setStorageEnd('');
        setWeightAfterStorage('');
        toast.success('Form submitted successfully');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.log(`The server responds with a ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="dark:bg-primary_login_dark">
      <Helmet>
        <title>Stage 3</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className = "pb-10">
          <div className="w-[40vw] p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg dark:shadow-white border sm:max-w-md xl:p-0
          bg-white dark:bg-secondary_login_dark dark:border-gray-700 border-gray-300">
            <h1 className="mt-4 text-center text-xl font-semibold leading-tight tracking-tight md:text-2xl text-[#232d42] dark:text-white">
              Stage 3
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className = "ml-4 mr-4">
                <label htmlFor="batchId" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Batch Id
                </label>
                <input
                  type="text"
                  name="batchId"
                  id="batchId"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter batch Id"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
                <label htmlFor="batchDate" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Batch Date
                </label>
                <input
                  type="date"
                  name="batchDate"
                  id="batchDate"
                  value={batchDate}
                  onChange={(e) => setBatchDate(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter batch date"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
              <label htmlFor="storageEnd" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  End Storage Time
                </label>
                <input
                  type="date"
                  name="storageEnd"
                  id="storageEnd"
                  value={storageEnd}
                  onChange={(e) => setStorageEnd(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter batch Id"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
              <label htmlFor="weightAfterStorage" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Weight After Storage
                </label>
                <input
                  type="text"
                  name="weightBeforeStorage"
                  id="weightBeforeStorage"
                  value={weightAfterStorage}
                  onChange={(e) => setWeightAfterStorage(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter weight after storage"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                bg-[#232d42]
                dark:bg-gradient-to-r dark:from-blue-600 dark:to-violet-600 dark:hover:from-blue-800 dark:hover:to-indigo-900 text-white"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner" /> : 'Submit'}
              </button>
            </form>
          </div>
          </div>
    </section>
  );
}

export default Stage3;
