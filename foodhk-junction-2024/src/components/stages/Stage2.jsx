import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import batchService from '../../services/batchService';
function Stage2() {
  const [batchId, setBatchId] = useState('');
  const [batchDate, setBatchDate] = useState('');
  const [weightAfterCooking, setWeightAfterCooking] = useState('');
  const [storageStart, setStorageStart] = useState('');
  const [loading, setLoading] = useState(false);

  function handleInputErrors() {
    if (!batchId || !batchDate || !weightAfterCooking || !storageStart) {
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
      const response = await batchService.postCooking(batchId, batchDate, weightAfterCooking, storageStart);
  
      if (response.error) {
        toast.error(response.error);
      } else {
        setBatchId('');
        setBatchDate('');
        setWeightAfterCooking('');
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
        <title>Stage 2</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className =" pb-10">
          <div className="w-[40vw] p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg dark:shadow-white border sm:max-w-md xl:p-0
          bg-white dark:bg-secondary_login_dark dark:border-gray-700 border-gray-300">
            <h1 className="mt-4 text-center text-xl font-semibold leading-tight tracking-tight md:text-2xl text-[#232d42] dark:text-white">
              Stage 2
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
                  Production Time
                </label>
                <input
                  type="date"
                  name="batchDate"
                  id="batchDate"
                  value={batchDate}
                  onChange={(e) => setBatchDate(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter batch Id"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
              <label htmlFor="weightBeforeCooking" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Weight After Cooking
                </label>
                <input
                  type="text"
                  name="weightBeforeCooking"
                  id="weightBeforeCooking"
                  value={weightAfterCooking}
                  onChange={(e) => setWeightAfterCooking(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter weight after cooking"
                  required
                />
              </div>
              <div className = "ml-4 mr-4">
              <label htmlFor="storageStart" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                  Weight After Cooking
                </label>
                <input
                  type="date"
                  name="storageStart"
                  id="storageStart"
                  value={storageStart}
                  onChange={(e) => setStorageStart(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                                    placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                  placeholder="Enter weight after cooking"
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

export default Stage2;
