export const useAppController = () => {
  const handleCMULogin = () => {
    const cmuAuthUrl = `https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=v3pP16kD01qVxynezRP2GBYW9jENxwWbN8M6BTcg&redirect_uri=http://localhost:3000/cmuOAuthCallback&scope=cmuitaccount.basicinfo&state=xyz`;
    window.location.href = cmuAuthUrl;
  };

  return {
    handleCMULogin,
  };
};
