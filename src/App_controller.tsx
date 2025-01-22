export const useAppController = () => {
  const handleCMULogin = () => {
    const cmuAuthUrl = import.meta.env.VITE_PUBLIC_CMU_OAUTH_URL;
    if (cmuAuthUrl) {
      window.location.href = cmuAuthUrl;
    } else {
      console.error('CMU OAuth URL is not defined');
    }
  };

  return {
    handleCMULogin,
  };
};
