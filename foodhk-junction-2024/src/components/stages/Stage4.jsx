import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import productService from '../../services/productService';
import { useDispatch } from 'react-redux';
import { changeNotification } from '../../reducers/notificationReducer';

function Stage4() {
  const [prodId, setProdId] = useState('');
  const [weightAfterPacking, setWeightAfterPacking] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleInputErrors() {
    if (!prodId || !weightAfterPacking) {
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
      const response = await productService.weightFinalProduct(prodId, weightAfterPacking);
      console.log(response);

      if (response.error) {
        toast.error(response.error);
      } else {
        if (response.abnormal) {
          dispatch(changeNotification(response.notification));
        }
        setProdId('');
        setWeightAfterPacking('');
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
        <title>Stage 4</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-dvh">
        <div className="w-[40vw] p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg dark:shadow-white border sm:max-w-md xl:p-0
          bg-white dark:bg-secondary_login_dark dark:border-gray-700 border-gray-300">
          <h1 className="text-center mt-4 text-xl font-semibold leading-tight tracking-tight md:text-2xl text-[#232d42] dark:text-white">
            Stage 4
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="ml-4 mr-4">
              <label htmlFor="prodId" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                Product ID
              </label>
              <input
                type="text"
                name="prodId"
                id="prodId"
                value={prodId}
                onChange={(e) => setProdId(e.target.value)}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                  placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                placeholder="Enter Product ID"
                required
              />
            </div>
            <div className="ml-4 mr-4">
              <label htmlFor="weightAfterPacking" className="block mb-2 text-sm font-medium text-[#232d42] dark:text-white">
                Weight After Packing
              </label>
              <input
                type="text"
                name="weightAfterPacking"
                id="weightAfterPacking"
                value={weightAfterPacking}
                onChange={(e) => setWeightAfterPacking(e.target.value)}
                className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white dark:bg-third_login_dark border-[#232d42] dark:border-gray-600
                  placeholder-gray-400 text-black dark:text-white focus:ring-white focus:border-white"
                placeholder="Enter weight after packing"
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

export default Stage4;
