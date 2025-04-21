export function Footer() {
  return (
    <>
    <div className="pb-3 pl-3 pr-3 flex flex-row align-items-end justify-content-between gap-2 min-w-screen">
        <div className="flex align-items-center gap-2">
        Powered by{" "}
        <a href="https://www.weatherapi.com/" title="Weather API"></a>
        <a href="https://www.weatherapi.com/" title="Free Weather API">
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
          />
        </a>
      </div>
      <div>Desenvolvido por Lucas Soares</div>
    </div>
      
    </>
  );
}
