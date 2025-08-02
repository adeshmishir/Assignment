const handleError = (res, error) => {
  console.error('[Apify Error]', error?.response?.data || error.message);
  res.status(error?.response?.status || 500).json({
    success: false,
    message: error?.response?.data?.message || error.message || 'Server Error',
  });
};

export default handleError;
